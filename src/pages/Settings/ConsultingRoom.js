/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';

import waiting from '../../assets/images/waiting.gif';
import searchingGIF from '../../assets/images/searching.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import { request, confirmAction } from '../../services/utilities';
import { updateImmutable } from '../../services/utilities';

const ConsultingRoom = () => {
	const initialState = {
		name: '',
		save: true,
		edit: false,
		id: '',
	};
	const [consultingRooms, setConsultingRooms] = useState([]);
	const [{ name }, setState] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [{ edit, save }, setSubmitButton] = useState(initialState);
	const [payload, getDataToEdit] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddConsultingRoom = async e => {
		e.preventDefault();
		try {
			setLoading(true);
			const data = { name };
			const rs = await request('consulting-rooms', 'POST', true, data);
			setConsultingRooms([...consultingRooms, rs]);
			setLoading(false);
			setState({ ...initialState });
			notifySuccess('Consulting room added');
		} catch (error) {
			setLoading(false);
			notifyError('Error creating consulting room');
		}
	};

	const onEditConsultingRoom = async e => {
		e.preventDefault();
		try {
			setLoading(true);
			const data = { name, id: payload.id };
			const url = `consulting-rooms/${data.id}/update`;
			const rs = await request(url, 'PATCH', true, data);
			const rooms = updateImmutable(consultingRooms, rs);
			setConsultingRooms([...rooms]);
			setState({ ...initialState });
			setSubmitButton({ save: true, edit: false });
			setLoading(false);
			notifySuccess('Consulting room updated');
		} catch (error) {
			setState({ ...initialState });
			setSubmitButton({ save: true, edit: false });
			setLoading(false);
			notifyError('Error editing consulting rooms');
		}
	};

	const onClickEdit = data => {
		setSubmitButton({ edit: true, save: false });
		setState(prevState => ({
			...prevState,
			name: data.name,
			duration: data.duration,
			id: data.id,
		}));
		getDataToEdit(data);
	};

	const onDeleteConsultingRoom = async data => {
		try {
			const url = `consulting-rooms/${data.id}`;
			await request(url, 'DELETE', true);
			notifySuccess('Consulting room deleted');
			setConsultingRooms([
				...consultingRooms.filter(r => r.id !== parseInt(data.id, 10)),
			]);
		} catch (error) {
			console.log(error);
			setLoading(false);
			setState({ ...initialState });
			notifyError('Error deleting consulting room');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeleteConsultingRoom, data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ save: true, edit: false });
		setState({ ...initialState });
	};

	const fetchConsultingRoom = useCallback(async () => {
		try {
			const rs = await request(`consulting-rooms`, 'GET', true);
			setConsultingRooms([...rs]);
			setDataLoaded(true);
		} catch (error) {
			setDataLoaded(true);
			notifyError(error.message || 'could not fetch consulting rooms!');
		}
	}, []);

	useEffect(() => {
		if (!dataLoaded) {
			fetchConsultingRoom();
		}
	}, [dataLoaded, fetchConsultingRoom]);

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="element-wrapper">
					<div className="os-tabs-w mx-1">
						<div className="os-tabs-controls os-tabs-complex">
							<ul className="nav nav-tabs upper">
								<li className="nav-item">
									<a
										aria-expanded="true"
										className="nav-link active"
										data-toggle="tab">
										Consulting Rooms
									</a>
								</li>
							</ul>
						</div>
					</div>
					{!dataLoaded ? (
						<div className="loading-block">
							<img alt="searching" src={searchingGIF} />
						</div>
					) : (
						<div className="row">
							<div className="col-lg-8">
								<div className="row">
									{consultingRooms.map((room, i) => {
										return (
											<div className="col-lg-4 col-xxl-3" key={i}>
												<div className="pt-3">
													<div className="pipeline-item">
														<div className="pi-controls">
															<div className="pi-settings os-dropdown-trigger">
																<i
																	className="os-icon os-icon-ui-49"
																	onClick={() => onClickEdit(room)}></i>
															</div>
															<div className="pi-settings os-dropdown-trigger">
																<i
																	className="os-icon os-icon-ui-15 text-danger"
																	onClick={() => confirmDelete(room)}></i>
															</div>
														</div>
														<div className="pi-body">
															<div className="pi-info">
																<div className="h6 pi-name">{room.name}</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										);
									})}
								</div>
								{consultingRooms.length === 0 && (
									<div
										className="alert alert-info text-center"
										style={{ width: '100%' }}>
										No rooms
									</div>
								)}
							</div>
							<div className="col-lg-4 col-xxl-3  d-xxl-block">
								<div className="element-wrapper">
									<div className="element-box">
										<form
											onSubmit={
												edit ? onEditConsultingRoom : onAddConsultingRoom
											}>
											<h5 className="element-box-header">Add New</h5>
											<div className="form-group">
												<label className="lighter">Name</label>
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
													<input
														className="form-control"
														placeholder="Consulting room name"
														type="text"
														name="name"
														value={name}
														onChange={handleInputChange}
													/>
												</div>
											</div>

											<div className="form-buttons-w text-right compact">
												{save && (
													<button className="btn btn-primary">
														{loading ? (
															<img src={waiting} alt="submitting" />
														) : (
															<span> save</span>
														)}
													</button>
												)}
												{edit && (
													<>
														<button
															className="btn btn-secondary"
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
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ConsultingRoom;
