/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import { connect } from 'react-redux';
import moment from 'moment';

// import { request } from '../../services/utilities';
// import { patientAPI } from '../../services/constants';
import { notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import ModalProcedure from '../Modals/ModalProcedure';

const Procedure = props => {
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [activeRequest, setActiveRequest] = useState(null);
	const [procedures, setProcedures] = useState([]);

	let location = props.location;
	let patient = props.patient;

	useEffect(() => {
		const loadProcedure = async () => {
			try {
				// const url = `${patientAPI}/${patient.id}/request/procedure`;
				// const rs = await request(url, 'GET', true);
				// setProcedures(rs.results);
				setProcedures([]);
				setLoading(false);
			} catch (e) {
				setLoading(false);
				notifyError(e.message || 'could not fetch procedure');
			}
		};

		if (loading) {
			loadProcedure();
		}
	}, [patient.id, props, loading]);

	const getRequests = arr => {
		let rer = [];
		arr.forEach(val => {
			rer = [...rer, val.service_name];
		});
		return rer.join(', ');
	};

	const onModalClick = () => {
		setShowModal(!showModal);
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
				<div className="element-box m-0 p-3">
					<div className="bootstrap-table">
						<div className="fixed-table-toolbar">
							<div className="bs-bars float-left">
								<div id="toolbar"></div>
							</div>
						</div>
						<div className="fixed-table-container pb-0">
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
											<th className="text-right" />
										</tr>
									</thead>

									{loading ? (
										<tbody>
											<tr>
												<td colSpan="5" className="text-center">
													<img alt="searching" src={searchingGIF} />
												</td>
											</tr>
										</tbody>
									) : (
										<tbody>
											{procedures.map((req, i) => {
												return (
													<tr key={i}>
														<td>{i + 1}</td>
														<td>
															{moment(req.createdAt).format('DD-MMM-YYYY')}
														</td>
														<td>{req.created_by}</td>
														<td>{getRequests(req.requestBody)}</td>
														<td className="row-actions text-right">
															<Tooltip title="View Request">
																<a
																	onClick={() => {
																		onModalClick();
																		setActiveRequest(req);
																	}}>
																	<i className="os-icon os-icon-documents-03" />
																</a>
															</Tooltip>
															<Tooltip title="Print Request">
																<a className="ml-2">
																	<i className="icon-feather-printer" />
																</a>
															</Tooltip>
														</td>
													</tr>
												);
											})}
										</tbody>
									)}
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			{activeRequest && (
				<ModalProcedure
					showModal={showModal}
					onModalClick={onModalClick}
					activeRequest={activeRequest}
				/>
			)}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
	};
};

export default withRouter(connect(mapStateToProps)(Procedure));
