import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { API_URI, serviceAPI, socket } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { connect } from 'react-redux';
import { closeModals } from '../../actions/general';
import { nextStep } from '../../actions/patient';
import { getAllHmos } from '../../actions/hmo';
import {
	get_all_services,
	getAllServiceCategory,
} from '../../actions/settings';
import searchingGIF from '../../assets/images/searching.gif';
import moment from 'moment';

const labCategories = [
	{ value: 'cancer', label: 'cancer' },
	{ value: 'x-ray', label: 'x-ray' },
	{ value: 'blood', label: 'blood' },
];
const serviceCenter = [
	{
		value: 'daily',
		label: 'daily',
	},
	{ value: 'weekend', label: 'weekend' },
	{ value: 'monthly', label: 'monthly' },
];
const ProcedureRequest = props => {
	const { register, handleSubmit, setValue } = useForm();
	const [submitting, setSubmitting] = useState(false);
	const [servicesCategory, setServicesCategory] = useState([]);
	const [services, setServices] = useState('');
	const [loaded, setLoaded] = useState(false);
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
		//fetchServices();
	}, []);

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

	const onSubmit = async values => {
		console.log(values);
		setSubmitting(true);
	};
	const handleChange = (name, type, fn, lists = []) => {
		let res = lists.find(p => p.value === type);
		fn(res);
		if (type == null) {
			setValue(name, null);
		} else {
			setValue(name, type);
		}
	};

	const handleChangeServiceCategory = evt => {
		let value = String(evt.value);
		fetchServicesByCategory(value);
		setValue('service_center', value);
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<h6 className="element-header">New Procedure Request</h6>
				{!loaded ? (
					<div className="text-center">
						<img alt="searching" src={searchingGIF} />
					</div>
				) : (
					<>
						<div className="element-box">
							<div className="form-block w-100">
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="row">
										<div className="form-group col-sm-6">
											<label>Service Center</label>
											<Select
												name="service_center"
												placeholder="Select Service Center"
												options={servicesCategory}
												ref={register({ name: 'service_center' })}
												onChange={evt => handleChangeServiceCategory(evt)}
												required
											/>
										</div>
										<div className="form-group col-sm-6">
											<label>Procedure</label>
											<Select
												name="procedure"
												placeholder="Select procedure"
												isMulti
												options={services}
												ref={register({ name: 'procedure' })}
												onChange={evt => {
													setValue('procedure', String(evt.value));
												}}
												required
											/>
										</div>
									</div>

									<div className="row">
										<div className="form-group col-sm-12">
											<label>Primary Diagnosis</label>
											<input
												className="form-control"
												placeholder="primary diagnosis"
												type="text"
												name="primary_diagnosis"
												ref={register}
											/>
										</div>
									</div>

									<div className="row">
										<div className="form-group col-sm-12">
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
										<div className="form-group col-sm-3">
											<div className="d-flex">
												<input
													className="form-control"
													placeholder="Bill number"
													type="radio"
													name="bill"
													ref={register}
												/>
												<label className="mx-1">Bill now</label>
											</div>
										</div>
										<div className="form-group col-sm-3">
											<div className="d-flex">
												<input
													className="form-control"
													placeholder="bill later"
													type="radio"
													name="bill"
													ref={register}
												/>
												<label className="mx-1">Bill later </label>
											</div>
										</div>
									</div>

									<div>
										<div className="col-sm-12 text-right">
											<button className="btn btn-primary" disabled={submitting}>
												{submitting ? (
													<img src={waiting} alt="submitting" />
												) : (
													'Create Procedure Request'
												)}
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		service: state.settings.services,
		ServiceCategories: state.settings.service_categories,
	};
};

export default connect(mapStateToProps, {
	get_all_services,
	getAllServiceCategory,
})(ProcedureRequest);
