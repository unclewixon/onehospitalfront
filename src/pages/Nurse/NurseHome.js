/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import useSWR from 'swr/esm/use-swr';
import Tooltip from 'antd/lib/tooltip';
import { useDispatch } from 'react-redux';
import truncate from 'lodash.truncate';

import searchingGIF from '../../assets/images/searching.gif';
import { toggleProfile } from '../../actions/user';
import { getAge, fullname } from '../../services/utilities';
import { socket } from '../../services/constants';

const NurseHome = () => {
	const [loading, setLoading] = useState(true);
	const [queues, setQueues] = useState([]);

	const dispatch = useDispatch();

	const { data } = useSWR('front-desk/queue-system/get-lists');

	useEffect(() => {
		if (data && loading) {
			setQueues(data);
			setLoading(false);
		}
	}, [data, loading]);

	useEffect(() => {
		socket.on('nursing-queue', data => {
			if (data.queue) {
				const queue = data.queue;
				setQueues(queues => [...queues, queue]);
			}
		});
	}, []);

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
									<table className="table table-striped">
										<thead>
											<tr>
												<th>
													<div className="th-inner sortable both">Patient</div>
												</th>
												<th>
													<div className="th-inner sortable both">
														Whom To See
													</div>
												</th>
												<th>
													<div className="th-inner sortable both">
														Gender / Age
													</div>
												</th>
												<th>
													<div className="th-inner sortable both">Service</div>
												</th>
												<th>
													<div className="th-inner sortable both">Date</div>
												</th>
												<th>
													<div className="th-inner "></div>
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
												<>
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
																	} / ${getAge(
																		queue.appointment.patient.date_of_birth
																	)}`}</td>
																	<td>
																		{truncate(
																			queue.appointment.serviceType.name,
																			{
																				length: 50,
																				omission: '...',
																			}
																		)}
																	</td>
																	<td>{queue.createdAt}</td>
																	<td>
																		<Tooltip title="View Profile">
																			<a
																				onClick={() =>
																					showProfile(queue.appointment.patient)
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
												</>
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NurseHome;
