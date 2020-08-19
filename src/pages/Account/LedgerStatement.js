import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import accounting from 'accounting';

import waiting from '../../assets/images/waiting.gif';

const { RangePicker } = DatePicker;

// const columns = [
// 	{
// 		dataField: 'date',
// 		text: 'Date',
// 	},
// 	{
// 		dataField: 'ref',
// 		text: 'Ref (#)',
// 	},
// 	{
// 		dataField: 'description',
// 		text: 'Description',
// 	},
// 	{
// 		dataField: 'debit',
// 		text: 'Debit',
// 	},
// 	{
// 		dataField: 'credit',
// 		text: 'Credit',
// 	},
// 	{
// 		dataField: 'balance',
// 		text: 'Balance',
// 	},
// ];

class LedgerStatement extends Component {
	state = {
		filtering: false,
		selectedAccount: '',
		statements: [
			{
				date: '13-05-2020',
				ref: 1,
				description: 'Monthly saving deposit via payroll-Paul okafor',
				debit: '-',
				credit: 150000,
				balance: 0,
			},
			{
				date: '13-05-2020',
				ref: 2,
				description: 'Monthly saving deposit via payroll-Adamu Akon',
				debit: '-',
				credit: 200000,
				balance: 0,
			},
			{
				date: '13-05-2020',
				ref: 3,
				description: 'Monthly saving deposit via payroll-Sade Nnamdi',
				debit: '-',
				credit: 300000,
				balance: 0,
			},
			{
				date: '13-05-2020',
				ref: 4,
				description: 'Monthly saving deposit via payroll-Ronaldo Messi',
				debit: '-',
				credit: 450000,
				balance: 0,
			},
			{
				date: '13-05-2020',
				ref: 5,
				description: 'Monthly saving deposit via payroll-Ross Momey',
				debit: '-',
				credit: 180000,
				balance: 0,
			},
			{
				date: '13-05-2020',
				ref: 6,
				description: 'Monthly saving deposit via payroll-Ross Momey',
				debit: '-',
				credit: 160000,
				balance: 0,
			},
		],
	};

	format = item => {
		return accounting.formatMoney(item, '₦');
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	dateChange = e => {
		let date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		this.setState({
			...this.state,
			startDate: date[0] ? date[0] : '',
			endDate: date[1] ? date[1] : '',
		});
	};

	doFilter = e => {
		e.preventDefault();
		// this.setState({ filtering: true });
		// this.setState({ ...this.state, filtering: true });
		// console.log(this.state.patient_id);
		// // if (this.state.query < 3) {
		// // 	this.setState({ ...this.state, patient_id: '' });
		// // 	console.log(this.state.patient_id);
		// // }
		// this.fetchCafeteriaTransaction();
	};
	render() {
		const { filtering, selectedAccount, statements } = this.state;
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<h6 className="element-header">
							Ledger Statement {selectedAccount}
						</h6>
						<div className="col-md-12 px-0">
							<form className="row">
								<div className="form-group col-md-4">
									<label>Ledger Account</label>
									<select
										name="selectedAccount"
										className="form-control"
										style={{ height: '2rem' }}
										onChange={this.handleChange}>
										<option value="">Select Ledger account</option>
										<option value="Saving Memebership">
											{' '}
											Membership saving
										</option>
									</select>
								</div>
								<div className="form-group col-md-6">
									<label>From - To</label>
									<RangePicker onChange={e => this.dateChange(e)} />
								</div>
								<div className="form-group col-md-2 mt-4">
									<div
										className="btn btn-sm btn-primary btn-upper text-white filter-btn"
										onClick={this.doFilter}>
										<i className="os-icon os-icon-ui-37" />
										<span>
											{filtering ? (
												<img src={waiting} alt="submitting" />
											) : (
												'Filter'
											)}
										</span>
									</div>
								</div>
							</form>
						</div>
					</div>
					<div className="element-wrapper">
						<h6 className="element-header">Ledger Statement</h6>

						<div className="table table-responsive">
							<table
								id="table"
								className="table table-theme v-middle table-hover">
								<thead>
									<tr>
										<th className="text-center">Date</th>
										<th className="text-center">Ref #</th>
										<th className="text-center">Description</th>
										<th className="text-center">Debit (&#x20A6;)</th>
										<th className="text-center">Credit (&#x20A6;)</th>
										<th className="text-center">Balance (&#x20A6;)</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td colSpan="5">Opening Balance</td>
										<td className="text-center">1,500,890</td>
									</tr>

									{statements.map((el, i) => {
										return (
											<tr key={i}>
												<td className="text-center">{el.date}</td>
												<td className="text-center">{el.ref}</td>
												<td className="text-center">{el.description}</td>
												<td className="text-center">{this.format(el.debit)}</td>
												<td className="text-center">
													{this.format(el.credit)}
												</td>
												<td className="text-center">
													{this.format(el.balance)}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LedgerStatement;
