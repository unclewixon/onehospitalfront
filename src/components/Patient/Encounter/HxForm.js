import React, { Component, useState } from 'react';
import { renderSelect } from '../../../services/utilities';
import { obstericHistory } from '../../../services/constants';
import { Field, reduxForm } from 'redux-form';
import { ObstericsHistory } from '../../Enrollment/ObstericsHistory';
import { connect, useDispatch } from 'react-redux';
import { loadEncounterData } from '../../../actions/patient';
import { useForm } from 'react-hook-form';

let HxForm = props => {
	const [patientHistory, setPatientHistory] = useState('');
	const { register, handleSubmit } = useForm();
	const dispatch = useDispatch();
	const { encounterData, previous, next } = props;

	const handleSelection = e => {
		setPatientHistory(e.target.value);
	};
	const onSubmit = async values => {
		encounterData.patientHistory = [patientHistory];
		props.loadEncounterData(encounterData);
		dispatch(props.next);
	};

	return (
		<div className="form-block encounter">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<Field
								id="obstericsHistory"
								required
								name="obstericsHistory"
								component={renderSelect}
								label="Select Previous Obsteric History"
								placeholder="Select Previous Obsteric History"
								onChange={evt => {
									handleSelection(evt);
								}}
								data={obstericHistory}
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

HxForm = reduxForm({
	form: 'create_hx',
})(HxForm);

const mapStateToProps = state => {
	return {
		encounterData: state.patient.encounterData,
	};
};
export default connect(mapStateToProps, { loadEncounterData })(HxForm);
