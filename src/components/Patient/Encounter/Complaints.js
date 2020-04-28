import React, { Component, useEffect, useState } from 'react';
import SunEditor from 'suneditor-react';
import { useForm } from 'react-hook-form';
import { connect, useDispatch } from 'react-redux';
import { UPDATE_COMPLAINT_DATA } from '../../../actions/types';
import { reduxForm } from 'redux-form';
import EnrollmentPackages from '../../Enrollment/EnrollmentPackages';
import { socket } from '../../../services/constants';

const Complaints = props => {
	const { register, handleSubmit, setValue, getValues } = useForm();
	const [complaint, setComplaint] = useState('');
	let { complaints, previous, next } = props;
	const dispatch = useDispatch();

	const handleChange = e => {
		setComplaint(e);
	};
	const handleFocus = e => {
		var temp_value = e.target.textContent;
		e.target.textContent = '';
		e.target.textContent = temp_value;
	};

	const onSubmit = async values => {
		dispatch({
			type: UPDATE_COMPLAINT_DATA,
			payload: complaint,
		});
		dispatch(props.next);
	};
	return (
		<div className="form-block encounter">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Presenting Complaints</label>
							<SunEditor
								width="100%"
								placeholder="Please type here..."
								setContents={complaints}
								name="complaint_data"
								ref={register}
								autoFocus={true}
								enableToolbar={true}
								setOptions={{
									height: 300,
									buttonList: [
										[
											'bold',
											'underline',
											'italic',
											'strike',
											'subscript',
											'superscript',
											'list',
											'align',
											'font',
											'fontSize',
											'image',
										],
									],
								}}
								//onFocus={handleFocus}
								onChange={evt => {
									handleChange(String(evt));
								}}
							/>
						</div>
					</div>
				</div>

				<div className="row mt-5">
					<div className="col-sm-12 d-flex ant-row-flex-space-between">
						<button className="btn btn-primary" onClick={previous}>
							Previous
						</button>
						<button className="btn btn-primary" type="submit">
							Next
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		complaints: state.patient.encounterData.complaints,
	};
};

export default connect(mapStateToProps, {})(Complaints);
