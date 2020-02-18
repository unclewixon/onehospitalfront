/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import PayrollItem from '../components/PayrollItem';
import { preparePayroll } from '../actions/general';

const itemRender = (current, type, originalElement) => {
	if (type === 'prev') {
		return <a>Previous</a>;
	}
	if (type === 'next') {
		return <a>Next</a>;
	}
	return originalElement;
};
const pageSize = 10;

class Payroll extends Component {
	doPreparePayroll = e => {
		e.preventDefault();
		console.log('prepare payroll');
		this.props.preparePayroll(true);
	};

	onNavigatePage = pageNumber => {
		console.log(pageNumber);
	};

	render() {
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<div className="element-actions">
									<a className="btn btn-success btn-sm" href="#" onClick={this.doPreparePayroll}>
										<i className="os-icon os-icon-grid-10"/>
										<span>Prepare Payroll</span>
									</a>
								</div>
								<h6 className="element-header">Payroll</h6>
								<div className="control-header">
									<div className="row align-items-center">
										<div className="col-9">
											<form action="" className="form-inline">
												<div className="form-group">
													<label className="mr-2" htmlFor="">Filter by: </label>
												</div>
												<div className="form-group mr-4">
													<label className="mr-2" htmlFor="">Department</label>
													<select className="form-control-sm">
														<option>Nursing</option>
														<option>OPD</option>
													</select>
												</div>
												<div className="form-group mr-4">
													<label className="mr-2" htmlFor="">Month</label>
													<select className="form-control-sm">
														<option>January</option>
														<option>February</option>
													</select>
												</div>
												<div className="form-group mr-4">
													<label className="mr-2" htmlFor="">Year</label>
													<select className="form-control-sm">
														<option>1990</option>
														<option>1991</option>
													</select>
												</div>
												<div className="form-group mr-4">
													<a className="btn btn-sm btn-primary btn-upper" href="#" onClick={this.doFilter}>
														<i className="os-icon os-icon-ui-37"/>
														<span>Filter</span>
													</a>
												</div>
											</form>
										</div>
										<div className="col-3 text-right"/>
									</div>
								</div>
								<div className="element-box">
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th>ID</th>
													<th>Name</th>
													<th>Total Allowance</th>
													<th>Total Deduction</th>
													<th>Department</th>
													<th>Month</th>
													<th>Year</th>
													<th>Date Created</th>
													<th className="text-right">Actions</th>
												</tr>
											</thead>
											<tbody>
												<PayrollItem />
											</tbody>
										</table>
									</div>
									<div className="pagination pagination-center mt-4">
										<Pagination
											current={1}
											pageSize={pageSize}
											total={0}
											showTotal={total => `Total ${total} staffs`}
											itemRender={itemRender}
											onChange={this.onNavigatePage}
										/>
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

export default connect(null, { preparePayroll })(Payroll);
