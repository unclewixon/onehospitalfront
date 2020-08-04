import React, { Component } from 'react';
import { connect } from 'react-redux';

import CreateInvSubCategory from '../components/CreateInvSubCategory';
import EditInvSubCategory from '../components/EditInvSubCategory';
import { request } from '../services/utilities';
import { API_URI, inventorySubCatAPI } from '../services/constants';
import { loadInvSubCategories } from '../actions/inventory';
import InvSubCategoryItem from './InvSubCategoryItem';
import { confirmAction } from '../services/utilities';

class InvSubCategories extends Component {
	state = {
		edit: false,
		subCategoryID: null,
	};

	componentDidMount() {
		this.fetchSubCategories();
	}

	fetchSubCategories = async () => {
		try {
			const rs = await request(`${inventorySubCatAPI}`, 'GET', true);
			this.props.loadInvSubCategories(rs);
		} catch (error) {
			console.log(error);
		}
	};

	editSubCategory = (subcategory, action) => () => {
		this.setState({
			subCategoryID: subcategory ? subcategory.id : subcategory,
			edit: action,
		});
	};

	onDeleteInvSubCategory = data => {
		// props
		// 	.deleteCafeteriaInvCategory(data)
		// 	.then(data => {
		// 		setLoading(false);
		// 		notifySuccess(' Cafeteria inventory  category deleted');
		// 	})
		// 	.catch(error => {
		// 		setLoading(false);
		// 		notifyError('Error deleting cafeteria inventory category ');
		// 	});
		console.log(data);
	};

	confirmDelete = data => {
		confirmAction(this.onDeleteInvSubCategory, data);
	};

	render() {
		const { sub_categories } = this.props;
		const { edit, subCategoryID } = this.state;
		return (
			<div className="row">
				<div className="col-lg-7">
					<div className="element-wrapper">
						<div className="element-box">
							<h5 className="form-header">Sub Categories</h5>
							<div className="form-desc" />
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>S/N</th>
											<th>Name</th>
											<th>Category</th>
											<th className="text-center">Status</th>
											<th className="text-right">Actions</th>
										</tr>
									</thead>
									<tbody>
										{sub_categories.map((category, i) => {
											return (
												<InvSubCategoryItem
													key={i}
													serial={i + 1}
													item={category}
													editSubCategory={this.editSubCategory}
													delete={this.confirmDelete}
												/>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-5">
					{edit ? (
						<EditInvSubCategory
							subCategoryID={subCategoryID}
							editSubCategory={this.editSubCategory}
						/>
					) : (
						<CreateInvSubCategory />
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		sub_categories: state.inventory.sub_categories,
	};
};

export default connect(mapStateToProps, { loadInvSubCategories })(
	InvSubCategories
);
