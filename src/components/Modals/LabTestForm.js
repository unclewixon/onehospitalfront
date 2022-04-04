import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import waiting from '../../assets/images/waiting.gif';
import { notifyError, notifySuccess } from '../../services/notify';
import { request } from '../../services/utilities';
import { hmoAPI } from '../../services/constants';
import { addLabTest, updateLabTest } from '../../actions/settings';

const LabTestForm = ({ doToggleForm, showHide, labTest, refreshing }) => {
	const initialState = {
		name: '',
		category: '',
		edit: false,
		create: true,
		specimens: '',
		tariff: '',
	};
	const [{ name, category, tariff }, setState] = useState(initialState);
	const [{ edit }, setSubmitButton] = useState(initialState);
	const [parameters, setParameters] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [labSpecimens, setLabSpecimens] = useState([]);
	const [specimens, setSpecimens] = useState([]);
	const [hasParameters, setHasParameters] = useState(false);
	const [hmoValue, setHmoValue] = useState(null);
	const [privateHmo, setPrivateHmo] = useState(null);

	const dispatch = useDispatch();

	const categories = useSelector(state => state.settings.lab_categories);

	const loadData = useCallback(async () => {
		try {
			const url = 'lab-tests/specimens';
			const rs = await request(url, 'GET', true);
			setSpecimens([...rs.map(s => ({ value: s.id, label: s.name }))]);

			const uri = 'hmos/schemes/Private';
			const res = await request(uri, 'GET', true);
			setPrivateHmo(res);
			setLoaded(true);
		} catch (e) {
			setLoaded(true);
		}
	}, []);

	useEffect(() => {
		if (!loaded || refreshing) {
			loadData();
		}
	}, [loadData, loaded, refreshing]);

	useEffect(() => {
		if (showHide) {
			if (labTest) {
				setState({
					name: labTest.name,
					category: labTest.category.id,
				});
				setHmoValue(labTest.service.hmo);
				setParameters(labTest.parameters);
				setLabSpecimens(labTest.specimens);
				setHasParameters(labTest.hasParameters);
				setSubmitButton({ create: false, edit: true });
			} else {
				setHmoValue(privateHmo);
				setParameters([]);
				setLabSpecimens([]);
				setSubmitButton({ create: true, edit: false });
			}
		}
	}, [labTest, privateHmo, showHide]);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddLabTest = async e => {
		try {
			e.preventDefault();
			setSubmitting(true);
			const datum = {
				name,
				lab_category_id: category,
				parameters,
				specimens: labSpecimens,
				hasParameters,
				hmo_id: hmoValue.id,
				tariff,
			};
			const rs = await request('lab-tests', 'POST', true, datum);
			dispatch(addLabTest(rs));
			setState({ ...initialState });
			setLabSpecimens([]);
			setParameters([]);
			setSubmitting(false);
			doToggleForm(false);
			notifySuccess('Lab test created');
		} catch (e) {
			setSubmitting(false);
			notifyError('Error creating lab test');
		}
	};

	const onEditLabTest = async e => {
		try {
			e.preventDefault();
			setSubmitting(true);
			const datum = {
				name,
				lab_category_id: category,
				parameters,
				specimens: labSpecimens,
				hasParameters,
				hmo_id: hmoValue.id,
			};
			const url = `lab-tests/${labTest.id}`;
			const rs = await request(url, 'PATCH', true, datum);
			dispatch(updateLabTest(rs));
			setState({ ...initialState });
			setLabSpecimens([]);
			setParameters([]);
			setSubmitButton({ create: true, edit: false });
			setSubmitting(false);
			doToggleForm(false);
			notifySuccess('Lab test updated');
		} catch (error) {
			console.log(error);
			setSubmitting(false);
			notifyError('Error updating lab test');
		}
	};

	const cancelEditButton = () => {
		setSubmitButton({ ...initialState });
		setState({ ...initialState });
		doToggleForm(false);
	};

	const getHmoSchemes = async q => {
		if (!q || q.length <= 1) {
			return [];
		}

		const url = `${hmoAPI}/schemes?q=${q}`;
		const { result } = await request(url, 'GET', true);
		return result;
	};

	return (
		<div
			className={`lab-form pipeline white lined-warning ${
				showHide ? 'show' : 'hide'
			}`}
		>
			<form
				onSubmit={edit ? onEditLabTest : onAddLabTest}
				style={{ overflowY: 'visible' }}
			>
				<h6 className="form-header">{edit ? 'Edit Test' : 'Create Test'}</h6>
				<div className="row mt-4">
					<div className="col-md-6">
						<div className="form-group">
							<label>Test Name</label>
							<input
								className="form-control"
								placeholder="Test Name"
								type="text"
								name="name"
								onChange={handleInputChange}
								value={name}
							/>
						</div>
					</div>
					<div className="form-group col-sm-6">
						<label>Test Category</label>
						<select
							className="form-control"
							name="category"
							onChange={handleInputChange}
							value={category}
						>
							{!category && <option value={''}>Select Category</option>};
							{categories.map((category, i) => {
								return (
									<option key={i} value={category.id}>
										{category.name}
									</option>
								);
							})}
						</select>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
							<label>HMO</label>
							<AsyncSelect
								isClearable
								getOptionValue={option => option.id}
								getOptionLabel={option => option.name}
								defaultOptions
								value={hmoValue}
								loadOptions={getHmoSchemes}
								onChange={e => {
									setHmoValue(e);
								}}
								placeholder="Hmo scheme"
								isDisabled
							/>
						</div>
					</div>
					<div className="form-group col-sm-6">
						<label>Specimen</label>
						<Select
							isMulti
							isClearable
							name="specimen"
							placeholder="Select specimen"
							options={specimens}
							value={labSpecimens}
							onChange={e => {
								setLabSpecimens(e);
							}}
						/>
					</div>
				</div>
				{!edit && (
					<div className="row">
						<div className="col-md-6">
							<div className="form-group">
								<label>Base Price</label>
								<input
									className="form-control"
									placeholder="Base Price"
									type="text"
									name="tariff"
									onChange={handleInputChange}
									value={tariff}
								/>
							</div>
						</div>
						<div className="col-md-6"></div>
					</div>
				)}
				<div className="row">
					<div className="form-group col-sm-12">
						<label>
							<input
								type="checkbox"
								className="form-control"
								name="has_parameters"
								checked={hasParameters}
								onChange={e => {
									setHasParameters(e.target.checked);
								}}
							/>{' '}
							has parameters?
						</label>
					</div>
				</div>
				<div className="form-buttons-w">
					<button
						className="btn btn-secondary ml-3"
						disabled={submitting}
						type="button"
						onClick={() => cancelEditButton()}
					>
						<span>Cancel</span>
					</button>
					<button className="btn btn-primary" disabled={submitting}>
						{submitting ? (
							<img src={waiting} alt="submitting" />
						) : (
							<span>{edit ? 'Save' : 'Create'}</span>
						)}
					</button>
				</div>
			</form>
		</div>
	);
};

export default LabTestForm;
