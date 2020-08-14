/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	add_service_category,
	get_all_service_categories,
	update_service_category,
	delete_service_category,
} from '../actions/settings';
import { confirmAction, request } from '../services/utilities';

import { notifySuccess, notifyError } from '../services/notify';
import waiting from '../assets/images/waiting.gif';
import searchingGIF from '../assets/images/searching.gif';

const ServiceCategoryList = props => {
	const initialState = {
		name: '',
		edit: false,
		create: true,
	};
	const [{ name }, setState] = useState(initialState);
	const [Loading, setLoading] = useState(false);
	const [{ edit, create }, setSubmitButton] = useState(initialState);
	const [payload, getDataToEdit] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [dataLoaded, setDataLoaded] = useState(false);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddServiceCat = async e => {
		setLoading(true);
		e.preventDefault();

		let data = {
			name,
		};
		try {
			const rs = await request(`services/categories`, 'POST', true, data);
			props.add_service_category(rs);
			setLoading(false);
			setState({ ...initialState });
			notifySuccess('Service category created');
		} catch (error) {
			setLoading(false);
			setState({ ...initialState });
			notifyError('Error creating service category');
		}
	};

	const onEditServiceCategory = async e => {
		setLoading(true);
		e.preventDefault();
		let data = {
			name,
		};
		try {
			const rs = await request(
				`services/categories/${payload.id}/update`,
				'PATCH',
				true,
				data
			);
			props.update_service_category(rs, payload);
			setState({ ...initialState });
			setSubmitButton({ create: true, edit: false });
			setLoading(false);
			notifySuccess('Service Category updated');
		} catch (error) {
			setState({ ...initialState });
			setSubmitButton({ create: true, edit: false });
			setLoading(false);
			notifyError('Error updating service category!');
		}
	};

	const onClickEdit = data => {
		setSubmitButton({ edit: true, create: false });
		setState(prevState => ({
			...prevState,
			name: data.name,
			id: data.id,
		}));
		getDataToEdit(data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ create: true, edit: false });
		setState({ ...initialState });
	};

	const onDeleteServiceCategory = async data => {
		try {
			await request(`services/categories/${data.id}`, 'DELETE', true);
			props.delete_service_category(data);
			setLoading(false);
			notifySuccess('Service category deleted');
		} catch (error) {
			setLoading(false);
			notifyError('Error deleting service category!');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeleteServiceCategory, data);
	};

	const fetchServiceCategories = async () => {
		setDataLoaded(false);
		try {
			const rs = await request(`services/categories`, 'GET', true);
			props.get_all_service_categories(rs);
			setDataLoaded(true);
		} catch (error) {
			setDataLoaded(true);
			notifyError(error.message || 'could not fetch services categories!');
		}
	};

	useEffect(() => {
		fetchServiceCategories();
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
										<th>S/N</th>
										<th>Name</th>
										<th className="text-right">Actions</th>
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
											{props.ServiceCategories.map((category, i) => {
												return (
													<tr key={i}>
														<td>{i + 1}</td>
														<td>
															<div className="value">{category.name}</div>
														</td>
														<td className="row-actions text-right">
															<a onClick={() => onClickEdit(category)}>
																<i className="os-icon os-icon-ui-49"></i>
															</a>
															<a href="#">
																<i className="os-icon os-icon-grid-10"></i>
															</a>
															<a
																className="danger"
																onClick={() => confirmDelete(category)}>
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
			<div className="col-lg-4 col-xxl-3">
				<div className="pipeline white lined-warning">
					<form onSubmit={edit ? onEditServiceCategory : onAddServiceCat}>
						<h6 className="form-header">
							{edit ? 'Edit Category' : 'New category'}
						</h6>
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
											Loading ? 'btn btn-primary disabled' : 'btn btn-primary'
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
		ServiceCategories: state.settings.service_categories,
	};
};

export default connect(mapStateToProps, {
	add_service_category,
	get_all_service_categories,
	update_service_category,
	delete_service_category,
})(ServiceCategoryList);
