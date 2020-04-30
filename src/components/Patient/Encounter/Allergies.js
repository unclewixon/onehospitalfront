/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useState } from 'react';
import Select from 'react-select';
import { reduxForm } from 'redux-form';
import HxForm from './HxForm';
import { useForm } from 'react-hook-form';
import { connect, useDispatch } from 'react-redux';
import { add_allergies, fetch_Allergies } from '../../../actions/patient';
import {
	allergyCategories,
	API_URI,
	patientAPI,
	severity,
} from '../../../services/constants';
import { request } from '../../../services/utilities';
import { notifyError } from '../../../services/notify';
import searchingGIF from '../../../assets/images/searching.gif';
import Tooltip from 'antd/lib/tooltip';
import { Link } from 'react-router-dom';

const Allergies = props => {
	const [allergies, setAllergies] = useState([]);
	const [allergyData, setAllergyData] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [queried, setQueried] = useState(false);
	const [category, setCategory] = useState([]);
	const [reaction, setReaction] = useState([]);
	const [severityField, setSeverity] = useState([]);
	const [allergyField, setAllergy] = useState([]);
	const { register, handleSubmit, setValue } = useForm();
	const dispatch = useDispatch();
	let { previous, next, allergiesProp, patient, encounterData } = props;
	const addAllergy = () => {
		setAllergies([...allergies, { id: allergies.length, deleted: 0 }]);
		console.log(allergies.length);
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
		category.splice(id, 1);
		setAllergies([...allergies]);
	};

	const fetchAllergies = async () => {
		setLoaded(true);
		setQueried(true);
		try {
			const rs = await request(
				`${API_URI}${patientAPI}/${patient.id}/allergies`,
				'GET',
				true
			);
			rs.map((value, i) => {
				setAllergies([...allergies, { id: allergies.length, deleted: 0 }]);
				category[allergies.length] = {
					value: value.category,
					label: value.category,
				};
				allergyField[allergies.length] = value.allergy;
				reaction[allergies.length] = value.reaction;
				severityField[allergies.length] = {
					value: value.severity,
					label: value.severity,
				};
				setCategory(category);
				setAllergy(allergyField);
				setReaction(reaction);
				setSeverity(severityField);
			});
			//props.fetch_Allergies(rs);
			//console.log(rs)
			setLoaded(false);
		} catch (error) {
			setLoaded(false);
			notifyError('Could not fetch allergies for the patient');
		}
	};

	const handleChecked = async e => {
		if (e.target.checked && !queried) {
			fetchAllergies().then(res => {
				console.log(allergyData);
				console.log(allergiesProp);
			});
		}
	};
	const onSubmit = async values => {
		console.log(values);
		let allergiesToSave = [];
		console.log(severityField, category);
		category.map((value, i) => {
			let _ToSave = [];
			_ToSave['category'] = value.label;
			_ToSave['allergen'] = allergyField[i];
			_ToSave['reaction'] = reaction[i];
			_ToSave['severity'] = severityField[i].label;
			allergiesToSave.splice(i, 0, _ToSave);
		});
		console.log(allergiesToSave);
		encounterData.allergies = allergiesToSave;
		props.loadEncounterData(encounterData);
		//dispatch(props.next);
	};

	const divStyle = {
		height: '500px',
		overflow: 'scroll',
	};

	return (
		<div className="form-block encounter" style={divStyle}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-md-12">
						<a
							className="btn btn-success btn-sm text-white"
							onClick={addAllergy}>
							<i className="os-icon os-icon-plus-circle" />
							<span>add allergen</span>
						</a>
					</div>
				</div>

				{loaded ? (
					<div className="row">
						<img alt="searching" src={searchingGIF} />
					</div>
				) : (
					<>
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
															<i className="os-icon os-icon-cancel-circle" />{' '}
															remove allergen
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
																value={category[allergy.id]}
																onChange={evt => {
																	category[allergy.id] = evt;
																	setCategory(category);
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
																value={allergyField[allergy.id]}
																onChange={evt => {
																	allergyField[allergy.id] = evt.target.value;
																	setAllergy(allergyField);
																}}
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
																ref={register}
																name="reaction"
																value={reaction[allergy.id]}
																onChange={evt => {
																	reaction[allergy.id] = evt.target.value;
																	setReaction(reaction);
																}}
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
																value={severityField[allergy.id]}
																placeholder="Select severity"
																options={severity}
																ref={register({ name: 'severity' })}
																onChange={evt => {
																	severityField[allergy.id] = evt;
																	setSeverity(severityField);
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
											<input
												type="checkbox"
												className="form-control"
												onChange={evt => {
													handleChecked(evt);
												}}
											/>
										</label>
									</div>
								</div>
							)}
						</div>
					</>
				)}

				<div className="row mt-5">
					<div className="col-sm-12 d-flex ant-row-flex-space-between">
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
		patient: state.user.patient,
		allergiesProp: state.patient.allergies,
		encounterData: state.patient.encounterData,
	};
};
export default connect(mapStateToProps, { fetch_Allergies })(Allergies);
