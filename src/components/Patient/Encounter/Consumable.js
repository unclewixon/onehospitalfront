/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import SunEditor from 'suneditor-react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import Select from 'react-select';

import {
	updateEncounterData,
	resetEncounterData,
} from '../../../actions/patient';
import {
	consultationAPI,
	consumableAPI,
	defaultEncounter,
} from '../../../services/constants';
import { request } from '../../../services/utilities';
import { notifyError, notifySuccess } from '../../../services/notify';
import { startBlock, stopBlock } from '../../../actions/redux-block';
import { ReactComponent as TrashIcon } from '../../../assets/svg-icons/trash.svg';

const Consumable = ({
	previous,
	patient,
	closeModal,
	updateAppointment,
	appointment_id,
}) => {
	const [loaded, setLoaded] = useState(false);
	const [instruction, setInstruction] = useState('');
	const [requestNote, setRequestNote] = useState('');
	const [quantity, setQuantity] = useState('');
	const [items, setItems] = useState([]);
	const [item, setItem] = useState(null);

	// selected
	const [selectedConsumables, setSelectedConsumables] = useState([]);

	const encounter = useSelector(state => state.patient.encounterData);

	const dispatch = useDispatch();

	const fetchConsumables = useCallback(async () => {
		try {
			dispatch(startBlock());
			const rs = await request(`${consumableAPI}?list=all`, 'GET', true);
			setItems(rs);
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			notifyError('Error fetching consumables');
			dispatch(stopBlock());
		}
	}, [dispatch]);

	useEffect(() => {
		if (!loaded) {
			fetchConsumables();
			setInstruction(encounter.instruction);
			setLoaded(true);
		}
	}, [encounter, fetchConsumables, loaded]);

	const add = () => {
		if (item && item !== '' && quantity !== '') {
			const found = selectedConsumables.find(c => c.item === item);
			if (!found) {
				setSelectedConsumables([...selectedConsumables, { item, quantity }]);
				setItem(null);
				setQuantity('');
			}
		} else {
			notifyError('Error, please select item or enter quantity');
		}
	};

	const onTrash = (index, type) => {
		const items = selectedConsumables.filter((test, i) => index !== i);
		setSelectedConsumables(items);
	};

	const onSubmit = async e => {
		try {
			e.preventDefault();
			dispatch(startBlock());
			const consumables = {
				patient_id: patient.id,
				items: [...selectedConsumables],
				request_note: requestNote,
			};

			const encounterData = { ...encounter, instruction, consumables };
			dispatch(updateEncounterData(encounterData));

			const url = `${consultationAPI}${patient.id}/save?appointment_id=${appointment_id}`;
			const rs = await request(url, 'POST', true, encounterData);
			if (rs && rs.success) {
				dispatch(stopBlock());
				updateAppointment(rs.appointment);
				notifySuccess('Consultation completed successfully');
				dispatch(resetEncounterData(defaultEncounter));
				closeModal();
			} else {
				dispatch(stopBlock());
				notifyError('Error, could not save consultation data');
			}
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError('Error, could not save consultation data');
		}
	};

	return (
		<div className="form-block encounter">
			<form onSubmit={onSubmit}>
				<div className="row">
					<div className="form-group col-sm-4">
						<label>Item</label>
						<Select
							placeholder="Select item"
							getOptionValue={option => option.id}
							getOptionLabel={option => option.description}
							name="item"
							options={items}
							value={item}
							onChange={e => setItem(e)}
						/>
					</div>
					<div className="form-group col-sm-4">
						<label>Quantity</label>
						<input
							type="number"
							className="form-control"
							placeholder="Enter quantity"
							name="quantity"
							onChange={e => setQuantity(e.target.value)}
							value={quantity}
						/>
					</div>
					<div className="col-sm-2" style={{ position: 'relative' }}>
						<a
							className="btn btn-danger btn-sm"
							style={{ margin: '45px 0 0', display: 'block' }}
							onClick={() => add()}>
							<i className="os-icon os-icon-plus-circle" /> Add
						</a>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<div className="element-box p-3 m-0 mt-3 w-100">
							<Table>
								<thead>
									<tr>
										<th>Item</th>
										<th>Quantity</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{selectedConsumables.map((item, i) => {
										return (
											<tr key={i}>
												<td>{item.item.name}</td>
												<td>{item.quantity}</td>
												<td>
													<TrashIcon
														onClick={() => onTrash(i)}
														style={{
															width: '1rem',
															height: '1rem',
															cursor: 'pointer',
														}}
													/>
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</div>
					</div>
				</div>
				<div className="row mt-4">
					<div className="form-group col-sm-12">
						<label>Request Note</label>
						<textarea
							className="form-control"
							name="request_note"
							rows="3"
							placeholder="Enter request note"
							onChange={e => setRequestNote(e.target.value)}
							value={requestNote}></textarea>
					</div>
				</div>
				<div className="mt-4"></div>
				<h5>Patient Instructions</h5>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Add patient instructions</label>
							<SunEditor
								width="100%"
								placeholder="Please type here..."
								setContents={instruction}
								name="complaint_data"
								autoFocus={true}
								enableToolbar={true}
								setOptions={{
									height: 300,
									buttonList: [
										[
											'bold',
											'underline',
											'italic',
											'strike',
											'subscript',
											'superscript',
											'list',
											'align',
											'font',
											'fontSize',
											'image',
											'codeView',
										],
									],
								}}
								onChange={e => {
									setInstruction(String(e));
								}}
							/>
						</div>
					</div>
				</div>

				<div className="row mt-5">
					<div className="col-sm-12 d-flex ant-row-flex-space-between">
						<button className="btn btn-primary" onClick={previous}>
							Previous
						</button>
						<button className="btn btn-primary" type="submit">
							Finish
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Consumable;
