/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { request } from '../services/utilities';
// import { API_URI, inventoryAPI } from '../services/constants';
import { updateCategory } from '../actions/inventory';
// import { notifySuccess, notifyError } from '../services/notify';

class CategoryItem extends Component {
	enableCategory = async () => {
		const { item } = this.props;
		console.log(item);
		// const { item } = this.props;
		// try {
		// 	const rs = await request(`${API_URI}${inventoryAPI}/categories`, 'POST', true, data);
		// 	this.props.updateCategory(rs);
		// 	notifySuccess('category enabled!');
		// } catch (e) {
		// 	this.setState({ submitting: false });
		// 	notifyError(e.message || 'could not enable category');
		// }
	};

	disableCategory = () => {
		const { item } = this.props;
		console.log(item);
	};

	render() {
		const { item, editCategory, serial } = this.props;
		return (
			<tr>
				<td>{serial}</td>
				<td>{item.name}</td>
				<td className="text-center">
					<div className={`status-pill ${item.isActive ? 'green' : 'red'}`}/>
				</td>
				<td className="text-right row-actions">
					<a href="#" onClick={editCategory(item, true)} className="secondary" title="Edit Inventory Category">
						<i className="os-icon os-icon-edit-32" />
					</a>
					{item.isActive ? (
						<a href="#" onClick={this.disableCategory} className="danger" title="Disable Category">
							<i className="os-icon os-icon-x-circle" />
						</a>
					) : (
						<a href="#" onClick={this.enableCategory} className="success" title="Enable Category">
							<i className="os-icon os-icon-check-circle" />
						</a>
					)}
				</td>
			</tr>
		);
	}
}

export default connect(null, { updateCategory })(CategoryItem);