/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { request } from '../../services/utilities';
import { API_URI, patientAPI } from '../../services/constants';
import { getPhysiotherapies, Allergy } from '../../actions/patient';
import { notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import Tooltip from 'antd/lib/tooltip';
class Physiotherapy extends Component {
	state = {
		loaded: false,
	};
	componentDidMount() {
		this.fetchPhysio();
	}

	fetchPhysio = async () => {
		this.setState({ loaded: true });
		const { patient } = this.props;
		try {
			const rs = await request(
				`${API_URI}${patientAPI}/${patient.id}/physiotherapy`,
				'GET',
				true
			);

			console.log(rs);
			this.props.getPhysiotherapies(rs);

			this.setState({ loaded: false });
		} catch (error) {
			this.setState({ loaded: false });
			notifyError('error fetching physiotherapy requests for the patient');
		}
	};

	render() {
		const { location } = this.props;
		const { loaded } = this.state;
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<div className="element-actions">
						<Link
							className="btn btn-primary"
							to={`${location.pathname}#physiotherapy-request`}>
							<i className="os-icon os-icon-plus"></i>
							New Physiotherapy Request
						</Link>
					</div>
					<h6 className="element-header">Physiotherapy Requests</h6>
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
											{loaded ? (
												<tr>
													<td colSpan="4" className="text-center">
														<img alt="searching" src={searchingGIF} />
													</td>
												</tr>
											) : (
												<>
													<tr className="" data-index="0" data-id="20">
														<td>
															<span className="text-bold">LAB/32456789</span>
														</td>
														<td>
															<span>20-Jan-2020</span>
															<span className="smaller lighter ml-1">
																3:22pm
															</span>
														</td>
														<td>
															<Link to="/">Uchechi I.</Link>
														</td>
														<td>Blood</td>
														<td className="text-center">
															<span className="badge badge-secondary">
																pending
															</span>
														</td>
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
													<tr className="" data-index="0" data-id="20">
														<td>
															<span className="text-bold">LAB/32456789</span>
														</td>
														<td>
															<span>20-Jan-2020</span>
															<span className="smaller lighter ml-1">
																3:22pm
															</span>
														</td>
														<td>
															<Link to="/">Uchechi I.</Link>
														</td>
														<td>Blood</td>
														<td className="text-center">
															<span className="badge badge-success">
																completed
															</span>
														</td>
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
													<tr className="" data-index="0" data-id="20">
														<td>
															<span className="text-bold">LAB/32456789</span>
														</td>
														<td>
															<span>20-Jan-2020</span>
															<span className="smaller lighter ml-1">
																3:22pm
															</span>
														</td>
														<td>
															<Link to="/">Uchechi I.</Link>
														</td>
														<td>Blood</td>
														<td className="text-center">
															<span className="badge badge-danger">
																pending
															</span>
														</td>
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
		physiotherapies: state.patient.physiotherapies,
	};
};

export default withRouter(
	connect(mapStateToProps, { getPhysiotherapies })(Physiotherapy)
);
