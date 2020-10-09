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
		if (!loaded && activeRequest) {
			setPrescriptions(activeRequest.requestBody);

			const total = activeRequest.requestBody.reduce(
				(total, item) => (total += parseFloat(item.drug_cost) * item.quantity),
				0.0
			);

			setSumTotal(total);

			setLoaded(true);
		}
	}, [activeRequest, loaded]);

	const onChange = (e, id) => {
		let quantity = e.target.value;

		const updatedDrugs = updateImmutable(prescriptions, {
			id,
			quantity,
			filled_by: staff.username,
		});
		setPrescriptions(updatedDrugs);

		const total = updatedDrugs.reduce((total, item) => {
			if (quantity === '') {
				return (total += 0);
			}
			return (total +=
				parseFloat(item.drug_cost) * parseInt(item.quantity, 10));
		}, 0.0);

		setSumTotal(total);
	};

	const deleteItem = (id, drug_id) => {
		console.log(id, drug_id);
	};

	const deletePrescription = () => {
		console.log(activeRequest.id);
		setDeleting(false);
	};

	const setDrug = (drug, id) => {
		const update = {
			id,
			drug_generic_name: drug.generic_name,
			drug_name: drug.name,
			drug_cost: drug.sales_price ? drug.sales_price.replace(',', '') : 0.0,
			drug_id: drug.id,
			dose_quantity: 1,
			refills: 0,
			frequency: 1,
			frequencyType: 'immediately',
			duration: 1,
			quantity: 1,
			filled_by: staff.username,
		};

		const updatedDrugs = updateImmutable(prescriptions, update);
		setPrescriptions(updatedDrugs);

		const total = updatedDrugs.reduce((total, item) => {
			const cost = item.drug_cost && item.drug_cost !== '' ? item.drug_cost : 0;
			const costItem = cost > 0 ? parseFloat(cost) * item.quantity : 0;
			return (total += costItem);
		}, 0.0);

		setSumTotal(total);
	};

	const doFill = async () => {
		try {
			setSubmitting(true);
			const url = `patient/fill-request/${activeRequest.id}`;
			const rs = await request(url, 'POST', true, {
				requestBody: prescriptions,
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
																{item.drug_generic_name ? (
																	`${item.drug_generic_name} ${item.frequency} x ${item.frequencyType}${when}`
																) : (
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
																		<a>
																			<i className="os-icon os-icon-ui-49" />{' '}
																			Select Vaccine Drug
																		</a>
																	</Popover>
																)}
															</div>
														</td>
														<td>{item.filled_by || 'Open'}</td>
														<td>{item.drug_name || '-'}</td>
														<td>{formatCurrency(item.drug_cost || 0.0)}</td>
														<td>
															<div className="form-group">
																<input
																	type="number"
																	className="form-control"
																	placeholder="Qty"
																	value={item.quantity || ''}
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
																		onClick={() =>
																			deleteItem(activeRequest?.id, item.id)
																		}>
																		<i className="os-icon os-icon-ui-15"></i>
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
									{filled && (
										<button onClick={() => {}} className="btn btn-primary ml-2">
											<span>Dispense Prescription</span>
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
