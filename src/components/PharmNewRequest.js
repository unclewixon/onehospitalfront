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

const dummyData = [
	{ value: "12", label: "Line", name: 'formulary' },
	{ value: "13", label: "Line2", name: 'formulary' },
	{ value: "14", label: "Line3", name: 'formulary' },
]
const dummyData1 = [
	{ value: "12", label: "Line44", name: 'serviceUnit' },
	{ value: "13", label: "Line55", name: 'serviceUnit' },
	{ value: "14", label: "Line66", name: 'serviceUnit' },
]

const dummyData2 = [
	{ value: "12", label: "Line777", name: 'genericName' },
	{ value: "13", label: "Line888", name: 'genericName' },
	{ value: "14", label: "Line999", name: 'genericName' },
]

const dummyData3 = [
	{ value: "12", label: "Line0000", name: 'drugName' },
	{ value: "13", label: "Line1111", name: 'drugName' },
	{ value: "14", label: "Line0101", name: 'drugName' },
]

const PharmNewRequest = (props) => {
	const [refillable, setRefillable] = useState(false);
	const { register, handleSubmit, setValue } = useForm();
	const [submitting, setSubmitting] = useState(false);
	const [pharmRequest, setPharmRequest] = useState([])

	const onRefillableClick = () => {
		setRefillable(!refillable);
	}

	const onFormSubmit = (data, e) => {
		let newPharm = [...pharmRequest, data]
		setPharmRequest(newPharm)
	}

	const onHandleSelectChange = e => {
		const { name, value } = e;
		setValue(name, value)
	}

	const onHandleInputChange = e => {
		const { name, value } = e.target;
		setValue(name, value)
	}
	return (
		<div className="row">
			<div className="col-lg-12 form-block w-100">
				<form onSubmit={handleSubmit(onFormSubmit)}>
					<div className="row">
						<div className="form-group col-sm-6">
							<label>Service Unit</label>
							<Select
								placeholder="Choose a Service Unit"
								ref={register({ name: 'serviceUnit', required: true })}
								name="serviceUnit"
								options={dummyData1}
							/>
						</div>
						<div className="form-group col-sm-6">
							<label>Formulary</label>
							<Select
								placeholder="Choose a formulary"
								name="formulary"
								ref={register({ name: "formulary", required: true })}
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
								ref={register({ name: "genericName", required: true })}
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
								ref={register({ name: "drugName", required: true })}
								name="drugName"
								options={dummyData3}
								onChange={onHandleSelectChange}
							/>
						</div>
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
					{
						refillable ? (
							<div>
								<div>
									<h6>Refills Count</h6>
								</div>
								<div className="row">
									<div className="form-group col-sm-4">
										<input
											type="text"
											className="form-control"
											placeholder="Number of refills"
											ref={register({ name: "refills" })}
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
										<input
											type="text"
											className="form-control"
											placeholder="Frequency type"
											ref={register}
											name="frequency"
											onChange={onHandleInputChange}
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
								<div>
									<h6>Diagnosis Data</h6>
								</div>
								<div className="row">
									<div className="form-group col-sm-12">
										<input
											type="text"
											className="form-control"
											placeholder="Enter ICDIO Code"
											ref={register}
											name="icdioCode"
											onChange={onHandleInputChange}
										/>
									</div>
								</div>
								<div>
									<h6>
										Prescription from another facility
									</h6>
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
							</div>
						) : null
					}
					<div className="row">
						<div className="form-group col-sm-3">
							<button onClick={(e) => {
								handleSubmit(e)
							}} style={{ border: 'none', color: 'transparent' }} >
								<PlusIcon
									style={{
										width: '1.5rem',
										height: '1.5rem',
										cursor: 'pointer'
									}}
								/>
							</button>

						</div>
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
							{
								pharmRequest ? pharmRequest.map((request, index) => {
									return (
										<tr key={index}>
											<td>{request.genericName}</td>
											<td>{request.drugName}</td>
											<td>{request.quantity}</td>
											<td>{request.diagnosis ? request.diagnosis : ''}</td>
											<td>
												<ViewIcon
													style={{
														width: '1rem',
														height: '1rem',
														cursor: 'pointer'
													}}
												/> {'  '}
												<EditIcon
													style={{
														width: '1rem',
														height: '1rem',
														cursor: 'pointer'
													}}
												/> {'  '}
												<TrashIcon
													style={{
														width: '1rem',
														height: '1rem',
														cursor: 'pointer'
													}}
												/>
											</td>
										</tr>
									)
								}) : []
							}
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
	)

}


export default PharmNewRequest;
