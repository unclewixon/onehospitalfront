/* eslint-disable no-multi-str */
import React, { Component, useEffect, useState } from 'react';
import Select from 'react-select';
import { useForm, Controller, ErrorMessage } from 'react-hook-form';
import {
	API_URI,
	serviceAPI,
	serviceCenter,
} from '../../../services/constants';
import { connect, useDispatch } from 'react-redux';
import { uploadHmo, uploadHmoTariff } from '../../../actions/general';
import { fetchHmoTariff, getAllHmos } from '../../../actions/hmo';
import {
	createLabRequest,
	loadEncounterData,
	loadEncounterForm,
} from '../../../actions/patient';
import {
	get_all_services,
	getAllLabGroups,
	getAllLabTestCategories,
	getAllLabTestParameters,
	getAllLabTests,
	getAllServiceCategory,
} from '../../../actions/settings';
import { notifyError } from '../../../services/notify';
import { request } from '../../../services/utilities';

const Investigations = props => {
	const { previous, next, patient, encounterData, encounterForm } = props;
	const [labCombos, setLabCombos] = useState(null);
	const [labTests, setLabTests] = useState(null);
	const [category, setCategory] = useState('');
	const [loaded, setLoaded] = useState(false);
	const [services, setServices] = useState([]);
	const [servicesCategory, setServicesCategory] = useState([]);
	const dispatch = useDispatch();

	const defaultValues = {
		...(encounterForm.investigations || []),
	};
	const { register, handleSubmit, setValue, control, errors } = useForm({
		defaultValues,
	});
	const handleChangeServiceCategory = evt => {
		let value = String(evt.value);
		fetchServicesByCategory(value);
		setValue('service_center', value);
	};
	const fetchServicesByCategory = async id => {
		try {
			const rs = await request(
				`${API_URI}${serviceAPI}` + '/categories/' + id,
				'GET',
				true
			);
			props.get_all_services(rs);
		} catch (error) {
			console.log(error);
			notifyError('error fetching imaging requests for the patient');
		}
	};
	const onCategoryChange = e => {
		setCategory(e);
	};
	const labCatsOptions =
		props && props.LabCategories
			? props.LabCategories.map((cats, index) => {
					return { value: cats.id, label: cats.name };
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
	const handleMultipleSelectInput = (field, selected) => {
		if (field === 'lab_combos') {
			setLabCombos(selected);
		}
		if (field === 'lab_tests_torequest') {
			setLabTests(selected);
		}
	};
	const handleChangeProcedure = evt => {
		setValue('service_request', evt);
	};

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

	const structuredTest = () => {
		const parameterObj = {};
		const parVals =
			props && props.LabParameters && props.LabParameters.length
				? props.LabParameters.map(par => {
						parameterObj[par.id] = par;
				  })
				: [];

		const testObj = {};
		const testVals =
			props && props.LabTests && props.LabTests.length
				? props.LabTests.map(test => {
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
		const parVals =
			props && props.LabParameters && props.LabParameters.length
				? props.LabParameters.map(par => {
						parameterObj[par.id] = par;
				  })
				: [];

		const groupObj = {};
		const groupVals =
			props && props.LabGroups && props.LabGroups.length
				? props.LabGroups.map(group => {
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

	useEffect(() => {
		if (!loaded) {
			props
				.getAllServiceCategory()
				.then(response => {})
				.catch(e => {
					notifyError(e.message || 'could not fetch service categories');
				});
		}
		let data = [];
		let services = [];
		props.ServiceCategories.forEach((item, index) => {
			const res = { label: item.name, value: item.id };
			data = [...data, res];
		});
		props.service.forEach((item, index) => {
			const res = { label: item.name, value: item.id };
			services = [...services, res];
		});
		setServicesCategory(data);
		setServices(services);
		setLoaded(true);
	}, [props, loaded]);
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
		}
		setLoaded(true);
	}, [loaded, props]);

	const onSubmit = async data => {
		encounterForm.investigations = data;
		props.loadEncounterForm(encounterForm);

		const lab_test = structuredTest();
		const lab_combo = structuredGroup();

		let newGroup = lab_combo.map(grp => {
			return {
				name: grp.name ? grp.name : '',
				amount: grp.price ? grp.price : '',
				service_id: grp.id ? grp.id : '',
				tests: grp.subTests
					? grp.subTests.map(test => {
							return {
								testName: test.name ? test.name : '',
								paramenters: test.parameters.length
									? test.parameters.map(param => {
											return {
												name:
													param.parameter && param.parameter.name
														? param.parameter.name
														: '',
												range: param.referenceRange ? param.referenceRange : '',
												result: param.result ? param.result : '',
											};
									  })
									: [],
							};
					  })
					: [],
				parameters: grp.parameters
					? grp.parameters.map(param => {
							return {
								name: param.name ? param.name : '',
								range: param.referenceRange ? param.referenceRange : '',
								result: param.result ? param.result : '',
							};
					  })
					: [],
			};
		});

		let newTest = lab_test
			? lab_test.map(test => {
					return {
						testName: test && test.name ? test.name : '',
						service_id: test && test.id ? test.id : '',
						amount: test && test.price ? test.price : '',
						paramenters:
							test.parameters &&
							test.parameters.map(param => {
								return {
									name: param && param.name ? param.name : '',
									range:
										param && param.referenceRange ? param.referenceRange : '',
									result: param.result ? param.result : '',
								};
							}),
					};
			  })
			: [];

		let labRequestObj = {
			requestType: data.lab_service_center.value,
			patient_id: patient.id,
			requestBody: {
				specialization: '',
				sessionCount: '',
				groups: newGroup,
				tests: newTest,
				refferredSpecimen: data.pref_specimen,
				requestNote: data.lab_req_note,
			},
		};

		let imagingRequestObj = [];
		let theRequest = {};
		if (data.rad_service_request?.length > 0) {
			data.rad_service_request.forEach(value => {
				imagingRequestObj = [
					...imagingRequestObj,
					{
						service_id: value.value,
						service_name: value.label,
					},
				];
			});
		}

		theRequest.requestType = data.rad_service_center?.label?.toLowerCase();
		theRequest.request_note = data.lab_req_note;
		theRequest.patient_id = patient.id;
		theRequest.requestBody = imagingRequestObj;
		encounterData.investigations.labRequest = labRequestObj;
		encounterData.investigations.imagingRequest = theRequest;
		props.loadEncounterData(encounterData);

		dispatch(props.next);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="form-block encounter">
				<h5>Lab Requests</h5>
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Business Unit/Service Center</label>

							<Controller
								as={
									<Select
										options={serviceCenter}
										placeholder="Select Service Center"
									/>
								}
								control={control}
								//rules={{ required: true }}
								onChange={([selected]) => {
									// Place your logic here
									return selected;
								}}
								name="lab_service_center"
								defaultValue={{ label: 'LAB', value: 'lab' }}
							/>
						</div>
					</div>
					<div className="form-group col-sm-6">
						<label>Lab Categories</label>
						<Controller
							as={
								<Select
									options={labCatsOptions}
									placeholder="Select Lab Categories"
								/>
							}
							control={control}
							//rules={{ required: true }}
							onChange={([selected]) => {
								// Place your logic here
								console.log(selected);
								onCategoryChange(selected.value);
								return selected;
							}}
							name="lab_categories"
						/>
						<ErrorMessage
							errors={errors}
							name="lab_categories"
							message="This is required"
							as={<span className="alert alert-danger" />}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Lab Combos</label>
							<Controller
								as={
									<Select
										options={labGroupOptions}
										placeholder="Select Lab Combination"
										isMulti
									/>
								}
								control={control}
								//rules={{ required: true }}
								onChange={([selected]) => {
									handleMultipleSelectInput('lab_combos', selected);
									return selected;
								}}
								name="lab_combos"
							/>
							<ErrorMessage
								errors={errors}
								name="lab_combos"
								message="This is required"
								as={<span className="alert alert-danger" />}
							/>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>Lab Tests To Request</label>
							<Controller
								as={
									<Select
										options={labTestOptions}
										placeholder="Select lab tests to request"
										isMulti
									/>
								}
								control={control}
								//rules={{ required: true }}
								onChange={([selected]) => {
									handleMultipleSelectInput('lab_tests_torequest', selected);
									return selected;
								}}
								name="lab_tests_torequest"
							/>
							<ErrorMessage
								errors={errors}
								name="lab_tests_torequest"
								message="This is required"
								as={<span className="alert alert-danger" />}
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>
								<input
									type="checkbox"
									className="form-control"
									ref={register}
									name="lab_urgent"
								/>{' '}
								Please tick if urgent
							</label>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Preferred Specimen(s)</label>
							<input
								type="text"
								className="form-control"
								ref={register}
								name="pref_specimen"
							/>
							<ErrorMessage
								errors={errors}
								name="pref_specimen"
								message="This is required"
								as={<span className="alert alert-danger" />}
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Lab Request Note</label>
							<textarea
								className="form-control"
								cols="4"
								ref={register}
								name="lab_req_note"></textarea>
							<ErrorMessage
								errors={errors}
								name="lab_req_note"
								message="This is required"
								as={<span className="alert alert-danger" />}
							/>
						</div>
					</div>
				</div>
				<h5 className="mt-4">Radiological Investigation</h5>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Business Unit/Service Center</label>
							<Controller
								as={
									<Select
										options={servicesCategory}
										placeholder="Select Service Center"
									/>
								}
								control={control}
								//rules={{ required: true }}
								onChange={([selected]) => {
									handleChangeServiceCategory(selected);
									return selected;
								}}
								name="rad_service_center"
							/>
							<ErrorMessage
								errors={errors}
								name="rad_service_center"
								message="This is required"
								as={<span className="alert alert-danger" />}
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Scans To Request</label>
							<Controller
								as={
									<Select
										options={services}
										placeholder="Select service to request from"
										isMulti
									/>
								}
								control={control}
								//rules={{ required: true }}
								onChange={([selected]) => {
									handleChangeProcedure(selected);
									return selected;
								}}
								name="rad_service_request"
							/>
							<ErrorMessage
								errors={errors}
								name="rad_service_request"
								message="This is required"
								as={<span className="alert alert-danger" />}
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>
								<input
									type="checkbox"
									className="form-control"
									ref={register}
									name="rad_urgent"
								/>{' '}
								Please tick if urgent
							</label>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Request Note/Reason</label>
							<textarea
								className="form-control"
								cols="4"
								ref={register}
								name="rad_req_note"></textarea>
							<ErrorMessage
								errors={errors}
								name="rad_req_note"
								message="This is required"
								as={<span className="alert alert-danger" />}
							/>
						</div>
					</div>
				</div>

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
			</div>
		</form>
	);
};
const mapStateToProps = state => {
	return {
		LabCategories: state.settings.lab_categories,
		LabTests: state.settings.lab_tests,
		LabGroups: state.settings.lab_groups,
		patient: state.user.patient,
		LabParameters: state.settings.lab_parameters,
		service: state.settings.services,
		ServiceCategories: state.settings.service_categories,
		encounterData: state.patient.encounterData,
		encounterForm: state.patient.encounterForm,
	};
};
export default connect(mapStateToProps, {
	loadEncounterData,
	loadEncounterForm,
	get_all_services,
	getAllServiceCategory,
	createLabRequest,
	getAllLabGroups,
	getAllLabTests,
	getAllLabTestParameters,
	getAllLabTestCategories,
})(Investigations);
