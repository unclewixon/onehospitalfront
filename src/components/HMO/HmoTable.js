/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';

import { editInventory, updateQuantity } from '../../actions/general';
import { formatCurrency, request } from '../../services/utilities';
import BootstrapTable from 'react-bootstrap-table-next';
import searchingGIF from '../../assets/images/searching.gif';
import moment from 'moment';
import { API_URI } from '../../services/constants';
import { notifyError, notifySuccess } from '../../services/notify';
import { updateTransaction } from '../../actions/transaction';
import Modal from 'antd/es/modal';
import Button from 'antd/es/button';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class HmoTable extends Component {
	state = {
		loading: false,
		show: false,
	};

	confirm = (id, data) => {
		let act = id === 1 ? ' Approve' : ' Reject';
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className="custom-ui">
						<h1>Are you sure?</h1>
						<p>You want to {act} this ?</p>
						<div style={{}}>
							<button
								className="btn btn-danger"
								style={{ margin: 10 }}
								onClick={onClose}>
								No
							</button>
							<button
								className="btn btn-primary"
								style={{ margin: 10 }}
								onClick={() => {
									this.processTransaction(id, data);
									onClose();
								}}>
								Yes, {act} it!
							</button>
						</div>
					</div>
				);
			},
		});
	};

	processTransaction = async (action, hmo) => {
		try {
			let id = hmo.id;
			this.setState({ loading: true });
			const rs = await request(
				`${API_URI}/hmos/transactions/` + id + '/process?action=' + action,
				'GET',
				true
			);

			let status = rs.transaction.hmo_approval_status;
			hmo.hmo_approval_status = status;
			let act = action === 1 ? ' Approved' : ' Rejected';
			let message = hmo.hmo_name + act;
			this.props.updateTransaction(hmo);
			notifySuccess(message);
			this.setState({ loading: false });
		} catch (error) {
			notifyError('There was an error');
			console.log(error);
			this.setState({ loading: false });
		}
	};

	approvalStatus = hmo_approval_status => {
		switch (hmo_approval_status) {
			case 1: {
				return (
					<>
						<span className="status-pill smaller yellow"></span>
						<span>Pending</span>
					</>
				);
			}
			case 2: {
				return (
					<>
						<span className="status-pill smaller green"></span>
						<span>Approved</span>
					</>
				);
			}

			case 3: {
				return (
					<>
						<span className="status-pill smaller red"></span>
						<span>Rejected</span>
					</>
				);
			}
		}
	};

	render() {
		const { hmoTransactions, loading } = this.props;
		const hmoReversed = hmoTransactions.reverse();
		return (
			<>
				<tbody>
					{loading ? (
						<tr>
							<td colSpan="7" className="text-center">
								<img alt="searching" src={searchingGIF} />
							</td>
						</tr>
					) : (
						hmoReversed &&
						hmoReversed.map((trans, key) => {
							return (
								<tr key={key}>
									<td className="text-center">
										{moment(trans.createdAt).format('DD-MM-YYYY')}
									</td>
									<td className="text-center">
										{trans.hmo_name ? trans.hmo_name : 'No hmo'}
									</td>
									<td className="text-center"> {trans.patient_name}</td>
									<td className="text-center">
										{' '}
										{trans.description ? trans.description : 'No Description'}
									</td>
									<td className="text-center">
										{trans.transaction_type
											? trans.transaction_type
											: 'No Transaction Type'}
									</td>
									<td className="text-center">
										{trans.amount ? trans.amount : 0}
									</td>
									<td className="text-center">
										{this.approvalStatus(trans.hmo_approval_status)}
									</td>
									<td className="row-actions">
										<Tooltip title="Approve">
											<a
												className="secondary"
												onClick={() => this.confirm(1, trans)}>
												<i className="os-icon os-icon-thumbs-up" />
											</a>
										</Tooltip>

										<Tooltip title="Reject">
											<a
												className="secondary"
												onClick={() => this.confirm(2, trans)}>
												<i className="os-icon os-icon-thumbs-down" />
											</a>
										</Tooltip>
										{/*<Tooltip title="Change status">*/}
										{/*	<a className="secondary">*/}
										{/*		<i className="os-icon os-icon-folder-plus" />*/}
										{/*	</a>*/}
										{/*</Tooltip>*/}
									</td>
								</tr>
							);
						})
					)}

					{!loading && hmoTransactions.length < 1 ? (
						<tr>
							<td colSpan="7" className="text-center">
								No transactions
							</td>
						</tr>
					) : null}
				</tbody>
			</>
		);
	}
}

export default connect(null, { updateTransaction })(HmoTable);
