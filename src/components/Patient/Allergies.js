/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';

import { request, confirmAction } from '../../services/utilities';
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
			this.setState({ loaded: false });
			const { patient } = this.props;
			const url = `patient-allergens?patient_id=${patient.id}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			this.setState({ loaded: true, allergens: result, meta });
		} catch (error) {
			this.setState({ loaded: true });
			notifyError('Could not fetch allergies for the patient');
		}
	};

	deleteAllergy = async data => {
		try {
			await request(`patient-allergens/${data.id}`, 'DELETE', true);
			this.setState({
				allergens: this.state.allergens.filter(a => a.id !== data.id),
			});
			notifySuccess('Allergy deleted');
		} catch (error) {
			notifyError('Could not delete allergy');
		}
	};

	confirmDelete = data => {
		confirmAction(this.deleteAllergy, data);
	};

	render() {
		const { location } = this.props;
		const { loaded, allergens } = this.state;
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<div className="element-actions">
						<Link
							className="btn btn-primary"
							to={`${location.pathname}#allergy-request`}
						>
							<i className="os-icon os-icon-plus"></i>
							New Allergy
						</Link>
					</div>
					<h6 className="element-header">Allergies</h6>
					<div className="element-box m-0 p-3">
						<div className="table-responsive">
							{!loaded ? (
								<TableLoading />
							) : (
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Category</th>
											<th>Drug</th>
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
													<td>{item.category}</td>
													<td>
														{item.drugGeneric ? item.drugGeneric.name : '--'}
													</td>
													<td>{item.allergy}</td>
													<td>{item.reaction}</td>
													<td>{item.severity}</td>
													<td className="row-actions">
														{/* <Tooltip title="Update">
															<Link
																className=""
																to={`${location.pathname}#update-allergy`}
																state={item}>
																<i className="os-icon os-icon-ui-49"></i>
															</Link>
														</Tooltip> */}
														<Tooltip title="Delete">
															<i
																className="os-icon os-icon-ui-15"
																onClick={() => this.confirmDelete(item)}
															/>
														</Tooltip>
													</td>
												</tr>
											);
										})}
										{allergens.length === 0 && (
											<tr>
												<td colSpan="6" className="text-center">
													No allergens found!
												</td>
											</tr>
										)}
									</tbody>
								</table>
							)}
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
