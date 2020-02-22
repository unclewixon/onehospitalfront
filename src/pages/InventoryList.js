/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import InventoryItem from '../components/InventoryItem';
import { createInventory } from '../actions/general';

import { request } from '../services/utilities';
import { API_URI, inventoryAPI } from '../services/constants';
import { loadInventories } from '../actions/inventory';

class InventoryList extends Component {
	componentDidMount() {
		this.fetchInventories();
	}
	
	fetchInventories = async () => {
		try {
			const rs = await request(`${API_URI}${inventoryAPI}`, 'GET', true);
			this.props.loadInventories(rs)
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { inventories } = this.props;
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<div className="element-actions">
									<a className="btn btn-primary btn-sm text-white" onClick={() => this.props.createInventory(true)}>
										<i className="os-icon os-icon-plus-circle"/>
										<span>Create New Inventory</span>
									</a>
								</div>
								<h6 className="form-header">Inventory List</h6>
								<div className="element-box">
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th>ID</th>
													<th>Category</th>
													<th>Name</th>
													<th>Sub Category</th>
													<th>Cost Price</th>
													<th>Selling Price</th>
													<th>Quantity</th>
													<th className="text-center">Status</th>
													<th className="text-right">Actions</th>
												</tr>
											</thead>
											<tbody>
												{inventories.map((inv, i) => {
													return (
														<InventoryItem
															key={i}
															index={i+1}
															item={inv}
														/>
													)
												})}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		inventories: state.inventory.inventories,
	}
};

export default connect(mapStateToProps, { createInventory, loadInventories })(InventoryList);
