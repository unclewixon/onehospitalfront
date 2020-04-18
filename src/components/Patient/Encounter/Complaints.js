import React, { Component, useEffect, useState } from 'react';
import SunEditor from 'suneditor-react';
import { useForm } from 'react-hook-form';
import { connect, useDispatch } from 'react-redux';
import { UPDATE_COMPLAINT_DATA } from '../../../actions/types';

const Complaints = props => {
	// const [complaint, setComplaint] = useState();
	let { complaints } = props;
	const dispatch = useDispatch();

	const handleChange = e => {
		// console.log(e);
		dispatch({
			type: UPDATE_COMPLAINT_DATA,
			payload: e,
		});
	};
	const handleFocus = e => {
		var temp_value = e.target.textContent;
		e.target.textContent = '';
		e.target.textContent = temp_value;
	};
	// useEffect(() => {
	// 	return () => {
	// 		dispatch({
	// 			type: UPDATE_COMPLAINT_DATA,
	// 			payload: complaint,
	// 		})
	// 	};
	// });
	return (
		<div className="form-block encounter">
			<div className="row">
				<div className="col-sm-12">
					<div className="form-group">
						<label>Presenting Complaints</label>
						<SunEditor
							width="100%"
							placeholder="Please type here..."
							setContents={complaints}
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
							onFocus={handleFocus}
							onChange={evt => {
								handleChange(String(evt));
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		complaints: state.patient.encounterData.complaints,
	};
};

export default connect(mapStateToProps, {})(Complaints);
