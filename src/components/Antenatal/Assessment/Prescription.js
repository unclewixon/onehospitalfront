/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import Select from 'react-select';
import { Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import startCase from 'lodash.startcase';

import {
	renderTextArea,
	formatCurrency,
	request,
	hasExpired,
	parseFrequency,
} from '../../../services/utilities';
import { startBlock, stopBlock } from '../../../actions/redux-block';
import { notifyError } from '../../../services/notify';
import { ReactComponent as PlusIcon } from '../../../assets/svg-icons/plus.svg';
import { ReactComponent as EditIcon } from '../../../assets/svg-icons/edit.svg';
import { ReactComponent as TrashIcon } from '../../../assets/svg-icons/trash.svg';

const validate = values => {
	const errors = {};
	return errors;
};

const Prescription = ({
	handleSubmit,
	change,
	previous,
	next,
	assessment,
	patient,
}) => {
	const [loaded, setLoaded] = useState(false);
	const [genericDrugs, setGenericDrugs] = useState([]);
	const [generic, setGeneric] = useState(null);
	const [selectedDrug, setSelectedDrug] = useState(null);
	const [frequencyType, setFrequencyType] = useState('');
	const [frequency, setFrequency] = useState('');
	const [duration, setDuration] = useState('');
	const [quantity, setQuantity] = useState('');
	const [note, setNote] = useState('');
	const [refills, setRefills] = useState('');
	const [refillable, setRefillable] = useState(false);
	const [editing, setEditing] = useState(false);
	const [drugsSelected, setDrugsSelected] = useState([]);

	const dispatch = useDispatch();

	const initData = useCallback(() => {
		setDrugsSelected(assessment?.prescriptions || []);
	}, [assessment]);

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
			initData();
			setLoaded(true);
		}
	}, [initData, loadGenericDrugs, loaded]);

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
			setGeneric(drug.generic);
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

	const selectRegimen = () => {
		if (!selectedDrug) {
			notifyError('Select drug');
			return;
		}

		const regimen = {
			generic,
			drug: selectedDrug,
			hmo_id: patient.hmo.id,
			dose_quantity: quantity,
			refills: refills && refills !== '' ? refills : 0,
			frequency,
			frequencyType: frequencyType?.value || '',
			duration,
			regimenInstruction: note,
		};

		const prescriptions = [...drugsSelected, regimen];
		setDrugsSelected(prescriptions);

		setGeneric(null);
		setSelectedDrug(null);
		setQuantity('');
		setRefills('');
		setFrequency('');
		setFrequencyType('');
		setDuration('');
		setNote('');

		dispatch(change('prescriptions', prescriptions));
	};

	const onTrash = index => {
		const regimens = drugsSelected.filter((pharm, i) => index !== i);
		setDrugsSelected([...regimens]);
	};

	const startEdit = (item, index) => {
		onTrash(index);
		setGeneric(item.generic);
		setSelectedDrug(item.drug);
		setQuantity(item.dose_quantity);
		setRefills(item.refills);
		setFrequency(item.frequency);
		setFrequencyType({
			value: item.frequencyType,
			label: startCase(item.frequencyType),
		});
		setDuration(item.duration);
		setNote(item.regimenInstruction);
		setEditing(true);
	};

	return (
		<div className="form-block encounter">
			<form onSubmit={handleSubmit(next)}>
				<div className="row">
					<div className="form-group col-sm-6">
						<label>Drug Generic Name</label>
						<Select
							placeholder="Select generic name"
							defaultValue
							getOptionValue={option => option.id}
							getOptionLabel={option => option.name}
							onChange={e => {
								setGeneric(e);
							}}
							value={generic}
							isSearchable={true}
							options={genericDrugs}
							name="generic_name"
						/>
					</div>
					<div className="form-group col-sm-6 relative">
						<label>Drug Name</label>
						{selectedDrug && (
							<div className="posit-top">
								<div className="row">
									<div className="col-sm-12">
										<span
											className={`badge badge-${
												selectedDrug.qty > 0 ? 'info' : 'danger'
											} text-white`}>{`Stock Level: ${
											selectedDrug.qty
										}; Base Price: ${formatCurrency(
											selectedDrug.basePrice
										)}`}</span>
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
							options={generic?.drugs || []}
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
				</div>
				<div className="row">
					<div className="form-group col-sm-3">
						<label>Dose Quantity</label>
						<input
							type="text"
							className="form-control"
							placeholder="Dose Quantity"
							name="quantity"
							value={quantity}
							onChange={e => setQuantity(e.target.value)}
						/>
					</div>
					<div className="form-group col-sm-3">
						<label>Frequency</label>
						<input
							type="number"
							className="form-control"
							placeholder="Frequency eg 3"
							name="frequency"
							value={frequency}
							onChange={e => setFrequency(e.target.value)}
						/>
					</div>
					<div className="form-group col-sm-3">
						<label>Frequency Type</label>
						<Select
							placeholder="Frequency type"
							name="frequencyType"
							value={frequencyType}
							options={[
								{ value: '', label: 'Select frequency' },
								{ value: 'as-needed', label: 'As Needed' },
								{ value: 'at-night', label: 'At Night' },
								{ value: 'immediately', label: 'Immediately' },
								{
									value: 'hourly',
									label: 'Hourly',
								},
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
								setFrequencyType(e);
							}}
						/>
					</div>
					<div className="form-group col-sm-3">
						<label>Duration</label>
						<input
							type="number"
							className="form-control"
							placeholder={`(value in ${frequencyType?.value ||
								'daily'}) eg: 3`}
							name="duration"
							value={duration}
							onChange={e => setDuration(e.target.value)}
						/>
					</div>
				</div>
				<div className="row">
					<div className="form-group col-sm-6">
						<label>Note</label>
						<input
							type="text"
							className="form-control"
							placeholder="Regimen line instruction"
							name="regimen_instruction"
							value={note}
							onChange={e => setNote(e.target.value)}
						/>
					</div>
					<div className="form-group col-sm-4">
						{refillable && (
							<>
								<label>Number of refills</label>
								<input
									type="number"
									className="form-control"
									placeholder="Number of refills"
									name="refills"
									value={refills}
									onChange={e => setRefills(e.target.value)}
								/>
							</>
						)}
					</div>
					<div className="form-group col-sm-2" style={{ textAlign: 'right' }}>
						<label className="form-check-label">
							<input
								className="form-check-input mt-0"
								name="urgent"
								type="checkbox"
								checked={refillable}
								onChange={() => setRefillable(!refillable)}
							/>{' '}
							Refillable
						</label>
					</div>
				</div>
				<div className="row">
					{!editing ? (
						<div className="form-group col-sm-3">
							<a
								onClick={selectRegimen}
								style={{
									backgroundColor: 'transparent',
									border: 'none',
									cursor: 'pointer',
								}}>
								<PlusIcon
									style={{
										width: '1.5rem',
										height: '1.5rem',
										cursor: 'pointer',
									}}
								/>
							</a>
						</div>
					) : (
						<div className="col-sm-12 mt-4">
							<button onClick={selectRegimen} className="btn btn-primary">
								Done
							</button>
						</div>
					)}
				</div>
				<div className="row">
					<div className="col-md-12">
						<div className="element-box p-3 m-0 mt-3 w-100">
							<Table>
								<thead>
									<tr>
										<th>Generic Name</th>
										<th>Drug Name</th>
										<th>Summary</th>
										<th nowrap="nowrap" className="text-left">
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{drugsSelected.map((item, i) => {
										return (
											<tr key={i}>
												<td>{item.generic?.name || '--'}</td>
												<td>{item.drug?.name || '--'}</td>
												<td>
													<div className="badge badge-dark">{`${
														item.dose_quantity
													} - ${item.frequency}x ${
														item.frequencyType
													} ${parseFrequency(
														item.frequencyType,
														item.duration
													)}`}</div>
												</td>
												<td>
													<div className="display-flex">
														<div>
															<EditIcon
																onClick={() => {
																	if (editing) {
																		return;
																	} else {
																		startEdit(item, i);
																	}
																}}
																style={{
																	width: '1rem',
																	height: '1rem',
																	cursor: 'pointer',
																}}
															/>
														</div>
														<div className="ml-2">
															<TrashIcon
																onClick={() => onTrash(i)}
																style={{
																	width: '1rem',
																	height: '1rem',
																	cursor: 'pointer',
																}}
															/>
														</div>
													</div>
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="form-group col-sm-12">
						<Field
							id="regimen_note"
							name="regimen_note"
							component={renderTextArea}
							label="Regimen Note"
							type="text"
							placeholder="Enter note"
						/>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-sm-12 d-flex space-between">
						<button className="btn btn-primary" onClick={previous}>
							Previous
						</button>
						<button className="btn btn-primary" type="submit">
							Next
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		initialValues: { ...ownProps.assessment },
	};
};

export default connect(mapStateToProps, { change })(
	reduxForm({
		form: 'antenatalAssessment', //Form name is same
		destroyOnUnmount: false,
		forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
		validate,
	})(Prescription)
);
