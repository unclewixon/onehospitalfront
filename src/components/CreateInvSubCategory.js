import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';

import { renderTextInput, request, renderSelect } from '../services/utilities';
import { inventorySubCatAPI } from '../services/constants';
import { notifySuccess } from '../services/notify';
import waiting from '../assets/images/waiting.gif';
import { addInvSubCategory } from '../actions/inventory';

const validate = values => {
	const errors = {};
	if (!values.name) {
		errors.name = 'enter sub category';
	}
	return errors;
};

class CreateInvSubCategory extends Component {
	state = {
		submitting: false,
	};

	createCategory = async data => {
		try {
			this.setState({ submitting: true });
			const rs = await request(`${inventorySubCatAPI}`, 'POST', true, data);
			this.props.addInvSubCategory(rs);
			this.setState({ submitting: false });
			this.props.reset('create_sub_category');
			notifySuccess('sub category created!');
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not create sub category',
			});
		}
	};

	render() {
		const { submitting } = this.state;
		const { error, handleSubmit, categories } = this.props;
		return (
			<div className="element-wrapper">
				<div className="element-box pipeline white lined-warning p-3 m-0">
					<form onSubmit={handleSubmit(this.createCategory)}>
						<h6 className="form-header">Create Sub Category</h6>
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
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

CreateInvSubCategory = reduxForm({
	form: 'create_sub_category',
	validate,
})(CreateInvSubCategory);

const mapStateToProps = (state, ownProps) => {
	return {
		categories: state.inventory.categories,
	};
};

export default connect(mapStateToProps, { reset, addInvSubCategory })(
	CreateInvSubCategory
);
