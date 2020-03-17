import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { confirmAction } from '../services/utilities';
import waiting from '../assets/images/waiting.gif';
import searchingGIF from '../assets/images/searching.gif';
import { notifySuccess, notifyError } from '../services/notify';
import { confirmAlert } from 'react-confirm-alert';

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
		edit: false,
		create: true,
	};
	const [{ name, category, price, testType }, setState] = useState(
		initialState
	);
	const [Loading, setLoading] = useState(false);
	const [{ edit, create }, setSubmitButton] = useState(initialState);
	const [data, getDataToEdit] = useState(null);
	const [loaded, setLoaded] = useState(false);

	const [parameters, setParameter] = useState(null);

	const handleMultipleSelectInput = selectedOption => {
		setParameter(selectedOption);
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddLabTest = e => {
		setLoading(true);
		e.preventDefault();
		props
			.addLabTest({ name, price, category, parameters, testType })
			.then(response => {
				setState({ ...initialState });
				setLoading(false);
				setParameter(null);
				notifySuccess('Lab test created');
			})
			.catch(error => {
				notifyError('Error creating lab test');
			});
	};

	const onEditLabTest = e => {
		setLoading(true);
		e.preventDefault();
		props
			.updateLabTest(
				{ id: data.id, name, price, category, parameters, testType },
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
		console.log(data);
		setSubmitButton({ edit: true, create: false });
		setState(prevState => ({
			...prevState,
			name: data.name,
			price: data.price,
			id: data.id,
			testType: data.test_type ? `${data.test_type}` : null,
			parameters: data.parameter_type ? `${data.parameter_type}` : null,
			category: data.category ? category : null,
		}));
		setParameter(data.parameters);
		getDataToEdit(data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ ...initialState });
		setState({ ...initialState });
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
				.then(response => {})
				.catch(e => {
					notifyError(e.message || 'could not fetch lab tests');
				});
			props.getAllLabTestCategories();
			props.getAllLabTestParameters();
		}
		setLoaded(true);
	}, [loaded, props]);

	const options = props.LabParameters.map(Par => {
		return { value: Par.name, label: Par.name };
	});

	return (
		<div className="row">
			<div className="col-lg-8">
				<div>
					<div className="row">
						{!loaded ? (
							<tr>
								<td colSpan="4" className="text-center">
									<img alt="searching" src={searchingGIF} />
								</td>
							</tr>
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
			<div className="col-lg-4 col-xxl-3  d-xxl-block">
				<div className="pipeline white lined-warning">
					<form onSubmit={edit ? onEditLabTest : onAddLabTest}>
						<h6 className="form-header">Create Test</h6>
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
						{/* <div className="form-group">
							<input
								className="form-control"
								placeholder="Test Price"
								type="text"
								name="price"
								onChange={handleInputChange}
								value={price}
							/>
						</div> */}
						<div className="form-group">
							<select
								className="form-control"
								name="testType"
								value={testType}
								onChange={handleInputChange}>
								{testType && <option value={testType}>{testType}</option>}
								<option value="single">Single</option>;
								<option value="combo">Combo</option>;
							</select>
						</div>
						<div className="form-group">
							<select
								className="form-control"
								name="category"
								onChange={handleInputChange}
								value={category}>
								{category && (
									<option value={category.id}>{category.name}</option>
								)}
								{!category && <option value={''}></option>};
								{props.LabCategories.map((category, i) => {
									return (
										<option key={i} value={category.id}>
											{category.name}
										</option>
									);
								})}
							</select>
						</div>
						<div className="form-group">
							<legend>
								<span>Parameters</span>
							</legend>
							<Select
								className="form-control"
								isMulti
								onChange={handleMultipleSelectInput}
								options={options}
								value={parameters}
							/>
						</div>
						<fieldset className="form-group">
							<legend></legend>
						</fieldset>
						<div className="form-buttons-w">
							{create && (
								<button
									className={
										Loading ? 'btn btn-primary disabled' : 'btn btn-primary'
									}>
									{Loading ? (
										<img src={waiting} alt="submitting" />
									) : (
										<span> create</span>
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
										<span>{Loading ? 'cancel' : 'cancel'}</span>
									</button>
									<button
										className={
											Loading ? 'btn btn-primary disabled' : 'btn btn-primary'
										}>
										{Loading ? (
											<img src={waiting} alt="submitting" />
										) : (
											<span> save</span>
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
