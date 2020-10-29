import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { confirmAction, request, updateImmutable } from '../services/utilities';
import waiting from '../assets/images/waiting.gif';
import searchingGIF from '../assets/images/searching.gif';
import { notifySuccess, notifyError } from '../services/notify';
import { startBlock, stopBlock } from '../actions/redux-block';

const LabSpecimen = () => {
	const initialState = { name: '', edit: false, create: true };
	const [{ name }, setState] = useState(initialState);
	const [loaded, setLoaded] = useState(false);
	const [{ edit, create }, setSubmitButton] = useState(initialState);
	const [specimen, setSpecimen] = useState(null);
	const [specimens, setSpecimens] = useState([]);
	const [submitting, setSubmitting] = useState(false);

	const dispatch = useDispatch();

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	useEffect(() => {
		const fetchSpecimen = async () => {
			try {
				const url = 'lab-tests/specimens';
				const rs = await request(url, 'GET', true);
				setSpecimens([...rs]);
				setLoaded(true);
				dispatch(stopBlock());
			} catch (e) {
				setSubmitting(false);
				notifyError(e.message || 'could not fetch lab specimens');
				setLoaded(true);
				dispatch(stopBlock());
			}
		};

		if (!loaded) {
			dispatch(startBlock());
			fetchSpecimen();
		}
	}, [dispatch, loaded]);

	const onAddSpecimen = async e => {
		e.preventDefault();
		try {
			setSubmitting(true);
			const url = 'lab-tests/specimens';
			const rs = await request(url, 'POST', true, { name });
			setSpecimens([...specimens, rs]);
			setState({ ...initialState });
			setSubmitting(false);
			notifySuccess('Lab specimen created!');
		} catch (error) {
			setSubmitting(false);
			notifyError('Error creating lab specimen');
		}
	};

	const onEditSpecimen = async e => {
		e.preventDefault();
		try {
			setSubmitting(true);
			const data = { id: specimen.id, name };
			const url = `lab-tests/specimens/${specimen.id}`;
			const rs = await request(url, 'PATCH', true, data);
			const newSpecimens = updateImmutable(specimens, rs);
			setSpecimens([...newSpecimens]);
			setState({ ...initialState });
			setSubmitButton({ create: true, edit: false });
			setSubmitting(false);
			notifySuccess('Lab specimen updated!');
		} catch (error) {
			setSubmitting(false);
			notifyError('Error updating lab specimen');
		}
	};

	const onClickEdit = data => {
		setSubmitButton({ edit: true, create: false });
		setState(prevState => ({
			...prevState,
			name: data.name,
		}));
		setSpecimen(data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ ...initialState });
		setState({ ...initialState });
		setSpecimen(null);
	};

	const onDeleteSpecimen = async item => {
		try {
			const url = `lab-tests/specimens/${item.id}`;
			const rs = await request(url, 'DELETE', true);
			setSpecimens([...specimens.filter(s => s.id !== rs.id)]);
			notifySuccess('Lab specimen deleted');
		} catch (error) {
			notifyError('Error deleting lab specimen');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeleteSpecimen, data);
	};

	return (
		<div className="row">
			<div className="col-lg-8">
				<div className="pipelines-w">
					<div className="row">
						{!loaded ? (
							<table>
								<tbody>
									<tr>
										<td colSpan="4" className="text-center">
											<img alt="searching" src={searchingGIF} />
										</td>
									</tr>
								</tbody>
							</table>
						) : (
							<>
								{specimens.map((item, i) => {
									return (
										<div className="col-lg-4 col-xxl-3" key={i}>
											<div className="pt-3">
												<div className="pipeline-item">
													<div className="pi-controls">
														<div className="pi-settings os-dropdown-trigger">
															<i
																className="os-icon os-icon-ui-49"
																onClick={() => onClickEdit(item)}></i>
														</div>
														<div className="pi-settings os-dropdown-trigger">
															<i
																className="os-icon os-icon-ui-15"
																onClick={() => confirmDelete(item)}></i>
														</div>
													</div>
													<div className="pi-body">
														<div className="pi-info">
															<div className="h6 pi-name">{item.name}</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									);
								})}
								{specimens.length === 0 && (
									<div
										className="alert alert-info text-center"
										style={{ width: '100%' }}>
										No lab specimen found!
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</div>
			<div className="col-lg-4 col-xxl-3  d-xxl-block">
				<div className="pipeline white lined-warning">
					<form onSubmit={edit ? onEditSpecimen : onAddSpecimen}>
						<h6 className="form-header">Create Specimen</h6>
						<div className="form-group mt-2">
							<input
								className="form-control"
								placeholder="Name"
								type="text"
								onChange={handleInputChange}
								name="name"
								value={name}
							/>
						</div>
						<div className="form-buttons-w">
							{create && (
								<button className="btn btn-primary" disabled={submitting}>
									{submitting ? (
										<img src={waiting} alt="submitting" />
									) : (
										<span>create</span>
									)}
								</button>
							)}
							{edit && (
								<>
									<button
										className="btn btn-secondary ml-3"
										disabled={submitting}
										onClick={cancelEditButton}>
										<span>cancel</span>
									</button>
									<button className="btn btn-primary" disabled={submitting}>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											<span>edit</span>
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

export default LabSpecimen;
