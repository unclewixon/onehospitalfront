/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { request, confirmAction } from '../services/utilities';
import { API_URI } from '../services/constants';
import waiting from '../assets/images/waiting.gif';
import searchingGIF from '../assets/images/searching.gif';
import { notifySuccess, notifyError } from '../services/notify';

import {
	add_room_category,
	get_all_room_category,
	update_room_category,
	delete_room_category,
} from '../actions/settings';

const RoomCategory = props => {
	const initialState = {
		name: '',
		price: '',
		discount: '',
		edit: false,
		create: true,
	};
	const [{ name, price, discount }, setState] = useState(initialState);
	const [Loading, setLoading] = useState(false);
	const [{ edit, create }, setSubmitButton] = useState(initialState);
	const [payload, getDataToEdit] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [dataLoaded, setDataLoaded] = useState(false);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddRoom = async e => {
		setLoading(true);
		e.preventDefault();
		let data = {
			name,
			price,
			discount,
		};
		try {
			const rs = await request(
				`${API_URI}/rooms/categories`,
				'POST',
				true,
				data
			);
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
		setLoading(true);
		e.preventDefault();

		let data = {
			name,
			price,
			discount,
		};
		try {
			const rs = await request(
				`${API_URI}/rooms/categories/${payload.id}/update`,
				'PATCH',
				true,
				data
			);
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
			discount: data.discount,
			price: data.price,
			id: data.id,
		}));
		getDataToEdit(data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ create: true, edit: false });
		setState({ ...initialState });
	};

	const onDeleteRoomCategory = async data => {
		try {
			await request(`${API_URI}/rooms/categories/${data.id}`, 'DELETE', true);
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

	const fetchRoomCategory = async () => {
		setDataLoaded(false);
		try {
			const rs = await request(`${API_URI}/rooms/categories`, 'GET', true);
			props.get_all_room_category(rs);
			setDataLoaded(true);
		} catch (error) {
			setDataLoaded(true);
			notifyError(error.message || 'could not room categories!');
		}
	};

	useEffect(() => {
		fetchRoomCategory();
	}, []);

	return (
		<div className="row">
			<div className="col-lg-8">
				<div className="element-wrapper">
					<div className="element-box">
						<div className="table-responsive">
							<table className="table table-striped">
								<thead>
									<tr>
										<th>Category Name</th>
										<th>Price</th>
										<th>Discount</th>
										<th className="text-right">Action</th>
									</tr>
								</thead>
								<tbody>
									{!dataLoaded ? (
										<tr>
											<td colSpan="4" className="text-center">
												<img alt="searching" src={searchingGIF} />
											</td>
										</tr>
									) : (
										<>
											{props.Room_Categories.map((RoomCategory, i) => {
												return (
													<tr key={i}>
														<td>{RoomCategory.name}</td>
														<td>{RoomCategory.price}</td>
														<td>{RoomCategory.discount}</td>
														<td className="row-actions text-right">
															<a href="#">
																<i
																	className="os-icon os-icon-ui-49"
																	onClick={() => onClickEdit(RoomCategory)}></i>
															</a>
															<a href="#">
																<i className="os-icon os-icon-grid-10"></i>
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
										</>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div className="col-lg-4 col-xxl-3  d-xxl-block">
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
								placeholder="Discount Rate"
								type="text"
								name="discount"
								onChange={handleInputChange}
								value={discount}
							/>
						</div>
						<div className="form-buttons-w">
							{create && (
								<button
									className={
										Loading ? 'btn btn-primary disabled' : 'btn btn-primary'
									}>
									{Loading ? (
										<img src={waiting} alt="submitting" />
									) : (
										<span> create</span>
									)}
								</button>
							)}
							{edit && (
								<>
									<button
										className={
											Loading
												? 'btn btn-secondary ml-3 disabled'
												: 'btn btn-secondary ml-3'
										}
										onClick={cancelEditButton}>
										<span>{Loading ? 'cancel' : 'cancel'}</span>
									</button>
									<button
										className={
											Loading ? 'btn btn-primary disabled' : 'btn btn-primary'
										}>
										{Loading ? (
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
