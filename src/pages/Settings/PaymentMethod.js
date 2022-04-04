/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';

import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import { request, confirmAction } from '../../services/utilities';
import { updateImmutable } from '../../services/utilities';
import TableLoading from '../../components/TableLoading';

const PaymentMethod = () => {
	const initialState = {
		name: '',
		amount: '',
		save: true,
		edit: false,
		id: '',
	};
	const [paymentMethods, setPaymentMethods] = useState([]);
	const [{ name, amount }, setState] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [{ edit, save }, setSubmitButton] = useState(initialState);
	const [payload, getDataToEdit] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddPaymentMethod = async e => {
		try {
			e.preventDefault();
			setLoading(true);
			const data = { name, amount };
			const rs = await request('payment-methods', 'POST', true, data);
			setPaymentMethods([...paymentMethods, rs]);
			setLoading(false);
			setState({ ...initialState });
			notifySuccess('Payment method added');
		} catch (error) {
			setLoading(false);
			notifyError('Error creating payment method');
		}
	};

	const onEditPaymentMethod = async e => {
		try {
			e.preventDefault();
			setLoading(true);
			const data = { name, id: payload.id, amount };
			const url = `payment-methods/${data.id}`;
			const rs = await request(url, 'PATCH', true, data);
			const allMethods = updateImmutable(paymentMethods, rs);
			setPaymentMethods([...allMethods]);
			setState({ ...initialState });
			setSubmitButton({ save: true, edit: false });
			setLoading(false);
			notifySuccess('Payment method updated');
		} catch (error) {
			setState({ ...initialState });
			setSubmitButton({ save: true, edit: false });
			setLoading(false);
			notifyError('Error editing payment methods');
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

	const onDeletePaymentMethod = async data => {
		try {
			const url = `payment-methods/${data.id}`;
			await request(url, 'DELETE', true);
			notifySuccess('Payment method deleted');
			setPaymentMethods([
				...paymentMethods.filter(r => r.id !== parseInt(data.id, 10)),
			]);
		} catch (error) {
			console.log(error);
			setLoading(false);
			setState({ ...initialState });
			notifyError('Error deleting payment method');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeletePaymentMethod, data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ save: true, edit: false });
		setState({ ...initialState });
	};

	const fetchPaymentMethod = useCallback(async () => {
		try {
			const rs = await request('payment-methods', 'GET', true);
			setPaymentMethods([...rs]);
			setDataLoaded(true);
		} catch (error) {
			setDataLoaded(true);
			notifyError(error.message || 'could not fetch payment methods!');
		}
	}, []);

	useEffect(() => {
		if (!dataLoaded) {
			fetchPaymentMethod();
		}
	}, [dataLoaded, fetchPaymentMethod]);

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="element-wrapper">
					<div className="os-tabs-w mx-1">
						<div className="os-tabs-controls os-tabs-complex">
							<ul className="nav nav-tabs upper">
								<li className="nav-item">
									<a className="nav-link active">Payment Methods</a>
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
									{paymentMethods.map((item, i) => {
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
															</div>
														</div>
														{/* <div className="pi-foot">
															<div className="tags"></div>
															<a className="extra-info"></a>
														</div> */}
													</div>
												</div>
											</div>
										);
									})}
								</div>
								{paymentMethods.length === 0 && (
									<div
										className="alert alert-info text-center"
										style={{ width: '100%' }}
									>
										No payment methods
									</div>
								)}
							</div>
							<div className="col-lg-4">
								<div className="element-wrapper">
									<div className="element-box">
										<form
											onSubmit={edit ? onEditPaymentMethod : onAddPaymentMethod}
										>
											<h5 className="element-box-header">Add New</h5>
											<div className="form-group">
												<label className="lighter">Name</label>
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
													<input
														className="form-control"
														placeholder="Name"
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

export default PaymentMethod;
