/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useEffect, useState } from 'react';
import Select from 'react-select';
import { reduxForm } from 'redux-form';
import HxForm from './HxForm';
import { Controller, ErrorMessage, useForm } from 'react-hook-form';
import { connect, useDispatch } from 'react-redux';
import {
	add_allergies,
	fetch_Allergies,
	loadEncounterData,
	loadEncounterForm,
} from '../../../actions/patient';
import { v4 as uuidv4 } from 'uuid';
import {
	allergyCategories,
	API_URI,
	patientAPI,
	severity,
} from '../../../services/constants';
import { request } from '../../../services/utilities';
import { notifyError } from '../../../services/notify';
import searchingGIF from '../../../assets/images/searching.gif';
import Tooltip from 'antd/lib/tooltip';
import { Link } from 'react-router-dom';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

const Allergies = props => {
	const [loaded, setLoaded] = useState(false);
	const [queried, setQueried] = useState(false);

	const dispatch = useDispatch();
	let {
		previous,
		next,
		allergiesProp,
		patient,
		encounterData,
		encounterForm,
	} = props;

	let [data, setData] = useState([]);
	const append = () => {
		setData([...data, { id: data.length }]);
	};
	const remove = index => {
		setData([...data.slice(0, index), ...data.slice(index + 1)]);
	};
	const defaultValues = {
		category: encounterForm.allergies?.category,
		allergy: encounterForm.allergies?.allergy,
		reaction: encounterForm.allergies?.reaction,
		severity: encounterForm.allergies?.severity,
	};

	const { register, handleSubmit, setValue, control, errors } = useForm({
		defaultValues,
	});
	useEffect(() => {
		if (defaultValues?.category?.length > 0) {
			defaultValues.category.map((item, index) => {
				data = [...data, { id: index }];
			});
			setData(data);
		}
	}, []);
	const fetchAllergies = async () => {
		setLoaded(true);
		setQueried(true);
		try {
			const rs = await request(
				`${API_URI}${patientAPI}/${patient.id}/allergies`,
				'GET',
				true
			);
			rs.map((value, i) => {
				const theID = data.length;
				setData([...data, { id: theID }]);
				console.log(encounterForm);

				let allergiesForm = [];
				allergiesForm.allergy = [];
				allergiesForm.allergy.splice(theID, 0, value.allergy);
				allergiesForm.reaction = [];
				allergiesForm.reaction.splice(theID, 0, value.reaction);
				allergiesForm.category = [];
				allergiesForm.category.splice(theID, 0, {
					value: value.category,
					label: value.category,
				});
				allergiesForm.severity = [];
				allergiesForm.severity.splice(theID, 0, {
					value: value.severity,
					label: value.severity,
				});
				console.log(allergiesForm.severity);
				setValue('severity', allergiesForm.severity);
			});
			setLoaded(false);
		} catch (error) {
			console.log(error);
			setLoaded(false);
			notifyError('Could not fetch allergies for the patient');
		}
	};

	const handleChecked = async e => {
		if (e.target.checked && !queried) {
			fetchAllergies().then(res => {});
		}
	};
	const onSubmit = async values => {
		let category = values.category;
		let allergyField = values.allergy;
		let reaction = values.reaction;
		let severityField = values.severity;

		let allergiesToSave = [];
		category.forEach(function(value, i) {
			let _ToSave = [];
			_ToSave['category'] = value.label;
			_ToSave['allergen'] = allergyField[i];
			_ToSave['reaction'] = reaction[i];
			_ToSave['severity'] = severityField[i].label;
			allergiesToSave = [...allergiesToSave, _ToSave];
		});

		console.log(allergiesToSave, values);
		encounterForm.allergies = values;
		props.loadEncounterForm(encounterForm);
		encounterData.allergies = allergiesToSave;
		props.loadEncounterData(encounterData);
		//dispatch(props.next);
	};

	const divStyle = {
		height: '500px',
		overflow: 'scroll',
	};

	return (
		<div className="form-block encounter" style={divStyle}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-md-12">
						<a
							className="btn btn-success btn-sm text-white"
							onClick={() => {
								append();
							}}>
							<i className="os-icon os-icon-plus-circle" />
							<span>add allergen</span>
						</a>
					</div>
				</div>

				{loaded ? (
					<div className="row">
						<img alt="searching" src={searchingGIF} />
					</div>
				) : (
					<>
						<div className="row">
							<div className="col-sm-6">
								{data.map((allergy, i) => {
									return (
										<div className="mt-4" key={i}>
											<div className="row">
												<div className="col-md-12">
													<a
														className="text-danger"
														onClick={() => remove(allergy.id)}
														style={{ lineHeight: '78px' }}>
														<i className="os-icon os-icon-cancel-circle" />{' '}
														remove allergen
													</a>
												</div>
											</div>
											<div className="row">
												<div className="col-md-12">
													<div className="form-group">
														<label>Category</label>
														<Controller
															as={
																<Select
																	placeholder="Select Allergy Category"
																	options={allergyCategories}
																	// onChange={evt => {
																	// 	category[allergy.id] = evt;
																	// 	setCategory(category);
																	// }}
																/>
															}
															control={control}
															rules={{ required: true }}
															onChange={([selected]) => {
																return selected;
															}}
															name={`category[${allergy.id}]`}
														/>
														<ErrorMessage
															errors={errors}
															name={`category[${allergy.id}]`}
															message="This is required"
															as={<span className="alert alert-danger" />}
														/>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-12">
													<div className="form-group">
														<label>Allergen</label>
														<input
															className="form-control"
															placeholder="Allergy"
															type="text"
															ref={register}
															name={`allergy[${allergy.id}]`}
															// value={allergyField[allergy.id]}
															// onChange={evt => {
															// 	allergyField[allergy.id] = evt.target.value;
															// 	setAllergy(allergyField);
															// }}
														/>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-12">
													<div className="form-group">
														<label>Reaction</label>
														<input
															type="text"
															ref={register}
															name={`reaction[${allergy.id}]`}
															//value={reaction[allergy.id]}
															// onChange={evt => {
															// 	reaction[allergy.id] = evt.target.value;
															// 	setReaction(reaction);
															// }}
															placeholder="Reaction"
															className="form-control"
														/>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-12">
													<div className="form-group">
														<label>Severity</label>

														<Controller
															as={
																<Select
																	placeholder="Select severity"
																	options={severity}
																	// onChange={evt => {
																	// 	severityField[allergy.id] = evt;
																	// 	setSeverity(severityField);
																	// }}
																/>
															}
															control={control}
															rules={{ required: true }}
															onChange={([selected]) => {
																return selected;
															}}
															name={`severity[${allergy.id}]`}
														/>
														<ErrorMessage
															errors={errors}
															name={`severity[${allergy.id}]`}
															message="This is required"
															as={<span className="alert alert-danger" />}
														/>
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
							<div className="col-sm-6">
								<div className="form-group">
									<label>
										Existing Allergies{' '}
										<input
											type="checkbox"
											className="form-control"
											onChange={evt => {
												handleChecked(evt);
											}}
										/>
									</label>
								</div>
							</div>
						</div>
					</>
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

const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
		allergiesProp: state.patient.allergies,
		encounterData: state.patient.encounterData,
		encounterForm: state.patient.encounterForm,
	};
};
export default connect(mapStateToProps, {
	fetch_Allergies,
	loadEncounterData,
	loadEncounterForm,
})(Allergies);
