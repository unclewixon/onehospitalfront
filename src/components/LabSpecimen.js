import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';

import { confirmAction, request, updateImmutable } from '../services/utilities';
import waiting from '../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../services/notify';
import { startBlock, stopBlock } from '../actions/redux-block';
import TableLoading from './TableLoading';

const LabSpecimen = ({ setRefresh }) => {
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
			setRefresh(true);
			setSpecimens([...specimens, rs]);
			setState({ ...initialState });
			setSubmitting(false);
			notifySuccess('Lab specimen created!');
			setRefresh(false);
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
			setRefresh(true);
			const newSpecimens = updateImmutable(specimens, rs);
			setSpecimens([...newSpecimens]);
			setState({ ...initialState });
			setSubmitButton({ create: true, edit: false });
			setSubmitting(false);
			notifySuccess('Lab specimen updated!');
			setRefresh(false);
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
			dispatch(startBlock());
			const url = `lab-tests/specimens/${item.id}`;
			const rs = await request(url, 'DELETE', true);

			const newSpecimens = specimens.filter(
				s => item.id !== parseInt(rs.id, 10)
			);
			setSpecimens(newSpecimens);

			notifySuccess('Lab specimen deleted');
			setRefresh(false);

			dispatch(stopBlock());
		} catch (error) {
			notifyError('Error deleting lab specimen');
			dispatch(stopBlock());
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
							<TableLoading />
						) : (
							<>
								{specimens.map((item, i) => {
									return (
										<div className="col-lg-4 mb-2" key={i}>
											<div className="pipeline white p-1 mb-2">
												<div className="pipeline-body h-auto">
													<div className="pipeline-item">
														<div className="pi-controls">
															<div className="pi-settings os-dropdown-trigger">
																<Tooltip title="Edit Specimen">
																	<i
																		className="os-icon os-icon-ui-49 mr-1"
																		onClick={() => onClickEdit(item)}
																	/>
																</Tooltip>
																<Tooltip title="Delete Test">
																	<i
																		className="os-icon os-icon-ui-15 text-danger"
																		onClick={() => confirmDelete(item)}
																	/>
																</Tooltip>
															</div>
														</div>
														<div className="pi-body mt-2">
															<div className="pi-info">
																<div className="h6 pi-name h7">{item.name}</div>
															</div>
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
										style={{ width: '100%' }}
									>
										No lab specimen found!
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</div>
			<div className="col-lg-4">
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
										onClick={cancelEditButton}
									>
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
