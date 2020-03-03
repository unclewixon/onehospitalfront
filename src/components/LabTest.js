import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import Select from 'react-select';

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
		e.preventDefault();
		props
			.addLabTest({ name, price, category, parameters, testType })
			.then(response => {
				setState({ ...initialState });
				setParameter(null);
			});
	};

	const onEditLabTest = e => {
		setLoading(true);
		console.log(name, price, category, parameters);
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
			})
			.catch(error => {
				setState({ ...initialState });
				setSubmitButton({ create: true, edit: false });
				setLoading(false);
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
		}));
		setParameter(data.parameters);
		getDataToEdit(data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ create: true, edit: false });
		setState({ ...initialState });
	};

	const onDeleteLabTest = data => {
		console.log(data);
		props
			.deleteLabTest(data)
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	};

  const confirmDelete = data => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to delete this remove ?</p>
            <div style={{}}>
              <button
                className="btn btn-primary"
                style={{ margin: 10 }}
                onClick={onClose}
              >
                No
              </button>
              <button
                className="btn btn-danger"
                style={{ margin: 10 }}
                onClick={() => {
                  onDeleteLabTest(data);
                  onClose();
                }}
              >
                Yes, Delete it!
              </button>
            </div>
          </div>
        );
      }
    });
  };

  useEffect(() => {
    props.getAllLabTests();
    props.getAllLabTestCategories();
    props.getAllLabTestParameters();
  }, []);

  const options = props.LabParameters.map(Par => {
    return { value: Par.name, label: Par.name };
  });

	return (
		<div className="row">
			<div className="col-lg-8">
				<div>
					<div className="row">
						{props.LabTests.map((LabTest, i) => {
							return (
								<div className="col-lg-4 col-xxl-3" key={i}>
									<div className="pt-3">
										<div className="pipeline-item">
											<div className="pi-controls">
												<div className="pi-settings os-dropdown-trigger">
													<i
														className="os-icon os-icon-ui-49"
														onClick={() => onClickEdit(LabTest)}
													></i>
												</div>
												<div className="pi-settings os-dropdown-trigger">
													<i
														className="os-icon os-icon-ui-15"
														onClick={() => confirmDelete(LabTest)}
													></i>
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
								name="testType"
								value={testType}
								onChange={handleInputChange}
							>
								<option value="single">Single</option>;
								<option value="combo">Combo</option>;
							</select>
						</div>
						<div className="form-group">
							<select
								className="form-control"
								name="category"
								onChange={handleInputChange}
								value={category}
							>
								{props.LabCategories.map((category, i) => {
									return <option key={i} value={category.id}>{category.name}</option>;
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
									}
								>
									<span>{Loading ? 'creating' : 'create'}</span>
								</button>
							)}
							{edit && (
								<>
									<button
										className={
											Loading ? 'btn btn-primary disabled' : 'btn btn-primary'
										}
										onClick={cancelEditButton}
									>
										<span>{Loading ? 'cancel' : 'cancel'}</span>
									</button>
									<button
										className={
											Loading ? 'btn btn-primary disabled' : 'btn btn-primary'
										}
									>
										<span>{Loading ? 'Saving' : 'edit'}</span>
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
