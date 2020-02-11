/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createInventoryCat, editInventoryCat } from '../actions/general';

class CategoryList extends Component {
	doEditInventoryCat = e => {
		e.preventDefault();
		console.log('edit inventory category');
		this.props.editInventoryCat(true);
	};

	render() {
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<div className="element-actions">
									<a className="btn btn-primary btn-sm" href="#" onClick={() => this.props.createInventoryCat(true)}>
										<i className="os-icon os-icon-plus-circle"/>
										<span>Create New Category</span>
									</a>
								</div>
								<h6 className="element-header">Category List</h6>
								<div className="element-box">
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th>Name</th>
													<th className="text-center">Status</th>
													<th className="text-right">Actions</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>Lab</td>
													<td className="text-center">
														<div className="status-pill green"/>
													</td>
													<td className="text-right row-actions">
														<a href="#" onClick={this.doEditInventoryCat} className="secondary" title="Edit Inventory Category">
															<i className="os-icon os-icon-edit-32" />
														</a>
														<a href="#" className="danger" title="Disable Category">
															<i className="os-icon os-icon-x-circle" />
														</a>
													</td>
												</tr>
												<tr>
													<td>Cafeteria</td>
													<td className="text-center">
														<div className="status-pill red"/>
													</td>
													<td className="text-right row-actions">
														<a href="#" onClick={this.doEditInventoryCat} className="secondary" title="Edit Inventory Category">
															<i className="os-icon os-icon-edit-32" />
														</a>
														<a href="#" className="success" title="Enable Category">
															<i className="os-icon os-icon-check-circle" />
														</a>
													</td>
												</tr>
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

export default connect(null, { createInventoryCat, editInventoryCat })(CategoryList);
