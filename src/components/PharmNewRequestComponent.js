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
import Modal from 'react-bootstrap/Modal';

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
	icdioCode: '',
	quantity: '',
	anotherFacility: '',
	refills: '',
	frequency: '',
	eg: '',
	duration: '',
	refillNote: '',
};

const PharmNewRequestComponent = ({ patient }) => {
	const [refillable, setRefillable] = useState(false);
	const { register, handleSubmit, setValue, reset } = useForm({
		defaultValues,
	});
	const [submitting, setSubmitting] = useState(false);
	const [pharmRequest, setPharmRequest] = useState([]);
	const [editing, setEditing] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [activeRequest, setActiveRequest] = useState(null);

	const onRefillableClick = () => {
		setRefillable(!refillable);
	};

	const onModalClick = () => {
		setShowModal(!showModal);
	};

	const onFormSubmit = (data, e) => {
		let newPharm = [...pharmRequest, data];
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
		<div className="row">
			<div className="col-lg-12 form-block w-100">
				{activeRequest ? (
					<Modal
						show={showModal}
						size="lg"
						aria-labelledby="contained-modal-title-vcenter"
						centered
						onHide={onModalClick}>
						<Modal.Header closeButton>
							{patient ? (
								<Modal.Title id="contained-modal-title-vcenter">
									{`${patient && patient.surname.toUpperCase()} ${patient &&
										patient.other_names.toUpperCase()}`}
								</Modal.Title>
							) : null}
						</Modal.Header>
						<Modal.Body>
							<div className="row">
								<div className="form-group col-lg-6">
									<h4 className="primary">Service Unit</h4>
									<div>
										<p className="justify">{activeRequest.serviceUnit}</p>
									</div>
									<h5>Formulary</h5>
									<div>
										<p className="justify">{activeRequest.formulary}</p>
									</div>
									<h5>Drug Generic Name</h5>
									<div>
										<p className="justify">{activeRequest.genericName}</p>
									</div>
									<h5>Drug Name</h5>
									<div>
										<p className="justify">{activeRequest.drugName}</p>
									</div>
									<h5>Dose Quantity</h5>
									<div>
										<p className="justify">{activeRequest.quantity}</p>
									</div>
								</div>
								<div className="col-lg-6">
									<h4 className="primary">Number of refills</h4>
									<div>
										<p className="justify">{activeRequest.refills}</p>
									</div>
									<h5>E.g. 3</h5>
									<div>
										<p className="justify">{activeRequest.eg}</p>
									</div>
									<h5>Frequency type</h5>
									<div>
										<p className="justify">{activeRequest.frequency}</p>
									</div>
									<h5>Duration</h5>
									<div>
										<p className="justify">{activeRequest.duration}</p>
									</div>
									<h5>Note</h5>
									<div>
										<p className="justify">{activeRequest.refillNote}</p>
									</div>
									<h5>ICDIO Code</h5>
									<div>
										<p className="justify">{activeRequest.icdioCode}</p>
									</div>
								</div>
							</div>
						</Modal.Body>
					</Modal>
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
											{ value: 'monthly', label: 'Monthly', name: 'frequency' },
										]}
										onChange={onHandleSelectChange}
									/>
								</div>
							</div>
							<div className="row">
								<div className="form-group col-sm-6">
									<input
										type="text"
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
								name="icdioCode"
								onChange={onHandleSelectChange}
								ref={register({ name: 'icdioCode', required: true })}
								options={dummyData3}
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
									name="anotherFacility"
									ref={register}
									value="Yes"
								/>{' '}
								Yes
							</label>
						</div>
						<div className="form-group col-sm-3">
							<label>
								<input
									type="radio"
									name="anotherFacility"
									ref={register}
									value="No"
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
												<td>{request.diagnosis ? request.diagnosis : ''}</td>
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
	);
};

export default PharmNewRequestComponent;
