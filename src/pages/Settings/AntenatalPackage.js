/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';

import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import { request, confirmAction } from '../../services/utilities';
import { updateImmutable } from '../../services/utilities';
import TableLoading from '../../components/TableLoading';
import { formatCurrency } from '../../services/utilities';

const AntenatalPackage = () => {
	const initialState = {
		name: '',
		amount: '',
		save: true,
		edit: false,
		id: '',
	};
	const [packages, setPackages] = useState([]);
	const [{ name, amount }, setState] = useState(initialState);
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

	const onAddPackage = async e => {
		try {
			e.preventDefault();
			setLoading(true);
			const data = { name, amount };
			const rs = await request('antenatal-packages', 'POST', true, data);
			setPackages([...packages, rs]);
			setLoading(false);
			setState({ ...initialState });
			notifySuccess('antenatal package added');
		} catch (error) {
			setLoading(false);
			notifyError('Error creating antenatal package');
		}
	};

	const onEditPackage = async e => {
		try {
			e.preventDefault();
			setLoading(true);
			const data = { name, amount, id: payload.id };
			const url = `antenatal-packages/${data.id}`;
			const rs = await request(url, 'PATCH', true, data);
			const allPackages = updateImmutable(packages, rs);
			setPackages([...allPackages]);
			setState({ ...initialState });
			setSubmitButton({ save: true, edit: false });
			setLoading(false);
			notifySuccess('antenatal package updated');
		} catch (error) {
			setState({ ...initialState });
			setSubmitButton({ save: true, edit: false });
			setLoading(false);
			notifyError('Error editing antenatal packages');
		}
	};

	const onClickEdit = data => {
		setSubmitButton({ edit: true, save: false });
		setState(prevState => ({
			...prevState,
			name: data.name,
			amount: data.amount,
			id: data.id,
		}));
		getDataToEdit(data);
	};

	const onDeletePackage = async data => {
		try {
			const url = `antenatal-packages/${data.id}`;
			await request(url, 'DELETE', true);
			notifySuccess('antenatal package deleted');
			setPackages([...packages.filter(r => r.id !== parseInt(data.id, 10))]);
		} catch (error) {
			console.log(error);
			setLoading(false);
			setState({ ...initialState });
			notifyError('Error deleting antenatal package');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeletePackage, data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ save: true, edit: false });
		setState({ ...initialState });
	};

	const fetchPackages = useCallback(async () => {
		try {
			const rs = await request('antenatal-packages', 'GET', true);
			const { result, ...info } = rs;
			setPackages([...result]);
			setMeta(info);
			setDataLoaded(true);
		} catch (error) {
			setDataLoaded(true);
			notifyError(error.message || 'could not fetch antenatal packages!');
		}
	}, []);

	useEffect(() => {
		if (!dataLoaded) {
			fetchPackages();
		}
	}, [dataLoaded, fetchPackages]);

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
										Antenatal Packages
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
									{packages.map((item, i) => {
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
																<div className="pi-sub">
																	{formatCurrency(item.amount)}
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										);
									})}
								</div>
								{packages.length === 0 && (
									<div
										className="alert alert-info text-center"
										style={{ width: '100%' }}>
										No packages
									</div>
								)}
							</div>
							<div className="col-lg-4">
								<div className="element-wrapper">
									<div className="element-box">
										<form onSubmit={edit ? onEditPackage : onAddPackage}>
											<h5 className="element-box-header">Add New</h5>
											<div className="form-group">
												<label className="lighter">Name</label>
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
													<input
														className="form-control"
														placeholder="Name of package"
														type="text"
														name="name"
														value={name}
														onChange={handleInputChange}
													/>
												</div>
											</div>
											<div className="form-group">
												<label className="lighter">Amount</label>
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

export default AntenatalPackage;
