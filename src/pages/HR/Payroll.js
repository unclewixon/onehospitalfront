/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import moment from 'moment';
import padLeft from 'pad-left';

import PayrollItem from '../../components/PayrollItem';
import { preparePayroll } from '../../actions/general';
import { loadPayroll } from '../../actions/hr';
import { request } from '../../services/utilities';
import { API_URI, payrollAPI, months } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';

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
	state = {
		year: '',
		month: '',
		department_id: '',
		filtering: false,
	};

	doPreparePayroll = e => {
		e.preventDefault();
		this.props.preparePayroll(true);
	};

	onNavigatePage = pageNumber => {
		console.log(pageNumber);
	};

	componentDidMount() {
		const { departments } = this.props;
		const month = moment()
			.subtract(1, 'months')
			.format('MM');
		const year = moment()
			.subtract(1, 'months')
			.format('YYYY');
		const period = `${year}-${month}`;
		const department = departments.length > 0 ? departments[0] : null;
		if (department) {
			this.setState({ department_id: department.id, month, year });
			this.fetchPayroll(period, department.id);
		}
	}

	fetchPayroll = async (period, department_id) => {
		try {
			const data = { period, department_id };
			const rs = await request(
				`${payrollAPI}/list-payroll`,
				'POST',
				true,
				data
			);
			const payrolls = rs.filter(p => p.status === 1);
			this.props.loadPayroll([...payrolls]);
			this.setState({ filtering: false });
		} catch (error) {
			console.log(error);
			this.setState({ filtering: false });
		}
	};

	onChange = ({ target }, type) => {
		this.setState({ [type]: target.value });
	};

	doFilter = e => {
		e.preventDefault();
		this.setState({ filtering: true });
		const { year, month, department_id } = this.state;
		const period = `${year}-${month}`;
		this.fetchPayroll(period, department_id);
	};

	render() {
		const { payrolls, departments } = this.props;
		const { department_id, filtering, year, month } = this.state;
		const y = parseInt(moment().format('YYYY'), 10) + 1;
		const years = [...Array(y - 2000).keys()].map(x => y - ++x);
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<div className="element-actions">
									<a
										className="btn btn-success btn-sm text-white"
										onClick={this.doPreparePayroll}>
										<i className="os-icon os-icon-grid-10" />
										<span>Prepare Payroll</span>
									</a>
								</div>
								<h6 className="element-header">Payroll</h6>
								<div className="control-header">
									<div className="row align-items-center">
										<div className="col-9">
											<form action="" className="form-inline">
												<div className="form-group">
													<label className="mr-2">Filter by: </label>
												</div>
												<div className="form-group mr-4">
													<label className="mr-2">Department</label>
													<select
														id="department"
														className="form-control-sm"
														onChange={e => this.onChange(e, 'department_id')}
														value={department_id}>
														{departments.map((dept, i) => {
															return (
																<option key={i} value={dept.id}>
																	{dept.name}
																</option>
															);
														})}
													</select>
												</div>
												<div className="form-group mr-4">
													<label className="mr-2">Month</label>
													<select
														className="form-control-sm"
														onChange={e => this.onChange(e, 'month')}
														value={month}>
														{months.map((month, i) => {
															return (
																<option key={i} value={padLeft(i + 1, 2, '0')}>
																	{month}
																</option>
															);
														})}
													</select>
												</div>
												<div className="form-group mr-4">
													<label className="mr-2">Year</label>
													<select
														className="form-control-sm"
														onChange={e => this.onChange(e, 'year')}
														value={year}>
														{years.map((year, i) => {
															return (
																<option key={i} value={year}>
																	{year}
																</option>
															);
														})}
													</select>
												</div>
												<div className="form-group mr-4">
													<a
														className="btn btn-sm btn-primary btn-upper text-white"
														onClick={this.doFilter}>
														<i className="os-icon os-icon-ui-37" />
														<span>
															{filtering ? (
																<img src={waiting} alt="submitting" />
															) : (
																'Filter'
															)}
														</span>
													</a>
												</div>
											</form>
										</div>
										<div className="col-3 text-right" />
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
													<th>Total Paid</th>
													<th>Department</th>
													<th>Month</th>
													<th>Year</th>
													<th>Date Created</th>
													<th className="text-right">Actions</th>
												</tr>
											</thead>
											<tbody>
												{payrolls.map((item, i) => {
													return (
														<PayrollItem key={i} index={i + 1} item={item} />
													);
												})}
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

const mapStateToProps = (state, ownProps) => {
	return {
		payrolls: state.hr.payrolls,
		departments: state.settings.departments,
	};
};

export default connect(mapStateToProps, { preparePayroll, loadPayroll })(
	Payroll
);
