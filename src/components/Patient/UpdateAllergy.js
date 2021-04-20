import React, { useState } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { request } from '../../services/utilities';
import { patientAPI, severities } from '../../services/constants';
import { update_allergy } from '../../actions/patient';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import { useHistory } from 'react-router-dom';

const allergyCategories = [
	{ value: 'Drug', label: 'Drug' },
	{ value: 'Food', label: 'Food' },
	{ value: 'Environment', label: 'Environment' },
	{ value: 'other', label: 'other' },
];

const UpdateAllergy = ({ Allergy, patient }, props) => {
	const initialState = {
		category: Allergy.category,
		allergy: Allergy.allergy,
		severity: Allergy.severity,
		reaction: Allergy.reaction,
		patient_id: Allergy.patient_id,
	};
	let history = useHistory();
	const [{ category, allergy, severity, reaction }, setState] = useState(
		initialState
	);
	const [submitting, setSubmitting] = useState(false);

	const onSubmit = async e => {
		e.preventDefault();
		const data = {
			category: category,
			allergy: allergy,
			severity: severity,
			reaction: reaction,
			patient_id: patient.id,
		};
		setSubmitting(true);
		try {
			const rs = await request(
				`${patientAPI}/${Allergy.id}/update-allergy`,
				'PATCH',
				true,
				data
			);
			props.update_allergy(rs.allergy, Allergy);
			history.push('settings/roles#allergies');
			notifySuccess('Allergy updated');
			setSubmitting(false);
		} catch (e) {
			setSubmitting(false);
			notifyError(e.message || 'Could not update allergy');
		}
	};
	const handleInputChange = e => {
		console.log(e.target);
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	// let { allergy } = props;
	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<h6 className="element-header">Update Allergy</h6>
				<div className="element-box">
					<div className="form-block w-100">
						<form onSubmit={onSubmit}>
							<div className="row">
								<div className="form-group col-sm-6">
									<label>Category</label>
									<Select
										name="category"
										placeholder="Select Allergy Category"
										options={allergyCategories}
										defaultValue={{ label: category, value: category }}
										value={{ label: category, value: category }}
										onChange={evt => {
											setState(prevState => ({
												...prevState,
												category: evt.value,
											}));
										}}
										required
									/>
								</div>

								<div className="form-group col-sm-6">
									<label>Allergy</label>
									<input
										className="form-control"
										placeholder="Allergy"
										type="text"
										name="allergy"
										value={allergy}
										onChange={handleInputChange}
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
										value={{ label: severity, value: severity }}
										defaultValue={{ label: severity, value: severity }}
										onChange={evt => {
											setState(prevState => ({
												...prevState,
												severity: evt.value,
											}));
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
										value={reaction}
										onChange={handleInputChange}></textarea>
								</div>
							</div>

							<div>
								<div className="col-sm-12 text-right">
									<button className="btn btn-primary" disabled={submitting}>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Update Allergy Request'
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
		Allergy: state.patient.allergy,
	};
};

export default connect(mapStateToProps, { update_allergy })(UpdateAllergy);
