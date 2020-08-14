import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';

import { renderTextInput, request, renderSelect } from '../services/utilities';
import { inventorySubCatAPI } from '../services/constants';
import { notifySuccess } from '../services/notify';
import waiting from '../assets/images/waiting.gif';
import { updateInvSubCategory } from '../actions/inventory';

const validate = values => {
	const errors = {};
	if (!values.name) {
		errors.name = 'enter sub category';
	}
	return errors;
};

class EditInvSubCategory extends Component {
	state = {
		submitting: false,
	};

	doEditSubCategory = async data => {
		const { subCategoryID } = this.props;
		this.setState({ submitting: true });
		try {
			const rs = await request(
				`${inventorySubCatAPI}/${subCategoryID}/update`,
				'PATCH',
				true,
				data
			);
			this.props.updateInvSubCategory(rs);
			notifySuccess('sub category saved!');
			this.setState({ submitting: false });
			this.props.reset('edit_sub_category');
			this.props.editSubCategory(null, false);
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not edit sub category',
			});
		}
	};

	render() {
		const { submitting } = this.state;
		const { error, handleSubmit, editSubCategory, categories } = this.props;
		return (
			<div className="element-wrapper">
				<div className="element-box pipeline white lined-warning">
					<form onSubmit={handleSubmit(this.doEditSubCategory)}>
						<h6 className="form-header">Edit Sub Category</h6>
						{error && (
							<div
								className="alert alert-danger"
								dangerouslySetInnerHTML={{
									__html: `<strong>Error!</strong> ${error}`,
								}}
							/>
						)}
						<div className="row">
							<div className="col-sm-12">
								<Field
									id="inventory_category_id"
									name="inventory_category_id"
									component={renderSelect}
									label="Category"
									placeholder="Select Category"
									data={categories}
								/>
							</div>
							<div className="col-sm-12">
								<Field
									id="name"
									name="name"
									component={renderTextInput}
									label="Name"
									type="text"
									placeholder="Enter name"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12 text-right">
								<button
									className="btn btn-primary"
									disabled={submitting}
									type="submit">
									{submitting ? <img src={waiting} alt="submitting" /> : 'save'}
								</button>
								<button
									className="btn btn-secondary ml-3"
									type="button"
									onClick={editSubCategory(null, false)}>
									Cancel
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

EditInvSubCategory = reduxForm({
	form: 'edit_sub_category',
	validate,
})(EditInvSubCategory);

const mapStateToProps = (state, ownProps) => {
	const sub_categories = state.inventory.sub_categories;
	const sub_category = sub_categories.find(
		c => c.id === ownProps.subCategoryID
	);
	return {
		initialValues: {
			name: sub_category ? sub_category.name : '',
			inventory_category_id: sub_category ? sub_category.category.id : '',
		},
		categories: state.inventory.categories,
	};
};

export default connect(mapStateToProps, { reset, updateInvSubCategory })(
	EditInvSubCategory
);
