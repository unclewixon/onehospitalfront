import React, { useEffect, useState, useCallback } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import {
	physicalExamination,
	CK_PHYSICAL_EXAM,
} from '../../../services/constants';
import { updateEncounterData } from '../../../actions/patient';
import SSRStorage from '../../../services/storage';

const storage = new SSRStorage();

const PhysicalExam = ({ next, previous }) => {
	const [loaded, setLoaded] = useState(false);
	const [system, setSystem] = useState(null);
	const [options, setOptions] = useState([]);

	const encounter = useSelector(state => state.patient.encounterData);

	const dispatch = useDispatch();

	const retrieveData = useCallback(async () => {
		const data = await storage.getItem(CK_PHYSICAL_EXAM);
		setOptions(data || encounter.physicalExamination);
	}, [encounter]);

	useEffect(() => {
		if (!loaded) {
			retrieveData();
			setLoaded(true);
		}
	}, [loaded, retrieveData]);

	const handleChange = e => setSystem(e);

	const onChecked = (e, label) => {
		const value = e.target.value;
		const selected = options.find(o => o.value === value);
		if (selected) {
			const filtered = options.filter(o => o.value !== value);
			setOptions(filtered);
			storage.setItem(CK_PHYSICAL_EXAM, filtered);
		} else {
			const items = [...options, { label, value }];
			setOptions(items);
			storage.setItem(CK_PHYSICAL_EXAM, items);
		}
	};

	const onSubmit = () => {
		dispatch(
			updateEncounterData({ ...encounter, physicalExamination: options })
		);
		dispatch(next);
		next();
	};

	const divStyle = {
		minHeight: '180px',
	};

	return (
		<div className="form-block encounter" style={divStyle}>
			<div style={divStyle}>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<Select
								options={physicalExamination}
								defaultValue={system}
								onChange={e => handleChange(e)}
								value={system}
							/>
						</div>
					</div>
				</div>
				{system && (
					<div className="row">
						<div className="col-sm-12">
							<div className="form-group">
								<label>{system.label}</label>
								{system.children.map((option, i) => {
									const selected = options.find(o => o.value === option);
									return (
										<div key={i}>
											<label>
												<input
													type="checkbox"
													name="selectedPhysicalExam"
													className="form-control"
													value={option}
													checked={!!selected}
													onChange={e => onChecked(e, system.label)}
												/>
												{option}
											</label>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="row mt-5">
				<div className="col-sm-12 d-flex ant-row-flex-space-between">
					<button className="btn btn-primary" onClick={() => previous()}>
						Previous
					</button>
					<button className="btn btn-primary" onClick={() => onSubmit()}>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default PhysicalExam;
