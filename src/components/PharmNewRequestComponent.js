import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { ReactComponent as PlusIcon } from '../assets/svg-icons/plus.svg';
import waiting from '../assets/images/waiting.gif';
// import { ReactComponent as MinusIcon } from '../assets/svg-icons/minus.svg';
import { ReactComponent as EditIcon } from '../assets/svg-icons/edit.svg';
import { ReactComponent as TrashIcon } from '../assets/svg-icons/trash.svg';
import { ReactComponent as ViewIcon } from '../assets/svg-icons/view.svg';
import { Table } from 'react-bootstrap';
import { notifySuccess, notifyError } from './../services/notify';
import PharmNewRequestViewModal from './PharmNewRequestViewModal';
import { addPharmacyRequest } from '../actions/patient';
import { connect } from 'react-redux';

const dummyData = [
	{ value: '', label: 'Select one', name: 'formulary' },
	{ value: '12', label: 'Line', name: 'formulary' },
	{ value: '13', label: 'Line2', name: 'formulary' },
	{ value: '14', label: 'Line3', name: 'formulary' },
];
const dummyData1 = [
	{ value: '', label: 'Select one', name: 'serviceUnit' },
	{ value: '12', label: 'Line44', name: 'serviceUnit' },
	{ value: '13', label: 'Line55', name: 'serviceUnit' },
	{ value: '14', label: 'Line66', name: 'serviceUnit' },
];

const dummyData2 = [
	{ value: '', label: 'Select one', name: 'genericName' },
	{ value: '12', label: 'Line777', name: 'genericName' },
	{ value: '13', label: 'Line888', name: 'genericName' },
	{ value: '14', label: 'Line999', name: 'genericName' },
];

const dummyData3 = [
	{ value: '', label: 'Select one', name: 'drugName' },
	{ value: '12', label: 'Line0000', name: 'drugName' },
	{ value: '13', label: 'Line1111', name: 'drugName' },
	{ value: '14', label: 'Line0101', name: 'drugName' },
];

const defaultValues = {
	serviceUnit: '',
	formulary: '',
	genericName: '',
	drugName: '',
	quantity: '',
	anotherFacility: false,
	refills: '',
	frequency: '',
	eg: '',
	duration: '',
	refillNote: '',
};

