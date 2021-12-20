import React, { useState, useEffect, useCallback } from 'react';
import SunEditor from 'suneditor-react';
import { useSelector, useDispatch } from 'react-redux';

import { updateSoapData } from '../../actions/patient';
import { CK_PAST_HISTORY } from '../../services/constants';
import SSRStorage from '../../services/storage';

const storage = new SSRStorage();

const PhysicalExamSummary = ({ next }) => {
	const [loaded, setLoaded] = useState(false);
	const [history, setHistory] = useState('');

	const encounter = useSelector(state => state.patient.soapData);

	const dispatch = useDispatch();

	const saveHistory = useCallback(
		data => {
			setHistory(data);
			storage.setLocalStorage(CK_PAST_HISTORY, data);

			dispatch(
				updateSoapData({
					...encounter,
					physicalExaminationSummary: data,
				})
			);
		},
		[dispatch, encounter]
	);

	const retrieveData = useCallback(async () => {
		const data = await storage.getItem(CK_PAST_HISTORY);
		saveHistory(data || encounter.physicalExaminationSummary);
	}, [encounter, saveHistory]);

	useEffect(() => {
		if (!loaded) {
			retrieveData();
			setLoaded(true);
		}
	}, [loaded, retrieveData]);

	const onSubmit = async e => {
		e.preventDefault();
		dispatch(
			updateSoapData({ ...encounter, physicalExaminationSummary: history })
		);
		dispatch(next);
	};

	return (
		<div className="form-block encounter">
			<form onSubmit={onSubmit}>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Physical Examination Summary</label>
							<SunEditor
								width="100%"
								placeholder="Please type here..."
								setContents={history}
								name="physical_exam"
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

export default PhysicalExamSummary;
