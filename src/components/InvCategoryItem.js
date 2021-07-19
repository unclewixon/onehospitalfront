/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { request } from '../services/utilities';
import { updateInvCategory } from '../actions/inventory';
import { notifySuccess, notifyError } from '../services/notify';

class InvCategoryItem extends Component {
	enableCategory = async () => {
		const { item } = this.props;
		console.log(item);
		// const { item } = this.props;
		// try {
		// 	const rs = await request(`${inventoryAPI}/categories`, 'POST', true, data);
		// 	this.props.updateCategory(rs);
		// 	notifySuccess('category enabled!');
		// } catch (e) {
		// 	this.setState({ submitting: false });
		// 	notifyError(e.message || 'could not enable category');
		// }
	};

	disableCategory = async () => {
		const { item } = this.props;
		try {
			await request(`inventory/categories/${item.id}`, 'DELETE', true);
			this.props.removeItem(item);
			notifySuccess('inventory category  deleted');
		} catch (error) {
			notifyError(error.message || 'Error deleting inventory category ');
		}
	};

	render() {
		const { item, editCategory, serial, role } = this.props;
		return (
			<tr>
				<td>{serial}</td>
				<td>{item.name}</td>
				<td className="text-center">
					<div className={`status-pill ${item.isActive ? 'green' : 'red'}`} />
				</td>
				<td className="text-right row-actions">
					<div hidden={role === 'it-admin' ? false : true}>
						<a
							onClick={editCategory(item, true)}
							className="secondary"
							title="Edit Inventory Category">
							<i className="os-icon os-icon-edit-32" />
						</a>
						{item.isActive ? (
							<a
								onClick={this.disableCategory}
								className="danger"
								title="Disable Category">
								<i className="os-icon os-icon-x-circle" />
							</a>
						) : (
							<a
								onClick={this.enableCategory}
								className="success"
								title="Enable Category">
								<i className="os-icon os-icon-check-circle" />
							</a>
						)}
					</div>
				</td>
			</tr>
		);
	}
}

export default connect(null, { updateInvCategory })(InvCategoryItem);
