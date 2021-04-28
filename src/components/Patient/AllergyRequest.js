import React, { useState } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { request } from '../../services/utilities';
import {
	allergyCategories,
	patientAPI,
	severities,
} from '../../services/constants';
import { add_allergies } from '../../actions/patient';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import { useHistory } from 'react-router-dom';

const AllergyRequest = props => {
	let history = useHistory();

	const { register, handleSubmit, setValue } = useForm();

	const [submitting, setSubmitting] = useState(false);

	const onSubmit = async values => {
		let { patient } = props;
		let data = {
			category: values.category,
			allergy: values.allergy,
			severity: values.severity,
			reaction: values.reaction,
			patient_id: patient.id,
		};
		setSubmitting(true);
		try {
			const rs = await request(
				`${patientAPI}/save-allergies`,
				'POST',
				true,
				data
			);
			props.add_allergies(rs);
			history.push('settings/roles#allergies');
			notifySuccess('allergies saved');
			setSubmitting(false);
		} catch (e) {
			setSubmitting(false);
			notifyError(e.message || 'could not save allergies');
		}
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<h6 className="element-header">New Allergy</h6>
				<div className="element-box">
					<div className="form-block w-100">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="row">
								<div className="form-group col-sm-6">
									<label>Category</label>
									<Select
										name="category"
										placeholder="Select Allergy Category"
										options={allergyCategories}
										ref={register({ name: 'category' })}
										onChange={evt => {
											if (evt === null) {
												setValue('category', null);
											} else {
												setValue('category', String(evt.value));
											}
										}}
										required
									/>
								</div>

								<div className="form-group col-sm-6">
									<label>Allergy00</label>
									<input
										className="form-control"
										placeholder="Allergy"
										type="text"
										name="allergy"
										ref={register}
									/>
								</div>
							</div>

							<div className="row">
								<div className="form-group col-sm-12">
									<label>Severity </label>
									<Select
										name="severity"
										placeholder="Select severity"
										options={severities}
										ref={register({ name: 'severity' })}
										onChange={evt => {
											if (evt === null) {
												setValue('severity', null);
											} else {
												setValue('severity', String(evt.value));
											}
										}}
										required
									/>
								</div>
							</div>
							<div className="row">
								<div className="form-group col-sm-12">
									<label>Reaction</label>
									<textarea
										required
										className="form-control"
										name="reaction"
										rows="3"
										placeholder="Enter reaction"
										ref={register}></textarea>
								</div>
							</div>

							<div>
								<div className="col-sm-12 text-right">
									<button className="btn btn-primary" disabled={submitting}>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Create Allergy Request'
										)}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
		allergies: state.patient.allergies,
	};
};

export default connect(mapStateToProps, { add_allergies })(AllergyRequest);
