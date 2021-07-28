/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { request } from '../services/utilities';
// import {  inventoryAPI } from '../services/constants';
import { updateInvSubCategory } from '../actions/inventory';
// import { notifySuccess, notifyError } from '../services/notify';

class InvSubCategoryItem extends Component {
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

	disableCategory = () => {
		const { item } = this.props;

		this.props.delete(item);
	};

	render() {
		const { item, editSubCategory, serial } = this.props;
		console.log(item);
		return (
			<tr>
				<td>{serial}</td>
				<td>{item.name}</td>
				<td>{item.category.name}</td>
				<td className="text-center">
					<div className={`status-pill ${item.isActive ? 'green' : 'red'}`} />
				</td>
				<td className="row-actions">
					<a
						onClick={editSubCategory(item, true)}
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
				</td>
			</tr>
		);
	}
}

export default connect(null, { updateInvSubCategory })(InvSubCategoryItem);
