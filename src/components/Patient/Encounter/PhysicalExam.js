import React, { Component, useState } from 'react';
import { physicalExamination } from '../../../services/constants';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { connect, useDispatch } from 'react-redux';
import { loadEncounterData } from '../../../actions/patient';

const PhysicalExam = props => {
	const [selected, setSelected] = useState();
	const { encounterData, previous, next } = props;
	const dispatch = useDispatch();
	const [selectedOption, setSelectedOption] = useState([]);
	const { register, handleSubmit } = useForm();

	const handleChange = e => {
		setSelected(e);
	};
	const handleSelection = e => {
		console.log(e.target.checked);
		selectedOption.forEach(function(value, i) {
			if (value === e.target.value) {
				selectedOption.splice(i, 1);
			}
		});
		if (e.target.checked) {
			setSelectedOption([...selectedOption, e.target.value]);
		}

		console.log(e);
	};
	const divStyle = {
		height: '500px',
	};

	const onSubmit = async values => {
		console.log(selectedOption);
		encounterData.physicalExamination = selectedOption;
		props.loadEncounterData(encounterData);
		dispatch(props.next);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="form-block encounter" style={divStyle}>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<Select
								name="ethnicity"
								options={physicalExamination}
								onChange={evt => {
									handleChange(evt);
								}}
							/>
						</div>
					</div>
				</div>
				{selected && (
					<div className="row">
						<div className="col-sm-12">
							<div className="form-group">
								<label>{selected.label}</label>
								{selected.children.map((option, i) => (
									<div key={i}>
										<label>
											<input
												type="checkbox"
												className="form-control"
												value={option}
												onChange={evt => {
													handleSelection(evt);
												}}
											/>
											{option}
										</label>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

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
			</div>
		</form>
	);
};
const mapStateToProps = state => {
	return {
		encounterData: state.patient.encounterData,
	};
};

export default connect(mapStateToProps, { loadEncounterData })(PhysicalExam);
