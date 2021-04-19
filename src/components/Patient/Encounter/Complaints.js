import React, { useState, useEffect } from 'react';
import SunEditor from 'suneditor-react';
import { useSelector, useDispatch } from 'react-redux';

import { updateEncounterData } from '../../../actions/patient';

const Complaints = ({ next }) => {
	const [loaded, setLoaded] = useState(false);
	const [complaint, setComplaint] = useState('');

	const encounter = useSelector(state => state.patient.encounterData);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!loaded) {
			setComplaint(encounter.complaints);
			setLoaded(true);
		}
	}, [encounter, loaded]);

	const onSubmit = async e => {
		e.preventDefault();
		dispatch(updateEncounterData({ ...encounter, complaints: complaint }));
		dispatch(next);
	};

	return (
		<div className="form-block encounter">
			<form onSubmit={onSubmit}>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Presenting Complaints</label>
							<SunEditor
								width="100%"
								placeholder="Please type here..."
								setContents={complaint}
								name="complaint_data"
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
											'codeView',
										],
									],
								}}
								onChange={e => {
									setComplaint(String(e));
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

export default Complaints;
