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

class EditVendor extends Component {
	state = {
		submitting: false,
	};

	edit = async data => {
		try {
			const { vendorID, updateVendor } = this.props;
			this.setState({ submitting: true });
			const url = `${vendorAPI}/${vendorID}`;
			const rs = await request(url, 'PUT', true, data);
			updateVendor(rs);
			notifySuccess('vendor saved!');
			this.setState({ submitting: false });
			this.props.reset('edit_vendor');
			this.props.editVendor(null, false);
			this.props.restEdit();
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not edit vendor',
			});
		}
	};

	render() {
		const { submitting } = this.state;
		const { error, handleSubmit } = this.props;
		return (
			<div className="element-wrapper">
				<div className="element-box pipeline white lined-warning p-3 m-0">
					<form onSubmit={handleSubmit(this.edit)}>
						<h6 className="form-header">Edit Vendor</h6>
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
									onClick={this.props.editVendor(null, false)}>
									cancel
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

EditVendor = reduxForm({
	form: 'edit_vendor',
	validate,
})(EditVendor);

const mapStateToProps = (state, ownProps) => {
	const vendors = ownProps.vendors;
	const vendor = vendors.find(v => v.id === ownProps.vendorID);
	return {
		initialValues: {
			name: vendor ? vendor.name : '',
		},
	};
};

export default connect(mapStateToProps, { reset })(EditVendor);
