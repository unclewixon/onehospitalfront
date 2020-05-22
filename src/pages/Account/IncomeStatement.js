import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import BootstrapTable from 'react-bootstrap-table-next';
import accounting from 'accounting';
import waiting from '../../assets/images/waiting.gif';
const { RangePicker } = DatePicker;
export class IncomeStatement extends Component {
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
				description: '',
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
							Income Statement (Profit and Loss){' '}
							{moment().format('DD-MMM-YYYY')}
						</h6>
						<div className="col-md-12 px-0">
							<form className="row">
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
						<h6 className="element-header">Income Expenses</h6>

						<div className="table table-responsive">
							<table
								id="table"
								className="table table-theme v-middle table-hover table-bordered">
								<thead>
									<tr>
										<th className="text-left" colSpan="2">
											Income
										</th>
										{/* <th className="text-center"></th> */}
										<th className="text-center">2020</th>
										<th className="text-center">2019</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td></td>
										<td className="text-center">Income</td>
										<td className="text-center">{this.format(6789)}</td>
										<td className="text-center">{this.format(1500890)}</td>
									</tr>

									<tr>
										<td></td>
										<td className="text-center">Income</td>
										<td className="text-center">{this.format(6789)}</td>
										<td className="text-center">{this.format(1500890)}</td>
									</tr>

									<tr>
										<td></td>
										<td className="text-center">Income</td>
										<td className="text-center"></td>
										<td className="text-center"></td>
									</tr>
									<tr>
										<td></td>
										<td className="text-center">Total Income</td>
										<td className="text-center">{this.format(6789)}</td>
										<td className="text-center">{this.format(1500890)}</td>
									</tr>

									<tr>
										<th colspan="4" scope="colgroup">
											Cost of Service
										</th>
									</tr>

									<tr>
										<td></td>
										<td className="text-center">Cost of service deployment</td>
										<td className="text-center"></td>
										<td className="text-center"></td>
									</tr>
									<tr>
										<td></td>
										<td className="text-center">Total Cost of Service</td>
										<td className="text-center">{this.format(0)}</td>
										<td className="text-center">{this.format(0)}</td>
									</tr>
									<tr>
										<td className="text-left" colSpan="2">
											Gross Profit
										</td>
										<td className="text-center">{this.format(6789)}</td>
										<td className="text-center">{this.format(1500890)}</td>
									</tr>
									<tr>
										<th colspan="4" scope="colgroup">
											Operating Expenses
										</th>
									</tr>
									<tr>
										<td></td>
										<td className="text-center">Selling,General and Admin</td>
										<td className="text-center">{this.format(526500)}</td>
										<td className="text-center">{this.format(71500)}</td>
									</tr>
									<tr>
										<td></td>
										<td className="text-center">Finance Cost</td>
										<td className="text-center">{this.format(4679)}</td>
										<td className="text-center">{this.format(2966)}</td>
									</tr>
									<tr>
										<td></td>
										<td className="text-center">Payroll</td>
										<td className="text-center"></td>
										<td className="text-center"></td>
									</tr>
									<tr>
										<td></td>
										<td className="text-center text-bold">
											Total Operating expenses
										</td>
										<td className="text-center" contenteditable="true">
											{this.format(531178.66)}
										</td>
										<td className="text-center" contenteditable="true">
											{this.format(68533.14)}
										</td>
									</tr>
									<tr>
										<td className="text-bold" colSpan="2">
											Net Profit{' '}
										</td>

										<td className="text-center">{this.format(2220363.44)}</td>
										<td className="text-center">{this.format(8220971.26)}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default IncomeStatement;
