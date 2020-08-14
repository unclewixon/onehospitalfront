import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateStaff } from '../../../actions/hr';
import waitingGif from '../../../assets/images/waiting.gif';

const EditProfile = ({ staff }) => {
	const countries = useSelector(({ utility }) => utility.countries);
	const { register, handleSubmit, watch, setValue } = useForm({
		defaultValues: {
			first_name: staff?.details?.first_name,
			last_name: staff?.details?.last_name,
			other_names: staff?.details?.other_names,
			email: staff?.details?.email,
			phone_number: staff?.details?.phone_number,
			gender: staff?.details?.gender,
			religion: staff?.details?.religion,
			address: staff?.details?.address,
			marital_status: staff?.details?.marital_status,
			number_of_children: staff?.details?.number_of_children,
			lga: staff?.details?.lga,
			nationality: staff?.details?.nationality,
			state_of_origin: staff?.details?.state_of_origin,
			next_of_kin: staff?.details?.next_of_kin,
			next_of_kin_address: staff?.details?.next_of_kin_address,
			next_of_kin_contact_no: staff?.details?.next_of_kin_contact_no,
			next_of_kin_dob: staff?.details?.next_of_kin_dob,
			next_of_kin_relationship: staff?.details?.next_of_kin_relationship,
		},
	});
	const values = watch();
	const nationality = values.nationality;
	const [states, setStates] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const dispatch = useDispatch();

	const sortedCountries = countries.map((country, index) => (
		<option value={country.id} key={index}>
			{country.name}
		</option>
	));

	const handleInputChange = e => {
		const { name, value } = e.target;
		setValue(name, value);
	};

	useEffect(() => {
		if (nationality) {
			const country = countries.find(c => c.id === parseInt(nationality, 10));
			if (country) {
				setStates(
					country.states.map((s, i) => (
						<option key={i} value={s.id}>
							{s.name}
						</option>
					))
				);
			}
		}
	}, [nationality, countries]);

	const onFormSubmit = vals => {
		setSubmitting(true);
		dispatch(updateStaff(vals, staff?.details?.id, () => setSubmitting(false)));
	};

	return (
		<div className="col-sm-7">
			<div className="element-wrapper">
				<div className="element-box">
					<div className="element-info">
						<div className="element-info-with-icon">
							<div className="element-info-icon">
								<div className="os-icon os-icon-user-male-circle2"></div>
							</div>
							<div className="element-info-text">
								<h5 className="element-inner-header">Edit Profile</h5>
								<div className="element-inner-desc">
									{/* Validation of the form is made possible using powerful
										validator plugin for bootstrap.{' '}
										<a
											href="http://1000hz.github.io/bootstrap-validator/"
											target="_blank">
											Learn more about Bootstrap Validator
										</a> */}
								</div>
							</div>
						</div>
					</div>
					<form onSubmit={handleSubmit(onFormSubmit)}>
						<div className="row">
							<div className="col-sm-4">
								<div className="form-group">
									<label for="">First Name</label>
									<input
										className="form-control"
										name="first_name"
										type="text"
										ref={register}
										value={values.first_name}
										onChange={handleInputChange}
									/>
								</div>
							</div>
							<div className="col-sm-4">
								<div className="form-group">
									<label for="">Last Namer</label>
									<input
										className="form-control"
										name="last_name"
										type="text"
										ref={register}
										value={values.last_name}
									/>
								</div>
							</div>
							<div className="col-sm-4">
								<div className="form-group">
									<label for="">Other Names</label>
									<input
										className="form-control"
										name="other_names"
										type="text"
										ref={register}
										value={values.other_names}
										onChange={handleInputChange}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-6">
								<div className="form-group">
									<label for="">Email</label>
									<input
										className="form-control"
										name="email"
										type="email"
										ref={register}
										value={values.email}
										onChange={handleInputChange}
									/>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="form-group">
									<label for="">Phone Number</label>
									<input
										className="form-control"
										type="number"
										name="phone_number"
										ref={register}
										value={values.phone_number}
										onChange={handleInputChange}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-6">
								<div className="form-group">
									<label for="">Gender</label>
									<select
										className="form-control"
										ref={register}
										name="gender"
										value={values.gender}
										onChange={handleInputChange}>
										<option value="Male">Male</option>
										<option value="Female">Female</option>
									</select>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="form-group">
									<label for="">Religion</label>
									<select
										className="form-control"
										ref={register}
										name="religion"
										value={values.religion}
										onChange={handleInputChange}>
										<option value="Atheist">Atheist</option>
										<option value="Buddhism">Buddhism</option>
										<option value="Christianity">Christianity</option>
										<option value="Hinduism">Hinduism</option>
										<option value="Islam">Islam</option>
									</select>
								</div>
							</div>
						</div>
						<div className="form-group">
							<label for="">Contact Address</label>
							<textarea
								className="form-control"
								rows="3"
								name="address"
								type="text"
								ref={register}
								value={values.address}
								onChange={handleInputChange}></textarea>
						</div>
						<div className="row">
							<div className="col-sm-6">
								<div className="form-group">
									<label for="">Marital Status</label>
									<select
										className="form-control"
										ref={register}
										name="marital_status"
										value={values.marital_status}
										onChange={handleInputChange}>
										<option value="single">Single</option>
										<option value="married">Married</option>
										<option value="divorced">Divorced</option>
									</select>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="form-group">
									<label for="">Number of Children</label>
									<input
										className="form-control"
										name="number_of_children"
										type="number"
										ref={register}
										value={values.number_of_children}
										onChange={handleInputChange}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-6">
								<div className="form-group">
									<label for="">Local Government</label>
									<input
										className="form-control"
										name="lga"
										type="text"
										ref={register}
										value={values.lga}
										onChange={handleInputChange}
									/>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="form-group">
									<label for="">Nationality</label>
									<select
										className="form-control"
										ref={register}
										name="nationality"
										value={values.nationality}
										onChange={handleInputChange}>
										<option>Choose Country</option>
										{sortedCountries}
									</select>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="form-group">
									<label for="">State of Origin</label>
									<select
										className="form-control"
										ref={register}
										name="state_of_origin"
										value={values.state_of_origin}
										onChange={handleInputChange}>
										<option>Choose State/Region</option>
										{states}
									</select>
								</div>
							</div>
						</div>
						<fieldset className="form-group">
							<legend>
								<span>Next of Kin Details</span>
							</legend>
							<div className="form-group">
								<label for="">Full Name</label>
								<input
									className="form-control"
									name="next_of_kin"
									type="text"
									ref={register}
									value={values.next_of_kin}
									onChange={handleInputChange}
								/>
							</div>
							<div className="row">
								<div className="col-sm-6">
									<div className="form-group">
										<label for="">Relationship</label>
										<input
											className="form-control"
											name="next_of_kin_relationship"
											type="text"
											ref={register}
											value={values.next_of_kin_relationship}
											onChange={handleInputChange}
										/>
									</div>
								</div>
								<div className="col-sm-6">
									<div className="form-group">
										<label for="">Phone Number</label>
										<input
											className="form-control"
											name="next_of_kin_contact_no"
											type="text"
											ref={register}
											value={values.next_of_kin_contact_no}
											onChange={handleInputChange}
										/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<label for="">Date of Birth</label>
								<input
									className="multi-daterange form-control"
									name="next_of_kin_dob"
									type="date"
									ref={register}
									value={values.next_of_kin_dob}
									onChange={handleInputChange}
								/>
							</div>
							<div className="form-group">
								<label>Contact Address</label>
								<textarea
									className="form-control"
									rows="3"
									name="next_of_kin_address"
									type="text"
									ref={register}
									value={values.next_of_kin_address}
									onChange={handleInputChange}></textarea>
							</div>
						</fieldset>
						<button class="btn btn-primary" type="submit">
							{submitting ? (
								<img src={`url(${waitingGif})`} alt="waiting" />
							) : (
								'Update'
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditProfile;
