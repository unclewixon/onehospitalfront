/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import InventoryItem from '../components/InventoryItem';
import { createInventory } from '../actions/general';

class InventoryList extends Component {
	render() {
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<div className="element-actions">
									<a className="btn btn-primary btn-sm" href="#" onClick={() => this.props.createInventory(true)}>
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
													<th>Description</th>
													<th>Cost Price</th>
													<th>Selling Price</th>
													<th>Quantity</th>
													<th className="text-center">Status</th>
													<th className="text-right">Actions</th>
												</tr>
											</thead>
											<tbody>
												<InventoryItem quantity={14} />
												<InventoryItem quantity={2} />
												<InventoryItem quantity={8} />
												<InventoryItem quantity={24} />
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

export default connect(null, { createInventory })(InventoryList);
