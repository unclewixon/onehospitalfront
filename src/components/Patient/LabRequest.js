/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { useForm } from 'react-hook-form';

import { searchAPI, serviceCenter } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { request } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import {
	getAllLabTests,
	getAllLabGroups,
	getAllLabTestCategories,
	getAllLabTestParameters,
} from '../../actions/settings';
import { createLabRequest } from '../../actions/patient';

const LabRequest = props => {
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			service_center: 'lab',
		},
	});
	const [submitting, setSubmitting] = useState(false);
	const [query, setQuery] = useState('');
	const [searching, setSearching] = useState(false);
	const [patients, setPatients] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [category, setCategory] = useState('');
	const [labTests, setLabTests] = useState(null);
	const [labCombos, setLabCombos] = useState(null);
	const [urgent, setUrgent] = useState(false);

	const handleMultipleSelectInput = (field, selected) => {
		if (field === 'lab_combos') {
			setLabCombos(selected);
		}
		if (field === 'lab_tests_torequest') {
			setLabTests(selected);
		}
	};

	const onCategoryChange = e => {
		setCategory(e.value);
	};

	const labCatsOptions =
		props && props.LabCategories
			? props.LabCategories.map((cats, index) => {
					return { value: cats.id, label: cats.name };
			  })
			: [];

	const labGroupOptions =
		props && props.LabGroups
			? props.LabGroups.filter(groups =>
					groups && groups.category && groups.category.id === category
						? true
						: false
			  ).map((grp, index) => {
					return { value: grp.id, label: grp.name, id: grp.id };
			  })
			: [];

	const labTestOptions =
		props && props.LabTests
			? props.LabTests.filter(test => test.category.id === category).map(
					(test, index) => {
						return { value: test.id, label: test.name, id: test.id };
					}
			  )
			: [];

	const structuredTest = () => {
		const parameterObj = {};
		// eslint-disable-next-line no-unused-vars
		const parVals =
			props && props.LabParameters && props.LabParameters.length
				? // eslint-disable-next-line array-callback-return
				  props.LabParameters.map(par => {
						parameterObj[par.id] = par;
				  })
				: [];

		const testObj = {};
		// eslint-disable-next-line no-unused-vars
		const testVals =
			props && props.LabTests && props.LabTests.length
				? // eslint-disable-next-line array-callback-return
				  props.LabTests.map(test => {
						testObj[test.id] = test;
				  })
				: [];

		const lab_test =
			labTests && labTests.length
				? labTests.map(test => {
						const fullParams = testObj[test.value].parameters.map(par => {
							const newParamObj = {
								parameter_type: 'parameter',
								referenceRange: par.referenceRange,
								...parameterObj[par.parameter_id],
							};
							return newParamObj;
						});
						const fullTest = {
							...testObj[test.value],
							parameters: fullParams,
						};
						return fullTest;
				  })
				: [];
		return lab_test;
	};

	const structuredGroup = () => {
		const parameterObj = {};
		// eslint-disable-next-line no-unused-vars
		const parVals =
			props && props.LabParameters && props.LabParameters.length
				? // eslint-disable-next-line array-callback-return
				  props.LabParameters.map(par => {
						parameterObj[par.id] = par;
				  })
				: [];

		const groupObj = {};
		// eslint-disable-next-line no-unused-vars
		const groupVals =
			props && props.LabGroups && props.LabGroups.length
				? // eslint-disable-next-line array-callback-return
				  props.LabGroups.map(group => {
						groupObj[group.id] = group;
				  })
				: [];

		const lab_combo =
			labCombos && labCombos.length
				? labCombos.map(combo => {
						const fullParams = groupObj[combo.value].parameters.map(par => {
							const newParamObj = {
								parameter_type: 'parameter',
								referenceRange: par.referenceRange,
								...parameterObj[par.parameter_id],
							};
							return newParamObj;
						});
						const fullGroup = {
							...groupObj[combo.value],
							parameters: fullParams,
						};
						return fullGroup;
				  })
				: [];
		return lab_combo;
	};

	const onSubmit = ({
		service_center,
		referred_specimen,
		request_note,
		patient_id,
	}) => {
		const { patient } = props;
		if (!category) {
			notifyError('Please select a category');
			return;
		}
		setSubmitting(true);

		const lab_test = structuredTest();
		const lab_combo = structuredGroup();
		props
			.createLabRequest({
				service_center,
				referred_specimen,
				request_note,
				lab_test,
				lab_combo,
				category,
				urgent: urgent ? urgent : false,
				patient_id: patient && patient.id ? patient.id : patient_id,
			})
			.then(response => {
				setSubmitting(false);
				notifySuccess('Lab request created');
			})
			.catch(error => {
				console.log(error);
				setSubmitting(false);
				notifyError('Error creating lab request');
			});
	};

	const handlePatientChange = e => {
		setQuery(e.target.value);
		searchPatient();
	};

	const searchPatient = async () => {
		if (query.length > 2) {
			try {
				setSearching(true);
				const rs = await request(`${searchAPI}?q=${query}`, 'GET', true);

				setPatients(rs);
				setSearching(false);
			} catch (e) {
				notifyError('Error Occurred');
				setSearching(false);
			}
		}
	};

	const patientSet = pat => {
		setValue('patient_id', pat.id);
		let name =
			(pat.surname ? pat.surname : '') +
			' ' +
			(pat.other_names ? pat.other_names : '');
		document.getElementById('patient').value = name;
		setPatients([]);
	};

	useEffect(() => {
		const {
			getAllLabGroups,
			getAllLabTests,
			getAllLabTestCategories,
			getAllLabTestParameters,
		} = props;
		if (!loaded) {
			getAllLabGroups();
			getAllLabTests();
			getAllLabTestCategories();
			getAllLabTestParameters();

			setLoaded(true);
		}
	}, [loaded, props]);

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<h6 className="element-header">New Lab Request</h6>
				<div className="element-box m-0 p-3">
					<div className="form-block w-100">
						<form onSubmit={handleSubmit(onSubmit)}>
							{props.location.hash ? null : (
								<div className="row">
									<div className="form-group col-sm-12">
										<label>Patient Id</label>

										<input
											className="form-control"
											placeholder="Search for patient"
											type="text"
											name="patient_id"
											defaultValue=""
											id="patient"
											ref={register({ name: 'patient_id' })}
											onChange={handlePatientChange}
											autoComplete="off"
											required
										/>
										{searching && (
											<div className="searching text-center">
												<img alt="searching" src={searchingGIF} />
											</div>
										)}

										{patients &&
											patients.map(pat => {
												return (
													<div
														style={{ display: 'flex' }}
														key={pat.id}
														className="element-box">
														<a
															onClick={() => patientSet(pat)}
															className="ssg-item cursor">
															{/* <div className="item-name" dangerouslySetInnerHTML={{__html: `${p.fileNumber} - ${ps.length === 1 ? p.id : `${p[0]}${compiled({'emrid': search})}${p[1]}`}`}}/> */}
															<div
																className="item-name"
																dangerouslySetInnerHTML={{
																	__html: `${pat.surname} ${pat.other_names}`,
																}}
															/>
														</a>
													</div>
												);
											})}
									</div>
								</div>
							)}
							<div className="row">
								<div className="form-group col-sm-6">
									<label>Service Center</label>
									<Select
										name="service_center"
										placeholder="Select Service Center"
										options={serviceCenter}
										value={{ label: 'LAB', value: 'lab' }}
										ref={register({ name: 'service_center' })}
										onChange={evt => {
											setValue('service_center', String(evt.value));
										}}
										required
									/>
								</div>
								<div className="form-group col-sm-6">
									<label>Lab Categories</label>
									<Select
										name="lab_categories"
										placeholder="Select Lab Categories"
										ref={register({ name: 'lab_categories' })}
										options={labCatsOptions}
										onChange={onCategoryChange}
										required
									/>
								</div>
							</div>
							<div className="row">
								<div className="form-group col-sm-6">
									<label>Lab Combination</label>
									<Select
										name="lab_combos"
										placeholder="Select Lab Combination"
										isMulti
										options={labGroupOptions}
										ref={register({ name: 'lab_combos' })}
										value={labCombos}
										onChange={val =>
											handleMultipleSelectInput('lab_combos', val)
										}
										required
									/>
								</div>
								<div className="form-group col-sm-6">
									<label>Lab Tests to request</label>
									<Select
										name="lab_tests_torequest"
										placeholder="Select lab tests to request"
										isMulti
										options={labTestOptions}
										ref={register({ name: 'lab_test_torequest' })}
										value={labTests}
										onChange={val =>
											handleMultipleSelectInput('lab_tests_torequest', val)
										}
										required
									/>
								</div>
							</div>

							<div className="row">
								<div className="form-group col-sm-6">
									<label>Referred Specimen</label>
									<textarea
										required
										className="form-control"
										name="referred_specimen"
										rows="3"
										placeholder="Enter referred specimen"
										ref={register}></textarea>
								</div>
								<div className="form-group col-sm-6">
									<label>Request Note</label>
									<textarea
										required
										className="form-control"
										name="request_note"
										rows="3"
										placeholder="Enter request note"
										ref={register}></textarea>
								</div>
							</div>

							<div className="row">
								<div className="form-check col-sm-6">
									<label className="form-check-label">
										<input
											className="form-check-input mt-0"
											name="urgent"
											type="checkbox"
											checked={urgent}
											onChange={e => setUrgent(!urgent)}
											ref={register}
										/>{' '}
										Please check if urgent
									</label>
								</div>

								<div className="col-sm-6 text-right">
									<button className="btn btn-primary" disabled={submitting}>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Create Lab Request'
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

const mapStateToProps = state => {
	return {
		LabCategories: state.settings.lab_categories,
		LabTests: state.settings.lab_tests,
		LabGroups: state.settings.lab_groups,
		LabParameters: state.settings.lab_parameters,
		patient: state.user.patient,
	};
};

export default withRouter(
	connect(mapStateToProps, {
		createLabRequest,
		getAllLabGroups,
		getAllLabTests,
		getAllLabTestParameters,
		getAllLabTestCategories,
	})(LabRequest)
);
