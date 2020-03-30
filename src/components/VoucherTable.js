/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';

import { editInventory, updateQuantity } from '../actions/general';
import { formatCurrency } from '../services/utilities';
import BootstrapTable from 'react-bootstrap-table-next';
import moment from 'moment';

function numberingFormatter(cell, row, rowIndex, formatExtraData) {
	return rowIndex + 1;
}

function dateFormatter(cell, row, rowIndex, formatExtraData) {
	return moment(row).format('DD-MM-YY');
}

class VoucherTable extends Component {
	render() {
		const columns = [
			{
				dataField: 'index',
				text: 'ID',
				formatter: numberingFormatter,
			},

			{
				dataField: 'other_names',
				text: 'Patient',
				sort: true,
			},
			{
				dataField: 'q_amount',
				text: 'Amount (₦)',
				sort: true,
			},
			{
				dataField: 'q_createdAt',
				text: 'Date Created',
				formatter: dateFormatter,
				sort: true,
			},
			{
				dataField: 'df2',
				isDummyField: true,
				text: 'Actions',
				classes: 'text-center row-actions',
				formatter: (cellContent, row) => {
					return (
						<div>
							<Tooltip title="Receive Request">
								<a className="secondary">
									<i className="os-icon os-icon-folder-plus" />
								</a>
							</Tooltip>
							<Tooltip title="Edit Request">
								<a className="secondary">
									<i className="os-icon os-icon-edit-32" />
								</a>
							</Tooltip>
							<Tooltip title="Delete Request">
								<a className="danger">
									<i className="os-icon os-icon-ui-15" />
								</a>
							</Tooltip>
						</div>
					);
				},
			},
		];
		const { data } = this.props;
		return (
			<BootstrapTable
				classes="table table-striped"
				keyField="q_id"
				data={data}
				columns={columns}
			/>
		);
	}
}

export default connect(null, { editInventory, updateQuantity })(VoucherTable);