const PharmNewRequestComponent = ({
	patient,
	diagnosisList,
	addPharmacyRequest,
}) => {
	const [refillable, setRefillable] = useState(false);
	const { register, handleSubmit, setValue, reset, watch } = useForm({
		defaultValues,
	});
	const [submitting, setSubmitting] = useState(false);
	const [pharmRequest, setPharmRequest] = useState([]);
	const [editing, setEditing] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [activeRequest, setActiveRequest] = useState(null);
	const [diagnosis, setDiagnosis] = useState('');
	const [prescription, setPrescription] = useState(false);

	const onRefillableClick = () => {
		setRefillable(!refillable);
	};

	const values = watch();

	const onModalClick = () => {
		setShowModal(!showModal);
	};

	const onFormSubmit = (data, e) => {
		const { diagnosis, ...rest } = data;
		let newPharm = [...pharmRequest, rest];
		setPharmRequest(newPharm);
		setEditing(false);
		reset(defaultValues);
	};

	const onTrash = index => {
		const newPharm = pharmRequest.filter((pharm, i) => index !== i);
		setPharmRequest(newPharm);
	};

	const startEdit = (request, index) => {
		onTrash(index);
		Object.entries(request).map(req => {
			const [key, value] = req;
			setValue(key, value);
		});
		setEditing(true);
	};

	const saveTableData = e => {
		setSubmitting(true);
		e.preventDefault();

		const patient_id = patient && patient.id ? patient.id : '';
		addPharmacyRequest(
			pharmRequest,
			patient_id,
			diagnosis,
			prescription,
			message => {
				if (message) {
					setSubmitting(false);
					notifySuccess('Saved new pharmacy request');
				} else {
					setSubmitting(false);
					notifyError('Error saving new pharmacy request');
				}
			}
		);
	};
	const onHandleSelectChange = e => {
		if (e) {
			const { name, value } = e;
			setValue(name, value);
		}
	};

	const onHandleInputChange = e => {
		const { name, value } = e.target;
		setValue(name, value);
	};

	return (
		<div className="row" style={{ width: '100%' }}>
			<div className="col-sm-12 element-box">
				<div className="col-lg-12 form-block w-100">
					{activeRequest ? (
						<PharmNewRequestViewModal
							activeRequest={activeRequest}
							patient={patient}
							showModal={showModal}
							onModalClick={onModalClick}
						/>
					) : null}
					<form onSubmit={handleSubmit(onFormSubmit)}>
						<div className="row">
							<div className="form-group col-sm-6">
								<label>Service Unit</label>
								<Select
									placeholder="Choose a Service Unit"
									ref={register({ name: 'serviceUnit', required: true })}
									name="serviceUnit"
									options={dummyData1}
									onChange={onHandleSelectChange}
									value={{
										label: values.serviceUnit,
										value: values.serviceUnit,
									}}
								/>
							</div>
							<div className="form-group col-sm-6">
								<label>Formulary</label>
								<Select
									placeholder="Choose a formulary"
									name="formulary"
									ref={register({ name: 'formulary', required: true })}
									onChange={onHandleSelectChange}
									options={dummyData}
									value={{ label: values.formulary, value: values.formulary }}
								/>
							</div>
						</div>
						<div className="row">
							<div className="form-group col-sm-12">
								<label>Drug Generic Name</label>
								<Select
									placeholder="Choose a drug generic name"
									name="genericName"
									ref={register({ name: 'genericName', required: true })}
									onChange={onHandleSelectChange}
									options={dummyData2}
									value={{
										label: values.genericName,
										value: values.genericName,
									}}
								/>
							</div>
						</div>
						<div className="row">
							<div className="form-group col-sm-6">
								<label>Drug Name</label>
								<Select
									placeholder="Choose a drug name"
									ref={register({ name: 'drugName', required: true })}
									name="drugName"
									options={dummyData3}
									onChange={onHandleSelectChange}
									value={{ label: values.drugName, value: values.drugName }}
								/>
							</div>
							<div className="form-group col-sm-6">
								<label>Dose Quantity</label>
								<input
									type="number"
									className="form-control"
									placeholder="Dose Quantity"
									ref={register({ required: true })}
									name="quantity"
									onChange={onHandleInputChange}
								/>
							</div>
						</div>
						<div style={{ textAlign: 'right' }}>
							<label className="form-check-label">
								<input
									className="form-check-input mt-0"
									name="urgent"
									type="checkbox"
									onClick={onRefillableClick}
								/>{' '}
								Refillable
							</label>
						</div>
						{refillable ? (
							<div>
								<div>
									<h6>Refills Count</h6>
								</div>
								<div className="row">
									<div className="form-group col-sm-4">
										<input
											type="number"
											className="form-control"
											placeholder="Number of refills"
											ref={register({ name: 'refills' })}
											name="refills"
											onChange={onHandleInputChange}
										/>
									</div>
									<div className="form-group col-sm-4">
										<input
											type="text"
											className="form-control"
											placeholder="E.g. 3"
											ref={register}
											name="eg"
											onChange={onHandleInputChange}
										/>
									</div>
									<div className="form-group col-sm-4">
										<Select
											placeholder="Frequency type"
											ref={register({ name: 'frequency', required: true })}
											name="frequency"
											options={[
												{ value: '', label: 'Select one', name: 'frequency' },
												{ value: 'daily', label: 'Daily', name: 'frequency' },
												{ value: 'weekly', label: 'Weekly', name: 'frequency' },
												{
													value: 'monthly',
													label: 'Monthly',
													name: 'frequency',
												},
											]}
											onChange={onHandleSelectChange}
											value={{
												label: values.frequency,
												value: values.frequency,
											}}
										/>
									</div>
								</div>
								<div className="row">
									<div className="form-group col-sm-6">
										<input
											type="number"
											className="form-control"
											placeholder="Duration"
											ref={register}
											name="duration"
											onChange={onHandleInputChange}
										/>
									</div>
									<div className="form-group col-sm-6">
										<input
											type="text"
											className="form-control"
											placeholder="Note"
											ref={register}
											name="refillNote"
											onChange={onHandleInputChange}
										/>
									</div>
								</div>
							</div>
						) : null}
						<div>
							<h6>Diagnosis Data</h6>
						</div>
						<div className="row">
							<div className="form-group col-sm-12">
								<Select
									isClearable
									isSearchable
									placeholder="Enter ICDIO Code"
									onChange={e => {
										setDiagnosis(e.value);
									}}
									options={diagnosisList}
									value={{ label: diagnosis, value: diagnosis }}
								/>
							</div>
						</div>
						<div>
							<h6>Prescription from another facility</h6>
						</div>
						<div className="row">
							<div className="form-group col-sm-3">
								<label>
									<input
										type="radio"
										checked={prescription}
										onChange={() => setPrescription(true)}
									/>{' '}
									Yes
								</label>
							</div>
							<div className="form-group col-sm-3">
								<label>
									<input
										type="radio"
										checked={!prescription}
										onChange={() => setPrescription(false)}
									/>{' '}
									No
								</label>
							</div>
						</div>
						<div className="row">
							{!editing ? (
								<div className="form-group col-sm-3">
									<button
										onClick={handleSubmit}
										style={{ backgroundColor: 'transparent', border: 'none' }}>
										<PlusIcon
											style={{
												width: '1.5rem',
												height: '1.5rem',
												cursor: 'pointer',
											}}
										/>
									</button>
								</div>
							) : (
								<button onClick={handleSubmit} className="btn btn-primary">
									Done
								</button>
							)}

							{/* <div className="form-group col-sm-3">
							<MinusIcon style={{ width: '1.5rem', height: '1.5rem', cursor: 'pointer' }} />
						</div> */}
						</div>
					</form>
					<div>
						<Table>
							<thead>
								<tr>
									<th>Generic Name</th>
									<th>Drug Name</th>
									<th>Quantity</th>
									<th>Diagnosis</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{pharmRequest
									? pharmRequest.map((request, index) => {
											return (
												<tr key={index}>
													<td>{request.genericName}</td>
													<td>{request.drugName}</td>
													<td>{request.quantity}</td>
													<td>{diagnosis ? diagnosis : ''}</td>
													<td>
														<ViewIcon
															onClick={() => {
																setActiveRequest(request);
																onModalClick();
															}}
															style={{
																width: '1rem',
																height: '1rem',
																cursor: 'pointer',
															}}
														/>{' '}
														{'  '}
														<EditIcon
															onClick={() => {
																if (editing) {
																	return;
																} else {
																	startEdit(request, index);
																}
															}}
															style={{
																width: '1rem',
																height: '1rem',
																cursor: 'pointer',
															}}
														/>{' '}
														{'  '}
														<TrashIcon
															onClick={() => onTrash(index)}
															style={{
																width: '1rem',
																height: '1rem',
																cursor: 'pointer',
															}}
														/>
													</td>
												</tr>
											);
									  })
									: []}
							</tbody>
						</Table>
					</div>
					<div>
						<button
							onClick={saveTableData}
							className={
								submitting ? 'btn btn-primary disabled' : 'btn btn-primary'
							}>
							{submitting ? (
								<img src={waiting} alt="submitting" />
							) : (
								<span> Save</span>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default connect(null, { addPharmacyRequest })(PharmNewRequestComponent);
