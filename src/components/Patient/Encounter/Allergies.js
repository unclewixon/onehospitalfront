/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import { Controller, ErrorMessage, useForm } from 'react-hook-form';
import { connect, useDispatch } from 'react-redux';
import {
	fetch_Allergies,
	loadEncounterData,
	loadEncounterForm,
} from '../../../actions/patient';

import {
	allergyCategories,
	patientAPI,
	severity,
} from '../../../services/constants';
import { request } from '../../../services/utilities';
import { notifyError } from '../../../services/notify';
import searchingGIF from '../../../assets/images/searching.gif';

const Allergies = props => {
	const [loaded, setLoaded] = useState(false);
	const [queried, setQueried] = useState(false);

	const dispatch = useDispatch();

	let { previous, encounterData, encounterForm } = props;

	let [data, setData] = useState([]);
	const defaultValues = {
		allForm: encounterForm.allergies?.allForm || [],
	};
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		control,
		errors,
		// watch,
	} = useForm({
		defaultValues,
	});

	useEffect(() => {
		if (defaultValues?.allForm?.length > 0) {
			// eslint-disable-next-line array-callback-return
			defaultValues.allForm.map((item, index) => {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				data = [...data, { id: index }];
			});
			setData(data);
		}
	}, [defaultValues]);

	const append = () => {
		setData([...data, { id: data.length }]);
	};
	const remove = index => {
		setData([...data.slice(0, index), ...data.slice(index + 1)]);
	};

	const fetchAllergies = async () => {
		const { patient } = props.encounterInfo;

		setLoaded(true);
		setQueried(true);
		try {
			const rs = await request(
				`${patientAPI}/${patient.id}/allergies`,
				'GET',
				true
			);

			let newForm = getValues({ nest: true })['allForm'] || [];
			// eslint-disable-next-line array-callback-return
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
		encounterForm.allergies = values;
		props.loadEncounterForm(encounterForm);

		let form = values.allForm || [];
		let reformatPersons = [];
		if (form.length > 0) {
			reformatPersons = form.map((value, index, array) => {
				return {
					category: value.category.value,
					severity: value.severity.value,
					allergy: value.allergy,
					reaction: value.reaction,
				};
			});
		}

		encounterData.allergies = reformatPersons;
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
		allergiesProp: state.patient.allergies,
		encounterData: state.patient.encounterData,
		encounterForm: state.patient.encounterForm,
		encounterInfo: state.general.encounterInfo,
	};
};
export default connect(mapStateToProps, {
	fetch_Allergies,
	loadEncounterData,
	loadEncounterForm,
})(Allergies);
