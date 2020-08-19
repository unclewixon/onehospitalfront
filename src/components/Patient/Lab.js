/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import { connect } from 'react-redux';
import searchingGIF from '../../assets/images/searching.gif';
import { notifyError } from '../../services/notify';
import { getRequestByType } from './../../actions/patient';
import moment from 'moment';
import ModalClinicalLab from './../Modals/ModalClinicalLab';

const Lab = props => {
	const [dataLoaded, setDataLoaded] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [activeRequest, setActiveRequest] = useState(null);
	// eslint-disable-next-line no-unused-vars
	const [{ startDate, endDate }, setDate] = useState({
		startDate: moment(Date.now())
			.subtract(1, 'days')
			.format('YYYY-MM-DD'),
		endDate: moment(Date.now()).format('YYYY-MM-DD'),
	});

	const { location, patient } = props;

	const onModalClick = () => {
		setShowModal(!showModal);
	};

	useEffect(() => {
		const { patient, getRequestByType } = props;
		const patient_id = patient && patient.id ? patient.id : '';
		if (!dataLoaded) {
			getRequestByType(patient_id, 'lab', startDate, endDate)
				.then(response => {
					setDataLoaded(false);
				})
				.catch(e => {
					setDataLoaded(false);
					notifyError(e.message || 'could not fetch lab request');
				});
		}
	}, [endDate, dataLoaded, props, startDate]);

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions">
					<Link
						to={`${location.pathname}#lab-request`}
						className="btn btn-primary">
						<i className="os-icon os-icon-plus"></i>
						New Lab Request
					</Link>
				</div>
				<h6 className="element-header">Lab Requests</h6>
				<div className="element-box">
					<div className="bootstrap-table">
						<div className="fixed-table-toolbar">
							<div className="bs-bars float-left">
								<div id="toolbar"></div>
							</div>
						</div>
						{activeRequest ? (
							<ModalClinicalLab
								activeRequest={activeRequest}
								showModal={showModal}
								onModalClick={onModalClick}
							/>
						) : null}

						{dataLoaded ? (
							<div colSpan="4" className="text-center">
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
												<th>ID</th>
												<th>Request Date</th>
												<th>Requested By</th>
												<th>Request Specimen</th>
												<th className="text-center">Request Status</th>
												<th className="text-right" />
											</tr>
										</thead>
										<tbody>
											{props.Requests && props.Requests.length
												? props.Requests.map((request, index) => {
														return (
															<tr
																className=""
																data-index="0"
																data-id="20"
																key={index}>
																<td>
																	<span className="text-bold">{index + 1}</span>
																</td>
																<td>
																	<span>
																		{moment(request.createdAt).format(
																			'DD/MM/YYYY hh:mm'
																		)}
																	</span>
																</td>
																<td>
																	{`${patient.surname.toUpperCase()} ${patient.other_names.toUpperCase()}`}
																</td>
																<td>{request.requestBody.refferredSpecimen}</td>
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
																		<a
																			className="secondary"
																			onClick={() => {
																				setActiveRequest(request);
																				onModalClick();
																			}}>
																			<i className="os-icon os-icon-file" />
																		</a>
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

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
		Requests: state.patient.labRequests,
	};
};

export default connect(mapStateToProps, {
	getRequestByType,
})(withRouter(Lab));
