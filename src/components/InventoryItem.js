/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { editInventory, updateQuantity } from '../actions/general';

class InventoryItem extends Component {
	doEditInventory = e => {
		e.preventDefault();
		console.log('edit inventory');
		this.props.editInventory(true);
	};

	doUpdateQuantity = e => {
		e.preventDefault();
		console.log('update qty');
		this.props.updateQuantity(true);
	};

	render() {
		const { quantity } = this.props;
		return (
			<tr>
				<td>23</td>
				<td>Store</td>
				<td>Broom</td>
				<td>-</td>
				<td>30</td>
				<td>30</td>
				<td>{quantity}</td>
				<td className="text-center">
					{quantity >= 10 ? (
						<div className="status-pill green"/>
					) : (
						quantity >= 4 ? (
							<div className="status-pill yellow"/>
						) : (
							<div className="status-pill red"/>
						)
					)}
				</td>
				<td className="text-right row-actions">
					<a href="#" onClick={this.doEditInventory} className="secondary" title="Edit Inventory">
						<i className="os-icon os-icon-edit-32" />
					</a>
					<a href="#" onClick={this.doUpdateQuantity} className="secondary" title="Update Quantity">
						<i className="os-icon os-icon-grid-squares-2" />
					</a>
				</td>
			</tr>
		);
	}
}

export default connect(null, { editInventory, updateQuantity })(InventoryItem);
