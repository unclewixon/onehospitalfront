import React, { useState, useEffect } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect, useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import {
	renderTextInput,
	request,
	updateImmutable,
} from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifyError, notifySuccess } from '../../services/notify';

const validate = values => {
	const errors = {};
	if (!values.username) {
		errors.username = 'enter username';
	}

	return errors;
};

const ModalEditUserAccount = ({
	updateStaffs,
	closeModal,
	staff,
	staffs,
	error,
	handleSubmit,
}) => {
	const [loaded, setLoaded] = useState(false);
	const [role, setRole] = useState(null);
	const [submitting, setSubmitting] = useState(false);

	const dispatch = useDispatch();

	const roles = useSelector(state => state.role.roles);

	useEffect(() => {
		if (!loaded) {
			setRole(staff.user.role);
			setLoaded(true);
		}
	}, [loaded, staff]);

	const save = async data => {
		try {
			if (!role) {
				notifyError('Please select role');
				return;
			}

			dispatch(startBlock());
			setSubmitting(true);
			const info = {
				...data,
				role_id: role.id,
			};
			const url = `auth/${staff.user.id}/save`;
			const rs = await request(url, 'POST', true, info);
			const allStaffs = updateImmutable(staffs, rs);
			updateStaffs(allStaffs);
			setSubmitting(false);
			dispatch(stopBlock());
			notifySuccess('Account updated!');
			closeModal();
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			setSubmitting(false);
			throw new SubmissionError({
				_error: 'could not update account',
			});
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div className="modal-dialog modal-md modal-centered" role="document">
				<div className="modal-content">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}
					>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Edit Staff Account</h4>
						<div className="form-block">
							<form onSubmit={handleSubmit(save)}>
								{error && (
									<div
										className="alert alert-danger"
										dangerouslySetInnerHTML={{
											__html: `<strong>Error!</strong> ${error}`,
										}}
									/>
								)}
								<div className="row">
									<div className="col-sm-6">
										<Field
											id="username"
											name="username"
											component={renderTextInput}
											label="Username"
											type="text"
											readOnly={true}
										/>
									</div>
									<div className="col-sm-6">
										<Field
											id="department"
											name="department"
											component={renderTextInput}
											label="Department"
											type="text"
											readOnly={true}
										/>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12">
										<label>User Role</label>
										<Select
											placeholder="Select role"
											defaultValue
											getOptionValue={option => option.id}
											getOptionLabel={option => option.name}
											onChange={e => {
												setRole(e);
											}}
											value={role}
											isSearchable={true}
											options={roles}
										/>
									</div>
								</div>
								<div className="row mt-4">
									<div className="col-sm-12 text-right">
										<button
											className="btn btn-primary"
											disabled={submitting}
											type="submit"
										>
											{submitting ? (
												<img src={waiting} alt="submitting" />
											) : (
												'Save'
											)}
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		initialValues: {
			username: ownProps.staff.user.username,
			department: ownProps.staff?.department?.name || '',
		},
	};
};

export default connect(mapStateToProps)(
	reduxForm({ form: 'edit-account', validate })(ModalEditUserAccount)
);
