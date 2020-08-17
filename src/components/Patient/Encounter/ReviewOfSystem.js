import React, { useEffect, useState } from 'react';
import { reviewOfSystem } from '../../../services/constants';
import Select from 'react-select';
import { connect, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { loadEncounterData, loadEncounterForm } from '../../../actions/patient';

const ReviewOfSystem = props => {
	const [selected, setSelected] = useState();
	const [loaded, setLoaded] = useState(false);
	const { encounterData, previous, encounterForm } = props;
	// const [selectedOption, setSelectedOption] = useState([]);
	const defaultValues = {
		system: encounterForm.reviewOfSystem?.system,
		selectedSystem: encounterForm.reviewOfSystem?.selectedSystem,
	};
	const { register, handleSubmit, control } = useForm({
		defaultValues,
	});

	const dispatch = useDispatch();

	useEffect(() => {
		if (!loaded) {
			setSelected(encounterForm.reviewOfSystem?.system);
			setLoaded(true);
		}
	}, [encounterForm.reviewOfSystem, loaded]);

	const handleChange = e => {
		setSelected(e);
	};

	const onSubmit = async values => {
		encounterData.reviewOfSystem = values.selectedSystem || [];
		encounterForm.reviewOfSystem = values;
		props.loadEncounterForm(encounterForm);
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
							<Controller
								as={<Select options={reviewOfSystem} />}
								control={control}
								//rules={{ required: true }}
								onChange={([selected]) => {
									handleChange(selected);
									return selected;
								}}
								name="system"
								//defaultValue=""
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
										<label key={i}>
											<input
												type="checkbox"
												name="selectedSystem"
												className="form-control"
												ref={register}
												value={option}
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
		encounterForm: state.patient.encounterForm,
	};
};

export default connect(mapStateToProps, {
	loadEncounterData,
	loadEncounterForm,
})(ReviewOfSystem);
