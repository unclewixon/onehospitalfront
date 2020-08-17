/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import { connect } from 'react-redux';
import moment from 'moment';

import { getRequestByType } from '../../actions/patient';
import { notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import { ReactComponent as ViewIcon } from '../../assets/svg-icons/view.svg';
import PharmNewRequestViewModal from './../PharmNewRequestViewModal';

const Pharmacy = props => {
	const { location, Requests } = props;
	const [dataLoaded, setDataLoaded] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [activeRequest, setActiveRequest] = useState(null);
	// eslint-disable-next-line no-unused-vars
	const [{ startDate, endDate }, setDate] = useState({
		startDate: moment(Date.now())
			.subtract(1, 'days')
			.format('YYYY-MM-DD'),
		endDate: moment(Date.now()).format('YYYY-MM-DD'),
	});

	const onModalClick = () => {
		setShowModal(!showModal);
	};

	useEffect(() => {
		const { getRequestByType, patient } = props;
		const patient_id = patient && patient.id ? patient.id : '';
		if (!dataLoaded) {
			getRequestByType(patient_id, 'pharmacy', startDate, endDate)
				.then(_ => {
					setDataLoaded(false);
				})
				.catch(e => {
					setDataLoaded(false);
					notifyError('could not fetch pharmacy requests');
				});
		}
	}, [dataLoaded, endDate, props, startDate]);

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions">
					<Link
						className="btn btn-primary"
						to={`${location.pathname}#pharmacy-request`}>
						<i className="os-icon os-icon-plus"></i>
						New Pharmacy Request
					</Link>
				</div>
				<h6 className="element-header">Pharmacy Requests</h6>
				<div className="element-box">
					<div className="bootstrap-table">
						<div className="fixed-table-toolbar">
							<div className="bs-bars float-left">
								<div id="toolbar"></div>
							</div>
						</div>
						{activeRequest ? (
							<PharmNewRequestViewModal
								activeRequest={activeRequest}
								showModal={showModal}
								onModalClick={onModalClick}
							/>
						) : null}

						{dataLoaded ? (
							<div colSpan="5" className="text-center">
								<img alt="searching" src={searchingGIF} />
							</div>
						) : (
							<div
								className="fixed-table-container"
								style={{ paddingBottom: '0px' }}>
								<div className="fixed-table-body">
									<table
										id="table"
										className="table table-theme v-middle table-hover">
										<thead>
											<tr>
												<th>Request Date</th>
												<th>Request Type</th>
												<th>Requested By</th>
												<th className="text-center">Request Status</th>
												<th className="text-right" />
											</tr>
										</thead>
										<tbody>
											{Requests && Requests.length
												? props.Requests.map((request, index) => {
														return (
															<tr
																className=""
																data-index="0"
																data-id="20"
																key={index}>
																<td>
																	{moment(request.createdAt).format(
																		'DD-MM-YYYY : hh mm'
																	)}
																</td>
																<td>{request.requestType}</td>
																<td>
																	{request && request.created_by
																		? request.created_by
																		: ''}
																</td>
																<td className="text-center">
																	{request.status === 1 ? (
																		<div>
																			<span className="status-pill smaller green"></span>
																			<span>Approved</span>
																		</div>
																	) : (
																		<div>
																			<span className="status-pill smaller yellow"></span>
																			<span>Pending</span>
																		</div>
																	)}
																</td>
																<td className="row-actions text-right">
																	<Tooltip title="View Request">
																		<ViewIcon
																			onClick={() => {
																				setActiveRequest(request);
																				onModalClick();
																			}}
																			style={{
																				width: '1rem',
																				height: '1rem',
																				cursor: 'pointer',
																			}}
																		/>
																	</Tooltip>
																	<Tooltip title="Print Request">
																		<a className="ml-2" href="#">
																			<i className="icon-feather-printer" />
																		</a>
																	</Tooltip>
																</td>
															</tr>
														);
												  })
												: null}
										</tbody>
									</table>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ patient, user }) => ({
	patient: user.patient,
	Requests: patient.pharmacyRequests,
});

export default connect(mapStateToProps, { getRequestByType })(
	withRouter(Pharmacy)
);
