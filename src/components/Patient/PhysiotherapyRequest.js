import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { useHistory, withRouter } from 'react-router-dom';
import waiting from '../../assets/images/waiting.gif';
import { API_URI, socket, patientAPI } from '../../services/constants';
import { request, formatNumber } from '../../services/utilities';

import { notifySuccess, notifyError } from '../../services/notify';
import {
	getAllRequestServices,
	getAllService,
	getAllServiceCategory,
} from '../../actions/settings';
import SpecializationSession from './SpecializationSession';

const PhysiotherapyRequest = props => {
	let history = useHistory();
	const { register, handleSubmit, setValue } = useForm();
	const [submitting, setSubmitting] = useState(false);

	const [loaded, setLoaded] = useState(false);
	const [Loading, setLoading] = useState(false);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [serviceCenter, setServiceCenter] = useState([]);
	const [serviceList, setServiceList] = useState([]);
	const [services, setServices] = useState([]);
	const [multiple, setMultiple] = useState([]);
	const [paramsUI, setParamsUI] = useState([]);
	const [parameters, setParameters] = useState([]);

	const onSubmit = async values => {
		setSubmitting(true);
		// socket.emit('saveAppointment', values);

		let data = {
			requestType: values.requestType.toLowerCase(),
			patient_id: props.patient.id,
			requestBody: parameters,
		};

		if (parameters.length === 0) {
			notifyError('Please select service to request');
			setSubmitting(false);
			return;
		}

		try {
			const rs = await request(
				`${API_URI}${patientAPI}/save-request`,
				'POST',
				true,
				data
			);

			history.push('settings/roles#physio');
			notifySuccess('physiotherapy request saved');
			setSubmitting(false);
		} catch (e) {
			setSubmitting(false);
			notifyError(e.message || 'could not save physiotherapy request');
		}
	};

	const changeMulti = evt => {
		setMultiple(evt);
		setValue('service_request', evt);
	};

	const filterServiceCenter = () => {
		return serviceCenter.map(center => {
			return {
				value: center.id,
				label: center.name,
			};
		});
	};
	const filterRequest = center => {
		setServices([]);
		changeMulti(null);

		let requestType = serviceList
			.filter(service => {
				return service.category.id === center;
			})
			.map(data => {
				return {
					value: data.id,
					label: data.name,
				};
			});

		setServices(requestType);
	};
	const handleParamInputChange = async (e, index) => {
		const { name, value } = e.target;

		let newParam = [...parameters];
		if (name === 'specialization') {
			newParam[index] = { ...newParam[index], specialization: value };
		} else if (name === 'sessionCount') {
			newParam[index] = { ...newParam[index], sessionCount: value };
		}

		await setParameters(newParam);
	};

	const addSpecializationUI = () => {
		let paramUI = [...paramsUI, SpecializationSession];
		setParamsUI(paramUI);
	};

	const removeParam = async index => {
		// const newParametersUI = paramsUI.map((ui, i) => {
		// 	if (i === index) {
		// 		return null;
		// 	}
		// 	return ui;
		// });

		let newParametersUI = paramsUI.filter((cur, i) => {
			if (i !== index) {
				return cur;
			}
		});
		await setParamsUI([]);
		let newParam = parameters.filter((cur, i) => {
			if (i !== index) {
				return cur;
			}
		});
		// let newParametersUI = [...paramsUI];
		// let newParam = [...parameters];
		// newParametersUI.splice(index, 1);
		// newParam.splice(index, 1);
		await setParameters(newParam);
		await setParamsUI(newParametersUI);
	};

	useEffect(() => {
		if (!loaded) {
			props
				.getAllService()
				.then(response => {
					setDataLoaded(true);
				})
				.catch(e => {
					notifyError(e.message || 'could not fetch services list');
				});
		}
		setLoaded(true);
		setServiceList(props.ServicesList);
	}, [props, loaded]);

	useEffect(() => {
		if (!loaded) {
			props
				.getAllServiceCategory()
				.then(response => {
					setDataLoaded(true);
				})
				.catch(e => {
					setDataLoaded(true);
					notifyError(e.message || 'could not fetch service categories');
				});
		}
		setLoaded(true);
		setServiceCenter(props.ServiceCategories);
	}, [props, loaded]);

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<h6 className="element-header">New Physiotherapy Request</h6>
				<div className="element-box">
					<div className="form-block w-100">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="row">
								<div className="form-group col-sm-12">
									<label>Request Type</label>

									<input
										className="form-control"
										placeholder="Request Type"
										type="text"
										name="requestType"
										value="physiotherapy"
										readOnly
										ref={register}
									/>
								</div>
								<div className="form-group col-sm-11">
									<label>Service Center</label>
									<Select
										name="service_center"
										placeholder="Select Service Center"
										options={filterServiceCenter()}
										ref={register({ name: 'service_center' })}
										onChange={evt => {
											if (evt === null) {
												setValue('service_center', null);
											} else {
												filterRequest(evt.value);
												setValue('service_center', String(evt.value));
											}
										}}
										required
									/>
								</div>
								<div className="form-group col-sm-1">
									<label></label>
									<button
										type="button"
										className="btn btn-primary form-control mt-4"
										style={{ lineHeight: '1.5' }}
										onClick={addSpecializationUI}>
										<i className="os-icon os-icon-plus"></i>
									</button>
								</div>

								{paramsUI &&
									paramsUI.map((ParamPicker, i) => {
										if (ParamPicker) {
											return (
												<ParamPicker
													key={i}
													index={i}
													parameterArray={services}
													parameters={parameters}
													removeParams={removeParam}
													handleParamInputChange={handleParamInputChange}
												/>
											);
										}
										return null;
									})}
							</div>

							<div>
								<div className="col-sm-12 text-right mt-2 pr-0">
									<button className="btn btn-primary" disabled={submitting}>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Create'
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
		patient: state.user.patient,
		ServicesList: state.settings.services,
		ServiceCategories: state.settings.service_categories,
	};
};
export default connect(mapStateToProps, {
	getAllRequestServices,
	getAllService,
	getAllServiceCategory,
})(PhysiotherapyRequest);
