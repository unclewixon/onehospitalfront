/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

import { request, confirmAction, nth } from '../services/utilities';
import waiting from '../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../services/notify';
import TableLoading from './TableLoading';
import {
	add_room,
	get_all_room,
	update_room,
	delete_room,
} from '../actions/settings';

const RoomList = props => {
	const initialState = {
		name: '',
		status: 'Not occupied',
		floor: '',
		category: props.RoomCategeries ? props.Room_Categories[0].id : '',
		create: true,
		edit: false,
	};
	const [{ name, status, floor, category }, setState] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [{ edit, create }, setSubmitButton] = useState(initialState);
	const [payload, getDataToEdit] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);

	const user = useSelector(state => state.user.profile);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddRoom = async e => {
		try {
			e.preventDefault();
			setLoading(true);
			const data = { name, status, floor, room_category_id: category };
			const rs = await request(`rooms`, 'POST', true, data);
			props.add_room(rs);
			setState({ ...initialState });
			setLoading(false);
			notifySuccess('Room  created');
		} catch (error) {
			setState({ ...initialState });
			setLoading(false);
			notifyError(error.message || 'Error creating room');
		}
	};

	const onEditRoom = async e => {
		try {
			e.preventDefault();
			setLoading(true);
			const data = { name, floor, room_category_id: category };
			const url = `rooms/${payload.id}/update`;
			const rs = await request(url, 'PATCH', true, data);
			props.update_room(rs, payload);
			setState({ ...initialState });
			setSubmitButton({ create: true, edit: false });
			setLoading(false);
			notifySuccess('Room updated');
		} catch (error) {
			setState({ ...initialState });
			setSubmitButton({ create: true, edit: false });
			setLoading(false);
			notifyError(error.message || 'error updating room');
		}
	};

	const onClickEdit = data => {
		setSubmitButton({ edit: true, create: false });
		setState(prevState => ({
			...prevState,
			name: data.name,
			status: data.status,
			floor: data.floor,
			category: data.category.id,
			id: data.id,
		}));
		getDataToEdit(data);
	};

	const onDeleteRoom = async data => {
		try {
			const url = `rooms/${data.id}`;
			await request(url, 'DELETE', true, { username: user.username });
			props.delete_room(data);
			setLoading(false);
			setState({ ...initialState });
			setSubmitButton({ create: true, edit: false });
			notifySuccess('Room  deleted');
		} catch (error) {
			setLoading(false);
			setState({ ...initialState });
			setSubmitButton({ create: true, edit: false });
			notifyError(error.message || 'Error deleting room ');
		}
	};

	const cancelEditButton = () => {
		setSubmitButton({ create: true, edit: false });
		setState({ ...initialState });
	};

	const confirmDelete = data => {
		confirmAction(onDeleteRoom, data);
	};

	useEffect(() => {
		const fetchRooms = async () => {
			try {
				const rs = await request(`rooms`, 'GET', true);
				props.get_all_room(rs);
				setDataLoaded(true);
			} catch (error) {
				setDataLoaded(true);
				notifyError(error.message || 'could not fetch rooms!');
			}
		};

		if (!dataLoaded) {
			fetchRooms();
		}
	}, [dataLoaded, props]);

	return (
		<div className="row">
			<div className="col-lg-8">
				<div className="element-wrapper">
					<div className="element-box m-0 p-3">
						{!dataLoaded ? (
							<TableLoading />
						) : (
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Room Number</th>
											<th>Floor</th>
											<th>Category</th>
											<th>Status</th>
											<th className="text-right">Action</th>
										</tr>
									</thead>
									<tbody>
										{props.Rooms.map((Room, index) => {
											return (
												<tr key={index}>
													<td>{Room.name}</td>
													<td>{nth(parseInt(Room.floor, 10))}</td>
													<td>{Room.category?.name}</td>
													<td>{Room.status}</td>
													<td className="row-actions text-right">
														<a href="#">
															<i
																className="os-icon os-icon-ui-49"
																onClick={() => onClickEdit(Room)}></i>
														</a>
														{user.role.slug === 'admin' && (
															<a
																className="danger"
																onClick={() => confirmDelete(Room)}>
																<i className="os-icon os-icon-ui-15"></i>
															</a>
														)}
													</td>
												</tr>
											);
										})}
										{props.Rooms.length === 0 && (
											<tr>
												<td colSpan="5" className="text-center">
													No rooms found!
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="col-lg-4 col-xxl-3  d-xxl-block">
				<div className="pipeline white lined-warning">
					<form onSubmit={edit ? onEditRoom : onAddRoom}>
						<h6 className="form-header">Add New Room</h6>
						<div className="form-group">
							<input
								className="form-control"
								placeholder="Room Number"
								type="text"
								name="name"
								value={name}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<select
								className="form-control"
								name="category"
								placeholder="Room Category"
								value={category}
								onChange={handleInputChange}>
								<option value="">Select Category</option>
								{props.Room_Categories.map((RoomCategory, i) => {
									return (
										<option value={RoomCategory.id} key={i}>
											{RoomCategory.name}
										</option>
									);
								})}
							</select>
						</div>
						<div className="form-group">
							<input
								className="form-control"
								placeholder="Floor"
								type="text"
								name="floor"
								value={floor}
								onChange={handleInputChange}
							/>
						</div>

						<div className="form-buttons-w">
							{create && (
								<button
									className={
										loading ? 'btn btn-primary disabled' : 'btn btn-primary'
									}>
									{loading ? (
										<img src={waiting} alt="submitting" />
									) : (
										<span> create</span>
									)}
								</button>
							)}
							{edit && (
								<>
									<button
										className="btn btn-secondary ml-3"
										onClick={cancelEditButton}>
										<span>cancel</span>
									</button>
									<button
										className={`btn btn-primary 
											${loading ? 'disabled' : ''}
										`}
										disabled={loading}>
										{loading ? (
											<img src={waiting} alt="submitting" />
										) : (
											<span>edit</span>
										)}
									</button>
								</>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		Room_Categories: state.settings.room_categories,
		Rooms: state.settings.rooms,
	};
};

export default connect(mapStateToProps, {
	add_room,
	get_all_room,
	update_room,
	delete_room,
})(RoomList);
