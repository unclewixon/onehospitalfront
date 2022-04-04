/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';

import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import {
	request,
	confirmAction,
	formatCurrency,
} from '../../services/utilities';
import { updateImmutable } from '../../services/utilities';
import TableLoading from '../../components/TableLoading';

const NicuAccommodation = () => {
	const initialState = {
		name: '',
		amount: '',
		quantity: '',
		save: true,
		edit: false,
		id: '',
	};
	const [accommodations, setAccommodations] = useState([]);
	const [{ name, amount, quantity }, setState] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [{ edit, save }, setSubmitButton] = useState(initialState);
	const [payload, getDataToEdit] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddAccommodation = async e => {
		try {
			e.preventDefault();
			setLoading(true);
			const data = { name, amount, quantity };
			const rs = await request('nicu-accommodations', 'POST', true, data);
			setAccommodations([...accommodations, rs]);
			setLoading(false);
			setState({ ...initialState });
			notifySuccess('Accommodation added');
		} catch (error) {
			setLoading(false);
			notifyError('Error creating Accommodation');
		}
	};

	const onEditAccommodation = async e => {
		try {
			e.preventDefault();
			setLoading(true);
			const data = { name, id: payload.id, amount, quantity };
			const url = `nicu-accommodations/${data.id}`;
			const rs = await request(url, 'PATCH', true, data);
			const allAccommodations = updateImmutable(accommodations, rs);
			setAccommodations([...allAccommodations]);
			setState({ ...initialState });
			setSubmitButton({ save: true, edit: false });
			setLoading(false);
			notifySuccess('Accommodation updated');
		} catch (error) {
			setState({ ...initialState });
			setSubmitButton({ save: true, edit: false });
			setLoading(false);
			notifyError('Error editing accommodations');
		}
	};

	const onClickEdit = data => {
		setSubmitButton({ edit: true, save: false });
		setState(prevState => ({
			...prevState,
			name: data.name,
			quantity: data.quantity,
			amount: data.amount,
			id: data.id,
		}));
		getDataToEdit(data);
	};

	const onDeleteAccommodation = async data => {
		try {
			const url = `nicu-accommodations/${data.id}`;
			await request(url, 'DELETE', true);
			notifySuccess('Accommodation deleted');
			setAccommodations([
				...accommodations.filter(r => r.id !== parseInt(data.id, 10)),
			]);
		} catch (error) {
			console.log(error);
			setLoading(false);
			setState({ ...initialState });
			notifyError('Error deleting accommodation');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeleteAccommodation, data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ save: true, edit: false });
		setState({ ...initialState });
	};

	const fetchAccommodation = useCallback(async () => {
		try {
			const rs = await request('nicu-accommodations', 'GET', true);
			const { result } = rs;
			setAccommodations([...result]);
			setDataLoaded(true);
		} catch (error) {
			setDataLoaded(true);
			notifyError(error.message || 'could not fetch accommodations!');
		}
	}, []);

	useEffect(() => {
		if (!dataLoaded) {
			fetchAccommodation();
		}
	}, [dataLoaded, fetchAccommodation]);

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="element-wrapper">
					<div className="os-tabs-w mx-1">
						<div className="os-tabs-controls os-tabs-complex">
							<ul className="nav nav-tabs upper">
								<li className="nav-item">
									<a className="nav-link active">Nicu Accommodations</a>
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
									{accommodations.map((item, i) => {
										return (
											<div className="col-lg-4" key={i}>
												<div className="pt-3">
													<div className="pipeline-item">
														<div className="pi-controls">
															<div className="pi-settings os-dropdown-trigger">
																<i
																	className="os-icon os-icon-ui-49"
																	onClick={() => onClickEdit(item)}
																></i>
															</div>
															<div className="pi-settings os-dropdown-trigger">
																<i
																	className="os-icon os-icon-ui-15 text-danger"
																	onClick={() => confirmDelete(item)}
																></i>
															</div>
														</div>
														<div className="pi-body">
															<div className="pi-info">
																<div className="h6 pi-name h7">{item.name}</div>
																<div className="pi-sub mt-2">
																	{`Qty Owned: ${item.quantity}`}
																</div>
																<div className="pi-sub">
																	{`Qty Unused: ${item.quantity_unused}`}
																</div>
															</div>
														</div>
														<div className="pi-foot">
															<div className="tags"></div>
															<a className="extra-info">
																<span>{`${formatCurrency(
																	item.amount
																)}/day`}</span>
															</a>
														</div>
													</div>
												</div>
											</div>
										);
									})}
								</div>
								{accommodations.length === 0 && (
									<div
										className="alert alert-info text-center"
										style={{ width: '100%' }}
									>
										No accommodations
									</div>
								)}
							</div>
							<div className="col-lg-4">
								<div className="element-wrapper">
									<div className="element-box">
										<form
											onSubmit={edit ? onEditAccommodation : onAddAccommodation}
										>
											<h5 className="element-box-header">Add New</h5>
											<div className="form-group">
												<label className="lighter">Name</label>
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
													<input
														className="form-control"
														placeholder="Name of accommodation"
														type="text"
														name="name"
														value={name}
														onChange={handleInputChange}
													/>
												</div>
											</div>
											<div className="form-group">
												<label className="lighter">
													Amount <small>per night</small>
												</label>
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
													<input
														className="form-control"
														placeholder="Amount"
														type="text"
														name="amount"
														value={amount}
														onChange={handleInputChange}
													/>
												</div>
											</div>
											<div className="form-group">
												<label className="lighter">Quantity Owned</label>
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
													<input
														className="form-control"
														placeholder="Quantity"
														type="number"
														name="quantity"
														value={quantity}
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
															onClick={cancelEditButton}
														>
															<span>cancel</span>
														</button>
														<button className="btn btn-primary">
															{loading ? (
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
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default NicuAccommodation;
