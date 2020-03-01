/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { closeModals } from '../../actions/general';
import { request } from '../../services/utilities';
import { API_URI } from '../../services/constants';
import * as moment from 'moment';
import { useForm } from 'react-hook-form';

const AppointmentFormModal = (props) => {
	const { register, handleSubmit, error, setValue} = useForm;
	const [departments, setDepartments] = useState();
	const [rooms, setRooms] = useState();
	const [specializations, setSpecializations] = useState();
	const [patients, setPatients] = useState();
	const options = [
		{label: 'Initial Consltuation', value: 'Initial Conslutation'},
		{label: 'Follow Up', value: 'Follow Up'},
	]
	const today = moment().format('YYYY-MM-DD');

	useEffect(() => {
		document.body.classList.add('modal-open');
	})

	async function getDepartments() {
		const rs = await request(`${API_URI}/departments`, 'GET', true);
		const res = rs.map(department => ({
			value: department.id,
			label: department.name
		}));
		setDepartments(res);
	}

	async function getConsultingRooms() {
		const rs = await request(`${API_URI}/consulting-rooms`, 'GET', true);
		const res = rs.map(room => ({
			value: room.id,
			label: room.name
		}));
		setRooms(res);
	}

	async function getSpecializations() {
		const rs = await request(`${API_URI}/specializations`, 'GET', true);
		const res = rs.map(spec => ({
			value: spec.id,
			label: spec.name
		}));
		setSpecializations(res);
	}

	useEffect(() => {
		getDepartments();
	}, []);

	useEffect(() => {
		getSpecializations();
	}, []);

	useEffect(() => {
		getConsultingRooms();
	}, []);

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div className="modal-dialog modal-centered" role="document">
				<div className="modal-content text-center">
					<div className="modal-header faded smaller">
						<div className="modal-title">
							New Appointment
						</div>
						<button
							aria-label="Close"
							className="close"
							data-dismiss="modal"
							type="button"
							onClick={() => props.closeModals(false)}
						>
							<span aria-hidden="true"> ×</span>
						</button>
					</div>

					<div className="onboarding-content with-gradient">
						<div className="modal-body">
							<form>
								<div className="form-group">
									<label htmlFor="">Patient</label>
									<input
										className="form-control"
										placeholder="Enter patient name or file no."
										type="text"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="">What is wrong with the patient?</label>
									<textarea className="form-control" name="" rows="3" placeholder="Enter a breif description">
									</textarea>
								</div>
								<div className="row">
									<div className="col-sm-6">
										<div className="form-group">
											<label htmlFor=""> Department</label>
											<Select 
												id="department"
												placeholder="Select Department"
												options={departments}
											/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group">
											<label htmlFor="">Whom To See?</label>
											<Select 
												id="gender"
												placeholder="Select Whom to see"
												options={specializations}										
											/>
										</div>
									</div>
								</div>
								<div className="form-group">
									<label htmlFor="">Appointment Type</label>
									<Select 
										id="gender"
										placeholder=""
										options={options}
									/>
								</div>
								<div className="row">
									<div className="col-sm-6">
										<div className="form-group">
											<label htmlFor=""> Appointment Date</label>
											<div className="date-input">
												<input
													className="single-daterange form-control"
													type="text"
													value={today}
												/>
											</div>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group">
											<label htmlFor="">Consulting Room</label>
											<Select 
												id="gender"
												placeholder="Select"
												options={rooms}												
											/>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-6">
										<div className="form-group">
											<label htmlFor=""> Referred By</label>
											<input
												className="form-control"
												placeholder=""
												type="text"
											/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group">
											<label htmlFor=""> Referral Company</label>
											<input
												className="form-control"
												placeholder=""
												type="text"
											/>
										</div>
									</div>
								</div>
							</form>
						</div>
						<div className="modal-footer buttons-on-right">
							<button className="btn btn-primary" type="button">
								{' '}
								Save Schedule
							</button>
							<button
								className="btn btn-link"
								data-dismiss="modal"
								type="button"
								onClick={() => props.closeModals(false)}
							>
								{' '}
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default connect(null, { closeModals })(AppointmentFormModal);
