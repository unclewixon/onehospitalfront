/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import { connect } from 'react-redux';
import { getRequestByType } from '../../actions/patient';
import { notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import Select from 'react-select';
import { ReactComponent as ViewIcon } from '../../assets/svg-icons/view.svg';

const Pharmacy = props => {
	const { location, Requests, patient } = props;
	const [loaded, setLoaded] = useState(false);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [activeRequest, setActiveRequest] = useState(null);
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
		if (!loaded) {
			setDataLoaded(true);
			getRequestByType(patient_id, 'pharmacy', startDate, endDate)
				.then(response => {
					setDataLoaded(false);
				})
				.catch(e => {
					setDataLoaded(false);
					notifyError('could not fetch pharmacy requests');
				});
		}
		setLoaded(true);
	}, [loaded, props]);

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
								<Modal.Body></Modal.Body>
							</Modal>
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
												<th>Diagnosis</th>
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
																	{request && request.diagnosis
																		? request.diagnosis
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
