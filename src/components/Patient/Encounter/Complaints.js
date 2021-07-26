import React, { useState, useEffect, useCallback } from 'react';
import SunEditor from 'suneditor-react';
import { useSelector, useDispatch } from 'react-redux';

import { updateEncounterData } from '../../../actions/patient';
import SSRStorage from '../../../services/storage';
import { CK_COMPLAINTS } from '../../../services/constants';

const storage = new SSRStorage();

const Complaints = ({ next }) => {
	const [loaded, setLoaded] = useState(false);
	const [complaint, setComplaint] = useState('');

	const encounter = useSelector(state => state.patient.encounterData);

	const dispatch = useDispatch();

	const saveComplaints = useCallback(
		data => {
			setComplaint(data);
			storage.setLocalStorage(CK_COMPLAINTS, data);

			dispatch(
				updateEncounterData({
					...encounter,
					complaints: data,
				})
			);
		},
		[dispatch, encounter]
	);

	const retrieveData = useCallback(async () => {
		const data = await storage.getItem(CK_COMPLAINTS);
		saveComplaints(data || encounter.complaints);
	}, [encounter, saveComplaints]);

	useEffect(() => {
		if (!loaded) {
			retrieveData();
			setLoaded(true);
		}
	}, [loaded, retrieveData]);

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
									saveComplaints(String(e));
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
