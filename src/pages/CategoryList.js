import React, { Component } from 'react';
import { connect } from 'react-redux';

import CreateInvCategory from '../components/CreateInvCategory';
import EditInvCategory from '../components/EditInvCategory';
import { request } from '../services/utilities';
import { API_URI, inventoryAPI } from '../services/constants';
import { loadCategories } from '../actions/inventory';
import CategoryItem from '../components/CategoryItem';

class CategoryList extends Component {
	state = {
		edit: false,
		categoryID: null,
	};

	componentDidMount() {
		this.fetchCategories();
	}
	
	fetchCategories = async () => {
		try {
			const rs = await request(`${API_URI}${inventoryAPI}/categories`, 'GET', true);
			this.props.loadCategories(rs);
		} catch (error) {
			console.log(error);
		}
	};

	editCategory = (category, action) => () => {
		this.setState({ categoryID: category ? category.id : category, edit: action });
	};

	render() {
		const { categories } = this.props;
		const { edit, categoryID } = this.state;
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<h6 className="element-header">Category List</h6>
								<div className="row">
									<div className="col-lg-7">
										<div className="element-wrapper">
											<div className="element-box">
												<h5 className="form-header">Categories</h5>
												<div className="form-desc"/>
												<div className="table-responsive">
													<table className="table table-striped">
														<thead>
															<tr>
																<th>S/N</th>
																<th>Name</th>
																<th className="text-center">Status</th>
																<th className="text-right">Actions</th>
															</tr>
														</thead>
														<tbody>
															{categories.map((category, i) => {
																return (
																	<CategoryItem
																		key={i}
																		serial={i + 1}
																		item={category}
																		editCategory={this.editCategory}
																	/>
																)
															})}
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-5">
										{edit ? (
											<EditInvCategory
												categoryID={categoryID}
												editCategory={this.editCategory}
											/>
										) : (
											<CreateInvCategory />
										)}
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
		categories: state.inventory.categories,
	}
};

export default connect(mapStateToProps, { loadCategories })(CategoryList);
