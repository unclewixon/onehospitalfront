import React, { useState, useCallback, useEffect } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { request } from '../../services/utilities';
import { allergyCategories, severities } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';

const AllergyRequest = ({ history, location }) => {
	const { register, handleSubmit, setValue } = useForm();

	const [submitting, setSubmitting] = useState(false);
	const [generic, setGeneric] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [genericDrugs, setGenericDrugs] = useState([]);

	const currentPatient = useSelector(state => state.user.patient);

	const dispatch = useDispatch();

	const loadGenericDrugs = useCallback(async () => {
		try {
			dispatch(startBlock());
			const rs = await request('inventory/generics?limit=1000', 'GET', true);
			setGenericDrugs(rs.result);
			dispatch(stopBlock());
		} catch (e) {
			dispatch(stopBlock());
			notifyError('Error while fetching generic names');
		}
	}, [dispatch]);

	useEffect(() => {
		if (!loaded) {
			loadGenericDrugs();
			setLoaded(true);
		}
	}, [loadGenericDrugs, loaded]);

	const onSubmit = async values => {
		try {
			if (!currentPatient) {
				notifyError('Please select a patient');
				return;
			}

			dispatch(startBlock());
			const data = {
				category: values.category,
				allergy: values.allergy,
				severity: values.severity,
				reaction: values.reaction,
				patient_id: currentPatient.id,
				generic_id: generic?.id || '',
			};

			setSubmitting(true);
			await request('patient-allergens', 'POST', true, data);
			history.push(`${location.pathname}#allergens`);
			notifySuccess('allergy saved!');
			setSubmitting(false);
			dispatch(stopBlock());
		} catch (e) {
			dispatch(stopBlock());
			setSubmitting(false);
			notifyError(e.message || 'could not save allergy');
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
									<label>Drug Generic Name</label>
									<Select
										placeholder="Select generic name"
										defaultValue
										getOptionValue={option => option.id}
										getOptionLabel={option => option.name}
										onChange={e => {
											setGeneric(e);
										}}
										value={generic}
										isSearchable={true}
										options={genericDrugs}
									/>
								</div>
							</div>
							<div className="row">
								<div className="form-group col-sm-6">
									<label>Allergy</label>
									<input
										className="form-control"
										placeholder="Allergy"
										type="text"
										name="allergy"
										ref={register}
									/>
								</div>
								<div className="form-group col-sm-6">
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
										ref={register}
									></textarea>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-12 text-right">
									<button className="btn btn-primary" disabled={submitting}>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Save'
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

export default withRouter(AllergyRequest);
