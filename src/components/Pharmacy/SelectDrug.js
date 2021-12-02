import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';

import { hasExpired, request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';

const SelectDrug = ({ onHide, setDrug, generic }) => {
	const [loaded, setLoaded] = useState(false);
	const [genericDrugs, setGenericDrugs] = useState([]);
	const [selectedGeneric, setSelectedGeneric] = useState(null);
	const [selectedDrug, setSelectedDrug] = useState(null);

	const dispatch = useDispatch();

	const loadGenericDrugs = useCallback(async () => {
		try {
			dispatch(startBlock());
			const rs = await request('inventory/generics?limit=100', 'GET', true);
			setGenericDrugs(rs.result);
			dispatch(stopBlock());
		} catch (e) {
			dispatch(stopBlock());
			notifyError('Error while fetching generic names');
		}
	}, [dispatch]);

	const getGeneric = useCallback(async () => {
		try {
			const rs = await request(`inventory/generics/${generic.id}`, 'GET', true);
			setSelectedGeneric(rs);
		} catch (e) {}
	}, [generic.id]);

	useEffect(() => {
		if (!loaded) {
			if (generic) {
				getGeneric();
			}
			loadGenericDrugs();
			setLoaded(true);
		}
	}, [generic, getGeneric, loadGenericDrugs, loaded]);

	const selectDrug = () => {
		setDrug(selectedGeneric, selectedDrug);
		onHide();
	};

	const onDrugExpired = (drug, bypass) => {
		const expired =
			drug.batches.length > 0
				? hasExpired(drug.batches[0].expirationDate)
				: true;
		if (!expired || bypass) {
			setSelectedDrug({
				...drug,
				qty: drug.batches.reduce((total, item) => total + item.quantity, 0),
				basePrice: drug.batches.length > 0 ? drug.batches[0].unitPrice : 0,
			});
			setSelectedGeneric(drug.generic);
		} else {
			confirmAlert({
				customUI: ({ onClose }) => {
					const continueBtn = async () => {
						setSelectedDrug({
							...drug,
							qty: drug.batches.reduce(
								(total, item) => total + item.quantity,
								0
							),
							basePrice:
								drug.batches.length > 0 ? drug.batches[0].unitPrice : 0,
						});
						setSelectedGeneric(drug.generic);
						onClose();
					};

					const changeBtn = async () => {
						setSelectedDrug(null);
						onClose();
					};

					return (
						<div className="custom-ui text-center">
							<h3 className="text-danger">Expiration</h3>
							<p>{`${drug.name} has expired`}</p>
							<div>
								<button
									className="btn btn-primary"
									style={{ margin: '10px' }}
									onClick={changeBtn}>
									Change
								</button>
								<button
									className="btn btn-secondary"
									style={{ margin: '10px' }}
									onClick={continueBtn}>
									Continue
								</button>
							</div>
						</div>
					);
				},
			});
		}
	};

	const onDrugSelection = drug => {
		if (
			drug.batches.length === 0 ||
			(drug.batches.length > 0 &&
				drug.batches.reduce((total, item) => total + item.quantity, 0) === 0)
		) {
			confirmAlert({
				customUI: ({ onClose }) => {
					const continueBtn = async () => {
						onDrugExpired(drug, true);
						onClose();
					};

					const changeBtn = async () => {
						setSelectedDrug(null);
						onClose();
					};

					return (
						<div className="custom-ui text-center">
							<h3 className="text-danger">Stock</h3>
							<p>{`${drug.name} is out of stock`}</p>
							<div>
								<button
									className="btn btn-primary"
									style={{ margin: '10px' }}
									onClick={changeBtn}>
									Change
								</button>
								<button
									className="btn btn-secondary"
									style={{ margin: '10px' }}
									onClick={continueBtn}>
									Continue
								</button>
							</div>
						</div>
					);
				},
			});
		} else {
			onDrugExpired(drug, false);
		}
	};

	return (
		<div
			className="onboarding-modal fade animated show"
			role="dialog"
			style={{ width: '300px' }}>
			<div className="modal-centered" role="document">
				<div className="modal-content text-center">
					<button className="close" type="button" onClick={() => onHide()}>
						<span className="os-icon os-icon-close" />
					</button>
					<div className="onboarding-content with-gradient">
						<div className="form-block">
							{!generic && (
								<div className="row">
									<div className="form-group col-sm-12">
										<label>Drug Generic Name</label>
										<Select
											placeholder="Select generic name"
											defaultValue
											getOptionValue={option => option.id}
											getOptionLabel={option => option.name}
											onChange={e => {
												setSelectedGeneric(e);
											}}
											value={selectedGeneric}
											isSearchable={true}
											options={genericDrugs}
											name="generic_name"
										/>
									</div>
								</div>
							)}
							<div className="form-group col-sm-12 relative">
								<label>Drug Name</label>
								{selectedDrug && (
									<div className="posit-top">
										<div className="row">
											<div className="col-sm-12">
												<span
													className={`badge badge-${
														selectedDrug.qty > 0 ? 'info' : 'danger'
													} text-white`}>{`Stock Level: ${selectedDrug.qty}; Base Price: ₦${selectedDrug.basePrice}`}</span>
											</div>
										</div>
									</div>
								)}
								<Select
									isClearable
									getOptionValue={option => option.id}
									getOptionLabel={option => option.name}
									defaultOptions
									name="drugId"
									options={selectedGeneric?.drugs || []}
									value={selectedDrug}
									onChange={e => {
										if (e) {
											onDrugSelection(e);
										} else {
											setSelectedDrug(null);
										}
									}}
									placeholder="select a drug"
								/>
							</div>
							<div className="row">
								<div className="col-sm-12 text-right">
									<button
										className="btn btn-primary"
										onClick={() => selectDrug()}>
										save
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SelectDrug;
