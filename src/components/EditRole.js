import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';

import { renderTextInput, request } from '../services/utilities';
import { rolesAPI } from '../services/constants';
import { notifySuccess } from '../services/notify';
import waiting from '../assets/images/waiting.gif';
import { updateRole } from '../actions/role';

class EditRole extends Component {
	state = {
		submitting: false,
	};

	doEditRole = async data => {
		try {
			this.setState({ submitting: true });
			const { role } = this.props;
			const url = `${rolesAPI}/${role.id}/update`;
			const rs = await request(url, 'PATCH', true, data);
			this.props.updateRole(rs);
			this.setState({ submitting: false });
			this.props.reset('edit_role');
			notifySuccess('role updated!');
			this.props.cancelEditRole(null);
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not update role',
			});
		}
	};

	render() {
		const { submitting } = this.state;
		const { error, handleSubmit, cancelEditRole } = this.props;
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
						readOnly
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
							onClick={() => cancelEditRole(null)}>
							cancel
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
})(EditRole);

const mapStateToProps = (state, ownProps) => {
	return {
		initialValues: {
			name: ownProps.role?.name || '',
			description: ownProps.role?.description || '',
		},
	};
};

export default connect(mapStateToProps, { reset, updateRole })(EditRole);
