/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import waiting from '../../assets/images/waiting.gif';
import searchingGIF from '../../assets/images/searching.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import { request, confirmAction } from '../../services/utilities';
import { API_URI } from '../../services/constants';
import {
	add_leave_category,
	get_all_leave_category,
	update_leave_category,
	delete_leave_category,
} from '../../actions/settings';

const LeaveCategory = props => {
	const initialState = {
		name: '',
		duration: '',
		save: true,
		edit: false,
		id: '',
	};
	const [{ name, duration }, setState] = useState(initialState);
	const [Loading, setLoading] = useState(false);
	const [{ edit, save }, setSubmitButton] = useState(initialState);
	const [payload, getDataToEdit] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [dataLoaded, setDataLoaded] = useState(false);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddLeaveCategory = async e => {
		e.preventDefault();
		setLoading(true);
		let data = {
			name,
			duration,
		};
		try {
			const rs = await request(`${API_URI}/leave-category`, 'POST', true, data);
			props.add_leave_category(rs);
			setLoading(false);
			setState({ ...initialState });
			notifySuccess('Leave Category created');
		} catch (error) {
			setLoading(false);
			notifyError('Error creating Leave Category');
		}
	};

	const onEditLeaveCategory = async e => {
		setLoading(true);
		e.preventDefault();

		let data = {
			name,
			duration,
		};
		try {
			const rs = await request(
				`${API_URI}/leave-category/${payload.id}/update`,
				'PATCH',
				true,
				data
			);
			props.update_leave_category(rs, payload);
			setState({ ...initialState });
			setSubmitButton({ save: true, edit: false });
			setLoading(false);
			notifySuccess('Leave Category updated');
		} catch (error) {
			setState({ ...initialState });
			setSubmitButton({ save: true, edit: false });
			setLoading(false);
			notifyError('Error updating Leave Category');
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

	const onDeleteLeaveCategory = async data => {
		try {
			const rs = await request(
				`${API_URI}/leave-category/${data.id}`,
				'DELETE',
				true
			);
			props.delete_leave_category(data);
			setLoading(false);
			notifySuccess('Leave Category deleted');
		} catch (error) {
			setLoading(false);
			notifyError('Error deleting Leave Category');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeleteLeaveCategory, data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ save: true, edit: false });
		setState({ ...initialState });
	};

	const fetchLeaveCategory = async () => {
		setDataLoaded(false);
		try {
			const rs = await request(`${API_URI}/leave-category`, 'GET', true);
			props.get_all_leave_category(rs);
			setDataLoaded(true);
		} catch (error) {
			setDataLoaded(true);
			notifyError(error.message || 'could not fetch consulting rooms!');
		}
	};

	useEffect(() => {
		fetchLeaveCategory();
	}, []);

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="element-wrapper">
					<div className="os-tabs-w mx-1">
						<div className="os-tabs-controls">
							<ul className="nav nav-tabs upper">
								<li className="nav-item">
									<a aria-expanded="true" className="nav-link active">
										Leave categories
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-8">
							<div className="row">
								{!dataLoaded ? (
									<tr>
										<td colSpan="4" className="text-center">
											<img alt="searching" src={searchingGIF} />
										</td>
									</tr>
								) : (
									<>
										{props.leaveCategories.map((leaveCategory, i) => {
											return (
												<div className="col-lg-4 col-xxl-3" key={i}>
													<div className="pt-3">
														<div className="pipeline-item">
															<div className="pi-controls">
																<div className="pi-settings os-dropdown-trigger">
																	<i
																		className="os-icon os-icon-ui-49"
																		onClick={() =>
																			onClickEdit(leaveCategory)
																		}></i>
																</div>
																<div className="pi-settings os-dropdown-trigger">
																	<i
																		className="os-icon os-icon-ui-15"
																		onClick={() =>
																			confirmDelete(leaveCategory)
																		}></i>
																</div>
															</div>
															<div className="pi-body">
																<div className="pi-info">
																	<div className="h6 pi-name">
																		{leaveCategory.name}
																	</div>
																	<div className="pi-sub">
																		{leaveCategory.duration}
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
										onSubmit={edit ? onEditLeaveCategory : onAddLeaveCategory}>
										<h5 className="element-box-header">Add New</h5>
										<div className="form-group">
											<label className="lighter">Type of leave</label>
											<div className="input-group mb-2 mr-sm-2 mb-sm-0">
												<input
													className="form-control"
													placeholder="Enter leave type"
													type="text"
													name="name"
													value={name}
													onChange={handleInputChange}
												/>
											</div>
										</div>
										<div className="form-group">
											<label className="lighter">Leave duration</label>
											<div className="input-group mb-2 mr-sm-2 mb-sm-0">
												<input
													className="form-control"
													placeholder="Enter leave duration"
													type="text"
													name="duration"
													value={duration}
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
															Loading
																? 'btn btn-primary disabled'
																: 'btn btn-primary'
														}>
														{Loading ? (
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
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		leaveCategories: state.settings.leave_categories,
	};
};
export default connect(mapStateToProps, {
	add_leave_category,
	get_all_leave_category,
	update_leave_category,
	delete_leave_category,
})(LeaveCategory);
