import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { confirmAction } from './../services/utilities';
import waiting from '../assets/images/waiting.gif';
import searchingGIF from '../assets/images/searching.gif';
import { notifySuccess, notifyError } from '../services/notify';
import { confirmAlert } from 'react-confirm-alert';

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
		testType: 'Combo',
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
	const [dataLoaded, setDataLoaded] = useState(false);
	const [parameters, setParameter] = useState(null);
	const [labTests, setLabTests] = useState(null);

	const handleMultipleSelectInput = selectedOption => {
		setParameter(selectedOption);
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddLabGroup = e => {
		setLoading(true);
		e.preventDefault();
		props
			.addLabGroup({ name, price, category, parameters, testType, labTests })
			.then(response => {
				setState({ ...initialState });
				setLoading(false);
				setParameter(null);
				notifySuccess('Lab Group created');
			})
			.catch(error => {
				notifyError('Error creating lab Group');
			});
	};

	const onEditLabGroup = e => {
		setLoading(true);
		e.preventDefault();
		props
			.updateLabGroup(
				{ id: data.id, name, price, category, parameters, testType, labTests },
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

	const options = props.LabParameters.map(Par => {
		return { value: Par.name, label: Par.name };
	});
		return (
			<div className="row">
				<div className="col-lg-8">
				<div>
					<div className="row">
						{!dataLoaded ? (
							<tr>
								<td colSpan="4" className="text-center">
									<img alt="searching" src={searchingGIF} />
								</td>
							</tr>
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
			<div className="col-lg-4 col-xxl-3  d-xxl-block">
				<div className="pipeline white lined-warning">
					<form onSubmit={edit ? onEditLabGroup : onAddLabGroup}>
						<h6 className="form-header">{ edit ? "Edit Group" : "Create Group"}</h6>
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
								name="testType"
								value={testType}
								onChange={handleInputChange}>
								{testType && (<option value={testType}>{testType}</option>)}
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
	}

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