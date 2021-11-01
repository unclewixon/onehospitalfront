import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { request } from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifyError } from '../../services/notify';

const ViewAlerts = ({ closeModal }) => {
	const [loading, setLoading] = useState(true);
	const [alerts, setAlerts] = useState([]);

	const dispatch = useDispatch();

	const patient = useSelector(state => state.user.patient);

	const fetchAlerts = useCallback(async () => {
		try {
			dispatch(startBlock());
			const url = `patient/${patient.id}/alerts`;
			const rs = await request(url, 'GET', true);
			setAlerts(rs);
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

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div className="modal-dialog modal-centered" role="document">
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => closeModal()}>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Alerts</h4>
						<div className="table-responsive">
							<table className="table table-striped">
								<tbody>
									{alerts.map((item, i) => {
										return (
											<tr key={i}>
												<td>{i + 1}</td>
												<td>{item.type}</td>
												<td>{item.message}</td>
												<td></td>
											</tr>
										);
									})}
									{alerts.length === 0 && !loading && (
										<tr>
											<td colSpan="4" className="text-center">
												No Alerts!
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewAlerts;
