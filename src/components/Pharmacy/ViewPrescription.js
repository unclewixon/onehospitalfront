/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Popover from 'antd/lib/popover';
import Tooltip from 'antd/lib/tooltip';
import { useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';

import SelectDrug from './SelectDrug';
import {
	request,
	updateImmutable,
	formatCurrency,
	hasExpired,
} from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import ViewRequestNote from '../Modals/ViewRequestNote';

const ViewPrescription = ({
	prescriptions,
	prescription,
	updatePrescriptions,
	closeModal,
	doPrint,
}) => {
	const [visible, setVisible] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [sumTotal, setSumTotal] = useState(0.0);
	const [regimens, setRegimens] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const [noteVisible, setNoteVisible] = useState(null);

	const staff = useSelector(state => state.user.profile);

	useEffect(() => {
		if (!loaded) {
			const items = prescriptions.filter(p => p.code === prescription.code);
			setRegimens(items);

			const total = items.reduce((total, regItem) => {
				const amount = regItem.item.drugBatch?.unitPrice || 0;

				return (total += parseFloat(amount) * regItem.item.fillQuantity);
			}, 0.0);

			setSumTotal(total);

			setLoaded(true);
		}
	}, [loaded, prescription, prescriptions]);

	const onChange = (e, id) => {
		const quantity = e.target.value;
		const regimen = regimens.find(r => r.item.id === parseInt(id, 10));
		const item = {
			...regimen.item,
			fillQuantity: quantity,
			filledBy: staff.username,
		};
		const updatedDrugs = updateImmutable(regimens, { ...regimen, item });
		setRegimens(updatedDrugs);
		const total = updatedDrugs.reduce((total, regItem) => {
			if (regItem.item.fillQuantity === '') {
				return (total += 0);
			}
			const amount = regItem.item.drugBatch?.unitPrice || 0;
			return (total +=
				parseFloat(amount) * parseInt(regItem.item.fillQuantity, 10));
		}, 0);
		setSumTotal(total);
	};

	const deleteItem = id => {
		const regimen = regimens.find(p => p.id === parseInt(id, 10));
		if (regimen.item.vaccine) {
			notifyError('you cannot remove a vaccine prescription');
			return;
		}
	};

	const setDrug = (generic, drug, id) => {
		if (!drug) {
			notifyError('select drug first');
			return;
		}

		const regimen = regimens.find(r => r.id === parseInt(id, 10));
		const item = { ...regimen.item, drugGeneric: generic, drug };
		const updatedDrugs = updateImmutable(regimens, { ...regimen, item });
		setRegimens(updatedDrugs);
	};

	const doFill = async () => {
		try {
			if (regimens.length === 0) {
				notifyError('Error, no regimens found!');
				return;
			}
			if (sumTotal <= 0) {
				notifyError('Error, no regimens filled!');
				return;
			}

			const emptyItem = regimens.find(
				p =>
					!p.item.fillQuantity ||
					(p.item.fillQuantity && p.item.fillQuantity === '')
			);
			if (emptyItem) {
				notifyError(
					'please fill all presciptions or remove the request item you do not need to fill!'
				);
				return;
			}

			setSubmitting(true);
			const url = `requests/fill-request/${prescription.id}`;
			const rs = await request(url, 'POST', true, {
				items: regimens,
				patient_id: prescription.patient.id,
				total_amount: sumTotal,
				code: prescription.code,
			});

			setSubmitting(false);
			if (rs.success) {
				for (const item of rs.data) {
					const regimen = prescriptions.find(p => p.item.id === item.id);
					updatePrescriptions({ ...regimen, item });
				}
				notifySuccess('pharmacy prescription filled');
				closeModal();
			} else {
				notifyError(rs.message);
			}
		} catch (e) {
			setSubmitting(false);
			notifyError(e.message || 'Error, could not fill prescription');
		}
	};

	const dispense = async () => {
		try {
			setSubmitting(true);
			const url = `requests/${prescription.id}/approve-result?type=drugs`;
			const rs = await request(url, 'PATCH', true, { code: prescription.code });
			setSubmitting(false);
			if (rs.success) {
				for (const item of rs.data) {
					const regimen = prescriptions.find(p => p.item.id === item.id);
					updatePrescriptions({ ...regimen, status: 1, item });
				}
				notifySuccess('pharmacy prescription dispensed');
				closeModal();
			} else {
				notifyError(rs.message);
			}
		} catch (e) {
			setSubmitting(false);
			notifyError(e.message || 'Error, could not dispense prescription');
		}
	};

	const onSelectBatch = (e, regimen) => {
		const batch = regimen.item.drug.batches.find(
			b => b.id === parseInt(e.target.value, 10)
		);

		const expired = hasExpired(batch.expirationDate);
		if (expired) {
			confirmAlert({
				customUI: ({ onClose }) => {
					return (
						<div className="custom-ui text-center">
							<h3 className="text-danger">Expiration</h3>
							<p>{`${regimen.item.drug.name} with Batch ${batch.name} has expired`}</p>
							<div>
								<button
									className="btn btn-primary"
									style={{ margin: 10 }}
									onClick={onClose}>
									Okay
								</button>
							</div>
						</div>
					);
				},
			});
		}

		if (batch.quantity === 0) {
			confirmAlert({
				customUI: ({ onClose }) => {
					return (
						<div className="custom-ui text-center">
							<h3 className="text-danger">Stock</h3>
							<p>{`${regimen.item.drug.name} is out of stock`}</p>
							<div>
								<button
									className="btn btn-primary"
									style={{ margin: 10 }}
									onClick={onClose}>
									Okay
								</button>
							</div>
						</div>
					);
				},
			});
		}

		const item = { ...regimen.item, drugBatch: batch };
		const updatedDrugs = updateImmutable(regimens, { ...regimen, item });
		setRegimens(updatedDrugs);
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '1024px' }}>
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Prescription Details</h4>
						<div className="onboarding-text alert-custom">
							{`Prescription Requested By ${
								prescription?.created_by
							} on ${moment(prescription?.createdAt).format(
								'DD MMM, YYYY HH:mm A'
							)}`}
						</div>
						<div className="element-box p-3 m-0">
							<div className="row">
								<div className="col-sm-12">
									<table className="table table-striped">
										<thead>
											<tr>
												<td>Prescription</td>
												<td>Status</td>
												<td>Drug/Generic</td>
												<td>Batch</td>
												<td>Price</td>
												<td>Quantity</td>
												<td>Note</td>
												<td></td>
											</tr>
										</thead>
										<tbody>
											{regimens.map((regimen, i) => {
												const when =
													regimen.item.frequencyType === 'immediately' ||
													regimen.item.frequencyType === 'quarterly'
														? ''
														: ` for ${regimen.item.duration} days`;
												return (
													<tr key={i}>
														<td>
															{regimen.item.vaccine && (
																<div className="center-text">
																	<span className="badge badge-grey">
																		{`Vaccine: ${regimen.item.vaccine.description}`}
																	</span>
																</div>
															)}
															<div>
																{regimen.item.drugGeneric
																	? `${regimen.item.doseQuantity} of ${regimen
																			.item.drugGeneric?.name || 'nil'} ${
																			regimen.item.frequency
																	  } x ${regimen.item.frequencyType}${when}`
																	: ''}
																{regimen.item.vaccine && (
																	<Popover
																		content={
																			<SelectDrug
																				onHide={() => setVisible(null)}
																				setDrug={(gen, drug) =>
																					setDrug(gen, drug, regimen.id)
																				}
																			/>
																		}
																		overlayClassName="select-drug"
																		trigger="click"
																		visible={
																			visible && visible === regimen.item.id
																		}
																		onVisibleChange={() =>
																			setVisible(regimen.item.id)
																		}>
																		<Tooltip title="Select/Change Vaccine Drug">
																			<a className="link-primary">
																				<i className="os-icon os-icon-ui-49" />{' '}
																				select drug
																			</a>
																		</Tooltip>
																	</Popover>
																)}
															</div>
														</td>
														<td>
															{regimen.item.filled === 0 &&
															regimen.item.substituted === 0
																? 'Open'
																: ''}
															{regimen.item.filled === 0 &&
															regimen.item.substituted === 1
																? 'Substituted'
																: ''}
															{regimen.item.filled === 1 ? 'Filled' : ''}
														</td>
														<td>
															{regimen.item.filled === 0 && (
																<Popover
																	content={
																		<SelectDrug
																			onHide={() => setVisible(null)}
																			setDrug={(gen, drug) =>
																				setDrug(gen, drug, regimen.id)
																			}
																			generic={regimen.item.drugGeneric}
																		/>
																	}
																	overlayClassName="select-drug"
																	trigger="click"
																	visible={
																		visible && visible === regimen.item.id
																	}
																	onVisibleChange={() =>
																		setVisible(regimen.item.id)
																	}>
																	<Tooltip title="Select/Change Vaccine Drug">
																		<a className="link-primary">
																			<i className="os-icon os-icon-ui-49" />{' '}
																			select drug
																		</a>
																	</Tooltip>
																</Popover>
															)}
															{regimen.item.filled === 0 && <br />}
															{regimen.item.drug?.name || ''}
														</td>
														<td>
															{regimen.item.drugBatch &&
															regimen.item.filled === 1 ? (
																<select
																	className="form-control"
																	disabled
																	placeholder="Select Batch">
																	<option value={regimen.item.drugBatch.id}>
																		{regimen.item.drugBatch.name}
																	</option>
																</select>
															) : (
																<select
																	className="form-control"
																	placeholder="Select Batch"
																	onChange={e => onSelectBatch(e, regimen)}>
																	<option value="">Select Batch</option>
																	{regimen.item.drug &&
																		regimen.item.drug.batches.map(
																			(batch, i) => (
																				<option key={i} value={batch.id}>
																					{batch.name}
																				</option>
																			)
																		)}
																</select>
															)}
														</td>
														<td>
															{formatCurrency(
																regimen.item.drugBatch?.unitPrice || 0.0
															)}
														</td>
														<td>
															<div className="form-group mb-0">
																<input
																	type="number"
																	className="form-control"
																	placeholder="Qty"
																	value={regimen.item.fillQuantity || ''}
																	onChange={e => onChange(e, regimen.item.id)}
																	disabled={regimen.item.filled === 1}
																	style={{ width: '90px' }}
																/>
															</div>
														</td>
														<td>
															{regimen.item.note ? (
																<Popover
																	content={
																		<ViewRequestNote
																			title="Regimen Note"
																			note={regimen.item.note}
																			closeModal={() => setNoteVisible(null)}
																		/>
																	}
																	overlayClassName="show-note"
																	trigger="click"
																	visible={
																		noteVisible && noteVisible === regimen.id
																	}
																	onVisibleChange={() =>
																		setNoteVisible(regimen.id)
																	}>
																	<a className="item-title text-primary">
																		Note
																	</a>
																</Popover>
															) : (
																'--'
															)}
														</td>
														{regimen.item.filled === 0 && (
															<td className="row-actions text-center">
																<Tooltip title="Cancel Prescription">
																	<a
																		className="danger"
																		onClick={() => deleteItem(regimen.id)}>
																		<i className="os-icon os-icon-ui-15" />
																	</a>
																</Tooltip>
															</td>
														)}
													</tr>
												);
											})}
											<tr>
												<td colSpan="4">&nbsp;</td>
												<td>{formatCurrency(sumTotal)}</td>
												<td colSpan="2">&nbsp;</td>
											</tr>
										</tbody>
									</table>
								</div>
								{prescription && (
									<div className="col-md-12 mt-4">
										{prescription.item.filled === 0 && (
											<>
												<button
													onClick={() => doFill()}
													className="btn btn-primary"
													disabled={submitting}>
													{submitting ? (
														<img src={waiting} alt="submitting" />
													) : (
														<span>Fill Prescription</span>
													)}
												</button>
											</>
										)}
										{prescription.item.filled === 1 &&
											prescription.item.transaction &&
											prescription.item.transaction.status === 1 &&
											prescription.status === 0 && (
												<button
													onClick={() => dispense()}
													className="btn btn-primary ml-2">
													{submitting ? (
														<img src={waiting} alt="submitting" />
													) : (
														<span>Dispense Prescription</span>
													)}
												</button>
											)}
										{prescription.status === 1 && (
											<button
												onClick={() => doPrint(prescription)}
												className="btn btn-success">
												<span>Print</span>
											</button>
										)}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewPrescription;
