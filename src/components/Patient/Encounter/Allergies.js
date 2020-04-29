/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useState } from 'react';
import Select from 'react-select';
import { reduxForm } from 'redux-form';
import HxForm from './HxForm';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { add_allergies } from '../../../actions/patient';
import { allergyCategories, severity } from '../../../services/constants';

const Allergies = props => {
	const [allergies, setAllergies] = useState([]);
	const { register, handleSubmit, setValue } = useForm();
	let { previous, next } = props;
	const addAllergy = () => {
		setAllergies([...allergies, { id: allergies.length, deleted: 0 }]);
	};

	const updateAllergies = (id, type, value) => {
		const allergy = allergies.find(d => d.id === id);
		if (allergy) {
			const idx = allergies.findIndex(d => d.id === id);
			const _allergies = [
				...allergies.slice(0, idx),
				{ ...allergy, [type]: value },
				...allergies.slice(idx + 1),
			];

			return _allergies;
		}
		return [];
	};

	const removeAllergy = id => () => {
		const allergies = updateAllergies(id, 'deleted', 1);
		setAllergies([...allergies]);
	};

	const divStyle = {
		height: '100%',
		overflow: 'scroll',
	};

	return (
		<div className="form-block encounter" style={divStyle}>
			<div className="row">
				<div className="col-md-12">
					<a className="btn btn-success btn-sm text-white" onClick={addAllergy}>
						<i className="os-icon os-icon-plus-circle" />
						<span>add allergen</span>
					</a>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-6">
					{allergies.map((allergy, i) => {
						return (
							allergy.deleted === 0 && (
								<div className="mt-4" key={i}>
									<div className="row">
										<div className="col-md-12">
											<a
												className="text-danger"
												onClick={removeAllergy(allergy.id)}
												style={{ lineHeight: '78px' }}>
												<i className="os-icon os-icon-cancel-circle" /> remove
												allergen
											</a>
										</div>
									</div>
									<div className="row">
										<div className="col-md-12">
											<div className="form-group">
												<label>Category</label>
												<Select
													name="category"
													placeholder="Select Allergy Category"
													options={allergyCategories}
													ref={register({ name: 'category' })}
													onChange={evt => {
														if (evt === null) {
															setValue('category', null);
														} else {
															setValue('category', String(evt.value));
														}
													}}
													required
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-12">
											<div className="form-group">
												<label>Allergen</label>
												<input
													className="form-control"
													placeholder="Allergy"
													type="text"
													name="allergy"
													ref={register}
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-12">
											<div className="form-group">
												<label>Reaction</label>
												<input
													type="text"
													placeholder="Reaction"
													className="form-control"
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-12">
											<div className="form-group">
												<label>Severity</label>
												<Select
													name="severity"
													placeholder="Select severity"
													options={severity}
													ref={register({ name: 'severity' })}
													onChange={evt => {
														if (evt === null) {
															setValue('severity', null);
														} else {
															setValue('severity', String(evt.value));
														}
													}}
													required
												/>
											</div>
										</div>
									</div>
								</div>
							)
						);
					})}
				</div>
				{allergies.length > 0 && (
					<div className="col-sm-6">
						<div className="form-group">
							<label>
								Existing Allergies{' '}
								<input type="checkbox" className="form-control" />
							</label>
						</div>
					</div>
				)}
			</div>

			<div className="row mt-5">
				<div className="col-sm-12 d-flex ant-row-flex-space-between">
					<button className="btn btn-primary" onClick={previous}>
						Previous
					</button>
					<button className="btn btn-primary" onClick={next}>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
		allergies: state.patient.allergies,
	};
};
export default connect(mapStateToProps, {})(Allergies);
