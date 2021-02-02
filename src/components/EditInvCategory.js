import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';

import { renderTextInput, request } from '../services/utilities';
import { inventoryCatAPI } from '../services/constants';
import { notifySuccess } from '../services/notify';
import waiting from '../assets/images/waiting.gif';
import { updateInvCategory } from '../actions/inventory';

const validate = values => {
	const errors = {};
	if (!values.name) {
		errors.name = 'enter category';
	}
	return errors;
};

class EditInvCategory extends Component {
	state = {
		submitting: false,
	};

	doEditCategory = async data => {
		try {
			const { categoryID } = this.props;
			this.setState({ submitting: true });
			const url = `${inventoryCatAPI}/${categoryID}/update`;
			const rs = await request(url, 'PATCH', true, data);
			this.props.updateInvCategory(rs);
			notifySuccess('category saved!');
			this.setState({ submitting: false });
			this.props.reset('edit_category');
			this.props.closeCategory();
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not edit category',
			});
		}
	};

	render() {
		const { submitting } = this.state;
		const { error, handleSubmit, closeCategory } = this.props;
		return (
			<div className="element-wrapper">
				<div className="element-box pipeline white lined-warning p-3 m-0">
					<form onSubmit={handleSubmit(this.doEditCategory)}>
						<h6 className="form-header">Edit Category</h6>
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
									onClick={() => closeCategory()}>
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

EditInvCategory = reduxForm({
	form: 'edit_category',
	validate,
})(EditInvCategory);

const mapStateToProps = (state, ownProps) => {
	const categories = state.inventory.categories;
	const category = categories.find(c => c.id === ownProps.categoryID);
	return {
		initialValues: {
			name: category ? category.name : '',
		},
	};
};

export default connect(mapStateToProps, { reset, updateInvCategory })(
	EditInvCategory
);
