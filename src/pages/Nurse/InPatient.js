/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useState } from 'react';
import searchingGIF from '../../assets/images/searching.gif';
import useSWR from 'swr/esm/use-swr';
import Tooltip from 'antd/lib/tooltip';
import { toggleProfile } from '../../actions/user';
import { useDispatch } from 'react-redux';
import { calculateAge, fullname } from '../../services/utilities';
import { socket } from '../../services/constants';
import truncate from 'lodash.truncate';

const InPatient = () => {
	const [loading, setLoading] = useState(true);
	const [queues, setQueues] = useState([]);
	const dispatch = useDispatch();

	const { data, error } = useSWR('front-desk/queue-system/get-lists');

	useEffect(() => {
		if (data) {
			setLoading(false);
			setQueues(data);
		}
	}, [data]);

	useEffect(() => {
		socket.on('new-queue', data => {
			if (data.queue) {
				const queue = data.queue;
				setQueues(queues => [...queues, queue]);
			}
		});
	}, [setQueues]);

	const showProfile = patient => {
		const info = { patient, type: 'patient' };
		dispatch(toggleProfile(true, info));
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<h6 className="element-header">
								List of patients in queue for vitals
							</h6>
							<div className="element-content">
								<div className="table-responsive">
									{
										<table className="table table-striped">
											<thead>
												<tr>
													<th>
														<div className="th-inner sortable both">
															Patient Name
														</div>
													</th>
													<th>
														<div className="th-inner sortable both">Room</div>
													</th>
													<th>
														<div className="th-inner sortable both">
															Gender/Age
														</div>
													</th>
													<th>
														<div className="th-inner sortable both">Action</div>
													</th>
												</tr>
											</thead>
											<tbody>
												{loading ? (
													<tr>
														<td colSpan="7" className="text-center">
															<img alt="searching" src={searchingGIF} />
														</td>
													</tr>
												) : (
													<Fragment>
														{queues ? (
															queues
																.filter(queue => queue.queueType === 'vitals')
																.map((queue, key) => (
																	<tr key={key}>
																		<td>{`${queue.patientName}`}</td>
																		<td>
																			{fullname(queue.appointment.whomToSee)}
																		</td>
																		<td>{`${
																			queue.appointment.patient.gender
																		} ${calculateAge(
																			queue.appointment.patient.date_of_birth
																		)} yrs`}</td>
																		<td>
																			{truncate(
																				queue.appointment.serviceType.name,
																				{
																					length: 50,
																					omission: '...',
																				}
																			)}
																		</td>
																		<td>
																			<Tooltip title="View Profile">
																				<a
																					onClick={() =>
																						showProfile(
																							queue.appointment.patient
																						)
																					}>
																					<i className="os-icon os-icon-user" />
																				</a>
																			</Tooltip>
																		</td>
																	</tr>
																))
														) : (
															<tr>
																<td colSpan="7" className="text-center">
																	No result found
																</td>
															</tr>
														)}
													</Fragment>
												)}
											</tbody>
										</table>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="content-panel"></div>
		</div>
	);
};

export default InPatient;
