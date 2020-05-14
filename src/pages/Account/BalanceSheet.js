import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import BootstrapTable from 'react-bootstrap-table-next';
import accounting from 'accounting';
import waiting from '../../assets/images/waiting.gif';
const { RangePicker } = DatePicker;
export class BalanceSheet extends Component {
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
						<h6 className="element-header">Balance Sheet</h6>
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
						<h6 className="element-header">Balance Sheet</h6>

						<div className="table table-responsive">
							<table
								id="table"
								className="table table-theme v-middle table-hover table-bordered table-striped">
								<thead>
									<tr>
										<th className="text-left" colSpan="2">
											Assests
										</th>
										{/* <th className="text-center"></th> */}
										<th className="text-center">2020</th>
										<th className="text-center">2019</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="text-left" colSpan="4">
											Current Asset
										</td>
									</tr>
									<tr>
										<td></td>
										<td className="text-center">Short Term Investment</td>
										<td className="text-center"></td>
										<td className="text-center">{this.format(6000000)}</td>
									</tr>
									<tr>
										<td></td>
										<td className="text-center">Long Term Investment</td>
										<td className="text-center"></td>
										<td className="text-center"></td>
									</tr>
									<tr>
										<td></td>
										<td className="text-center">Bank Balance</td>
										<td className="text-center">{this.format(33000000)}</td>
										<td className="text-center">{this.format(1000000)}</td>
									</tr>
									<tr>
										<td></td>
										<td className="text-center">Cash Balances</td>
										<td className="text-center"></td>
										<td className="text-center"></td>
									</tr>
									<tr>
										<td></td>
										<td className="text-center">Other Current Assets</td>
										<td className="text-center">{this.format(8000000)}</td>
										<td className="text-center">{this.format(52000000)}</td>
									</tr>
									<tr>
										<td></td>
										<td className="text-center">Total Current Assets</td>
										<td className="text-center">{this.format(-25000000)}</td>
										<td className="text-center">{this.format(45000000)}</td>
									</tr>
									<tr>
										<th colspan="4" scope="colgroup">
											Non Current Assets
										</th>
									</tr>
									<tr>
										<td></td>
										<td className="text-center">Fixed Assets</td>
										<td className="text-center"></td>
										<td className="text-center"></td>
									</tr>
									<tr>
										<td></td>
										<td className="text-center">Prov for Monoranium</td>
										<td className="text-center">{this.format(3000000)}</td>
										<td className="text-center">{this.format(3000000)}</td>
									</tr>

									<tr>
										<td></td>
										<td className="text-center">Prov for ASF</td>
										<td className="text-center">{this.format(0)}</td>
										<td className="text-center">{this.format(0)}</td>
									</tr>
									<tr>
										<td></td>
										<td className="text-center">Prov for AGM</td>
										<td className="text-center">{this.format(1000000)}</td>
										<td className="text-center">{this.format(1000000)}</td>
									</tr>
									<tr>
										<td></td>
										<td className="text-center">Prov for ad debt</td>
										<td className="text-center">{this.format(0)}</td>
										<td className="text-center">{this.format(0)}</td>
									</tr>
									<tr>
										<td></td>
										<td className="text-center">INTERCOMPANY BALANCE</td>
										<td className="text-center">{this.format(0)}</td>
										<td className="text-center">{this.format(0)}</td>
									</tr>

									<tr>
										<td></td>
										<td className="text-center">INTERCOMPANY BALANCE</td>
										<td className="text-center">{this.format(0)}</td>
										<td className="text-center">{this.format(0)}</td>
									</tr>
									<tr>
										<td></td>
										<td className="text-center">Diapony Current Account</td>
										<td className="text-center">{this.format(0)}</td>
										<td className="text-center">{this.format(0)}</td>
									</tr>
									<tr>
										<td></td>
										<td className="text-center">Client fund Coop</td>
										<td className="text-center">{this.format(0)}</td>
										<td className="text-center">{this.format(0)}</td>
									</tr>
									<tr>
										<td></td>
										<td className="text-center">Account payable</td>
										<td className="text-center">{this.format(0)}</td>
										<td className="text-center">{this.format(0)}</td>
									</tr>
									<tr>
										<td></td>
										<td className="text-center">Total Current Liability</td>
										<td className="text-center">{this.format(33000000)}</td>
										<td className="text-center">{this.format(33000000)}</td>
									</tr>

									<tr>
										<td className="text-left" colSpan="4">
											Equity
										</td>
									</tr>

									<tr>
										<td colSpan="2">Total Liability and Current Equity</td>
										<td className="text-center">{this.format(12000000)}</td>
										<td className="text-center">{this.format(12000000)}</td>
									</tr>
									<tr>
										<td colSpan="2">Total Income</td>
										<td className="text-center">{this.format(2200000)}</td>
										<td className="text-center">{this.format(5000000)}</td>
									</tr>

									<tr>
										<td className="text-left text-bold" colSpan="2">
											Assured Earning
										</td>
										<td className="text-center" contenteditable="true">
											{this.format(120000000)}
										</td>
										<td className="text-center" contenteditable="true">
											{this.format(126000000)}
										</td>
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

export default BalanceSheet;
