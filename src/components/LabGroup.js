import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { confirmAction } from './../services/utilities';
import waiting from '../assets/images/waiting.gif';
import searchingGIF from '../assets/images/searching.gif';
import { notifySuccess, notifyError } from '../services/notify';
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
	// const [subTestArray, setSubTestArray] = useState([]);

	const handleParamInputChange = (e, index) => {
		const { name, value } = e.target;
		let newParam = { ...parameters };
		let paramObj = {};
		// eslint-disable-next-line array-callback-return
		props.LabParameters.map(param => {
			paramObj[value] = {
				parameter_id: param.id,
				parameter_name: param.name,
			};
		});
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
						const fullParams = testObj[test.id].parameters.map(par => {
							const { name, ...rest } = parameterObj[par.parameter_id];
							const newParamObj = {
								...rest,
								parameter_type: 'parameter',
								referenceRange: par.referenceRange,
								parameter: parameterObj[par.parameter_id],
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

	const onAddLabGroup = e => {
		setLoading(true);
		e.preventDefault();
		const params = Object.values(parameters).length
			? Object.values(parameters).map(param => param)
			: [];

		const lab_test = structuredTest();
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
		const lab_test = structuredTest();
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
		let newParameter = {};
		let newParameterUI = [];

		const subTestObj = {};
		const newTests =
			data.subTests && data.subTests.length
				? data.subTests.map(test => {
						subTestObj[test.id] = {
							value: test.id,
							label: test.name,
							id: test.id,
						};
						return subTestObj[test.id];
				  })
				: null;

		const testParams = Object.values(data.parameters).length
			? Object.values(data.parameters).map(param => param)
			: [];

		if (Array.isArray(testParams)) {
			const paramValues = testParams.map((param, i) => {
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
		// setSubTestArray([...newTests]);
		setLabTests(newTests);
	};

	const cancelEditButton = () => {
		setSubmitButton({ ...initialState });
		setState({ ...initialState });
		setParamsUI([]);
		setLabTests([]);
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

	const cutomStyles = {
		multiValueLabel: (provided, state) => ({
			...provided,
			minWidth: '2rem',
		}),
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
												key={i}
											/>
										);
									}
									return null;
								})}
						</div>
						<div>
							<Select
								styles={cutomStyles}
								className="form-control"
								isMulti
								set-va
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
