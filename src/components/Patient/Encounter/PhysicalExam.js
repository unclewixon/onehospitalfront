import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import { physicalExamination } from '../../../services/constants';
import { loadEncounterData, loadEncounterForm } from '../../../actions/patient';

const PhysicalExam = ({ next, previous }) => {
	const [selected, setSelected] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [options, setOptions] = useState([]);

	const encounterData = useSelector(state => state.patient.encounterData);
	const encounterForm = useSelector(state => state.patient.encounterForm);

	const dispatch = useDispatch();

	const handleChange = e => setSelected(e);

	useEffect(() => {
		if (!loaded) {
			setSelected(encounterForm?.physicalExamination?.physicalExam);
			setOptions(encounterData?.physicalExamination);
			setLoaded(true);
		}
	}, [encounterData, encounterForm, loaded]);

	const onChecked = e => {
		const value = e.target.value;
		const selected = options.find(o => o === value);
		if (selected) {
			const filtered = options.filter(o => o !== value);
			setOptions(filtered);
		} else {
			setOptions([...options, value]);
		}
	};

	const onSubmit = () => {
		encounterData.physicalExamination = options || [];
		encounterForm.physicalExamination = { physicalExam: selected };
		dispatch(loadEncounterForm(encounterForm));
		dispatch(loadEncounterData(encounterData));
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
								defaultValue={selected}
								onChange={e => handleChange(e)}
								value={selected}
							/>
						</div>
					</div>
				</div>
				{selected && (
					<div className="row">
						<div className="col-sm-12">
							<div className="form-group">
								<label>{selected.label}</label>
								{selected.children.map((option, i) => {
									const selected = options.find(o => o === option);
									return (
										<div key={i}>
											<label>
												<input
													type="checkbox"
													name="selectedPhysicalExam"
													className="form-control"
													value={option}
													checked={!!selected}
													onChange={e => onChecked(e)}
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
