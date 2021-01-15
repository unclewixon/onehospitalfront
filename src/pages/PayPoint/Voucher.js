/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Tooltip from 'antd/lib/tooltip';

import { createVoucher } from '../../actions/general';
import {
	request,
	confirmAction,
	formatCurrency,
} from '../../services/utilities';
import { vouchersAPI } from '../../services/constants';
import { loadVoucher } from '../../actions/paypoint';
import searchingGIF from '../../assets/images/searching.gif';
import moment from 'moment';
import { compose } from 'redux';
import { notifySuccess, notifyError } from '../../services/notify';

export class Voucher extends Component {
	state = {
		loading: false,
		patient_id: '',
		startDate: '',
		endDate: '',
		status: '',
	};

	componentDidMount() {
		this.fetchVoucher();
		//document.body.classList.add('modal-open');
	}

	fetchVoucher = async data => {
		const { patient_id, startDate, endDate, status } = this.state;
		try {
			this.setState({ loading: true });
			const rs = await request(
				`${vouchersAPI}/list?patient_id=${patient_id}&startDate=${startDate}&endDate=${endDate}&status=${status}`,
				'GET',
				true
			);
			this.props.loadVoucher(rs);
			this.setState({ loading: false });
		} catch (error) {
			console.log(error);
		}
	};
	displayExpiry = date => {
		let result = new Date(moment(date));
		result.setDate(result.getDate() + 5);
		return moment(result).format('DD-MM-YYYY');
	};

	onDeleteRoom = async data => {
		try {
			this.setState({ loading: true });
			await request(`vouchers/${data.id}`, 'DELETE', true);
			const rs = this.props.voucher.filter(v => v.id !== data.id);
			this.props.loadVoucher(rs);
			this.setState({ loading: false });
			notifySuccess('Voucher  deleted');
		} catch (error) {
			console.log(error);
			this.setState({ loading: false });
			notifyError(error.message || 'Error deleting voucher ');
		}
	};

	confirmDelete = data => {
		confirmAction(this.onDeleteRoom, data);
	};

	render() {
		const { loading } = this.state;
		const { voucher } = this.props;
		return (
			<>
				<div className="element-wrapper">
					<div className="element-actions p-3">
						<button
							className="btn btn-primary"
							onClick={() => this.props.createVoucher(true)}>
							New Voucher
						</button>
					</div>
					<h6 className="element-header p-3">Voucher</h6>
					<div className="element-box-content">
						<div className="table table-responsive">
							<table className="table table-striped">
								<thead>
									<tr>
										<th className="text-center">Patient</th>
										<th className="text-center">Voucher Number</th>
										<th className="text-center">Amount (₦)</th>
										<th className="text-center">Date Created</th>
										<th className="text-center">Start Date</th>
										<th className="text-center">Expiry Date</th>
										<th className="text-center">Actions</th>
									</tr>
								</thead>
								<tbody>
									{loading ? (
										<tr>
											<td colSpan="5" className="text-center">
												<img alt="searching" src={searchingGIF} />
											</td>
										</tr>
									) : voucher.length > 0 ? (
										voucher.map((voucher, i) => {
											return (
												<tr key={i}>
													<td className="text-center">
														{voucher.patient_name}
													</td>
													<td className="text-center">{voucher.voucher_no}</td>
													<td className="text-center">
														{formatCurrency(voucher.amount)}
													</td>
													<td className="text-center">
														{moment(voucher.q_createdAt).format('DD-MM-YYYY')}
													</td>

													<td className="text-center">
														{moment(voucher.start_date).format('DD-MM-YYYY')}
													</td>

													<td className="text-center">
														{this.displayExpiry(voucher.q_createdAt)}
													</td>

													<td className="text-center row-actions">
														<Tooltip title="Delete Request">
															<a
																className="danger"
																onClick={() => this.confirmDelete(voucher)}>
																<i className="os-icon os-icon-ui-15" />
															</a>
														</Tooltip>
													</td>
												</tr>
											);
										})
									) : (
										<tr className="text-center">
											<td colSpan="7">No voucher for today yet</td>
										</tr>
									)}
								</tbody>
							</table>

							{/*<VoucherTable data={voucher} />*/}
						</div>
					</div>
				</div>
			</>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		voucher: state.paypoint.voucher,
	};
};
export default compose(
	withRouter,
	connect(mapStateToProps, { loadVoucher, createVoucher })
)(Voucher);
