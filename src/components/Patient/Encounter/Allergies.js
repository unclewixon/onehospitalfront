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
	const defaultValues = {
		allForm: encounterForm.allergies?.allForm || [],
	};
	console.log(defaultValues.allForm);
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		control,
		errors,
		watch,
	} = useForm({
		defaultValues,
	});

	useEffect(() => {
		if (defaultValues?.allForm?.length > 0) {
			defaultValues.allForm.map((item, index) => {
				data = [...data, { id: index }];
			});
			setData(data);
		}
	}, [defaultValues?.allForm]);

	const append = () => {
		setData([...data, { id: data.length }]);
	};
	const remove = index => {
		setData([...data.slice(0, index), ...data.slice(index + 1)]);
	};

	const fetchAllergies = async () => {
		setLoaded(true);
		setQueried(true);
		try {
			const rs = await request(
				`${API_URI}${patientAPI}/${patient.id}/allergies`,
				'GET',
				true
			);

			let newForm = getValues({ nest: true })['allForm'] || [];
			rs.map((value, i) => {
				data = [...data, { id: data.length }];
				newForm = [
					...newForm,
					{
						category: {
							value: value.category,
							label: value.category,
						},
						severity: {
							value: value.severity,
							label: value.severity,
						},
						allergy: value.allergy,
						reaction: value.reaction,
					},
				];
			});
			setData(data);
			setValue('allForm', newForm);
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
		console.log(values);
		encounterForm.allergies = values;
		props.loadEncounterForm(encounterForm);
		encounterData.allergies = values.allForm;
		props.loadEncounterData(encounterData);
		dispatch(props.next);
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
								{data.map((form, index) => {
									return (
										<div className="mt-4" key={index}>
											<div className="row">
												<div className="col-md-12">
													<a
														className="text-danger"
														onClick={() => remove(form.id)}
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
															name={`allForm[${form.id}].category`}
														/>
														<ErrorMessage
															errors={errors}
															name={`allForm[${form.id}].category`}
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
															name={`allForm[${form.id}].allergy`}
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
															name={`allForm[${form.id}].reaction`}
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
																/>
															}
															control={control}
															rules={{ required: true }}
															onChange={([selected]) => {
																return selected;
															}}
															name={`allForm[${form.id}].severity`}
														/>
														<ErrorMessage
															errors={errors}
															name={`allForm[${form.id}].severity`}
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
