/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Popover from 'antd/lib/popover';
import Tooltip from 'antd/lib/tooltip';
import { useSelector } from 'react-redux';

import SelectDrug from './SelectDrug';
import {
	request,
	updateImmutable,
	formatCurrency,
} from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';

const ViewPrescription = ({
	closeModal,
	activeRequest,
	drugs,
	updatePrescriptions,
	filled,
}) => {
	const [visible, setVisible] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [sumTotal, setSumTotal] = useState(0.0);
	const [prescriptions, setPrescriptions] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const staff = useSelector(state => state.user.profile);

	useEffect(() => {
		if (!loaded && activeRequest && activeRequest.items) {
			setPrescriptions(activeRequest.items);

			const total = activeRequest.items.reduce((total, item) => {
				const amount = item.drug.hmoPrice;

				return (total += parseFloat(amount) * item.fillQuantity);
			}, 0.0);

			setSumTotal(total);

			setLoaded(true);
		}
	}, [activeRequest, loaded]);

	const onChange = (e, id) => {
		const quantity = e.target.value;

		const updatedDrugs = updateImmutable(prescriptions, {
			id,
			fillQuantity: quantity,
			filledBy: staff.username,
		});
		setPrescriptions(updatedDrugs);

		const total = updatedDrugs.reduce((total, item) => {
			if (item.fillQuantity === '') {
				return (total += 0);
			}
			const amount = item.drug.hmoPrice;
			return (total += parseFloat(amount) * parseInt(item.fillQuantity, 10));
		}, 0.0);

		setSumTotal(total);
	};

	const deleteItem = id => {
		const drug = prescriptions.find(p => p.id === parseInt(id, 10));
		if (drug.vaccine) {
			notifyError('you cannot remove a vaccine prescription');
			return;
		}

		const drugsRem = prescriptions.filter(p => p.id !== id);
		setPrescriptions(drugsRem);
	};

	const deletePrescription = () => {
		console.log(activeRequest.id);
		setDeleting(false);
	};

	const setDrug = (drug, id) => {
		if (!drug) {
			notifyError('select drug first');
			return;
		}

		const update = {
			id,
			drug,
			doseQuantity: 1,
			refills: 0,
			frequency: 1,
			frequencyType: 'immediately',
			duration: 1,
			filledBy: staff.username,
			externalPrescription: 'No',
			fillQuantity: 1,
		};

		const updatedDrugs = updateImmutable(prescriptions, update);
		setPrescriptions(updatedDrugs);

		const total = updatedDrugs.reduce((total, item) => {
			const amount = item.drug.hmoPrice || 0;
			const costItem = parseFloat(amount) * item.fillQuantity;
			return (total += costItem);
		}, 0.0);

		setSumTotal(total);
	};

	const doFill = async () => {
		try {
			if (prescriptions.length === 0) {
				notifyError('Error, no prescriptions found!');
				return;
			}
			if (sumTotal <= 0) {
				notifyError('Error, no prescriptions filled!');
				return;
			}

			const emptyItem = prescriptions.find(
				p => !p.fillQuantity || (p.fillQuantity && p.fillQuantity === '')
			);
			if (emptyItem) {
				notifyError(
					'please fill all presciptions or remove the request item you do not need to fill!'
				);
				return;
			}

			setSubmitting(true);
			const url = `patient/fill-request/${activeRequest.id}`;
			const rs = await request(url, 'POST', true, {
				items: prescriptions,
				patient_id: activeRequest.patient_id,
				total_amount: sumTotal,
			});

			setSubmitting(false);
			if (rs.success) {
				updatePrescriptions(rs.data);
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
			const url = `patient/request/${activeRequest.id}/approve-result?type=pharmacy`;
			const rs = await request(url, 'PATCH', true);

			setSubmitting(false);
			if (rs.success) {
				updatePrescriptions(rs.data);
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
								activeRequest?.created_by
							} on ${moment(activeRequest?.createdAt).format(
								'DD MMM, YYYY HH:mm A'
							)}`}
						</div>
						<div className="element-box">
							<div className="row">
								<div className="col-sm-12">
									<table className="table table-bordered table-sm table-v2 table-striped">
										<thead>
											<tr>
												<td>Prescription</td>
												<td>Status</td>
												<td>Drug Name</td>
												<td>Price</td>
												<td>Quantity</td>
												{!filled && <td></td>}
											</tr>
										</thead>
										<tbody>
											{prescriptions.map((item, i) => {
												const when =
													item.frequencyType === 'immediately'
														? ''
														: ` for ${item.duration} days`;
												return (
													<tr key={i}>
														<td>
															<div className="center-text">
																<span className="badge badge-grey">
																	{item.vaccine &&
																		`Vaccine: ${item.vaccine.description}`}
																</span>
															</div>
															<div>
																{item.drug.generic_name &&
																	`${item.drug.generic_name} ${item.frequency} x ${item.frequencyType}${when}`}
																{item.vaccine && !filled && (
																	<Popover
																		content={
																			<SelectDrug
																				drugs={drugs}
																				onHide={() => setVisible(null)}
																				setDrug={drug => setDrug(drug, item.id)}
																			/>
																		}
																		overlayClassName="select-drug"
																		trigger="click"
																		visible={visible && visible === item.id}
																		onVisibleChange={() => setVisible(item.id)}>
																		<Tooltip title="Select/Change Vaccine Drug">
																			<a className="link-primary">
																				<i className="os-icon os-icon-ui-49" />
																			</a>
																		</Tooltip>
																	</Popover>
																)}
															</div>
														</td>
														<td>
															{item.filledBy && filled ? item.filledBy : 'Open'}
														</td>
														<td>{item.drug.name || '-'}</td>
														<td>{formatCurrency(item.drug.hmoPrice || 0.0)}</td>
														<td>
															<div className="form-group">
																<input
																	type="number"
																	className="form-control"
																	placeholder="Qty"
																	value={item.fillQuantity || ''}
																	onChange={e => onChange(e, item.id)}
																	disabled={filled}
																/>
															</div>
														</td>
														{!filled && (
															<td className="row-actions text-center">
																<Tooltip title="Delete Drug">
																	<a
																		className="danger"
																		onClick={() => deleteItem(item.id)}>
																		<i className="os-icon os-icon-ui-15" />
																	</a>
																</Tooltip>
															</td>
														)}
													</tr>
												);
											})}
											<tr>
												<td colSpan="3">&nbsp;</td>
												<td>{formatCurrency(sumTotal)}</td>
												<td colSpan="2">&nbsp;</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className="col-md-12 mt-4">
									{!filled && (
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
											<button
												onClick={() => deletePrescription()}
												className="btn btn-danger ml-2"
												disabled={deleting}>
												{deleting ? (
													<img src={waiting} alt="deleting" />
												) : (
													<span>Delete Prescription</span>
												)}
											</button>
										</>
									)}
									{filled && (
										<button onClick={() => {}} className="btn btn-success">
											<span>Print</span>
										</button>
									)}
									{filled &&
										activeRequest &&
										activeRequest.transaction &&
										activeRequest.transaction.status === 1 &&
										activeRequest.status === 0 && (
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
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewPrescription;
