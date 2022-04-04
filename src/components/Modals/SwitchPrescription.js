import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { confirmAlert } from 'react-confirm-alert';
import { useDispatch } from 'react-redux';

import { notifyError, notifySuccess } from '../../services/notify';
import { request, hasExpired } from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import waiting from '../../assets/images/waiting.gif';

const defaultValues = {
	drugId: '',
	dose: '',
	frequency: '',
	taskCount: '',
};

const SwitchPrescription = ({ closeModal, prescriptionId, itemId, update }) => {
	const { register, handleSubmit, setValue } = useForm({
		defaultValues,
	});
	const [loaded, setLoaded] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [genericDrugs, setGenericDrugs] = useState([]);
	const [selectedDrug, setSelectedDrug] = useState(null);

	const [generic, setGeneric] = useState(null);
	const [frequencyType, setFrequencyType] = useState(null);

	const dispatch = useDispatch();

	const loadGenericDrugs = useCallback(async () => {
		try {
			dispatch(startBlock());
			const rs = await request('inventory/generics?limit=1000', 'GET', true);
			setGenericDrugs(rs.result);
			dispatch(stopBlock());
		} catch (e) {
			dispatch(stopBlock());
			notifyError('Error while fetching generic names');
		}
	}, [dispatch]);

	useEffect(() => {
		if (!loaded) {
			loadGenericDrugs();
			setLoaded(true);
		}
	}, [loadGenericDrugs, loaded]);

	const onFormSubmit = async data => {
		try {
			if (!generic) {
				notifyError('No drugs has been selected');
				return;
			}

			setSubmitting(true);
			dispatch(startBlock());

			const values = {
				...data,
				generic,
				drug: selectedDrug,
				dose_quantity: data.quantity,
			};

			const regimen = { ...values, request_id: prescriptionId };
			const uri = `requests/switch-request/${itemId}`;
			const rs = await request(uri, 'POST', true, regimen);
			setSubmitting(false);
			dispatch(stopBlock());
			if (rs.success) {
				update(rs.data);
				notifySuccess('prescription request switched!');
				closeModal();
			} else {
				notifyError(rs.message);
			}
		} catch (e) {
			console.log(e);
			dispatch(stopBlock());
			setSubmitting(false);
			notifyError('Error while switching prescription');
		}
	};

	const onHandleInputChange = e => {
		const { name, value } = e.target;
		setValue(name, value);
	};

	const onDrugExpired = (drug, bypass) => {
		const expired =
			drug.batches.length > 0
				? hasExpired(drug.batches[0].expirationDate)
				: true;
		if (!expired || bypass) {
			setValue('drugId', drug.id);
			setSelectedDrug({
				...drug,
				qty: drug.batches.reduce((total, item) => total + item.quantity, 0),
				basePrice: drug.batches.length > 0 ? drug.batches[0].unitPrice : 0,
			});
			setGeneric(drug.generic);
		} else {
			confirmAlert({
				customUI: ({ onClose }) => {
					const continueBtn = async () => {
						setValue('drugId', drug.id);
						setSelectedDrug({
							...drug,
							qty: drug.batches.reduce(
								(total, item) => total + item.quantity,
								0
							),
							basePrice:
								drug.batches.length > 0 ? drug.batches[0].unitPrice : 0,
						});
						setGeneric(drug.generic);
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
									onClick={changeBtn}
								>
									Change
								</button>
								<button
									className="btn btn-secondary"
									style={{ margin: '10px' }}
									onClick={continueBtn}
								>
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
									onClick={changeBtn}
								>
									Change
								</button>
								<button
									className="btn btn-secondary"
									style={{ margin: '10px' }}
									onClick={continueBtn}
								>
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
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '760px' }}
			>
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => closeModal()}
					>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Switch Medication</h4>
						<div className="element-box p-2">
							<form onSubmit={handleSubmit(onFormSubmit)}>
								<div className="row">
									<div className="form-group col-sm-6">
										<label>Drug Generic Name</label>
										<Select
											placeholder="Select generic name"
											defaultValue
											getOptionValue={option => option.id}
											getOptionLabel={option => option.name}
											onChange={e => setGeneric(e)}
											value={generic}
											isSearchable={true}
											options={genericDrugs}
											name="generic_name"
										/>
									</div>
									<div className="form-group col-sm-6">
										<label>Drug Name</label>
										{selectedDrug && (
											<div className="posit-top">
												<div className="row">
													<div className="col-sm-12">
														<span
															className={`badge badge-${
																selectedDrug.qty > 0 ? 'info' : 'danger'
															} text-white`}
														>{`Stock Level: ${selectedDrug.qty}; Base Price: ₦${selectedDrug.basePrice}`}</span>
													</div>
												</div>
											</div>
										)}
										<Select
											isClearable
											getOptionValue={option => option.id}
											getOptionLabel={option => option.name}
											defaultOptions
											ref={register({ name: 'drugId', required: true })}
											name="drugId"
											options={generic?.drugs || []}
											value={selectedDrug}
											onChange={e => {
												if (e) {
													onDrugSelection(e);
												} else {
													setValue('drugId', '');
													setSelectedDrug(null);
												}
											}}
											placeholder="select a drug"
										/>
									</div>
								</div>
								<div className="row">
									<div className="form-group col-sm-6">
										<label>Dose Quantity</label>
										<input
											type="text"
											className="form-control"
											placeholder="Dose Quantity"
											ref={register({ required: true })}
											name="quantity"
											onChange={onHandleInputChange}
										/>
									</div>
									<div className="form-group col-sm-6">
										<label>Frequency</label>
										<input
											type="number"
											className="form-control"
											placeholder="eg 3"
											ref={register({ required: true })}
											name="frequency"
											onChange={onHandleInputChange}
										/>
									</div>
								</div>
								<div className="row">
									<div className="form-group col-sm-6">
										<label>Frequency Type</label>
										<Select
											placeholder="Frequency type"
											ref={register({ name: 'frequencyType', required: true })}
											name="frequencyType"
											value={frequencyType}
											options={[
												{ value: '', label: 'Select frequency' },
												{ value: 'as-needed', label: 'As Needed' },
												{ value: 'at-night', label: 'At Night' },
												{ value: 'immediately', label: 'Immediately' },
												{ value: 'hourly', label: 'Hourly' },
												{ value: 'daily', label: 'Daily' },
												{
													value: 'weekly',
													label: 'Weekly',
												},
												{
													value: 'monthly',
													label: 'Monthly',
												},
												{ value: 'quarterly', label: 'Quarterly' },
												{ value: 'stat', label: 'Stat' },
											]}
											onChange={e => {
												setValue('frequencyType', e.value);
												setFrequencyType(e);
											}}
										/>
									</div>
									<div className="form-group col-sm-6">
										<label>Duration</label>
										<input
											type="number"
											className="form-control"
											placeholder={`(value in ${
												frequencyType?.value || 'daily'
											}) eg: 3`}
											ref={register({ required: true })}
											name="duration"
											onChange={onHandleInputChange}
										/>
									</div>
								</div>
								<div className="row relative">
									<div className="col-md-12 relative">
										<button
											disabled={submitting}
											className="btn btn-primary mt-4"
										>
											{submitting ? (
												<img src={waiting} alt="submitting" />
											) : (
												<span> Save</span>
											)}
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SwitchPrescription;
