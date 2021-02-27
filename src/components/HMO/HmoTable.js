/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';

import { formatNumber, request, trimText } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';
import moment from 'moment';
import { notifyError, notifySuccess } from '../../services/notify';
import { updateTransaction } from '../../actions/transaction';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class HmoTable extends Component {
	state = {
		loading: false,
		show: false,
		approvalCode: '',
	};

	confirm = (id, data) => {
		this.setState({ approvalCode: data.hmo_approval_code });
		let act = id === 1 ? ' Approve' : ' Reject';
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className="custom-ui">
						<h1>Are you sure?</h1>
						<p>You want to {act} this ?</p>
						{id === 1 && (
							<div className="form-group">
								<input
									className="form-control form-control-sm"
									placeholder="Enter Approval Code"
									value={this.state.approvalCode}
									onChange={e => this.setReferralCode(e)}
								/>
							</div>
						)}
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

	setReferralCode = e => {
		this.setState({ approvalCode: e.target.value });
	};

	processTransaction = async (action, hmo) => {
		try {
			let id = hmo.id;
			this.setState({ loading: true });
			const { approvalCode } = this.state;

			if (action === 1 && approvalCode.length === 0) {
				notifyError('Please enter an approval code');
				return;
			}
			const rs = await request(`hmos/transactions/process`, 'POST', true, {
				id,
				action,
				approvalCode,
			});

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
		console.log(hmo_approval_status);
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
			default:
				break;
		}
	};

	render() {
		const { hmoTransactions, loading } = this.props;
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
						hmoTransactions &&
						hmoTransactions.map((trans, key) => {
							return (
								<tr key={key}>
									<td className="text-center">
										{moment(trans.createdAt).format('DD-MM-YYYY')}
									</td>
									<td className="text-center text-capitalize">
										{trans.hmo_name ? trans.hmo_name : 'No hmo'}
									</td>
									<td className="text-center text-capitalize">
										{' '}
										{trans.patient_name}
									</td>
									<td className="text-center">
										{' '}
										{trans.description
											? trimText(trans.description, 50)
											: 'No Description'}
									</td>

									<td className="text-center">
										{trans.amount ? formatNumber(trans.amount) : 0}
									</td>
									<td className="text-center">{trans.hmo_approval_code}</td>
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
