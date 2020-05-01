/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-multi-str */
import React, { Component, useCallback, useEffect, useState } from 'react';
import SunEditor from 'suneditor-react';
import {
	API_URI,
	diagnosisAPI,
	planServiceCenter,
	serviceAPI,
} from '../../../services/constants';
import { Controller, ErrorMessage, useForm } from 'react-hook-form';
import Select from 'react-select';
import { connect, useDispatch } from 'react-redux';
import { addPharmacyRequest } from '../../../actions/patient';
import { loadInvCategories, loadInventories } from '../../../actions/inventory';
import {
	get_all_diagnosis,
	get_all_services,
	getAllServiceCategory,
} from '../../../actions/settings';
import { notifyError } from '../../../services/notify';
import { request } from '../../../services/utilities';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import _ from 'lodash';
import DatePicker from 'react-datepicker';

const PlanForm = props => {
	const [loaded, setLoaded] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');
	const [services, setServices] = useState('');
	const [regimens, setRegimens] = useState([]);
	const [serviceId, setServiceId] = useState('');
	const [genName, setGenName] = useState('');
	const [start_time, setTime] = useState(new Date());
	const [servicesCategory, setServicesCategory] = useState([]);
	const dispatch = useDispatch();

	const onChangeDate = date => setTime(date);
	const {
		previous,
		next,
		encounterData,
		patient,
		loadInvCategories,
		loadInventories,
		inventories,
	} = props;
	const { register, handleSubmit, setValue, control, errors } = useForm({
		defaultValues: {
			service_center: 'Pharmacy',
		},
	});
	const getServiceUnit = useCallback(async () => {
		try {
			const res = await request(`${API_URI}/inventory/categories`, 'GET', true);
			loadInvCategories(res);
		} catch (error) {
			notifyError('Error fetching Service Unit');
		}
	}, [loadInvCategories]);

	const getPharmacyItems = useCallback(
		async id => {
			try {
				const res = await request(
					`${API_URI}/inventory/stocks-by-category/52b49109-028a-46c6-b5f3-1e88a48d333f`,
					'GET',
					true
				);
				loadInventories(res);
			} catch (error) {
				notifyError('Erroe fetching pharmacy items');
			}
		},
		[loadInventories]
	);

	useEffect(() => {
		getServiceUnit();
		getPharmacyItems();
	}, [getServiceUnit, getPharmacyItems]);

	const genericNameOptions =
		inventories && inventories.length
			? inventories
					.filter(drug => drug.generic_name !== null)
					.map(drug => {
						return {
							value: drug && drug.generic_name ? drug.generic_name : 'nil',
							label: drug && drug.generic_name ? drug.generic_name : 'nil',
						};
					})
			: [];
	const filteredGenericNameOptions = _.uniqBy(genericNameOptions, 'value');

	let drugObj = {};

	const drugNameOptions =
		genericNameOptions && genericNameOptions.length
			? genericNameOptions.filter(drug => drug.value === genName)
			: //.map(drug => drugObj[drug.value])
			  [];

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

	const getOptionValues = option => option.id;

	const getOptionLabels = option => option.description;

	const handleChangeOptions = selectedOption => {
		setSelectedOption(selectedOption);
	};
	const getOptions = async inputValue => {
		if (!inputValue) {
			return [];
		}
		let val = inputValue.toUpperCase();
		const res = await request(
			`${API_URI}${diagnosisAPI}` + 'search?q=' + val,
			'GET',
			true
		);
		return res;
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
	const handleChangeServiceCategory = evt => {
		let value = String(evt.value);
		fetchServicesByCategory(value);
		setValue('service_center', value);
	};

	const handleChangeProcedure = evt => {
		setValue('procedure', evt);
	};

	const onHandleInputChange = e => {
		const { name, value } = e.target;
		setValue(name, value);
	};
	const onDrugSelection = e => {
		setValue('drugName', e.value);
		setServiceId(e.id);
	};

	const addRegimen = () => {
		setRegimens([...regimens, { id: regimens.length, deleted: 0 }]);
	};

	const updateRegimens = (id, type, value) => {
		const regimen = regimens.find(d => d.id === id);
		if (regimen) {
			const idx = regimens.findIndex(d => d.id === id);
			const _regimens = [
				...regimens.slice(0, idx),
				{ ...regimen, [type]: value },
				...regimens.slice(idx + 1),
			];

			return _regimens;
		}
		return [];
	};

	const removeRegimen = id => () => {
		const regimens = updateRegimens(id, 'deleted', 1);
		setRegimens([...regimens]);
	};

	const divStyle = {
		//marginTop: '100em',
		height: '1400px',
		overflowY: 'scroll',
	};

	const onSubmit = async data => {
		console.log(data);

		let regiments = data.regimens;
		const requestData = regiments
			? regiments.map(request => ({
					forumalary: request.formulary,
					drug_generic_name: request.genericName,
					drug_name: request.drugName.value,
					dose_quantity: request.quantity,
					service_id: request.drugName.label,
					refillable: {
						number_of_refills: request && request.refills ? request.refills : 0,
						eg: request && request.eg ? request.eg : 0,
						frequency_type:
							request && request.frequency ? request.frequency : '',
						duration: request && request.duration ? request.duration : 0,
						note: request && request.refillNote ? request.refillNote : '',
					},
			  }))
			: [];
		let pharmacyRequestsObj = {
			requestType: 'pharmacy',
			requestBody: requestData,
			diagnosis: data.pharm_diagnosis,
			prescription: '',
			patient_id: patient.id,
		};

		let appointmentObj = {
			appointment_date: data.appointment_date,
			appointment_duration: data.appointment_duration,
			appointment_desc: data.appointment_desc,
		};

		let requestDataProc = [];
		let theRequest = {};
		data.proc_procedure.forEach(value => {
			requestDataProc = [
				...requestDataProc,
				{
					service_id: value.value,
					service_name: value.label,
				},
			];
		});
		theRequest.requestType = data.proc_service_center.label.toLowerCase();
		theRequest.bill_now = data.proc_bill_now === 'on' ? 'true' : 'false';
		theRequest.request_note = data.proc_note;
		theRequest.patient_id = patient.id;
		theRequest.primary_diagnosis = data.proc_diagnosis.description;
		theRequest.requestBody = requestDataProc;

		let res = {
			treatmentPlan: data.treatmentPlan,
			pharmacyRequests: pharmacyRequestsObj,
			nextAppointment: appointmentObj,
			procedureRequest: theRequest,
		};

		encounterData.plan = res;
		props.loadEncounterData(encounterData);
		dispatch(props.next);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="form-block encounter">
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Plan:</label>
							<Controller
								as={
									<SunEditor
										width="100%"
										placeholder="Please type here..."
										setContents="Treatment Plan:"
										autoFocus={false}
										enableToolbar={true}
										setOptions={{
											height: 300,
											buttonList: [
												[
													'bold',
													'underline',
													'italic',
													'strike',
													'subscript',
													'superscript',
													'list',
													'align',
													'font',
													'fontSize',
													'image',
												],
											],
										}}
									/>
								}
								control={control}
								rules={{ required: true }}
								onChange={([selected]) => {
									return selected;
								}}
								name="treatmentPlan"
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Business Unit/Service Center</label>
							<Controller
								as={
									<Select
										options={planServiceCenter}
										placeholder="Select Service Center"
									/>
								}
								control={control}
								rules={{ required: true }}
								onChange={([selected]) => {
									return selected;
								}}
								name="service_center"
								defaultValue={{ label: 'Pharmacy', value: 'Pharmacy' }}
							/>
							<ErrorMessage
								errors={errors}
								name="service_center"
								message="This is required"
								as={<span className="alert alert-danger" />}
							/>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>Diagnosis Data</label>
							<Controller
								as={
									<AsyncSelect
										cacheOptions
										value={selectedOption}
										getOptionValue={getOptionValues}
										getOptionLabel={getOptionLabels}
										defaultOptions
										loadOptions={getOptions}
										placeholder="primary diagnosis"
									/>
								}
								control={control}
								rules={{ required: true }}
								onChange={([selected]) => {
									handleChangeOptions(selected);
									return selected;
								}}
								name="pharm_diagnosis"
							/>
							<ErrorMessage
								errors={errors}
								name="service_center"
								message="This is required"
								as={<span className="alert alert-danger" />}
							/>
						</div>
					</div>
				</div>
				<h5 className="mt-4">Add Medication</h5>
				<div className="row mt-4">
					<div className="col-md-12">
						<a
							className="btn btn-success btn-sm text-white"
							onClick={addRegimen}>
							<i className="os-icon os-icon-plus-circle" />
							<span>add</span>
						</a>
					</div>
				</div>
				{regimens.map((drug, i) => {
					return (
						drug.deleted === 0 && (
							<div className="mt-4" key={i}>
								<div className="row">
									<div className="col-sm-6">
										<div className="form-group">
											<label>Formulary</label>
											<Controller
												as={
													<Select
														options={genericNameOptions}
														placeholder="Choose a formulary"
													/>
												}
												control={control}
												rules={{ required: true }}
												onChange={([selected]) => {
													return selected;
												}}
												name={`regimens[${drug.id}]['formulary']`}
											/>
											<ErrorMessage
												errors={errors}
												name={`regimens[${drug.id}]['formulary']`}
												message="This is required"
												as={<span className="alert alert-danger" />}
											/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group">
											<label>Drug Generic Name</label>
											<Controller
												as={
													<Select
														options={filteredGenericNameOptions}
														placeholder="Choose a drug generic name"
													/>
												}
												control={control}
												rules={{ required: true }}
												onChange={([selected]) => {
													setGenName(selected.value);
													return selected;
												}}
												name={`regimens[${drug.id}]['genericName']`}
											/>
											<ErrorMessage
												errors={errors}
												name={`regimens[${drug.id}]['genericName']`}
												message="This is required"
												as={<span className="alert alert-danger" />}
											/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group">
											<label>Drug Name</label>
											<Controller
												as={
													<Select
														options={drugNameOptions}
														placeholder="Choose a drug name"
													/>
												}
												control={control}
												rules={{ required: true }}
												onChange={([selected]) => {
													return selected;
												}}
												name={`regimens[${drug.id}]['drugName']`}
											/>
											<ErrorMessage
												errors={errors}
												name={`regimens[${drug.id}]['drugName']`}
												message="This is required"
												as={<span className="alert alert-danger" />}
											/>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-6">
										<div className="row">
											<div className="col-sm-5">
												<div className="form-group">
													<label>Frequency</label>
													<input
														ref={register}
														name={`regimens[${drug.id}]['frequency']`}
														type="number"
														placeholder="eg. 3"
														className="form-control"
													/>
												</div>
											</div>
											<div className="col-sm-4">
												<div className="form-group">
													<label>Frequency Type</label>
													<select
														placeholder="-- Select frequency type --"
														className="form-control">
														<option value=""></option>
													</select>
												</div>
											</div>
											<div className="col-sm-3">
												<div className="form-group">
													<label>Dose</label>
													<input
														type="number"
														className="form-control"
														placeholder="Dose Quantity"
														ref={register}
														name={`regimens[${drug.id}]['quantity']`}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="col-sm-5">
										<div className="row">
											<div className="col-sm-4">
												<div className="form-group">
													<label>Duration</label>
													<input
														type="number"
														placeholder="(value in days) eg. 7"
														className="form-control"
														ref={register}
														name={`regimens[${drug.id}]['duration']`}
													/>
												</div>
											</div>
											<div className="col-sm-8">
												<div className="form-group">
													<label>Note</label>
													<input
														type="text"
														placeholder="Regimen line instruction"
														className="form-control"
														ref={register}
														name={`regimens[${drug.id}]['refillNote']`}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="col-sm-1" style={{ position: 'relative' }}>
										<a
											className="text-danger delete-icon"
											onClick={removeRegimen(drug.id)}>
											<i className="os-icon os-icon-cancel-circle" />
										</a>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12">
										<div className="form-group">
											<label>
												<input
													type="checkbox"
													ref={register}
													name={`regimens[${drug.id}]['refills']`}
													className="form-control"
												/>{' '}
												Refilable?
											</label>
										</div>
									</div>
								</div>
							</div>
						)
					);
				})}
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Regimen Note</label>
							<textarea
								placeholder="Enter regimen note"
								name="pharm_note"
								ref={register}
								className="form-control"
								cols="3"></textarea>
						</div>
					</div>
				</div>
				<h5 className="mt-4">Add Appointment (Schedule Next Appointment)</h5>
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Appontment Date</label>
							<Controller
								as={
									<DatePicker
										selected={start_time}
										peekNextMonth
										showMonthDropdown
										showYearDropdown
										dropdownMode="select"
										dateFormat="dd-MMM-yyyy"
										className="single-daterange form-control"
										placeholderText="Select Date"
									/>
								}
								control={control}
								rules={{ required: true }}
								onChange={([selected]) => {
									setTime(selected);
									return selected;
								}}
								name="appointment_date"
							/>
							<ErrorMessage
								errors={errors}
								name="appointment_date"
								message="This is required"
								as={<span className="alert alert-danger" />}
							/>
						</div>
					</div>
					<div className="col-sm-3">
						<div className="form-group">
							<label>Duration</label>
							<input
								type="number"
								name="appointment_duration"
								ref={register}
								placeholder="eg. 5"
								className="form-control"
							/>
						</div>
					</div>
					<div className="col-sm-3">
						<div className="form-group">
							<label>(Minutes/Hour/Days/etc)</label>
							<select
								placeholder="-- Select an option here --"
								className="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Select Location</label>
							<select
								placeholder="-- Select location --"
								className="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>Select Clinic</label>
							<select
								placeholder="-- Select appointment clinic --"
								className="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Description/Reason</label>
							<textarea
								placeholder="Enter description"
								name="appointment_desc"
								ref={register}
								className="form-control"
								cols="3"></textarea>
						</div>
					</div>
				</div>
				<h5 className="mt-4">Add New Procedure</h5>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Business Unit/Service Center</label>
							<Controller
								as={
									<Select
										placeholder="Select Service Center"
										options={servicesCategory}
									/>
								}
								control={control}
								rules={{ required: true }}
								onChange={([selected]) => {
									handleChangeServiceCategory(selected);
									return selected;
								}}
								name="proc_service_center"
							/>
							<ErrorMessage
								errors={errors}
								name="proc_service_center"
								message="This is required"
								as={<span className="alert alert-danger" />}
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Procedure</label>
							<Controller
								as={
									<Select
										placeholder="Select procedure"
										isMulti
										options={services}
									/>
								}
								control={control}
								rules={{ required: true }}
								onChange={([selected]) => {
									handleChangeProcedure(selected);
									return selected;
								}}
								name="proc_procedure"
							/>
							<ErrorMessage
								errors={errors}
								name="proc_procedure"
								message="This is required"
								as={<span className="alert alert-danger" />}
							/>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>Primary Diagnoses</label>

							<Controller
								as={
									<AsyncSelect
										cacheOptions
										value={selectedOption}
										getOptionValue={getOptionValues}
										getOptionLabel={getOptionLabels}
										defaultOptions
										loadOptions={getOptions}
										placeholder="primary diagnosis"
									/>
								}
								control={control}
								rules={{ required: true }}
								onChange={([selected]) => {
									handleChangeOptions(selected);
									return selected;
								}}
								name="proc_diagnosis"
							/>
							<ErrorMessage
								errors={errors}
								name="proc_diagnosis"
								message="This is required"
								as={<span className="alert alert-danger" />}
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Request Note</label>
							<textarea
								placeholder="Enter note"
								name="proc_note"
								ref={register}
								className="form-control"
								cols="3"></textarea>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<div className="row">
							<div className="col-sm-6">
								<div className="form-group">
									<label>
										<input type="checkbox" className="form-control" /> Requires
										Anesthesiologist
									</label>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="form-group">
									<label>
										<input type="checkbox" className="form-control" /> Requires
										Surgeon
									</label>
								</div>
							</div>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="row">
							<div className="col-sm-6">
								<div className="form-group">
									<label>
										<input
											type="radio"
											className="form-control"
											name="proc_bill_now"
											ref={register}
										/>{' '}
										Bill Now
									</label>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="form-group">
									<label>
										<input type="radio" className="form-control" /> Bill Later
									</label>
								</div>
							</div>
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

const mapStateToProps = (state, ownProps) => {
	return {
		categories: state.inventory.categories,
		patient: state.user.patient,
		inventories: state.inventory.inventories,
		service: state.settings.services,
		ServiceCategories: state.settings.service_categories,
		encounterData: state.patient.encounterData,
	};
};

export default connect(mapStateToProps, {
	get_all_services,
	get_all_diagnosis,
	getAllServiceCategory,
	loadInvCategories,
	loadInventories,
})(PlanForm);
