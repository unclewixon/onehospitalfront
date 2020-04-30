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
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { connect } from 'react-redux';
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

const PlanForm = props => {
	const [loaded, setLoaded] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');
	const [services, setServices] = useState('');
	const [regimens, setRegimens] = useState([]);
	const [serviceId, setServiceId] = useState('');
	const [genName, setGenName] = useState('');
	const [servicesCategory, setServicesCategory] = useState([]);
	const {
		previous,
		next,
		patient,
		addPharmacyRequest,
		allPatients,
		patientsLoading,
		loadInvCategories,
		loadInventories,
		categories,
		inventories,
	} = props;
	const { register, handleSubmit, setValue } = useForm({
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

	return (
		<div className="form-block encounter">
			<div className="row">
				<div className="col-sm-12">
					<div className="form-group">
						<label>Plan:</label>
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
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-6">
					<div className="form-group">
						<label>Business Unit/Service Center</label>
						<Select
							name="service_center"
							placeholder="Select Service Center"
							options={planServiceCenter}
							value={{ label: 'Pharmacy', value: 'Pharmacy' }}
							ref={register({ name: 'service_center' })}
							onChange={evt => {
								setValue('service_center', String(evt.value));
							}}
							required
						/>
					</div>
				</div>
				<div className="col-sm-6">
					<div className="form-group">
						<label>Formulary</label>
						<Select
							placeholder="Choose a formulary"
							name="formulary"
							ref={register({ name: 'formulary', required: true })}
							onChange={e => setValue('formulary', e.value)}
							options={genericNameOptions}
						/>
					</div>
				</div>
			</div>
			<h5 className="mt-4">Add Medication</h5>
			<div className="row mt-4">
				<div className="col-md-12">
					<a className="btn btn-success btn-sm text-white" onClick={addRegimen}>
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
										<label>Drug Generic Name</label>
										<Select
											placeholder="Choose a drug generic name"
											name="genericName"
											ref={register({ name: 'genericName', required: true })}
											onChange={e => {
												setValue('genericName', e.value);
												setGenName(e.value);
											}}
											options={filteredGenericNameOptions}
											required
										/>
									</div>
								</div>
								<div className="col-sm-6">
									<div className="form-group">
										<label>Drug Name</label>
										<Select
											placeholder="Choose a drug name"
											ref={register({ name: 'drugName', required: true })}
											name="drugName"
											options={drugNameOptions}
											onChange={e => onDrugSelection(e)}
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
													ref={register({ required: true })}
													name="quantity"
													onChange={onHandleInputChange}
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
												/>
											</div>
										</div>
										<div className="col-sm-8">
											<div className="form-group">
												<label>Note</label>
												<input
													type="number"
													placeholder="Regimen line instruction"
													className="form-control"
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
												name="refillable"
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
						<input
							type="text"
							placeholder="Select Start Date"
							className="form-control"
						/>
					</div>
				</div>
				<div className="col-sm-3">
					<div className="form-group">
						<label>Duration</label>
						<input type="number" placeholder="eg. 5" className="form-control" />
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
						<Select
							name="service_center"
							placeholder="Select Service Center"
							options={servicesCategory}
							ref={register({ name: 'service_center' })}
							onChange={evt => handleChangeServiceCategory(evt)}
							required
						/>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-6">
					<div className="form-group">
						<label>Procedure</label>
						<Select
							name="procedure"
							placeholder="Select procedure"
							isMulti
							options={services}
							ref={register({ name: 'procedure' })}
							onChange={evt => handleChangeProcedure(evt)}
							required
						/>
					</div>
				</div>
				<div className="col-sm-6">
					<div className="form-group">
						<label>Primary Diagnoses</label>
						<AsyncSelect
							required
							cacheOptions
							value={selectedOption}
							getOptionValue={getOptionValues}
							getOptionLabel={getOptionLabels}
							defaultOptions
							loadOptions={getOptions}
							onChange={handleChangeOptions}
							placeholder="primary diagnosis"
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
									<input type="radio" className="form-control" /> Bill Now
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
					<button className="btn btn-primary" onClick={next}>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	console.log(state.inventory.inventories);
	return {
		categories: state.inventory.categories,
		inventories: state.inventory.inventories,
		service: state.settings.services,
		ServiceCategories: state.settings.service_categories,
	};
};

export default connect(mapStateToProps, {
	get_all_services,
	get_all_diagnosis,
	getAllServiceCategory,
	loadInvCategories,
	loadInventories,
})(PlanForm);
