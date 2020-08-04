import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';

import { renderTextInput, request } from '../services/utilities';
import { API_URI, inventoryCatAPI } from '../services/constants';
import { notifySuccess } from '../services/notify';
import waiting from '../assets/images/waiting.gif';
import { addInvCategory } from '../actions/inventory';

const validate = values => {
	const errors = {};
	if (!values.name) {
		errors.name = 'enter category';
	}
	return errors;
};

class CreateInvCategory extends Component {
	state = {
		submitting: false,
	};

	createCategory = async data => {
		this.setState({ submitting: true });
		try {
			const rs = await request(`${inventoryCatAPI}`, 'POST', true, data);
			this.props.addInvCategory(rs);
			this.setState({ submitting: false });
			this.props.reset('create_category');
			notifySuccess('category created!');
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not create category',
			});
		}
	};

	render() {
		const { submitting } = this.state;
		const { error, handleSubmit } = this.props;
		return (
			<div className="element-wrapper">
				<div className="element-box pipeline white lined-warning">
					<form onSubmit={handleSubmit(this.createCategory)}>
						<h6 className="form-header">Create Category</h6>
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
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

CreateInvCategory = reduxForm({
	form: 'create_category',
	validate,
})(CreateInvCategory);

export default connect(null, { reset, addInvCategory })(CreateInvCategory);
