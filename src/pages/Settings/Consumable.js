/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';

import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import { request, confirmAction } from '../../services/utilities';
import { updateImmutable } from '../../services/utilities';
import TableLoading from '../../components/TableLoading';

const Consumable = () => {
	const initialState = {
		name: '',
		save: true,
		edit: false,
		id: '',
	};
	const [consumables, setConsumables] = useState([]);
	const [{ name }, setState] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [{ edit, save }, setSubmitButton] = useState(initialState);
	const [payload, getDataToEdit] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [meta, setMeta] = useState(null);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddConsumable = async e => {
		try {
			e.preventDefault();
			setLoading(true);
			const data = { name };
			const rs = await request('consumables', 'POST', true, data);
			setConsumables([...consumables, rs]);
			setLoading(false);
			setState({ ...initialState });
			notifySuccess('Consumable added');
		} catch (error) {
			setLoading(false);
			notifyError('Error creating Consumable');
		}
	};

	const onEditConsumable = async e => {
		try {
			e.preventDefault();
			setLoading(true);
			const data = { name, id: payload.id };
			const url = `consumables/${data.id}`;
			const rs = await request(url, 'PATCH', true, data);
			const allConsumables = updateImmutable(consumables, rs);
			setConsumables([...allConsumables]);
			setState({ ...initialState });
			setSubmitButton({ save: true, edit: false });
			setLoading(false);
			notifySuccess('Consumable updated');
		} catch (error) {
			setState({ ...initialState });
			setSubmitButton({ save: true, edit: false });
			setLoading(false);
			notifyError('Error editing consumables');
		}
	};

	const onClickEdit = data => {
		setSubmitButton({ edit: true, save: false });
		setState(prevState => ({
			...prevState,
			name: data.name,
			id: data.id,
		}));
		getDataToEdit(data);
	};

	const onDeleteConsumable = async data => {
		try {
			const url = `consumables/${data.id}`;
			await request(url, 'DELETE', true);
			notifySuccess('Consumable deleted');
			setConsumables([
				...consumables.filter(r => r.id !== parseInt(data.id, 10)),
			]);
		} catch (error) {
			console.log(error);
			setLoading(false);
			setState({ ...initialState });
			notifyError('Error deleting consumable');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeleteConsumable, data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ save: true, edit: false });
		setState({ ...initialState });
	};

	const fetchConsumable = useCallback(async () => {
		try {
			const rs = await request('consumables', 'GET', true);
			const { result, ...info } = rs;
			setConsumables([...result]);
			setMeta(info);
			setDataLoaded(true);
		} catch (error) {
			setDataLoaded(true);
			notifyError(error.message || 'could not fetch consumables!');
		}
	}, []);

	useEffect(() => {
		if (!dataLoaded) {
			fetchConsumable();
		}
	}, [dataLoaded, fetchConsumable]);

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="element-wrapper">
					<div className="os-tabs-w mx-1">
						<div className="os-tabs-controls os-tabs-complex">
							<ul className="nav nav-tabs upper">
								<li className="nav-item">
									<a
										aria-expanded="true"
										className="nav-link active"
										data-toggle="tab">
										Consumables
									</a>
								</li>
							</ul>
						</div>
					</div>
					{!dataLoaded ? (
						<TableLoading />
					) : (
						<div className="row">
							<div className="col-lg-8">
								<div className="row">
									{consumables.map((item, i) => {
										return (
											<div className="col-lg-4" key={i}>
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
																	className="os-icon os-icon-ui-15 text-danger"
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
								</div>
								{consumables.length === 0 && (
									<div
										className="alert alert-info text-center"
										style={{ width: '100%' }}>
										No consumables
									</div>
								)}
							</div>
							<div className="col-lg-4">
								<div className="element-wrapper">
									<div className="element-box">
										<form onSubmit={edit ? onEditConsumable : onAddConsumable}>
											<h5 className="element-box-header">Add New</h5>
											<div className="form-group">
												<label className="lighter">Name</label>
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
													<input
														className="form-control"
														placeholder="Name of consumable"
														type="text"
														name="name"
														value={name}
														onChange={handleInputChange}
													/>
												</div>
											</div>

											<div className="form-buttons-w text-right compact">
												{save && (
													<button className="btn btn-primary">
														{loading ? (
															<img src={waiting} alt="submitting" />
														) : (
															<span> save</span>
														)}
													</button>
												)}
												{edit && (
													<>
														<button
															className="btn btn-secondary"
															onClick={cancelEditButton}>
															<span>cancel</span>
														</button>
														<button className="btn btn-primary">
															{loading ? (
																<img src={waiting} alt="submitting" />
															) : (
																<span> edit</span>
															)}
														</button>
													</>
												)}
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Consumable;
