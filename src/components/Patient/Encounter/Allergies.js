/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';

import { updateEncounterData } from '../../../actions/patient';
import { allergyCategories, severities } from '../../../services/constants';
import { request } from '../../../services/utilities';
import { notifyError } from '../../../services/notify';
import { ReactComponent as TrashIcon } from '../../../assets/svg-icons/trash.svg';
import { defaultEncounter, CK_ENCOUNTER } from '../../../services/constants';
import SSRStorage from '../../../services/storage';
import { startBlock, stopBlock } from '../../../actions/redux-block';

const storage = new SSRStorage();

const Allergies = ({ previous, next, patient }) => {
	const { register, reset } = useForm();
	const [loaded, setLoaded] = useState(false);
	const [allergens, setAllergens] = useState([]);
	const [pastAllergies, setPastAllergies] = useState([]);
	const [selectedPastAllergies, setSelectedPastAllergies] = useState([]);
	const [category, setCategory] = useState('');
	const [severity, setSeverity] = useState('');
	const [reaction, setReaction] = useState('');
	const [allerg, setAllerg] = useState('');
	const [existing, setExisting] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [meta, setMeta] = useState(null);
	const [genericDrugs, setGenericDrugs] = useState([]);
	const [generic, setGeneric] = useState(null);

	const encounter = useSelector(state => state.patient.encounterData);

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

	const fetchAllergies = useCallback(async () => {
		try {
			const url = `patient-allergens?patient_id=${patient.id}`;
			const rs = await request(url, 'GET', true);
			const { result, ...metadata } = rs;
			setPastAllergies(result);
			setMeta(metadata);
		} catch (error) {
			notifyError('Could not fetch allergens for the patient');
		}
	}, [patient]);

	const saveAllergens = useCallback(
		data => {
			setAllergens(data);
			dispatch(
				updateEncounterData(
					{
						...encounter,
						allergies: [...data],
					},
					patient.id
				)
			);
		},
		[dispatch, encounter, patient]
	);

	const savePastAllergens = useCallback(
		data => {
			setSelectedPastAllergies(data);
			dispatch(
				updateEncounterData(
					{
						...encounter,
						pastAllergies: [...data],
					},
					patient.id
				)
			);
		},
		[dispatch, encounter, patient]
	);

	const retrieveData = useCallback(async () => {
		const data = await storage.getItem(CK_ENCOUNTER);

		const allergiesData =
			data && data.patient_id === patient.id
				? data?.encounter?.allergies
				: null;

		const pastAllergiesData =
			data && data.patient_id === patient.id
				? data?.encounter?.pastAllergies
				: null;

		saveAllergens(allergiesData || defaultEncounter.allergies);
		savePastAllergens(pastAllergiesData || defaultEncounter.pastAllergies);
	}, [patient, saveAllergens, savePastAllergens]);

	useEffect(() => {
		if (!loaded) {
			retrieveData();
			loadGenericDrugs();
			fetchAllergies();
			setLoaded(true);
		}
	}, [fetchAllergies, loadGenericDrugs, loaded, retrieveData]);

	const remove = index => {
		const newItems = allergens.filter((item, i) => index !== i);
		saveAllergens(newItems);
	};

	const onNext = () => {
		dispatch(
			updateEncounterData(
				{
					...encounter,
					allergies: [...allergens],
					pastAllergies: [...selectedPastAllergies],
				},
				patient.id
			)
		);
		next();
	};

	const divStyle = {
		height: '500px',
		overflowY: 'scroll',
	};

	const onSubmit = async e => {
		setSeverity(e);
		if (category !== '' && reaction !== '') {
			const items = [
				{
					allergen: allerg,
					category,
					severity: e,
					reaction,
					generic,
					generic_id: generic?.id || '',
				},
				...allergens,
			];
			saveAllergens(items);

			setCategory('');
			setSeverity('');
			setAllerg('');
			setReaction('');
			setGeneric('');
			reset();
		} else {
			notifyError('Error, please complete the allergens form');
		}
	};

	const onSelect = (checked, index, allergy) => {};

	return (
		<div className="form-block encounter" style={divStyle}>
			<div className="row">
				<div className="col-md-7">
					<form>
						<div className="row">
							<div className="col-sm-6">
								<div className="form-group">
									<label>Category</label>
									<Select
										placeholder="Select Allergy Category"
										ref={register}
										options={allergyCategories}
										value={category}
										onChange={e => {
											setCategory(e);
										}}
									/>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="form-group">
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
									/>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="form-group">
									<label>Allergen</label>
									<input
										className="form-control"
										placeholder="Allergen"
										type="text"
										value={allerg}
										onChange={e => setAllerg(e.target.value)}
										name="allergen"
									/>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="form-group">
									<label>Reaction</label>
									<input
										type="text"
										onChange={e => setReaction(e.target.value)}
										value={reaction}
										name="reaction"
										placeholder="Reaction"
										className="form-control"
									/>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="form-group">
									<label>Severity</label>
									<Select
										placeholder="Select Severity"
										options={severities}
										value={severity}
										onChange={e => {
											onSubmit(e);
										}}
									/>
								</div>
							</div>
						</div>
					</form>
				</div>
				<div className="col-md-5">
					<div className="allergen-block">
						<div className="row">
							<div className="col-md-12">
								<div className="form-group">
									<label>
										Existing Allergies{' '}
										<input
											type="checkbox"
											checked={existing}
											className="form-control"
											onChange={e => {
												setExisting(e.target.checked);
												setSelectedPastAllergies(
													e.target.checked ? [...pastAllergies] : []
												);
											}}
										/>
									</label>
								</div>
							</div>
						</div>
						<div className="row">
							{pastAllergies.map((item, i) => {
								const value = selectedPastAllergies.find(o => o.id === item.id);
								return (
									<div className="col-md-12" key={i}>
										<div className="form-group history-item">
											<label>
												{`${item.generic ? item.generic.name : item.allergy}(${
													item.category
												})`}
											</label>
											<div>
												<input
													type="checkbox"
													className="form-control"
													value={value !== null}
													onChange={e => onSelect(e, item)}
												/>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="element-box p-3 m-0 mt-3 w-100">
					<Table>
						<thead>
							<tr>
								<th>Category</th>
								<th>Allergen</th>
								<th>Drug</th>
								<th>Reaction</th>
								<th>Severity</th>
								<th nowrap="nowrap" className="text-center"></th>
							</tr>
						</thead>
						<tbody>
							{allergens.map((item, index) => {
								return (
									<tr key={index}>
										<td>{item.category.value}</td>
										<td>{item.allergen}</td>
										<td>{item?.generic?.name || '--'}</td>
										<td>{item.reaction}</td>
										<td>{item.severity.value}</td>
										<td>
											<div className="display-flex">
												<div className="ml-2">
													<TrashIcon
														onClick={() => remove(index)}
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

			<div className="row mt-5">
				<div className="col-sm-12 d-flex ant-row-flex-space-between">
					<button className="btn btn-primary" onClick={previous}>
						Previous
					</button>
					<button className="btn btn-primary" onClick={onNext}>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default Allergies;
