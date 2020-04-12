/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import waiting from '../../assets/images/waiting.gif';
import searchingGIF from '../../assets/images/searching.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import { request, confirmAction } from '../../services/utilities';
import { API_URI } from '../../services/constants';
import {
	add_consultating_room,
	get_all_consultating_rooms,
	update_consultating_room,
	delete_consultating_room,
} from '../../actions/settings';

const ConsultatingRoom = props => {
	const initialState = {
		name: '',
		save: true,
		edit: false,
		id: '',
	};
	const [{ name }, setState] = useState(initialState);
	const [Loading, setLoading] = useState(false);
	const [{ edit, save }, setSubmitButton] = useState(initialState);
	const [payload, getDataToEdit] = useState(null);
	const [loaded, setLoaded] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddConsultatingRoom = async e => {
		e.preventDefault();
		setLoading(true);
		let data = {
			name,
		};
		try {
			const rs = await request(
				`${API_URI}/consulting-rooms`,
				'POST',
				true,
				data
			);
			props.add_consultating_room(rs);
			setLoading(false);
			setState({ ...initialState });
			notifySuccess('Consultating room added');
		} catch (error) {
			setLoading(false);
			notifyError('Error creating consultating room');
		}
	};

	const onEditConsultatingRoom = async e => {
		setLoading(true);
		e.preventDefault();
		let data = {
			name,
			id: payload.id,
		};

		try {
			const rs = await request(
				`${API_URI}/consulting-rooms/${data.id}/update`,
				'PATCH',
				true,
				data
			);
			props.update_consultating_room(rs, payload);
			setState({ ...initialState });
			setSubmitButton({ save: true, edit: false });
			setLoading(false);
			notifySuccess('Consultating room updated');
		} catch (error) {
			setState({ ...initialState });
			setSubmitButton({ save: true, edit: false });
			setLoading(false);
			notifyError('Error editing consultating rooms');
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

	const onDeleteConsultatingRoom = async data => {
		try {
			const rs = await request(
				`${API_URI}/consulting-rooms/${data.id}`,
				'DELETE',
				true,
				data
			);
			props.delete_consultating_room(data);
			notifySuccess('Consultating room deleted');
		} catch (error) {
			setLoading(false);
			setState({ ...initialState });
			notifyError('Error deleting consultating room');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeleteConsultatingRoom, data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ save: true, edit: false });
		setState({ ...initialState });
	};

	const fetchConsultatingRoom = async () => {
		setDataLoaded(false);
		try {
			const rs = await request(`${API_URI}/consulting-rooms`, 'GET', true);
			props.get_all_consultating_rooms(rs);
			setDataLoaded(true);
		} catch (error) {
			setDataLoaded(true);
			notifyError(error.message || 'could not fetch consulting rooms!');
		}
	};

	useEffect(() => {
		fetchConsultatingRoom();
	}, []);
	return (
		<div className="content-i">
			<div className="content-box">
				<div className="element-wrapper">
					<div className="os-tabs-w mx-1">
						<div className="os-tabs-controls">
							<ul className="nav nav-tabs upper">
								<li className="nav-item">
									<a
										aria-expanded="true"
										className="nav-link active"
										data-toggle="tab">
										Consultating Room
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-8">
							<div className="row">
								{!dataLoaded ? (
									<div className="align-self-center">
										<img alt="searching" src={searchingGIF} />
									</div>
								) : (
									<>
										{props.ConsultatingRooms.map((ConsultatingRoom, i) => {
											return (
												<div className="col-lg-4 col-xxl-3" key={i}>
													<div className="pt-3">
														<div className="pipeline-item">
															<div className="pi-controls">
																<div className="pi-settings os-dropdown-trigger">
																	<i
																		className="os-icon os-icon-ui-49"
																		onClick={() =>
																			onClickEdit(ConsultatingRoom)
																		}></i>
																</div>
																<div className="pi-settings os-dropdown-trigger">
																	<i
																		className="os-icon os-icon-ui-15"
																		onClick={() =>
																			confirmDelete(ConsultatingRoom)
																		}></i>
																</div>
															</div>
															<div className="pi-body">
																<div className="pi-info">
																	<div className="h6 pi-name">
																		{ConsultatingRoom.name}
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											);
										})}
									</>
								)}
							</div>
						</div>
						<div className="col-lg-4 col-xxl-3  d-xxl-block">
							<div className="element-wrapper">
								<div className="element-box">
									<form
										onSubmit={
											edit ? onEditConsultatingRoom : onAddConsultatingRoom
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
												<button
													className={
														Loading
															? 'btn btn-primary disabled'
															: 'btn btn-primary'
													}>
													{Loading ? (
														<img src={waiting} alt="submitting" />
													) : (
														<span> save</span>
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
															Loading
																? 'btn btn-primary disabled'
																: 'btn btn-primary'
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
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		ConsultatingRooms: state.settings.consultating_room,
	};
};
export default connect(mapStateToProps, {
	add_consultating_room,
	get_all_consultating_rooms,
	update_consultating_room,
	delete_consultating_room,
})(ConsultatingRoom);
