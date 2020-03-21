/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { request } from '../../services/utilities';
import { API_URI, patientAPI } from '../../services/constants';
import { GetAllergies } from '../../actions/patient';
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
			this.props.GetAllergies(rs);
			this.setState({ loaded: false });
		} catch (error) {
			this.setState({ loaded: false });

			notifyError('error fetching allergies for the patient');
		}
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
												{/* <th className="text-right" /> */}
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
													{allergies.map((allergy, i) => {
														return (
															<tr className="" data-index="0" data-id="20">
																{/* <td>
															<span className="text-bold">LAB/32456789</span>
														</td> */}
																<td>
																	<span>{allergy.category}</span>
																</td>
																<td>
																	<span>{allergy.allergy}</span>
																</td>
																{/* <td>
															<Link to="/">{allergy.allergy}</Link>
														</td> */}
																<td>{allergy.reaction}</td>
																<td className="text-center">
																	<span>{allergy.severity}</span>
																</td>
																{/* <td className="row-actions text-right">
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
														</td> */}
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
	connect(mapStateToProps, { GetAllergies })(Allergies)
);
