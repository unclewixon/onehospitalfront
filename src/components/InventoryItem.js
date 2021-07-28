/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';

import { editInventory, updateQuantity } from '../actions/general';
import { formatCurrency } from '../services/utilities';

class InventoryItem extends Component {
	doEditInventory = item => {
		//e.preventDefault();
		console.log('edit inventory');
		this.props.editInventory(item);
	};

	doUpdateQuantity = item => {
		//	e.preventDefault();
		console.log('update qty', item);
		this.props.updateQuantity(item);
	};

	render() {
		const { item, index } = this.props;
		return (
			<tr>
				<td>{index}</td>
				<td>{item.name}</td>
				<td>{item.category.name}</td>
				<td>{item.subCategory ? item.subCategory.name : '-'}</td>
				<td>{formatCurrency(item.cost_price)}</td>
				<td>{formatCurrency(item.sales_price)}</td>
				<td>{item.quantity}</td>
				<td className="text-center">
					{item.quantity >= 10 ? (
						<>
							<span className="status-pill smaller green" />
							<span>In Stock</span>
						</>
					) : item.quantity >= 4 ? (
						<>
							<span className="status-pill smaller yellow" />
							<span>Refill</span>
						</>
					) : (
						<>
							<span className="status-pill smaller red" />
							<span>No Stock</span>
						</>
					)}
				</td>
				<td className="row-actions">
					<Tooltip title="Update Quantity">
						<a
							onClick={() => this.doUpdateQuantity(item)}
							className="secondary">
							<i className="os-icon os-icon-folder-plus" />
						</a>
					</Tooltip>
					<Tooltip title="Edit Inventory Item">
						<a onClick={() => this.doEditInventory(item)} className="secondary">
							<i className="os-icon os-icon-edit-32" />
						</a>
					</Tooltip>
				</td>
			</tr>
		);
	}
}

export default connect(null, { editInventory, updateQuantity })(InventoryItem);
