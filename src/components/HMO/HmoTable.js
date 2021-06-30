/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';
import { useDispatch } from 'react-redux';

import {
	patientname,
	formatCurrency,
	confirmAction,
	request,
} from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifySuccess, notifyError } from '../../services/notify';

const HmoTable = ({ hmoTransactions, updateTransaction }) => {
	const dispatch = useDispatch();

	const declineTransaction = async data => {
		try {
			dispatch(startBlock());
			const url = `transactions/${data.id}/decline`;
			const rs = await request(url, 'PATCH', true, {});
			const items = hmoTransactions.filter(l => l.id !== rs.transaction.id);
			updateTransaction(items);
			notifySuccess('HMO transaction declined!');
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			notifyError('Error declining transaction');
			dispatch(stopBlock());
		}
	};

	const confirmDelete = data => {
		confirmAction(
			declineTransaction,
			data,
			'Do you want to decline transaction?',
			'Are you sure?'
		);
	};

	return (
		<tbody>
			{hmoTransactions.map((item, key) => {
				return (
					<tr key={key}>
						<td>{moment(item.createdAt).format('DD-MM-YYYY h:mm A')}</td>
						<td className="text-capitalize">{item.hmo?.name || '--'}</td>
						<td className="text-capitalize">{patientname(item.patient)}</td>
						<td>{item.description || '--'}</td>

						<td>{item.amount ? formatCurrency(item.amount) : 0}</td>
						<td>{item.hmo_approval_code || '--'}</td>
						<td>
							{item.status === 0 && (
								<span className="badge badge-secondary text-white">
									pending
								</span>
							)}
							{item.status === -1 && (
								<span className="badge badge-info text-white">pay later</span>
							)}
							{item.status === 1 && (
								<span className="badge badge-success">paid</span>
							)}
						</td>
						<td className="row-actions">
							{item.status === 0 && (
								<Tooltip title="decline">
									<a
										className="danger cursor"
										style={{ height: '2rem', width: '2rem' }}
										onClick={() => confirmDelete(item)}>
										<i className="os-icon os-icon-ui-15" />
									</a>
								</Tooltip>
							)}
						</td>
					</tr>
				);
			})}

			{!hmoTransactions.length === 0 && (
				<tr>
					<td colSpan="8">No transactions</td>
				</tr>
			)}
		</tbody>
	);
};

export default HmoTable;
