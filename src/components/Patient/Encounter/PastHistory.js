import React, { useState, useEffect, useCallback } from 'react';
import SunEditor from 'suneditor-react';
import { useSelector, useDispatch } from 'react-redux';

import { updateEncounterData } from '../../../actions/patient';
import { defaultEncounter, CK_ENCOUNTER } from '../../../services/constants';
import SSRStorage from '../../../services/storage';

const storage = new SSRStorage();

const PastHistory = ({ next, previous, patient }) => {
	const [loaded, setLoaded] = useState(false);
	const [history, setHistory] = useState('');

	const encounter = useSelector(state => state.patient.encounterData);

	const dispatch = useDispatch();

	const saveHistory = useCallback(
		data => {
			setHistory(data);
			dispatch(
				updateEncounterData(
					{
						...encounter,
						medicalHistory: data,
					},
					patient.id
				)
			);
		},
		[dispatch, encounter, patient]
	);

	const retrieveData = useCallback(async () => {
		const data = await storage.getItem(CK_ENCOUNTER);
		const encounterData =
			data && data.patient_id === patient.id
				? data?.encounter?.medicalHistory
				: null;
		saveHistory(encounterData || defaultEncounter.medicalHistory);
	}, [patient, saveHistory]);

	useEffect(() => {
		if (!loaded) {
			retrieveData();
			setLoaded(true);
		}
	}, [loaded, retrieveData]);

	const onSubmit = async e => {
		e.preventDefault();
		dispatch(
			updateEncounterData({ ...encounter, medicalHistory: history }, patient.id)
		);
		next();
	};

	return (
		<div className="form-block encounter">
			<form onSubmit={onSubmit}>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Presenting Past Medical History</label>
							<SunEditor
								width="100%"
								placeholder="Please type here..."
								setContents={history}
								name="history_data"
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
									saveHistory(String(e));
								}}
							/>
						</div>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-sm-12 d-flex space-between">
						<button className="btn btn-primary" onClick={() => previous()}>
							Previous
						</button>
						<button className="btn btn-primary" onClick={() => onSubmit()}>
							Next
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default PastHistory;
