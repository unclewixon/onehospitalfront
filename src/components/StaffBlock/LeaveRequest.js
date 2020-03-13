import React, { Component } from 'react';
import LeaveRecord from '../LeaveRecord';
import { Link, withRouter } from 'react-router-dom';

export class LeaveRequest extends Component {
	// componentDidMount() {
	// 	const { location } = this.props;
	// 	if (!location.hash) {
	// 		this.props.history.push(`${location.pathname}#leave-request`);
	// 	}
	// }

	// componentWillUnmount() {
	// 	const { location } = this.props;
	// 	this.props.history.push(location.pathname);
	// }
	render() {
		const { location } = this.props;

		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<div className="element-actions">
							<Link
								className="btn btn-primary btn-sm text-white"
								to={`${location.pathname}#create-leave`}>
								<i className="os-icon os-icon-ui-22" />
								<span>Apply for leave</span>
							</Link>
						</div>
						<h6 className="element-header">Leave Requests</h6>
						<div className="element-box">
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th data-field="id">
												<div className="th-inner sortable both text-center"></div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="owner">
												<div className="th-inner sortable both text-center">
													Type
												</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both text-center">
													Date
												</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both text-center">
													Date return
												</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both text-center">
													status
												</div>
												<div className="fht-cell"></div>
											</th>

											<th data-field="5">
												<div className="th-inner text-center">Actions</div>
												<div className="fht-cell"></div>
											</th>
										</tr>
									</thead>
									<tbody>
										<LeaveRecord />
										<LeaveRecord />
										<LeaveRecord />
										<LeaveRecord />
										<LeaveRecord />
									</tbody>
								</table>

								<div className="controls-below-table">
									<div className="table-records-info">
										Showing records 1 - 5
									</div>
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
				</div>
			</div>
		);
	}
}

export default withRouter(LeaveRequest);
