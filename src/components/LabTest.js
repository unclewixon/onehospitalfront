import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { confirmAction } from '../services/utilities';
import waiting from '../assets/images/waiting.gif';
import searchingGIF from '../assets/images/searching.gif';
import { notifySuccess, notifyError } from '../services/notify';
import LabParameterPicker from './LabParameterPicker';

import {
	addLabTest,
	getAllLabTests,
	updateLabTest,
	deleteLabTest,
	getAllLabTestCategories,
	getAllLabTestParameters,
} from '../actions/settings';

const LabTest = props => {
	const initialState = {
		name: '',
		category: '',
		price: '',
		testType: 'single',
		selectTestType: '',
		description: '',
		edit: false,
		create: true,
	};

	const [{ name, category, price, testType, description }, setState] = useState(
		initialState
	);

	const [Loading, setLoading] = useState(false);
	const [{ edit, create }, setSubmitButton] = useState(initialState);
	const [data, getDataToEdit] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [parameters, setParameter] = useState({});
	const [paramsUI, setParamsUI] = useState([]);

	const handleParamInputChange = (e, index) => {
		const { name, value } = e.target;
		let newParam = { ...parameters };
		let paramObj = {};
		props.LabParameters.map(param => {
			paramObj[value] = {
				parameter_id : param.id,
				parameter_name: param.name
			}
		})
		if (name === 'parameter') {
			newParam[index] = { 	parameter_id : value };
		} else if (name === 'referenceRange') {
			newParam[index] = { ...newParam[index], referenceRange: value };
		}
		setParameter(newParam);
	};

	const removeParam = index => {
		const newParametersUI = paramsUI.map((ui, i) => {
			if (i === index) {
				return null;
			}
			return ui;
		});
		const { [index]: i, ...rest } = parameters;
		setParamsUI(newParametersUI);
		setParameter(rest);
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddLabTest = e => {
		setLoading(true);
		e.preventDefault();
		let params = Object.values(parameters).length
			? Object.values(parameters).map(param => param)
			: [];
		props
			.addLabTest({
				name,
				price,
				category,
				parameters: params,
				testType,
				description,
			})
			.then(response => {
				setState({ ...initialState });
				setLoading(false);
				setParameter({});
				setParamsUI([]);
				notifySuccess('Lab test created');
			})
			.catch(error => {
				setLoading(false);
				setParamsUI([]);
				notifyError('Error creating lab test');
			});
	};

	const onEditLabTest = e => {
		setLoading(true);
		e.preventDefault();
		props
			.updateLabTest(
				{
					id: data.id,
					name,
					price,
					category,
					parameters,
					testType,
					description,
				},
				data
			)
			.then(response => {
				setState({ ...initialState });
				setSubmitButton({ create: true, edit: false });
				setLoading(false);
				notifySuccess('Lab test updated');
			})
			.catch(error => {
				setState({ ...initialState });
				setSubmitButton({ ...initialState });
				setLoading(false);
				notifyError('Error updating lab test');
			});
	};

	const onClickEdit = data => {
		setSubmitButton({ edit: true, create: false });
		getDataToEdit(data);
		setState(prevState => ({
			...prevState,
			name: data.name,
			price: data.price,
			id: data.id,
			testType: data.test_type ? `${data.test_type}` : null,
			category: data.category ? data.category.id : '',
			description: data.description ? data.description : '',
		}));

		const newParams = Object.values(data.parameters).length
			? Object.values(data.parameters).map(param => param)
			: [];

		let newParameter = {};
		let newParameterUI = [];
		if (Array.isArray(newParams)) {
			const paramValues = newParams.map((param, i) => {
				let newParamDetails = {
					parameter_id:
						param.parameter_id && param.parameter_id ? param.parameter_id : '',
					referenceRange: param.referenceRange ? param.referenceRange : '',
				};
				newParameter[i] = newParamDetails;
				newParameterUI.push(LabParameterPicker);
				return newParameter[i];
			});
			setParameter(paramValues);
		}
		setParamsUI(newParameterUI);
	};

	const cancelEditButton = () => {
		setSubmitButton({ ...initialState });
		setState({ ...initialState });
		setParamsUI([])
	};

	const onDeleteLabTest = data => {
		props
			.deleteLabTest(data)
			.then(data => {
				notifySuccess('Lab test deleted');
			})
			.catch(error => {
				notifyError('Error deleting lab test');
			});
	};

	const confirmDelete = data => {
		confirmAction(onDeleteLabTest, data);
	};

	useEffect(() => {
		if (!loaded) {
			props
				.getAllLabTests()
				.then(response => {
					setDataLoaded(true);
				})
				.catch(e => {
					setDataLoaded(true);
					notifyError(e.message || 'could not fetch lab tests');
				});
			props.getAllLabTestCategories();
			props.getAllLabTestParameters();
		}
		setLoaded(true);
	}, [loaded, props]);

	const addParameterUI = () => {
		let paramUI = [...paramsUI, LabParameterPicker];
		setParamsUI(paramUI);
	};
	return (
		<div className="row">
			<div className="col-lg-7">
				<div>
					<div className="row">
						{!dataLoaded ? (
							<div colSpan="4" className="text-center">
								<img alt="searching" src={searchingGIF} />
							</div>
						) : (
							<>
								{props.LabTests.map((LabTest, i) => {
									return (
										<div className="col-lg-4 col-xxl-3" key={i}>
											<div className="pt-3">
												<div className="pipeline-item">
													<div className="pi-controls">
														<div className="pi-settings os-dropdown-trigger">
															<i
																className="os-icon os-icon-ui-49"
																onClick={() => onClickEdit(LabTest)}></i>
														</div>
														<div className="pi-settings os-dropdown-trigger">
															<i
																className="os-icon os-icon-ui-15"
																onClick={() => confirmDelete(LabTest)}></i>
														</div>
													</div>
													<div className="pi-body">
														<div className="pi-info">
															<div className="h6 pi-name">{LabTest.name}</div>
															<div className="pi-sub">{LabTest.name}</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</>
						)}
					</div>
				</div>
			</div>
			<div className="col-lg-5 col-xxl-4  d-xxl-block">
				<div className="pipeline white lined-warning">
					<form onSubmit={edit ? onEditLabTest : onAddLabTest}>
						<h6 className="form-header">
							{edit ? 'Edit Test' : 'Create Test'}
						</h6>
						<div className="form-group">
							<input
								className="form-control"
								placeholder="Test Name"
								type="text"
								name="name"
								onChange={handleInputChange}
								value={name}
							/>
						</div>
						<div className="form-group">
							<input
								className="form-control"
								placeholder="Test Price"
								type="text"
								name="price"
								onChange={handleInputChange}
								value={price}
							/>
						</div>
						<div className="form-group">
							<select
								className="form-control"
								name="category"
								onChange={handleInputChange}
								value={category}>
								{!category && <option value={''}>Select Category</option>};
								{props.LabCategories.map((category, i) => {
									return (
										<option key={i} value={category.id}>
											{category.name}
										</option>
									);
								})}
							</select>
						</div>

						<legend>
							<span>Parameters</span>
						</legend>
						<div className="form-buttons-w">
							<button
								type="button"
								className="btn btn-primary"
								onClick={addParameterUI}>
								Add Parameter
							</button>
						</div>

						<div className="form-group">
								{paramsUI &&
								paramsUI.map((ParamPicker, i) => {
									if (ParamPicker) {
										return (
											<ParamPicker
												key={i}
												index={i}
												parameterArray={props.LabParameters}
												parameters={parameters}
												removeParams={removeParam}
												handleParamInputChange={handleParamInputChange}
											/>
										);
									}
									return null;
								})}
						</div>
						<div className="form-group">
							<textarea
								className="form-control"
								placeholder="Description"
								type="textarea"
								name="description"
								onChange={handleInputChange}
								value={description}
								rows={4}
							/>
						</div>
						<div className="form-buttons-w">
							{create && (
								<button
									className={
										Loading ? 'btn btn-primary disabled' : 'btn btn-primary'
									}>
									{Loading ? (
										<img src={waiting} alt="submitting" />
									) : (
										<span> Create</span>
									)}
								</button>
							)}
							{edit && (
								<>
									<button
										className={
											Loading
												? 'btn btn-secondary ml-3 disabled'
												: 'btn btn-secondary ml-3'
										}
										onClick={cancelEditButton}>
										<span>{Loading ? 'Cancel' : 'Cancel'}</span>
									</button>
									<button
										className={
											Loading ? 'btn btn-primary disabled' : 'btn btn-primary'
										}>
										{Loading ? (
											<img src={waiting} alt="submitting" />
										) : (
											<span> Save</span>
										)}
									</button>
								</>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		LabCategories: state.settings.lab_categories,
		LabParameters: state.settings.lab_parameters,
		LabTests: state.settings.lab_tests,
	};
};

export default connect(mapStateToProps, {
	addLabTest,
	getAllLabTests,
	updateLabTest,
	deleteLabTest,
	getAllLabTestCategories,
	getAllLabTestParameters,
})(LabTest);
