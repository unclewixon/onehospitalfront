/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import Pagination from 'antd/lib/pagination';
import { useDispatch, useSelector } from 'react-redux';

import {
	confirmAction,
	request,
	updateImmutable,
	itemRender,
} from '../services/utilities';
import { notifySuccess, notifyError } from '../services/notify';
import { loadServiceCategories } from '../actions/settings';
import waiting from '../assets/images/waiting.gif';
import TableLoading from './TableLoading';

const ServiceCategoryList = ({ loaded, setLoaded }) => {
	const initialState = {
		name: '',
		edit: false,
		create: true,
	};
	const [{ name }, setState] = useState(initialState);
	const [working, setWorking] = useState(false);
	const [{ edit, create }, setSubmitButton] = useState(initialState);
	const [payload, getDataToEdit] = useState(null);
	const [list, setList] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const categories = useSelector(state => state.settings.service_categories);

	const dispatch = useDispatch();

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const fetchCategories = useCallback(async () => {
		try {
			setCurrentPage(1);
			const rs = await request('service-categories', 'GET', true);
			setList([...rs]);
			dispatch(loadServiceCategories([...rs.slice(0, 10)]));
			setLoaded(true);
		} catch (error) {
			notifyError(error.message || 'could not fetch services categories!');
		}
	}, [dispatch, setLoaded]);

	useEffect(() => {
		if (!loaded) {
			fetchCategories();
		}
	}, [fetchCategories, loaded]);

	const onAddServiceCat = async e => {
		try {
			e.preventDefault();
			setWorking(true);
			const data = { name };
			const rs = await request('service-categories', 'POST', true, data);
			const lists = [...list, rs];
			setList(lists);
			dispatch(
				loadServiceCategories([
					...lists.slice((currentPage - 1) * 10, currentPage * 10),
				])
			);
			setWorking(false);
			setState({ ...initialState });
			notifySuccess('Service category created');
		} catch (error) {
			setWorking(false);
			setState({ ...initialState });
			notifyError('Error creating service category');
		}
	};

	const onEditServiceCategory = async e => {
		try {
			e.preventDefault();
			setWorking(true);
			const data = { name };
			const url = `service-categories/${payload.id}`;
			const rs = await request(url, 'PATCH', true, data);
			const newCategories = updateImmutable(list, rs);
			setList(newCategories);
			dispatch(
				loadServiceCategories([
					...newCategories.slice((currentPage - 1) * 10, currentPage * 10),
				])
			);
			setState({ ...initialState });
			setSubmitButton({ create: true, edit: false });
			setWorking(false);
			notifySuccess('Service Category updated');
		} catch (error) {
			setState({ ...initialState });
			setSubmitButton({ create: true, edit: false });
			setWorking(false);
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
			const url = `service-categories/${data.id}`;
			const rs = await request(url, 'DELETE', true);
			const lists = [...list.filter(c => c.id !== parseInt(rs.id, 10))];
			setList(lists);
			dispatch(
				loadServiceCategories([
					...lists.slice((currentPage - 1) * 10, currentPage * 10),
				])
			);
			setWorking(false);
			notifySuccess('Service category deleted');
		} catch (error) {
			setWorking(false);
			notifyError('Error deleting service category!');
		}
	};

	// eslint-disable-next-line no-unused-vars
	const confirmDelete = data => {
		confirmAction(onDeleteServiceCategory, data);
	};

	const onNavigatePage = page => {
		setCurrentPage(parseInt(page, 10));
		dispatch(
			loadServiceCategories([...list.slice((page - 1) * 10, page * 10)])
		);
	};

	return (
		<div className="row">
			<div className="col-lg-8">
				<div className="element-wrapper">
					<div className="element-box p-3 m-0">
						{!loaded ? (
							<TableLoading />
						) : (
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
										{categories.map((category, i) => {
											return (
												<tr key={i}>
													<td>{category.id}</td>
													<td>
														<div className="value">{category.name}</div>
													</td>
													<td className="row-actions">
														<a onClick={() => onClickEdit(category)}>
															<i className="os-icon os-icon-ui-49"></i>
														</a>
														{/* <a
															className="danger"
															onClick={() => confirmDelete(category)}>
															<i className="os-icon os-icon-ui-15"></i>
														</a> */}
													</td>
												</tr>
											);
										})}
										{categories.length === 0 && (
											<tr>
												<td className="text-center" colSpan="3">
													No categories created!
												</td>
											</tr>
										)}
									</tbody>
								</table>
								{list.length > 0 && (
									<div className="pagination pagination-center mt-4">
										<Pagination
											current={currentPage}
											pageSize={10}
											total={list.length}
											showTotal={total => `Total ${total} categories`}
											itemRender={itemRender}
											onChange={current => onNavigatePage(current)}
											showSizeChanger={false}
										/>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="col-lg-4">
				<div className="pipeline white lined-warning">
					<form onSubmit={edit ? onEditServiceCategory : onAddServiceCat}>
						<h6 className="form-header">
							{edit ? 'Edit Category' : 'New Category'}
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
										working ? 'btn btn-primary disabled' : 'btn btn-primary'
									}
								>
									{working ? (
										<img src={waiting} alt="submitting" />
									) : (
										<span> create</span>
									)}
								</button>
							)}
							{edit && (
								<>
									<button
										className="btn btn-secondary"
										disabled={working}
										onClick={cancelEditButton}
									>
										<span>cancel</span>
									</button>
									<button
										className={`btn btn-primary 
											${working ? 'disabled' : ''}`}
										disabled={working}
									>
										{working ? (
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

export default ServiceCategoryList;
