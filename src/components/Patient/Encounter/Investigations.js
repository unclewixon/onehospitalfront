/* eslint-disable no-multi-str */
import React, { Component, useEffect, useState } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import {
	API_URI,
	serviceAPI,
	serviceCenter,
} from '../../../services/constants';
import { connect } from 'react-redux';
import { uploadHmo, uploadHmoTariff } from '../../../actions/general';
import { fetchHmoTariff, getAllHmos } from '../../../actions/hmo';
import { createLabRequest } from '../../../actions/patient';
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
	const { previous, next } = props;
	const [labCombos, setLabCombos] = useState(null);
	const [labTests, setLabTests] = useState(null);
	const [category, setCategory] = useState('');
	const [loaded, setLoaded] = useState(false);
	const [services, setServices] = useState([]);
	const [servicesCategory, setServicesCategory] = useState([]);
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			service_center: 'lab',
		},
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
		setCategory(e.value);
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

	const onSubmit = async values => {
		console.log(values);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="form-block encounter">
				<h5>Lab Requests</h5>
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Business Unit/Service Center</label>
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
					<div className="col-sm-6">
						<div className="form-group">
							<label>Lab Combos</label>
							<Select
								name="lab_combos"
								placeholder="Select Lab Combination"
								isMulti
								options={labGroupOptions}
								ref={register({ name: 'lab_combos' })}
								value={labCombos}
								onChange={val => handleMultipleSelectInput('lab_combos', val)}
								required
							/>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>Lab Tests To Request</label>
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
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>
								<input type="checkbox" className="form-control" /> Please tick
								if urgent
							</label>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Preferred Specimen(s)</label>
							<input type="text" className="form-control" />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Lab Request Note</label>
							<textarea className="form-control" cols="4"></textarea>
						</div>
					</div>
				</div>
				<h5 className="mt-4">Radiological Investigation</h5>
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
					<div className="col-sm-12">
						<div className="form-group">
							<label>Scans To Request</label>
							<Select
								name="service_request"
								placeholder="Select service to request from"
								isMulti
								options={services}
								ref={register({ name: 'service_request' })}
								onChange={evt => handleChangeProcedure(evt)}
								required
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>
								<input type="checkbox" className="form-control" /> Please tick
								if urgent
							</label>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Request Note/Reason</label>
							<textarea className="form-control" cols="4"></textarea>
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
	};
};
export default connect(mapStateToProps, {
	get_all_services,
	getAllServiceCategory,
	createLabRequest,
	getAllLabGroups,
	getAllLabTests,
	getAllLabTestParameters,
	getAllLabTestCategories,
})(Investigations);
