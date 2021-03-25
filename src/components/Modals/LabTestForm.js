import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';

import waiting from '../../assets/images/waiting.gif';
import { notifyError, notifySuccess } from '../../services/notify';
import { request } from '../../services/utilities';
import { addLabTest, updateLabTest } from '../../actions/settings';

const LabTestForm = ({ doToggleForm, showHide, labTest, refreshing }) => {
	const initialState = {
		name: '',
		category: '',
		price: '',
		description: '',
		edit: false,
		create: true,
		specimens: '',
		hmo_id: '',
		hmoPrice: '',
	};
	const [
		{ name, category, price, description, hmo_id, hmoPrice },
		setState,
	] = useState(initialState);
	const [{ edit }, setSubmitButton] = useState(initialState);
	const [parameters, setParameters] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [labSpecimens, setLabSpecimens] = useState([]);
	const [specimens, setSpecimens] = useState([]);
	const [hasParameters, setHasParameters] = useState(false);
	const [enableHmo, setEnableHmo] = useState(false);

	const dispatch = useDispatch();

	const categories = useSelector(state => state.settings.lab_categories);
	const hmos = useSelector(state => state.hmo.hmo_list);

	useEffect(() => {
		const fetchSpecimens = async () => {
			const url = 'lab-tests/specimens';
			const rs = await request(url, 'GET', true);
			setSpecimens([...rs.map(s => ({ value: s.id, label: s.name }))]);
			setLoaded(true);
		};

		if (!loaded || refreshing) {
			fetchSpecimens();
		}
	}, [loaded, refreshing]);

	useEffect(() => {
		if (showHide) {
			if (labTest) {
				setEnableHmo(true);
				setState({
					name: labTest.name,
					category: labTest.category.id,
					price: labTest.price,
					hmoPrice: labTest.hmoPrice,
					description: labTest.description || '',
					hmo_id: labTest.hmo ? labTest.hmo.id : '',
				});
				setParameters(labTest.parameters);
				setLabSpecimens(labTest.specimens);
				setHasParameters(labTest.hasParameters);
				setSubmitButton({ create: false, edit: true });
			} else {
				setEnableHmo(false);
				setParameters([]);
				setLabSpecimens([]);
				setSubmitButton({ create: true, edit: false });
			}
		}
	}, [labTest, showHide]);

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
				price,
				lab_category_id: category,
				parameters,
				specimens: labSpecimens,
				description,
				hasParameters,
				hmo_id,
				hmoPrice,
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
				id: labTest.id,
				name,
				price,
				lab_category_id: category,
				parameters,
				specimens: labSpecimens,
				description,
				hasParameters,
				hmo_id,
				hmoPrice,
			};
			const url = `lab-tests/${labTest.id}/update`;
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

	return (
		<div
			className={`lab-form pipeline white lined-warning ${
				showHide ? 'show' : 'hide'
			}`}>
			<form
				onSubmit={edit ? onEditLabTest : onAddLabTest}
				style={{ overflowY: 'auto' }}>
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
					<div className="col-md-6">
						<div className="form-group">
							<label>Test Price</label>
							<input
								className="form-control"
								placeholder="Test Price"
								type="text"
								name="price"
								onChange={handleInputChange}
								value={price}
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
							<label>HMO</label>
							<select
								className="form-control"
								name="hmo_id"
								disabled={enableHmo}
								onChange={handleInputChange}
								value={hmo_id}>
								{!hmo_id && <option value="">Select HMO</option>};
								{hmos.map((hmo, i) => {
									return (
										<option key={i} value={hmo.id}>
											{hmo.name}
										</option>
									);
								})}
							</select>
						</div>
					</div>
					<div className="col-md-6">
						<div className="form-group">
							<label>HMO Price</label>
							<input
								className="form-control"
								placeholder="HMO Price"
								type="text"
								name="hmoPrice"
								onChange={handleInputChange}
								value={hmoPrice}
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="form-group col-sm-6">
						<label>Test Category</label>
						<select
							className="form-control"
							name="category"
							onChange={handleInputChange}
							value={category}>
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
					<button
						className="btn btn-secondary ml-3"
						disabled={submitting}
						type="button"
						onClick={() => cancelEditButton()}>
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
