import React, { Component, useState } from 'react';
import { reviewOfSystem } from '../../../services/constants';
import Select from 'react-select';
import { connect, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { loadEncounterData } from '../../../actions/patient';

const ReviewOfSystem = props => {
	const [selected, setSelected] = useState();
	const [selectedOption, setSelectedOption] = useState([]);
	const { register, handleSubmit } = useForm();
	const { encounterData, previous, next } = props;
	const dispatch = useDispatch();

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

	const onSubmit = async values => {
		encounterData.reviewOfSystem = selectedOption;
		props.loadEncounterData(encounterData);
		dispatch(props.next);
	};

	const divStyle = {
		height: '500px',
	};
	return (
		<div className="form-block encounter" style={divStyle}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<Select
								name="system"
								ref={register({ name: 'system' })}
								options={reviewOfSystem}
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
												ref={register({ name: 'selectedSystem' })}
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
			</form>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		encounterData: state.patient.encounterData,
	};
};

export default connect(mapStateToProps, { loadEncounterData })(ReviewOfSystem);
