import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';
import { hmoAPI, transactionsAPI, API_URI } from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import { request } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';
import { loadHmoTransaction } from '../../actions/hmo';
import HmoTable from '../../components/HMO/HmoTable';

export class Dashboard extends Component {
	state = {
		filtering: false,
		dataLoaded: false,
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
										<th className="text-center">Description</th>
										<th className="text-center">Transaction Type</th>
										<th className="text-center">Amount(&#x20A6;)</th>
										<th className="text-center">Status</th>
										<th>
											<div className="th-inner "></div>
											<div className="fht-cell"></div>
										</th>
									</tr>
								</thead>

								<HmoTable loading={loading} hmoTransactions={hmoTransactions} />
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
