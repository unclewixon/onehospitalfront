/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import { request } from '../../services/utilities';
import { API_URI, patientAPI } from '../../services/constants';
import { notifyError, notifySuccess } from '../../services/notify';
import { SubmissionError } from 'redux-form';
import searchingGIF from '../../assets/images/searching.gif';
import { connect } from 'react-redux';
import {
	get_all_diagnosis,
	get_all_services,
	getAllServiceCategory,
} from '../../actions/settings';
import { loadPatientProcedureData } from '../../actions/patient';
import { compose } from 'redux';
import moment from 'moment';

const Procedure = props => {
	const [loading, setLoading] = useState(false);
	let location = props.location;
	let patient = props.patient;

	useEffect(() => {
		loadProcedure();
	}, []);

	const getRequests = arr => {
		let rer = [];
		arr.forEach(val => {
			rer = [...rer, val.service_name];
		});
		return rer.join(', ');
	};

	const loadProcedure = async () => {
		try {
			setLoading(true);
			const rs = await request(
				`${API_URI}${patientAPI}/` + patient.id + '/request/procedure',
				'GET',
				true
			);
			props.loadPatientProcedureData(rs);
			console.log(rs);
			setLoading(false);
		} catch (e) {
			setLoading(false);
			console.log(e);
			notifyError(e.message || 'could not fetch procedure');
		}
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions">
					<Link
						className="btn btn-primary"
						to={`${location.pathname}#procedure-request`}>
						<i className="os-icon os-icon-plus"></i>
						New Procedure Request
					</Link>
				</div>
				<h6 className="element-header">Procedure Requests</h6>
				<div className="element-box">
					<div className="bootstrap-table">
						<div className="fixed-table-toolbar">
							<div className="bs-bars float-left">
								<div id="toolbar"></div>
							</div>
						</div>
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
										{loading ? (
											<tr>
												<td colSpan="4" className="text-center">
													<img alt="searching" src={searchingGIF} />
												</td>
											</tr>
										) : (
											<>
												{props.patient_procedure
													? props.patient_procedure.map((req, i) => {
															return (
																<tr key={i}>
																	<td>{i + 1}</td>
																	<td>
																		{moment(req.createdAt).format('DD-MM-YY')}
																	</td>
																	<td>{req.createdBy}</td>
																	<td>{getRequests(req.requestBody)}</td>
																	<td className="row-actions text-right">
																		<Tooltip title="View Request">
																			<a href="#">
																				<i className="os-icon os-icon-documents-03" />
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
													: ''}
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
	);
};

const mapStateToProps = (state, ownProps) => {
	console.log(state.patient.patient_procedure);
	return {
		patient: state.user.patient,
		patient_procedure: state.patient.patient_procedure,
	};
};

export default compose(
	withRouter,
	connect(mapStateToProps, { loadPatientProcedureData })
)(Procedure);
