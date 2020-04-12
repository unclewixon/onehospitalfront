import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';
import { hmoAPI, transactionsAPI, API_URI } from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import { request } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';
import { loadHmoTransaction } from '../../actions/hmo';

export class Dashboard extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,

		status: '',
	};

	componentDidMount() {
		this.fetchHmoTransaction();
	}

	fetchHmoTransaction = async () => {
		const { status } = this.state;

		let startDate = moment()
			.subtract(1, 'd')
			.format('YYYY-MM-DD');
		let endDate = moment().format('YYYY-MM-DD');

		try {
			this.setState({ loading: true });

			console.log(
				`${API_URI}${hmoAPI}${transactionsAPI}?startDate=${startDate}&endDate=${endDate}&patient_id=&status=${status}&page=1&limit=10`
			);
			const rs = await request(
				`${API_URI}${hmoAPI}${transactionsAPI}?startDate=${startDate}&endDate=${endDate}&patient_id=&status=${status}&page=1&limit=10`,
				'GET',
				true
			);

			this.props.loadHmoTransaction(rs);
			console.log(rs);
			this.setState({ loading: false });
		} catch (error) {
			console.log(error);
			notifyError('Error fetching today hmos transactions request');
			this.setState({ loading: false });
		}
	};
	render() {
		const { loading } = this.state;
		const { hmoTransactions } = this.props;
		console.log(hmoTransactions);
		const hmoReversed = hmoTransactions.reverse();
		return (
			<>
				<div className="col-sm-12 col-xxl-12">
					<div className="element-content">
						<div className="row">
							<div className="col-sm-4 col-xxxl-4">
								<a className="element-box el-tablo">
									<div className="label ">DAILY TOTAL (&#8358;)</div>
									<div className="value ">
										<span>0</span>

										<div className="balance-link">
											<button className="btn btn-link btn-underlined">
												<span>View Statement</span>
												<i className="os-icon os-icon-arrow-right4"></i>
											</button>
										</div>
									</div>
								</a>
							</div>
							<div className="col-sm-4 col-xxxl-4">
								<a className="element-box el-tablo">
									<div className="label ">TOTAL UNPAID (&#8358;)</div>
									<div className="value ">
										<span>0</span>

										<div className="balance-link">
											<button className="btn btn-link btn-underlined">
												<span>View Statement</span>
												<i className="os-icon os-icon-arrow-right4"></i>
											</button>
										</div>
									</div>
								</a>
							</div>
							<div className="col-sm-4 col-xxxl-4">
								<a className="element-box el-tablo">
									<div className="label "> TOTAL CASH (&#8358;)</div>
									<div className="value ">
										<span>0</span>

										<div className="balance-link">
											<button className="btn btn-link btn-underlined">
												<span>View Statement</span>
												<i className="os-icon os-icon-arrow-right4"></i>
											</button>
										</div>
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="col-sm-12">
					<div className="element-box">
						<h6 className="element-header">
							Today's Transactions ({moment().format('YYYY-MM-DD')})
						</h6>

						<div className="table-responsive">
							<table className="table table-striped">
								<thead>
									<tr>
										<th className="text-center">Date</th>
										<th className="text-center">Hmo name</th>
										<th className="text-center">Patient name</th>
										<th className="text-center">Transaction Type</th>
										<th className="text-center">Amount(&#x20A6;)</th>
										<th className="text-center">Status</th>
										<th>
											<div className="th-inner "></div>
											<div className="fht-cell"></div>
										</th>
									</tr>
								</thead>
								<tbody>
									{loading ? (
										<tr>
											<td colSpan="7" className="text-center">
												<img alt="searching" src={searchingGIF} />
											</td>
										</tr>
									) : (
										hmoReversed &&
										hmoReversed.map(trans => {
											return (
												<tr>
													<td className="text-center">
														{moment(trans.createdAt).format('DD-MM-YYYY')}
													</td>
													<td className="text-center">
														{request.hmo_name ? request.hmo_name : 'No hmo'}
													</td>
													<td className="text-center"> {trans.patient_name}</td>
													<td className="text-center">
														{trans.transaction_type}
													</td>
													<td className="text-center">{trans.amount}</td>
													<td className="text-center">
														{trans.hmo_approval_status === 0 ? (
															<>
																<span className="status-pill smaller yellow"></span>
																<span>Pending</span>
															</>
														) : (
															<>
																<span className="status-pill smaller green"></span>
																<span>Approved</span>
															</>
														)}
													</td>
													<td>
														<Tooltip title="Change status">
															<a className="secondary">
																<i className="os-icon os-icon-folder-plus" />
															</a>
														</Tooltip>
													</td>
												</tr>
											);
										})
									)}

									{!loading && hmoTransactions.length < 1 ? (
										<tr>
											<td colSpan="7" className="text-center">
												No transaction today
											</td>
										</tr>
									) : null}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		hmoTransactions: state.hmo.hmo_transactions,
	};
};
export default connect(mapStateToProps, { loadHmoTransaction })(Dashboard);
