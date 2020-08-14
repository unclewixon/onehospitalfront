/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';
import isEmpty from 'lodash.isempty';

import { notifySuccess, notifyError } from '../../services/notify';
import { request, confirmAction } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';
import { loadImmunization, deleteImmunization } from '../../actions/patient';
import { viewImmunizationDetail } from '../../actions/general';

class Dashboard extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
	};
	componentDidMount() {
		this.fetchImmunization();
	}

	fetchImmunization = async () => {
		let startDate = moment()
			.subtract(1, 'd')
			.format('YYYY-MM-DD');
		let endDate = moment().format('YYYY-MM-DD');
		try {
			this.setState({ loading: true });
			// console.log(
			// 	`${API_URI}/patient/immunizations?startDate=${startDate}&endDate=${endDate}&patient_id=`
			// );

			const rs = await request(
				`patient/immunizations?startDate=${startDate}&endDate=${endDate}&patient_id=`,
				'GET',
				true
			);

			this.props.loadImmunization(rs);
			console.log(rs);
			this.setState({ loading: false, filtering: false });
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
		const { loading } = this.state;
		const immunization = this.props.immunization;
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<div className="element-actions"></div>
						<h6 className="element-header">
							Today's ({moment().format('DD-MMM-YYYY')}) Enrolment
						</h6>
						<div className="table-responsive">
							<table className="table table-striped">
								<thead>
									<tr>
										<th className="text-center">S/N</th>
										<th className="text-center">Patient Name</th>
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
											<td colSpan="8" className="text-center">
												<img alt="searching" src={searchingGIF} />
											</td>
										</tr>
									) : !isEmpty(this.props.immunization) ? (
										immunization.map((immun, i) => {
											return (
												<tr key={i + 1}>
													<td className="text-center">{i + 1}</td>
													<td className="text-center text-capitalize">
														{immun.patient_name}
													</td>
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
																	this.props.viewImmunizationDetail(true, immun)
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
																onClick={() => this.confirmDelete(immun.id)}>
																<i className="os-icon os-icon-ui-15" />
															</a>
														</Tooltip>
													</td>
												</tr>
											);
										})
									) : (
										<tr>
											{' '}
											<td colSpan="9" className="text-center">
												No immunization enrolment
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		immunization: state.patient.immunization,
	};
};

export default connect(mapStateToProps, {
	loadImmunization,
	viewImmunizationDetail,
	deleteImmunization,
})(Dashboard);
