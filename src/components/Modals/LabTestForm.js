import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import waiting from '../../assets/images/waiting.gif';
import { notifyError, notifySuccess } from '../../services/notify';
import { request } from '../../services/utilities';
import { addLabTest, updateLabTest } from '../../actions/settings';

const LabTestForm = ({ doToggleForm, showHide, labTest }) => {
	const initialState = {
		name: '',
		category: '',
		price: '',
		description: '',
		edit: false,
		create: true,
	};
	console.log(labTest);

	const [{ name, category, price, description }, setState] = useState(
		initialState
	);
	const [{ edit }, setSubmitButton] = useState(initialState);
	const [parameters, setParameters] = useState([]);
	const [submitting, setSubmitting] = useState(false);

	const dispatch = useDispatch();

	const categories = useSelector(state => state.settings.lab_categories);

	useEffect(() => {
		if (showHide) {
			if (labTest) {
				setState({
					name: labTest.name,
					category: labTest.category.id,
					price: labTest.price,
					description: labTest.description || '',
				});
				setParameters(labTest.parameters);
				setSubmitButton({ create: false, edit: true });
			} else {
				setSubmitButton({ create: true, edit: false });
			}
		}
	}, [labTest, showHide]);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddLabTest = async e => {
		e.preventDefault();
		try {
			setSubmitting(true);
			const datum = {
				name,
				price,
				lab_category_id: category,
				parameters,
				description,
			};
			const rs = await request('lab-tests', 'POST', true, datum);
			dispatch(addLabTest(rs));
			setState({ ...initialState });
			setSubmitting(false);
			doToggleForm(false);
			notifySuccess('Lab test created');
		} catch (e) {
			setSubmitting(false);
			notifyError('Error creating lab test');
		}
	};

	const onEditLabTest = async e => {
		e.preventDefault();
		try {
			setSubmitting(true);
			const datum = {
				id: labTest.id,
				name,
				price,
				lab_category_id: category,
				parameters,
				description,
			};
			const url = `lab-tests/${labTest.id}/update`;
			const rs = await request(url, 'PATCH', true, datum);
			console.log(rs);
			dispatch(updateLabTest(rs));
			setState({ ...initialState });
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

	// const addParameter = () => {};

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
			<form onSubmit={edit ? onEditLabTest : onAddLabTest}>
				<h6 className="form-header">{edit ? 'Edit Test' : 'Create Test'}</h6>
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
						{categories.map((category, i) => {
							return (
								<option key={i} value={category.id}>
									{category.name}
								</option>
							);
						})}
					</select>
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
