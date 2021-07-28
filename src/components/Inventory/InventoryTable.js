/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';
import BootstrapTable from 'react-bootstrap-table-next';
import moment from 'moment';

import { editInventory, updateQuantity } from '../../actions/general';
import { formatCurrency, hasExpired } from '../../services/utilities';
import ModalExpiryDate from '../Modals/ModalExpiryDate';

function numberingFormatter(cell, row, rowIndex, formatExtraData) {
	return rowIndex + 1;
}

class InventoryTable extends Component {
	state = {
		showExpiryModal: false,
		inventory: null,
	};

	doEditInventory = item => {
		console.log('edit inventory');
		this.props.editInventory(item);
	};

	doEditExpiry = item => {
		document.body.classList.add('modal-open');
		this.setState({ showExpiryModal: true, inventory: item });
	};

	closeModal = () => {
		document.body.classList.remove('modal-open');
		this.setState({ showExpiryModal: false, inventory: null });
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
				headerStyle: (colum, colIndex) => {
					return { width: '80px' };
				},
			},

			{
				dataField: 'name',
				text: 'Name',
				sort: true,
			},
			{
				dataField: 'category',
				text: 'Category',
				formatter: (cell, row, rowIndex, formatExtraData) => {
					return (
						<>
							<span className="bold-label">{row.category.name}</span>
							{row.subCategory && (
								<>
									<br />
									<span>{row.subCategory.name}</span>
								</>
							)}
						</>
					);
				},
			},
			{
				dataField: 'hmo',
				text: 'Hmo',
				formatter: (cell, row, rowIndex, formatExtraData) => {
					return (
						<>
							<span className="bold-label">{row.hmo?.name}</span>
						</>
					);
				},
			},
			{
				dataField: 'hmoPrice',
				text: 'Hmo Price',
				formatter: (cell, row, rowIndex, formatExtraData) => {
					return (
						<>
							<span className="bold-label">{row.hmoPrice}</span>
						</>
					);
				},
			},
			{
				dataField: 'selling_price',
				text: 'Selling Price',
				formatter: (cell, row, rowIndex, formatExtraData) => {
					return formatCurrency(row.sales_price);
				},
			},
			{
				dataField: 'quantity',
				text: 'Quantity',
				headerStyle: (colum, colIndex) => {
					return { width: '80px' };
				},
			},
			{
				dataField: 'expiry_date',
				text: 'Expiry Date',
				formatter: (cell, row, rowIndex, formatExtraData) => {
					const expired = hasExpired(row.expiry_date);
					return (
						<Tooltip title={expired ? 'Expired' : ''}>
							<span className={expired ? 'text-danger' : ''}>
								{moment(row.expiry_date, 'YYYY-MM-DD').format('DD-MMM-YYYY')}
							</span>
						</Tooltip>
					);
				},
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
				classes: 'row-actions',
				formatter: (cellContent, row) => {
					return (
						<div>
							<Tooltip title="Update Quantity">
								<a
									onClick={() => this.doUpdateQuantity(row)}
									className="primary">
									<i className="os-icon os-icon-grid-18" />
								</a>
							</Tooltip>
							<Tooltip title="Edit Inventory Item">
								<a
									onClick={() => this.doEditInventory(row)}
									className="secondary">
									<i className="os-icon os-icon-ui-49" />
								</a>
							</Tooltip>
							<Tooltip title="Update Expiry Date">
								<a onClick={() => this.doEditExpiry(row)} className="primary">
									<i className="os-icon os-icon-basic-2-259-calendar" />
								</a>
							</Tooltip>
						</div>
					);
				},
			},
		];
		const { data } = this.props;
		const { showExpiryModal, inventory } = this.state;
		return (
			<>
				<BootstrapTable
					classes="table table-striped"
					keyField="id"
					data={data}
					columns={columns}
				/>
				{showExpiryModal && (
					<ModalExpiryDate closeModal={this.closeModal} inventory={inventory} />
				)}
			</>
		);
	}
}

export default connect(null, { editInventory, updateQuantity })(InventoryTable);
