/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { request } from '../../services/utilities';
import { confirmAction } from '../../services/utilities';
import { API_URI, patientAPI } from '../../services/constants';
import {
	Fetch_Allergies,
	Allergy,
	delete_allergy,
} from '../../actions/patient';
import { notifySuccess, notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';

class Allergies extends Component {
	state = {
		loaded: false,
	};
	componentDidMount() {
		this.fetchAllergies();
	}

	fetchAllergies = async () => {
		this.setState({ loaded: true });
		const { patient } = this.props;
		try {
			const rs = await request(
				`${API_URI}${patientAPI}/${patient.id}/allergies`,
				'GET',
				true
			);
			this.props.Fetch_Allergies(rs);
			this.setState({ loaded: false });
		} catch (error) {
			this.setState({ loaded: false });
			notifyError('Could not fetch allergies for the patient');
		}
	};
	deleteAllergy = async data => {
		try {
			const rs = await request(
				`${API_URI}${patientAPI}/${data.id}/delete-allergy`,
				'DELETE',
				true
			);
			this.props.delete_allergy(rs);
			notifySuccess('Allergy deleted');
		} catch (error) {
			notifyError('Could not delete allergy');
		}
	};

	confirmDelete = data => {
		confirmAction(this.deleteAllergy, data);
	};
	render() {
		const { location, allergies } = this.props;
		const { loaded } = this.state;
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
												{/* <th>ID</th> */}
												<th>Category</th>
												<th>Allergy</th>
												<th>Reaction</th>
												<th className="text-center">Severity</th>
												<th className="text-right" />
											</tr>
										</thead>
										<tbody>
											{loaded ? (
												<tr>
													<td colSpan="4" className="text-center">
														<img alt="searching" src={searchingGIF} />
													</td>
												</tr>
											) : (
												<>
													{allergies.map((item, i) => {
														return (
															<tr
																className=""
																data-index="0"
																data-id="20"
																key={i}>
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
																			<i
																				className="os-icon os-icon-ui-49"
																				onClick={() =>
																					this.props.Allergy(item)
																				}></i>
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
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
		allergies: state.patient.allergies,
	};
};

export default withRouter(
	connect(mapStateToProps, { Fetch_Allergies, Allergy, delete_allergy })(
		Allergies
	)
);
