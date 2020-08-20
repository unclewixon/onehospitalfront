import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import { useForm } from 'react-hook-form';
import { connect, useDispatch } from 'react-redux';

import { loadEncounterData } from '../../../actions/patient';

const Complaints = props => {
	const { register, handleSubmit } = useForm();
	const [complaint, setComplaint] = useState('');
	let { encounterData } = props;
	const dispatch = useDispatch();

	const handleChange = e => {
		setComplaint(e);
	};

	// const handleFocus = e => {
	// 	var temp_value = e.target.textContent;
	// 	e.target.textContent = '';
	// 	e.target.textContent = temp_value;
	// };

	const onSubmit = async values => {
		encounterData.complaints = complaint;
		props.loadEncounterData(encounterData);
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
								setContents={encounterData.complaints}
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
						<button className="btn btn-primary" disabled>
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
		encounterData: state.patient.encounterData,
	};
};

export default connect(mapStateToProps, { loadEncounterData })(Complaints);
