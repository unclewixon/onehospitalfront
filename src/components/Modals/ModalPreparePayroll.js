/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import moment from 'moment';
import padLeft from 'pad-left';

import PayrollItem from '../PayrollItem';
import { payrollAPI, months } from '../../services/constants';
import { request } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { loadUnpaidPayroll } from '../../actions/hr';
import { notifySuccess, notifyError } from '../../services/notify';

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

class ModalPreparePayroll extends Component {
	state = {
		generating: false,
		month: moment().format('MM'),
		year: moment().format('YYYY'),
		currentPage: 1,
		staffs: [],
		paying: false,
		all_staff: false,
	};

	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
		this.props.loadUnpaidPayroll([]);
	}

	payStaff = async () => {
		try {
			const { staffs, month, year } = this.state;
			let staffIds = [];
			for (const item of staffs) {
				staffIds = [...staffIds, item.id];
			}
			const data = { payment_month: `${year}-${month}`, staffIds };
			this.setState({ paying: true });
			await request(`${payrollAPI}/make-payment`, 'POST', true, data);
			this.props.loadUnpaidPayroll([]);
			this.setState({ paying: false });
			notifySuccess('staff(s) paid');
			this.props.closeModal();
		} catch (error) {
			notifyError(error.message || 'could not pay staff');
			this.setState({ paying: false });
		}
	};

	generatePayroll = async e => {
		try {
			e.preventDefault();
			this.setState({ generating: true });
			const { year, month } = this.state;
			const period = `${year}-${month}`;
			const data = { payment_month: period };
			const url = `${payrollAPI}/generate-payslip`;
			const rs = await request(url, 'POST', true, data);
			const payrolls = rs.filter(p => p.status === 0);
			this.props.loadUnpaidPayroll(payrolls);
			this.setState({
				generating: false,
				totalPayslips: rs.length,
				all_staff: false,
				staffs: [],
			});
			notifySuccess('payslips fetched!');
		} catch (error) {
			notifyError(error.message || 'could not generate payslips');
			this.setState({ generating: false });
		}
	};

	onChange = (e, type) => {
		this.setState({ [type]: e.target.value });
	};

	onNavigatePage = pageNumber => {
		this.setState({ currentPage: pageNumber });
	};

	setChecked = (checked, name) => {
		const { staffs } = this.state;
		if (checked) {
			this.setState({ staffs: [...staffs, { id: name }] });
		} else {
			this.setState({ staffs: [...staffs.filter(s => s.id !== name)] });
		}
	};

	onSelectAll = e => {
		const checked = e.target.checked;
		const { payrolls } = this.props;
		if (checked) {
			const staffs = payrolls.map(p => ({ id: p.emp_code }));
			this.setState({ all_staff: checked, staffs });
		} else {
			this.setState({ all_staff: checked, staffs: [] });
		}
	};

	render() {
		const { payrolls, closeModal } = this.props;
		const {
			year,
			month,
			generating,
			totalPayslips,
			currentPage,
			staffs,
			all_staff,
		} = this.state;
		const y = parseInt(moment().format('YYYY'), 10) + 1;
		const years = [...Array(y - 2000).keys()].map(x => y - ++x);
		return (
			<div
				className="onboarding-modal modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}>
				<div className="modal-dialog modal-lg modal-centered" role="document">
					<div className="modal-content text-center">
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={closeModal}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">Prepare Payroll</h4>
							<div className="element-box">
								<form className="form-inline" onSubmit={this.generatePayroll}>
									<label className="mr-2">Month:</label>
									<select
										className="form-control mb-2 mr-sm-4 mb-sm-0"
										onChange={e => this.onChange(e, 'month')}
										value={month}
										placeholder="Select Month">
										{months.map((month, i) => {
											return (
												<option key={i} value={padLeft(i + 1, 2, '0')}>
													{month}
												</option>
											);
										})}
									</select>
									<label className="mr-2">Year: </label>
									<select
										className="form-control mb-2 mr-sm-4 mb-sm-0"
										onChange={e => this.onChange(e, 'year')}
										value={year}
										placeholder="Select Year">
										{years.map((year, i) => {
											return (
												<option key={i} value={year}>
													{year}
												</option>
											);
										})}
									</select>
									<button
										className="btn btn-secondary btn-sm ml-4"
										type="submit">
										{generating ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Generate/Fetch Payroll'
										)}
									</button>
									{staffs.length > 0 && (
										<a
											className="btn btn-primary btn-sm ml-4 text-white"
											onClick={this.payStaff}>
											<i className="os-icon os-icon-checkmark" />
											<span>Pay Staff</span>
										</a>
									)}
								</form>
							</div>
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>
												<input
													type="checkbox"
													onChange={this.onSelectAll}
													checked={all_staff}
												/>
											</th>
											<th>ID</th>
											<th>Name</th>
											<th>Total Allowance</th>
											<th>Total Deduction</th>
											<th>Department</th>
											<th className="text-right">Actions</th>
										</tr>
									</thead>
									<tbody>
										{payrolls.map((pay, i) => {
											console.log(pay);
											return (
												<PayrollItem
													key={i}
													index={i + 1}
													is_new={pay.status === 0}
													item={pay}
													isChecked={staffs.find(s => s.id === pay.emp_code)}
													setChecked={this.setChecked}
												/>
											);
										})}
									</tbody>
								</table>
							</div>
							<div className="pagination pagination-center mt-4">
								<Pagination
									current={currentPage}
									pageSize={pageSize}
									total={totalPayslips}
									showTotal={total => `Total ${total} staffs`}
									itemRender={itemRender}
									onChange={this.onNavigatePage}
								/>
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
		payrolls: state.hr.unpaid_payrolls,
	};
};

export default connect(mapStateToProps, { loadUnpaidPayroll })(
	ModalPreparePayroll
);
