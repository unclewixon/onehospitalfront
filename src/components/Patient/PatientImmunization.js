/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { request, confirmAction } from '../../services/utilities';
import { API_URI, patientAPI } from '../../services/constants';
import { notifyError, notifySuccess } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import { loadImmunization, deleteImmunization } from '../../actions/patient';
import { viewImmunizationDetail } from '../../actions/general';
import _ from 'lodash';

export class PatientImmunization extends Component {
	state = {
		loading: false,
		requests: [],
		startDate: '',
		endDate: '',
	};

	componentDidMount() {
		this.fetchImmunization();
	}

	fetchImmunization = async () => {
		const { startDate, endDate } = this.state;
		const { patient } = this.props;
		try {
			this.setState({ loading: true });
			// console.log(
			// 	`${API_URI}/patient/immunizations?startDate=${startDate}&endDate=${endDate}&patient_id=`
			// );

			const rs = await request(
				`patient/${patient.id}/immunizations?startDate=${startDate}&endDate=${endDate}`,
				'GET',
				true
			);

			this.setState({ requests: rs });
			console.log(rs);
			this.setState({ loading: false });
		} catch (error) {
			console.log(error);
			notifyError('Error fetching immunization enrolment requests');
			this.setState({ loading: false, filtering: false });
		}
	};

	deleteImmunization = id => async () => {
		try {
			await this.props.deleteImmunization(id);
			notifySuccess('Delete successful');
		} catch (e) {
			notifyError('Error fetching immunization enrolment requests');
			this.setState({ loading: false, filtering: false });
		}
	};

	confirmDelete = id => {
		confirmAction(this.deleteImmunization(id), null);
	};
	render() {
		const { location, immunization } = this.props;
		const { loading, requests } = this.state;
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<div className="element-actions">
						<Link
							className="btn btn-primary"
							to={`${location.pathname}#enroll-immunization`}>
							Enrol Immunization
						</Link>
					</div>
					<h6 className="element-header">Immunization Enrolment</h6>
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
												<th className="text-center">S/N</th>
												<th className="text-center">Type of Vaccine</th>
												<th className="text-center">Administered Date</th>
												<th className="text-center">Vaccine batch no</th>
												<th className="text-center">Administered By</th>
												<th className="text-center">Actions</th>
											</tr>
										</thead>
										<tbody>
											{loading ? (
												<tr>
													<td colSpan="6" className="text-center">
														<img alt="searching" src={searchingGIF} />
													</td>
												</tr>
											) : !_.isEmpty(requests) ? (
												requests.map((immun, i) => {
													return (
														<tr key={i + 1}>
															<td className="text-center">{i + 1}</td>

															<td className="text-center text-capitalize">
																{immun.typeOfVaccine}
															</td>
															<td className="text-center">
																{immun.dateOfAdministration}
															</td>
															<td className="text-center">
																{immun.vaccineBatchNo}
															</td>
															<td className="text-center text-capitalize">
																{immun.administeredbyname}
															</td>
															<td className="text-center">
																<Tooltip title="view details">
																	<a
																		className="secondary mx-1"
																		onClick={() =>
																			this.props.viewImmunizationDetail(
																				true,
																				immun
																			)
																		}>
																		<i className="os-icon os-icon-eye" />
																	</a>
																</Tooltip>
																<Tooltip title="Edit Request ">
																	<a className="secondary mx-2">
																		<i className="os-icon os-icon-edit-32" />
																	</a>
																</Tooltip>
																<Tooltip title="Delete Request">
																	<a
																		className="text-danger mx-1"
																		onClick={() =>
																			this.confirmDelete(immun.id)
																		}>
																		<i className="os-icon os-icon-ui-15" />
																	</a>
																</Tooltip>
															</td>
														</tr>
													);
												})
											) : (
												<tr>
													<td colSpan="8" className="text-center">
														No immunization request
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
			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
	};
};

export default withRouter(
	connect(mapStateToProps, {
		viewImmunizationDetail,
		loadImmunization,
		deleteImmunization,
	})(PatientImmunization)
);
