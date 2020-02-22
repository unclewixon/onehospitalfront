/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import { closeModals } from '../actions/general';
import PayrollItem from './PayrollItem';

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
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	payStaff = () => {
		console.log('pay now');
	};

	onNavigatePage = pageNumber => {
		console.log(pageNumber);
	};

	render() {
		return (
			<div className="onboarding-modal modal fade animated show" role="dialog" style={{ display: 'block' }}>
				<div className="modal-dialog modal-lg modal-centered" role="document">
					<div className="modal-content text-center">
						<button aria-label="Close" className="close" type="button" onClick={() => this.props.closeModals(false)}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">Prepare Payroll</h4>
							<div className="element-box">
								<form className="form-inline">
									<label className="mr-2">Month:</label>
									<select className="form-control mb-2 mr-sm-4 mb-sm-0" placeholder="Select Month">
										<option>January</option>
										<option>February</option>
									</select>
									<label className="mr-2">Year: </label>
									<select className="form-control mb-2 mr-sm-4 mb-sm-0" placeholder="Last Name">
										<option>2020</option>
										<option>2019</option>
									</select>
									<button className="btn btn-secondary btn-sm ml-4" type="submit">
										Generate Payroll
									</button>
									<a className="btn btn-primary btn-sm ml-4 text-white" onClick={this.payStaff}>
										<i className="os-icon os-icon-checkmark"/>
										<span>Pay Staff</span>
									</a>
								</form>
							</div>
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
									<tr>
										<th><input type="checkbox"/></th>
										<th>ID</th>
										<th>Name</th>
										<th>Total Allowance</th>
										<th>Total Deduction</th>
										<th>Department</th>
										<th className="text-right">Actions</th>
									</tr>
									</thead>
									<tbody>
										<PayrollItem is_new={true} />
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
		);
	}
}

export default connect(null, { closeModals })(ModalPreparePayroll);
