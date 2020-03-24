import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';

import { renderTextInput, request } from '../services/utilities';
import { API_URI, rolesAPI } from '../services/constants';
import { notifySuccess } from '../services/notify';
import waiting from '../assets/images/waiting.gif';
import { updateRole } from '../actions/role';

const validate = values => {
	const errors = {};
	if (!values.name) {
		errors.name = 'enter role';
	}
	return errors;
};

class EditRole extends Component {
	state = {
		submitting: false,
	};

	doEditRole = async data => {
		console.log(data);
		this.setState({ submitting: true });
		try {
			const { roleID, previousRole } = this.props;
			const rs = await request(
				`${API_URI}${rolesAPI}/${roleID}/update`,
				'PATCH',
				true,
				data
			);
			this.props.updateRole(rs, previousRole);
			this.setState({ submitting: false });
			this.props.reset('edit_role');
			notifySuccess('role updated!');
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not update role',
			});
		}
	};

	render() {
		const { submitting } = this.state;
		const { error, handleSubmit, editRole } = this.props;
		return (
			<div className="pipeline white lined-warning">
				<form onSubmit={handleSubmit(this.doEditRole)}>
					<h6 className="form-header">Edit Role</h6>
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
							className="btn btn-secondary ml-3"
							type="button"
							onClick={editRole(null, false)}>
							Cancel
						</button>
						<button
							className="btn btn-primary"
							disabled={submitting}
							type="submit">
							{submitting ? <img src={waiting} alt="submitting" /> : 'save'}
						</button>
					</div>
				</form>
			</div>
		);
	}
}

EditRole = reduxForm({
	form: 'edit_role',
	validate,
})(EditRole);

const mapStateToProps = (state, ownProps) => {
	const roles = state.role.roles;
	const role = roles.find(r => r.id === ownProps.roleID);
	return {
		initialValues: {
			name: role ? role.name : '',
			description: role ? role.description : '',
		},
	};
};

export default connect(mapStateToProps, { reset, updateRole })(EditRole);
