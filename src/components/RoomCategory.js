/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useSelector, connect } from 'react-redux';

import { request, confirmAction, formatCurrency } from '../services/utilities';
import waiting from '../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../services/notify';
import TableLoading from './TableLoading';
import {
	add_room_category,
	get_all_room_category,
	update_room_category,
	delete_room_category,
} from '../actions/settings';

const RoomCategory = props => {
	const initialState = {
		name: '',
		hmo_id: '',
		price: '',
		hmo_tarrif: '',
		edit: false,
		create: true,
	};
	const [{ name, hmo_id, price, hmo_tarrif }, setState] = useState(
		initialState
	);
	const [loading, setLoading] = useState(false);
	const [{ edit, create }, setSubmitButton] = useState(initialState);
	const [payload, getDataToEdit] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);

	const hmos = useSelector(state => state.hmo.hmo_list);
	const user = useSelector(state => state.user.profile);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddRoom = async e => {
		try {
			e.preventDefault();
			setLoading(true);
			const data = { name, hmo_id, price, hmo_tarrif };
			const rs = await request('rooms/categories', 'POST', true, data);
			props.add_room_category(rs);
			setLoading(false);
			setState({ ...initialState });
			notifySuccess('Room Category created');
		} catch (error) {
			setLoading(false);
			setState({ ...initialState });
			notifyError(error || 'Error creating room category');
		}
	};

	const onEditRoomCategory = async e => {
		try {
			e.preventDefault();
			setLoading(true);
			const data = { name, price, hmo_id, hmo_tarrif };
			const url = `rooms/categories/${payload.id}/update`;
			const rs = await request(url, 'PATCH', true, data);
			props.update_room_category(rs, payload);
			setState({ ...initialState });
			setSubmitButton({ create: true, edit: false });
			setLoading(false);
			notifySuccess('Room Category updated');
		} catch (error) {
			setState({ ...initialState });
			setSubmitButton({ create: true, edit: false });
			setLoading(false);
			notifyError('Error updating room category');
		}
	};

	const onClickEdit = data => {
		setSubmitButton({ edit: true, create: false });
		setState(prevState => ({
			...prevState,
			name: data.name,
			hmo_tarrif: data.hmoTarrif,
			price: data.price,
			id: data.id,
			hmo_id: data.hmo.id,
		}));
		getDataToEdit(data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ create: true, edit: false });
		setState({ ...initialState });
	};

	const onDeleteRoomCategory = async data => {
		try {
			const url = `rooms/categories/${data.id}`;
			await request(url, 'DELETE', true, { username: user.username });
			props.delete_room_category(data);
			setLoading(false);
			notifySuccess('Room Category deleted');
		} catch (error) {
			setLoading(false);
			notifyError('Error deleting room category');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeleteRoomCategory, data);
	};

	useEffect(() => {
		const fetchRoomCategory = async () => {
			try {
				const rs = await request('rooms/categories', 'GET', true);
				props.get_all_room_category(rs);
				setDataLoaded(true);
			} catch (error) {
				setDataLoaded(true);
				notifyError(error.message || 'could not room categories!');
			}
		};

		if (!dataLoaded) {
			fetchRoomCategory();
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
											<th>Category Name</th>
											<th>HMO</th>
											<th>Price</th>
											<th>HMO Price</th>
											<th className="text-right">Action</th>
										</tr>
									</thead>
									<tbody>
										{props.Room_Categories.map((RoomCategory, i) => {
											return (
												<tr key={i}>
													<td>{RoomCategory.name}</td>
													<td>{RoomCategory.hmo && RoomCategory.hmo.name}</td>
													<td>{formatCurrency(RoomCategory.price)}</td>
													<td>{formatCurrency(RoomCategory.hmoTarrif)}</td>
													<td className="row-actions text-right">
														<a href="#">
															<i
																className="os-icon os-icon-ui-49"
																onClick={() => onClickEdit(RoomCategory)}></i>
														</a>

														<a
															className="danger"
															onClick={() => confirmDelete(RoomCategory)}>
															<i className="os-icon os-icon-ui-15"></i>
														</a>
													</td>
												</tr>
											);
										})}
										{props.Room_Categories.length === 0 && (
											<tr>
												<td colSpan="5" className="text-center">
													No room categories found!
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
			<div className="col-lg-4">
				<div className="pipeline white lined-warning">
					<form onSubmit={edit ? onEditRoomCategory : onAddRoom}>
						<h6 className="form-header">New category</h6>
						<div className="form-group">
							<input
								className="form-control"
								placeholder="Category Name"
								type="text"
								name="name"
								onChange={handleInputChange}
								value={name}
							/>
						</div>

						<div className="form-group">
							<select
								className="form-control"
								name="hmo_id"
								placeholder="HMO"
								value={hmo_id}
								onChange={handleInputChange}>
								<option value="">Select HMO</option>
								{hmos.map((RoomCategory, i) => {
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
								placeholder="Price"
								type="text"
								name="price"
								onChange={handleInputChange}
								value={price}
							/>
						</div>
						<div className="form-group">
							<input
								className="form-control"
								placeholder="HMO Price"
								type="text"
								name="hmo_tarrif"
								onChange={handleInputChange}
								value={hmo_tarrif}
							/>
						</div>
						<div className="form-buttons-w">
							{create && (
								<button className="btn btn-primary">
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
										disabled={loading}
										onClick={cancelEditButton}>
										<span>cancel</span>
									</button>
									<button className="btn btn-primary">
										{loading ? (
											<img src={waiting} alt="submitting" />
										) : (
											<span> edit</span>
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
	};
};

export default connect(mapStateToProps, {
	add_room_category,
	get_all_room_category,
	update_room_category,
	delete_room_category,
})(RoomCategory);
