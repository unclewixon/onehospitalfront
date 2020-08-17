/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';

import { editInventory, updateQuantity } from '../../actions/general';
import BootstrapTable from 'react-bootstrap-table-next';

function numberingFormatter(cell, row, rowIndex, formatExtraData) {
	return rowIndex + 1;
}

class InventoryTable extends Component {
	doEditInventory = item => {
		console.log('edit inventory');
		this.props.editInventory(item);
	};

	doUpdateQuantity = item => {
		console.log('update qty', item);
		this.props.updateQuantity(item);
	};

	render() {
		const columns = [
			{
				dataField: 'index',
				text: 'ID',
				formatter: numberingFormatter,
			},

			{
				dataField: 'name',
				text: 'Name',
				sort: true,
			},
			{
				dataField: 'category.name',
				text: 'Category',
				sort: true,
			},
			{
				dataField: 'subCategory.name',
				text: 'Sub Category',
				sort: true,
			},
			{
				dataField: 'cost_price',
				text: 'Cost Price',
			},
			{
				dataField: 'sales_price',
				text: 'Selling Price',
			},
			{
				dataField: 'quantity',
				text: 'Quantity',
			},
			{
				dataField: 'df1',
				isDummyField: true,
				text: 'Status',
				classes: 'text-center',
				formatter: (cellContent, row) => {
					if (row.quantity >= 10) {
						return (
							<>
								<span className="status-pill smaller green" />
								<span>In Stock</span>
							</>
						);
					}

					if (row.quantity >= 4) {
						return (
							<>
								<span className="status-pill smaller yellow" />
								<span>Refill</span>
							</>
						);
					}

					return (
						<>
							<span className="status-pill smaller red" />
							<span>No Stock</span>
						</>
					);
				},
			},
			{
				dataField: 'df2',
				isDummyField: true,
				text: 'Actions',
				classes: 'text-right row-actions',
				formatter: (cellContent, row) => {
					return (
						<div>
							<Tooltip title="Update Quantity">
								<a
									onClick={() => this.doUpdateQuantity(row)}
									className="secondary">
									<i className="os-icon os-icon-folder-plus" />
								</a>
							</Tooltip>

							<Tooltip title="Edit Inventory Item">
								<a
									onClick={() => this.doEditInventory(row)}
									className="secondary">
									<i className="os-icon os-icon-edit-32" />
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
				keyField="id"
				data={data}
				columns={columns}
			/>
		);
	}
}

export default connect(null, { editInventory, updateQuantity })(InventoryTable);
