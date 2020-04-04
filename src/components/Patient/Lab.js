/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import { connect } from 'react-redux';
import searchingGIF from '../../assets/images/searching.gif';
import { notifyError } from '../../services/notify';
import { getRequestByType } from './../../actions/patient';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import Select from 'react-select';

const Lab = props => {
	const [loaded, setLoaded] = useState(false);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [activeRequest, setActiveRequest] = useState(null);

	const { location, patient } = props;

	const onModalClick = () => {
		setShowModal(!showModal);
	};

	const requestStatus = [
		{ value: 'pending', label: 'Pending' },
		{ value: 'approved', label: 'Approved' },
		{ value: 'declined', label: 'Declined' },
	];

	useEffect(() => {
		const { patient, getRequestByType } = props;
		const patient_id = patient && patient.id ? patient.id : '';
		if (!loaded) {
			setDataLoaded(true);
			getRequestByType(patient_id)
				.then(response => {
					setDataLoaded(false);
				})
				.catch(e => {
					setDataLoaded(false);
					notifyError(e.message || 'could not fetch lab request');
				});
		}
		setLoaded(true);
	}, [loaded, props]);

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
							<Modal
								show={showModal}
								size="lg"
								aria-labelledby="contained-modal-title-vcenter"
								centered
								onHide={onModalClick}>
								<Modal.Header closeButton>
									<Modal.Title id="contained-modal-title-vcenter">
										{`${patient.surname.toUpperCase()} ${patient.other_names.toUpperCase()}`}
									</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<div className="row">
										<div className="form-group col-lg-6">
											<h5>Request Note</h5>
											<div>
												<p className="justify">
													{activeRequest.requestBody.requestNote}
												</p>
											</div>
										</div>
										<div className="col-lg-3">
											<h5>Tests</h5>
											{activeRequest.requestBody &&
											activeRequest.requestBody.test
												? activeRequest.requestBody.test.map((test, index) => {
														return (
															<div key={index}>
																<p>{test.name}</p>
															</div>
														);
												  })
												: null}
										</div>
										<div className="col-lg-3">
											<h5>Groups</h5>
											{activeRequest.requestBody &&
											activeRequest.requestBody.combination
												? activeRequest.requestBody.combination.map(
														(combo, index) => {
															return (
																<div key={index}>
																	<p>{combo.name}</p>
																</div>
															);
														}
												  )
												: null}
										</div>
									</div>
								</Modal.Body>
							</Modal>
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
																	<span className="text-bold"></span>
																</td>
																<td>
																	<span>
																		{moment(request.createdAt).format(
																			'DD/MM/YYYY hh:mm'
																		)}
																	</span>
																</td>
																<td>
																	<Link to="/">{`${patient.surname.toUpperCase()} ${patient.other_names.toUpperCase()}`}</Link>
																</td>
																<td>{request.requestBody.referredSpeciment}</td>
																<td className="text-center">
																	<div className="form-group">
																		<Select
																			name="service_center"
																			placeholder="Set Status"
																			options={requestStatus}
																		/>
																	</div>
																</td>
																<td className="row-actions text-right">
																	<Tooltip title="View Request">
																		<button
																			className="btn btn-primary"
																			onClick={() => {
																				setActiveRequest(request);
																				onModalClick();
																			}}>
																			View
																		</button>
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
		Requests: state.patient.request_type,
	};
};

export default connect(mapStateToProps, {
	getRequestByType,
})(withRouter(Lab));
