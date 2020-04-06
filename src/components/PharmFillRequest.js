/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import { getRequestByType } from '../actions/patient';
import { connect } from 'react-redux';
import { notifyError } from '../services/notify';
import { Link } from 'react-router-dom';

export class PharmFillRequest extends Component {
	state = {
		filtering: false,
		loading: false,
		activeRequest: null,
		showModal: false,
	};

	onModalClick = () => {
		this.setState(prevState => ({ showModal: !prevState.showModal }));
	};

	change = e => {
		console.log(e.target.value);
	};

	componentDidMount() {
		const { getRequestByType } = this.props;
		this.setState({ loading: true });
		getRequestByType(null, 'pharmacy')
			.then(response => {
				this.setState({ loading: false });
			})
			.catch(e => {
				this.setState({ loading: false });
				notifyError('could not fetch pharmacy requests');
			});
	}

	render() {
		const { Requests } = this.props;
		const acceptedRequests =
			Requests && Array.isArray(Requests)
				? Requests.filter(request => request.status === 1)
				: [];
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">Filled Request</h6>
					<div className="element-box">
						<div className="table table-responsive">
							<table
								id="table"
								className="table table-theme v-middle table-hover">
								<thead>
									<tr>
										<th className="text-center"> Date</th>
										<th className="text-center"> File No</th>
										<th className="text-center"> Request From</th>
										<th className="text-center"> Action</th>
									</tr>
								</thead>
								<tbody>
									{acceptedRequests && acceptedRequests.length
										? acceptedRequests.map((request, index) => {
												return (
													<tr
														className=""
														data-index="0"
														data-id="20"
														key={index}>
														<td>
															<span>
																{moment(request.createdAt).format('DD/MM/YYYY')}
															</span>
														</td>
														<td>{request.patient.fileNumber}</td>
														<td>
															<Link to="/">{`${request.patient &&
																request.patient.surname.toUpperCase()} ${request.patient &&
																request.patient.other_names.toUpperCase()}`}</Link>
														</td>
														<td className="nowrap">
															<span className="status-pill smaller green"></span>
															<span>Approved</span>
														</td>
														<td className="row-actions text-right">
															<Tooltip title="View Request">
																<a
																	className="secondary"
																	onClick={() => {
																		this.setState({ activeRequest: request });
																		this.onModalClick();
																	}}>
																	<i className="os-icon os-icon-file" />
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
										: null}
								</tbody>
							</table>
						</div>
						<div className="controls-below-table">
							<div className="table-records-info">Showing records 1 - 5</div>
							<div className="table-records-pages">
								<ul>
									<li>
										<a href="#">Previous</a>
									</li>
									<li>
										<a className="current" href="#">
											1
										</a>
									</li>
									<li>
										<a href="#">2</a>
									</li>
									<li>
										<a href="#">3</a>
									</li>
									<li>
										<a href="#">4</a>
									</li>
									<li>
										<a href="#">Next</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ patient }) => ({
	Requests: patient.pharmacyRequests,
});

export default connect(mapStateToProps, { getRequestByType })(PharmFillRequest);
