import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { confirmAction } from './../services/utilities';
import waiting from '../assets/images/waiting.gif';
import searchingGIF from '../assets/images/searching.gif';
import { notifySuccess, notifyError } from '../services/notify';
import { confirmAlert } from 'react-confirm-alert';
import intersectionBy from 'lodash.intersectionby';
import LabParameterPicker from './LabParameterPicker';

import {
	addLabGroup,
	getAllLabGroups,
	updateLabGroup,
	deleteLabGroup,
	getAllLabTests,
	getAllLabTestCategories,
	getAllLabTestParameters,
} from '../actions/settings';

const LabGroup = props => {
	const initialState = {
		name: '',
		category: '',
		price: '',
		testType: 'combo',
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
	const [labTests, setLabTests] = useState(null);
	const [parameters, setParameter] = useState({});
	const [paramsUI, setParamsUI] = useState([]);

	const handleParamInputChange = (e, index) => {
		const { name, value } = e.target;
		let newParam = { ...parameters };
		if (name === 'parameter') {
			newParam[index] = { parameter_id: value };
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

	const handleMultipleLabTestsInput = selectedOption => {
		setLabTests(selectedOption);
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const labTestOptions =
		props && props.LabTests
			? props.LabTests.map(tests => {
					return { value: tests.id, label: tests.name, id: tests.id };
			  })
			: [];

	const lab_test = labTests
		? intersectionBy(props.LabTests, labTests, 'id')
		: [];

	const onAddLabGroup = e => {
		setLoading(true);
		e.preventDefault();
		let params = Object.values(parameters).length
			? Object.values(parameters).map(param => param)
			: [];
		props
			.addLabGroup({
				name,
				price,
				category,
				parameters: params,
				testType,
				description,
				lab_test,
			})
			.then(response => {
				setState({ ...initialState });
				setLoading(false);
				setParameter({});
				setParamsUI([]);
				setLabTests(null);
				notifySuccess('Lab group created');
			})
			.catch(error => {
				setParameter({});
				setParamsUI([]);
				setLoading(false);
				setLabTests(null);
				notifyError('Error creating lab group');
			});
	};

	const onEditLabGroup = e => {
		setLoading(true);
		e.preventDefault();
		props
			.updateLabGroup(
				{
					id: data.id,
					name,
					price,
					category,
					parameters,
					testType,
					lab_test,
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
		setState(prevState => ({
			...prevState,
			name: data.name,
			price: data.price,
			id: data.id,
			testType: data.test_type ? `${data.test_type}` : null,
			category: data.category ? data.category.id : '',
			labTests: data.lab_tests ? data.lab_tests : null,
			description: data.description ? data.description : '',
		}));
		let newParameter = {};
		let newParameterUI = [];
		if (Array.isArray(data.parameters)) {
			data.parameters.map((param, i) => {
				let newParamDetails = {
					parameter_id:
						param.parameter && param.parameter.id ? param.parameter.id : '',
					referenceRange: param.referenceRange ? param.referenceRange : '',
				};
				newParameter[i] = newParamDetails;
				newParameterUI.push(LabParameterPicker);
				return param;
			});
		}
		setParameter(newParameter);
		setParamsUI(newParameterUI);
		getDataToEdit(data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ ...initialState });
		setState({ ...initialState });
	};

	const onDeleteLabGroup = data => {
		props
			.deleteLabGroup(data)
			.then(data => {
				notifySuccess('Lab group deleted');
			})
			.catch(error => {
				notifyError('Error deleting lab group');
			});
	};

	const confirmDelete = data => {
		confirmAction(onDeleteLabGroup, data);
	};

	useEffect(() => {
		if (!loaded) {
			props
				.getAllLabGroups()
				.then(response => {
					setDataLoaded(true);
				})
				.catch(e => {
					setDataLoaded(true);
					notifyError(e.message || 'could not fetch lab groups');
				});
			props.getAllLabTests();
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
								{props.LabGroups.map((LabGroup, i) => {
									return (
										<div className="col-lg-4 col-xxl-3" key={i}>
											<div className="pt-3">
												<div className="pipeline-item">
													<div className="pi-controls">
														<div className="pi-settings os-dropdown-trigger">
															<i
																className="os-icon os-icon-ui-49"
																onClick={() => onClickEdit(LabGroup)}></i>
														</div>
														<div className="pi-settings os-dropdown-trigger">
															<i
																className="os-icon os-icon-ui-15"
																onClick={() => confirmDelete(LabGroup)}></i>
														</div>
													</div>
													<div className="pi-body">
														<div className="pi-info">
															<div className="h6 pi-name">{LabGroup.name}</div>
															<div className="pi-sub">{LabGroup.name}</div>
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
					<form onSubmit={edit ? onEditLabGroup : onAddLabGroup}>
						<h6 className="form-header">
							{edit ? 'Edit Group' : 'Create Group'}
						</h6>
						<div className="form-group">
							<input
								className="form-control"
								placeholder="Group Name"
								type="text"
								name="name"
								onChange={handleInputChange}
								value={name}
							/>
						</div>
						<div className="form-group">
							<input
								className="form-control"
								placeholder="Group Price"
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
						<div>
							<Select
								className="form-control"
								isMulti
								onChange={handleMultipleLabTestsInput}
								options={labTestOptions}
								value={labTests}
							/>
						</div>
						<div className="form-group mt-4">
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
		LabGroups: state.settings.lab_groups,
	};
};

export default connect(mapStateToProps, {
	addLabGroup,
	getAllLabGroups,
	updateLabGroup,
	deleteLabGroup,
	getAllLabTests,
	getAllLabTestCategories,
	getAllLabTestParameters,
})(LabGroup);
