/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import { confirmAction } from '../../services/utilities';
import {
	addSpecialization,
	getAllSpecialization,
	updateSpecialization,
	deleteSpecialization,
} from '../../actions/settings';

const Specialization = (props) => {
	const initialState = {
		name: '',
		save: true,
		edit: false,
		id: '',
	};
	const [{ name }, setState] = useState(initialState);
	const [Loading, setLoading] = useState(false);
	const [{ edit, save }, setSubmitButton] = useState(initialState);
	const [data, getDataToEdit] = useState(null);
	const [loaded, setLoaded] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setState((prevState) => ({ ...prevState, [name]: value }));
	};

	const onAddSpecialization = (e) => {
		e.preventDefault();
		setLoading(true);
		props
			.addSpecialization({ name })
			.then((response) => {
				setLoading(false);
				setState({ ...initialState });
				notifySuccess('Specialization created');
			})
			.catch((error) => {
				setLoading(false);
				notifyError('Error creating Specialization');
			});
	};

	const onEditSpecialization = (e) => {
		setLoading(true);
		e.preventDefault();
		props
			.updateSpecialization({ id: data.id, name }, data)
			.then((response) => {
				setState({ ...initialState });
				setSubmitButton({ save: true, edit: false });
				setLoading(false);
				notifySuccess('Specialization updated');
			})
			.catch((error) => {
				setState({ ...initialState });
				setSubmitButton({ save: true, edit: false });
				setLoading(false);
				notifyError('Error updating Specialization');
			});
	};

	const onClickEdit = (data) => {
		setSubmitButton({ edit: true, save: false });
		setState((prevState) => ({
			...prevState,
			name: data.name,
			duration: data.duration,
			id: data.id,
		}));
		getDataToEdit(data);
	};

	const onDeleteSpecialization = (data) => {
		props
			.deleteSpecialization(data)
			.then((response) => {
				setLoading(false);
				notifySuccess('Specialization deleted');
			})
			.catch((error) => {
				setLoading(false);
				notifyError('Error deleting Specialization');
			});
	};

	const confirmDelete = (data) => {
		confirmAction(onDeleteSpecialization, data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ save: true, edit: false });
		setState({ ...initialState });
	};

	useEffect(() => {
		console.log(save, edit);
		if (!loaded) {
			props.getAllSpecialization();
		}
		setLoaded(true);
	}, [edit, loaded, props, save]);
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
										Specialization
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-8">
							<div className="row">
								{props.Specializations.map((Specialization, i) => {
									return (
										<div className="col-lg-4 col-xxl-3" key={i}>
											<div className="pt-3">
												<div className="pipeline-item">
													<div className="pi-controls">
														<div className="pi-settings os-dropdown-trigger">
															<i
																className="os-icon os-icon-ui-49"
																onClick={() => onClickEdit(Specialization)}></i>
														</div>
														<div className="pi-settings os-dropdown-trigger">
															<i
																className="os-icon os-icon-ui-15"
																onClick={() =>
																	confirmDelete(Specialization)
																}></i>
														</div>
													</div>
													<div className="pi-body">
														<div className="pi-info">
															<div className="h6 pi-name">
																{Specialization.name}
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
						<div className="col-lg-4 col-xxl-3  d-xxl-block">
							<div className="element-wrapper">
								<div className="element-box">
									<form
										onSubmit={
											edit ? onEditSpecialization : onAddSpecialization
										}>
										<h5 className="element-box-header">Add New</h5>
										<div className="form-group">
											<label className="lighter">Name</label>
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
																? 'btn btn-primary disabled'
																: 'btn btn-primary'
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

const mapStateToProps = (state) => {
	return {
		Specializations: state.settings.specializations,
	};
};
export default connect(mapStateToProps, {
	addSpecialization,
	getAllSpecialization,
	updateSpecialization,
	deleteSpecialization,
})(Specialization);
