import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import accounting from 'accounting';
import waiting from '../../assets/images/waiting.gif';
const { RangePicker } = DatePicker;
export class TrialBalance extends Component {
	state = {
		filtering: false,
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
		const { filtering } = this.state;
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<h6 className="element-header">
							Trial Balance ({moment().format('DD-MMM-YYYY')})
						</h6>
						<div className="col-md-12 px-0">
							<h6 className="element-header">Filter by:</h6>
							<form className="row">
								<div className="form-group col-md-8">
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
						<h6 className="element-header">Trial Balance</h6>

						<div className="table table-responsive">
							<table
								id="table"
								className="table table-theme v-middle table-hover table-bordered table-striped">
								<thead className="text-bold">
									<tr>
										<th className="text-left" colSpan="2">
											Account
										</th>
										{/* <th className="text-center"></th> */}
										<th className="text-center">Debit</th>
										<th className="text-center">Credit</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="text-left" colSpan="4">
											MEM CURRENT ASSETS
										</td>
									</tr>
									<tr>
										<td className="text-left text-bold" colSpan="4">
											100101 Fixed Assets
										</td>
									</tr>
									<tr>
										<td className="" colSpan="2">
											100101 01 Monitor Vehicle
										</td>
										<td className="">{this.format(0)}</td>
										<td className="">{this.format(0)}</td>
									</tr>
									<tr>
										<td className="" colSpan="2">
											100101 02 Land
										</td>
										<td className="">{this.format(0)}</td>
										<td className="">{this.format(0)}</td>
									</tr>
									<tr>
										<td className="" colSpan="2">
											100101 03 Machinery and Equipment
										</td>
										<td className="">{this.format(0)}</td>
										<td className="">{this.format(0)}</td>
									</tr>
									<tr>
										<td className="" colSpan="2">
											100101 04 Plant and Equipment
										</td>
										<td className="">{this.format(0)}</td>
										<td className="">{this.format(0)}</td>
									</tr>
									<tr>
										<td className="" colSpan="2">
											100101 05 Computer and office Equipment
										</td>
										<td className="">{this.format(0)}</td>
										<td className="">{this.format(0)}</td>
									</tr>
									<tr>
										<td className="text-left text-bold" colSpan="4">
											100103 Investment Income
										</td>
									</tr>
									<tr>
										<td className="" colSpan="2">
											100103 01 Investment Dividend
										</td>
										<td className="">{this.format(0)}</td>
										<td className="">{this.format(0)}</td>
									</tr>
									<tr>
										<td className="" colSpan="2">
											100103 02 Investment - aquistion
										</td>
										<td className="">{this.format(0)}</td>
										<td className="">{this.format(0)}</td>
									</tr>
									<tr>
										<td className="" colSpan="2">
											100103 03 Other Investment revenue
										</td>
										<td className="">{this.format(0)}</td>
										<td className="">{this.format(0)}</td>
									</tr>
									<tr>
										<td className="" colSpan="2">
											100103 04 Investment income
										</td>
										<td className="">{this.format(0)}</td>
										<td className="">{this.format(0)}</td>
									</tr>
									<tr>
										<td className="text-left text-bold" colSpan="4">
											100104 Sundry Income
										</td>
									</tr>
									<tr>
										<td className="" colSpan="2">
											100104 01 Bad Debt
										</td>
										<td className="">{this.format(0)}</td>
										<td className="">{this.format(0)}</td>
									</tr>
									<tr>
										<td className="" colSpan="2">
											100103 02 Sundry Income
										</td>
										<td className="">{this.format(0)}</td>
										<td className="">{this.format(0)}</td>
									</tr>
									<tr>
										<td className="" colSpan="2">
											100103 03 Other Investment revenue
										</td>
										<td className="">{this.format(0)}</td>
										<td className="">{this.format(0)}</td>
									</tr>
									<tr>
										<td className="" colSpan="2">
											100103 04 Investment income
										</td>
										<td className="">{this.format(0)}</td>
										<td className="">{this.format(0)}</td>
									</tr>
									<tr>
										<td className="" colSpan="2">
											100103 05 Investment income
										</td>
										<td className="">{this.format(0)}</td>
										<td className="">{this.format(0)}</td>
									</tr>

									<tr>
										<td className="" colSpan="2">
											100103 06 Investment income
										</td>
										<td className="">{this.format(0)}</td>
										<td className="">{this.format(0)}</td>
									</tr>
									<tr>
										<td className="" colSpan="2">
											100103 07 Investment income
										</td>
										<td className="">{this.format(0)}</td>
										<td className="">{this.format(0)}</td>
									</tr>
									<tr>
										<td className="" colSpan="2">
											100103 08 Investment income
										</td>
										<td className="">{this.format(0)}</td>
										<td className="">{this.format(0)}</td>
									</tr>
									<tr>
										<td className="" colSpan="2">
											Total Current Assets
										</td>
										<td className="">{this.format(26000000)}</td>
										<td className="">{this.format(26000000)}</td>
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

export default TrialBalance;
