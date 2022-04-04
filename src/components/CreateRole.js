import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';

import { renderTextInput, request } from '../services/utilities';
import { rolesAPI } from '../services/constants';
import { notifySuccess } from '../services/notify';
import waiting from '../assets/images/waiting.gif';
import { addRole } from '../actions/role';

const validate = values => {
	const errors = {};
	if (!values.name) {
		errors.name = 'enter name';
	}
	return errors;
};

class CreateRole extends Component {
	state = {
		submitting: false,
	};

	doCreateRole = async data => {
		try {
			this.setState({ submitting: true });
			const rs = await request(rolesAPI, 'POST', true, data);
			this.props.addRole(rs);
			this.setState({ submitting: false });
			this.props.reset('create_role');
			notifySuccess('role created!');
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not create role',
			});
		}
	};

	render() {
		const { submitting } = this.state;
		const { error, handleSubmit } = this.props;
		return (
			<div className="pipeline white lined-warning">
				<form onSubmit={handleSubmit(this.doCreateRole)}>
					<h6 className="form-header">Create Role</h6>
					{error && (
						<div
							className="alert alert-danger"
							dangerouslySetInnerHTML={{
								__html: `<strong>Error!</strong> ${error}`,
							}}
						/>
					)}
					<Field
						id="name"
						name="name"
						component={renderTextInput}
						label="Name"
						type="text"
						placeholder="Enter name"
					/>
					<Field
						id="description"
						name="description"
						component={renderTextInput}
						label="Description"
						type="text"
						placeholder="Enter description"
					/>
					<div className="form-buttons-w">
						<button
							className="btn btn-primary"
							disabled={submitting}
							type="submit"
						>
							{submitting ? <img src={waiting} alt="submitting" /> : 'save'}
						</button>
					</div>
				</form>
			</div>
		);
	}
}

CreateRole = reduxForm({
	form: 'create_role',
	validate,
})(CreateRole);

export default connect(null, { reset, addRole })(CreateRole);
