/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { confirmAction, formatDate, request } from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifyError, notifySuccess } from '../../services/notify';
import { criticalList } from '../../services/constants';
import { messageService } from '../../services/message';

const ViewAlerts = ({ closeModal }) => {
	const [loading, setLoading] = useState(true);
	const [alerts, setAlerts] = useState([]);
	const [criticalAlerts, setCriticalAlerts] = useState([]);

	const dispatch = useDispatch();

	const patient = useSelector(state => state.user.patient);
	const user = useSelector(state => state.user.profile);

	const fetchAlerts = useCallback(async () => {
		try {
			dispatch(startBlock());
			const url = `patient/${patient.id}/alerts?category=normal`;
			const rs = await request(url, 'GET', true);
			setAlerts(rs);

			const uri = `patient/${patient.id}/alerts?category=critical`;
			const res = await request(uri, 'GET', true);
			setCriticalAlerts(res);

			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError('error fetching notes');
		}
	}, [dispatch, patient]);

	useEffect(() => {
		if (loading) {
			fetchAlerts();
			setLoading(false);
		}
	}, [fetchAlerts, loading]);

	const clear = async id => {
		confirmAction(
			doResolve,
			id,
			'Do you want to clear this alert?',
			'Are you sure?'
		);
	};

	const doResolve = async id => {
		try {
			dispatch(startBlock());
			const url = `patient/${id}/close-alert`;
			const rs = await request(url, 'PATCH', true);
			setAlerts([...alerts.filter(a => a.id !== rs.id)]);
			notifySuccess('alert removed');
			messageService.sendMessage({ type: 'refresh-alerts' });
			dispatch(stopBlock());
		} catch (e) {
			dispatch(stopBlock());
			notifyError(e.message || 'could not clear alert');
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div className="modal-dialog modal-centered modal-scroll" role="document">
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => closeModal()}
					>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Alerts</h4>
						<div className="mb-4">
							<div className="row">
								{criticalAlerts.map((item, i) => {
									const criticalItem = criticalList.find(
										i => i.value === item.type
									);
									const isTwo = criticalAlerts.length % 2;
									const br = i === criticalAlerts.length - 1 ? '' : 'b-r';
									return (
										item && (
											<div
												key={i}
												className={`b-b ${br} ${
													criticalAlerts.length === 0
														? 'col-12'
														: isTwo === 0 && criticalAlerts.length <= 4
														? 'col-6'
														: 'col-4'
												}`}
											>
												<div className="el-tablo centered padded-v highlight bigger">
													<div className="label text-danger">
														{criticalItem.label}
													</div>
													<div className="icon">
														<img
															src={require(`../../assets/svg-icons/${item.type}.svg`)}
															alt=""
														/>
													</div>
												</div>
											</div>
										)
									);
								})}
							</div>
						</div>
						<div className="table-responsive">
							<div className="alert-box">
								{alerts.map((item, i) => {
									return (
										<div
											key={i}
											className="d-flex space-between align-items-center alert alert-warning mb-2"
										>
											<a className="icon">
												<i className="os-icon os-icon-alert-triangle" />
											</a>
											<div className="text-left">
												<h5>{item.type}</h5>
												<p className="m-0">
													<small>{`${formatDate(
														item.createdAt,
														'DD-MMM-YYYY h:mm a'
													)} ${
														item.createdBy === 'admin'
															? ''
															: `by ${item.createdBy}`
													}`}</small>
												</p>
												<p>{item.message}</p>
											</div>
											<div>
												{(user.role.slug === 'doctor' ||
													user.role.slug === 'it-admin') && (
													<a onClick={() => clear(item.id)}>
														<i className="os-icon os-icon-close" />
													</a>
												)}
											</div>
										</div>
									);
								})}
							</div>
							{alerts.length === 0 && !loading && (
								<table className="table table-striped">
									<tbody>
										<tr>
											<td className="text-center">No Alerts!</td>
										</tr>
									</tbody>
								</table>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewAlerts;
