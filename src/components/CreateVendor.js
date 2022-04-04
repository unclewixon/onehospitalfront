import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';

import { renderTextInput, request } from '../services/utilities';
import { vendorAPI } from '../services/constants';
import { notifySuccess } from '../services/notify';
import waiting from '../assets/images/waiting.gif';

const validate = values => {
	const errors = {};
	if (!values.name) {
		errors.name = 'enter vendor';
	}
	return errors;
};

class CreateVendor extends Component {
	state = {
		submitting: false,
	};

	create = async data => {
		try {
			const { addVendor } = this.props;
			this.setState({ submitting: true });
			const rs = await request(`${vendorAPI}`, 'POST', true, data);
			addVendor(rs);
			this.props.reset('create_vendor');
			this.setState({ submitting: false });
			notifySuccess('vendor created!');
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not create vendor',
			});
		}
	};

	render() {
		const { submitting } = this.state;
		const { error, handleSubmit } = this.props;
		return (
			<div className="element-wrapper">
				<div className="element-box pipeline white lined-warning p-3 m-0">
					<form onSubmit={handleSubmit(this.create)}>
						<h6 className="form-header">Create Vendor</h6>
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
									type="submit"
								>
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

CreateVendor = reduxForm({
	form: 'create_vendor',
	validate,
})(CreateVendor);

export default connect(null, { reset })(CreateVendor);
