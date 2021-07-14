/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';

import { request } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import TableLoading from '../TableLoading';

class Allergies extends Component {
	state = {
		loaded: false,
		allergens: [],
		meta: null,
	};

	componentDidMount() {
		this.fetchAllergies();
	}

	fetchAllergies = async () => {
		try {
			this.setState({ loaded: true });
			const { patient } = this.props;
			const url = `patient-allergens?patient_id=${patient.id}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			this.setState({ loaded: false, allergens: result, meta });
		} catch (error) {
			this.setState({ loaded: false });
			notifyError('Could not fetch allergies for the patient');
		}
	};

	deleteAllergy = async data => {
		try {
			await request(`patient-allergens/${data.id}`, 'DELETE', true);
			this.props.delete_allergy(data);
			notifySuccess('Allergy deleted');
		} catch (error) {
			notifyError('Could not delete allergy');
		}
	};

	confirmDelete = data => {
		// confirmAction(this.deleteAllergy, data);
	};

	render() {
		const { location } = this.props;
		const { loading, allergens } = this.state;
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<div className="element-actions">
						<Link
							className="btn btn-primary"
							to={`${location.pathname}#allergy-request`}>
							<i className="os-icon os-icon-plus"></i>
							New Allergy
						</Link>
					</div>
					<h6 className="element-header">Allergies</h6>
					<div className="element-box m-0 p-3">
						<div className="bootstrap-table">
							<div className="fixed-table-container pb-0">
								<div className="fixed-table-body">
									{loading ? (
										<TableLoading />
									) : (
										<table className="table table-theme v-middle table-hover">
											<thead>
												<tr>
													<th>Category</th>
													<th>Allergy</th>
													<th>Reaction</th>
													<th>Severity</th>
													<th className="text-left" />
												</tr>
											</thead>
											<tbody>
												{allergens.map((item, i) => {
													return (
														<tr key={i}>
															<td>
																<span>{item.category}</span>
															</td>
															<td>
																<span>{item.allergy}</span>
															</td>
															<td>{item.reaction}</td>
															<td className="text-center">
																<span>{item.severity}</span>
															</td>
															<td className="row-actions text-right">
																<Tooltip title="Update">
																	<Link
																		className=""
																		to={`${location.pathname}#update-allergy`}
																		state={item}>
																		<i className="os-icon os-icon-ui-49"></i>
																	</Link>
																	<Tooltip title="Delete">
																		<i
																			className="os-icon os-icon-ui-15"
																			onClick={() =>
																				this.confirmDelete(item)
																			}></i>
																	</Tooltip>
																</Tooltip>
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									)}
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

export default withRouter(connect(mapStateToProps)(Allergies));
