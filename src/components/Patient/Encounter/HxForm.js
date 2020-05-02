import React, { Component, useState } from 'react';
import { renderSelect } from '../../../services/utilities';
import { Field, reduxForm } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import { loadEncounterData, loadEncounterForm } from '../../../actions/patient';
import { Controller, ErrorMessage, useForm } from 'react-hook-form';
import Select from 'react-select';

const obstericHistory = [
	{
		value: 'Family History',
		label: 'Family History',
	},
	{
		value: 'Social History',
		label: 'Social History',
	},
	{
		value: 'Gynae History',
		label: 'Gynae History',
	},
	{
		value: 'Obsteric History',
		label: 'Obsteric History',
	},
	{
		value: 'Sexual History',
		label: 'Sexual History',
	},
	{
		value: 'Gynae Pap-Mear History',
		label: 'Gynae Pap-Mear History',
	},
	{
		value: 'FGM',
		label: 'FGM',
	},
	{
		value: 'Past Ocular History',
		label: 'Past Ocular History',
	},
	{
		value: 'Antenatal General/Physical Examination',
		label: 'Antenatal General/Physical Examination',
	},
	{
		value: 'Antenatal Initial Assessment',
		label: 'Antenatal Initial Assessment',
	},

	{
		value: 'Antenatal Lab Observations',
		label: 'Antenatal Lab Observations',
	},
	{
		value: 'Antenatal Routine Assessments',
		label: 'Antenatal Routine Assessments',
	},
];
const HxForm = props => {
	const [patientHistory, setPatientHistory] = useState('');
	const { encounterData, previous, next, encounterForm } = props;

	const defaultValues = {
		obstericsHistory: encounterForm.patientHistory?.obstericsHistory,
	};
	const { register, handleSubmit, control, errors } = useForm({
		defaultValues,
	});

	const dispatch = useDispatch();
	const onSubmit = async values => {
		encounterForm.patientHistory = values;
		props.loadEncounterForm(encounterForm);
		encounterData.patientHistory = [patientHistory];
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
							<label> Select Previous Obsteric History </label>
							<Controller
								as={
									<Select
										options={obstericHistory}
										placeholder="Select Previous Obsteric History"
									/>
								}
								control={control}
								rules={{ required: true }}
								onChange={([selected]) => {
									return selected;
								}}
								name="obstericsHistory"
							/>
							<ErrorMessage
								errors={errors}
								name="obstericsHistory"
								message="This is required"
								as={<span className="alert alert-danger" />}
							/>
						</div>
					</div>
				</div>

				<div className="row mt-5">
					<div className="col-sm-12 d-flex ant-row-flex-space-between">
						<button
							type="button"
							className="btn btn-primary"
							onClick={previous}>
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
})(HxForm);
