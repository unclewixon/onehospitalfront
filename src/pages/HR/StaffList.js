/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import StaffItem from '../../components/StaffItem';
import { request, getPageList, itemRender } from '../../services/utilities';
import { staffAPI } from '../../services/constants';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifyError } from '../../services/notify';
import TableLoading from '../../components/TableLoading';
import ModalCreateStaff from '../../components/Modals/ModalCreateStaff';
import ModalEditUserAccount from '../../components/Modals/ModalEditUserAccount';
import waiting from '../../assets/images/waiting.gif';

const pageLimit = 24;

const StaffList = () => {
	const [loaded, setLoaded] = useState(false);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: getPageList,
		totalPages: 0,
	});
	const [staffs, setStaffs] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [showAccountModal, setShowAccountModal] = useState(false);
	const [staff, setStaff] = useState(null);
	const [searchValue, setSearchValue] = useState('');
	const [status, setStatus] = useState('');
	const [filtering, setFiltering] = useState(false);

	const dispatch = useDispatch();

	const fetchStaffs = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `${staffAPI}?page=${p}&limit=${pageLimit}&q=${searchValue}&status=${status}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setMeta(meta);
				window.scrollTo({ top: 0, behavior: 'smooth' });
				setStaffs(result);
				setLoaded(true);
				setFiltering(false);
				dispatch(stopBlock());
			} catch (error) {
				notifyError('error fetching staffs');
				setLoaded(true);
				setFiltering(false);
				dispatch(stopBlock());
			}
		},
		[dispatch, searchValue, status]
	);

	useEffect(() => {
		if (!loaded) {
			fetchStaffs();
		}
	}, [fetchStaffs, loaded]);

	const onNavigatePage = async nextPage => {
		await fetchStaffs(nextPage);
	};

	const doCreateStaff = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setShowAccountModal(false);
		setStaff(null);
		document.body.classList.remove('modal-open');
	};

	const updateStaffs = staffs => {
		setStaffs(staffs);
	};

	const doFilter = async () => {
		setFiltering(true);
		await fetchStaffs(1);
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="element-actions">
								<a
									className="btn btn-primary btn-sm text-white"
									onClick={() => doCreateStaff()}>
									<i className="os-icon os-icon-ui-22" />
									<span>Create New Staff</span>
								</a>
							</div>
							<h6 className="element-header">Staff List</h6>
							<div className="element-box m-0 mb-4 p-3">
								<form className="row">
									<div className="form-group col-md-6">
										<label className="mr-2 " htmlFor="search">
											Search
										</label>
										<input
											style={{ height: '32px' }}
											id="search"
											className="form-control"
											name="search"
											onChange={e => setSearchValue(e.target.value)}
											placeholder="search for staff"
										/>
									</div>
									<div className="form-group col-md-3">
										<label className="mr-2" htmlFor="id">
											Status
										</label>
										<select
											style={{ height: '32px' }}
											id="status"
											className="form-control"
											name="status"
											onChange={e => setStatus(e.target.value)}>
											<option value="">All</option>
											<option value="enabled">Enabled</option>
											<option value="disabled">Disabled</option>
										</select>
									</div>
									<div className="form-group col-md-3 mt-4">
										<div
											className="btn btn-sm btn-primary btn-upper text-white filter-btn"
											onClick={doFilter}>
											<i className="os-icon os-icon-ui-37" />
											<span>
												{filtering ? (
													<img src={waiting} alt="submitting" />
												) : (
													'Filter'
												)}
											</span>
										</div>
									</div>
								</form>
							</div>
							<div className="element-box p-3 m-0">
								<div className="table-responsive">
									{!loaded ? (
										<TableLoading />
									) : (
										<>
											<table className="table table-striped">
												<thead>
													<tr>
														<th></th>
														<th>Name</th>
														<th>Role</th>
														<th>Phone</th>
														<th>Department</th>
														<th>Date Created</th>
														<th className="text-center">Status</th>
														<th className="text-right">Actions</th>
													</tr>
												</thead>
												<tbody>
													<StaffItem
														staffs={staffs}
														updateStaffs={updateStaffs}
														editStaff={(staff, isAccount) => {
															setStaff(staff);
															document.body.classList.add('modal-open');
															if (isAccount) {
																setShowAccountModal(true);
															} else {
																setShowModal(true);
															}
														}}
													/>
												</tbody>
											</table>
											{meta && (
												<div className="pagination pagination-center mt-4">
													<Pagination
														current={parseInt(meta.currentPage, 10)}
														pageSize={parseInt(meta.itemsPerPage, 10)}
														total={parseInt(meta.totalPages, 10)}
														showTotal={total => `Total ${total} staffs`}
														itemRender={itemRender}
														onChange={current => onNavigatePage(current)}
														showSizeChanger={false}
													/>
												</div>
											)}
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{showModal && (
				<ModalCreateStaff
					staff={staff}
					staffs={staffs}
					updateStaffs={updateStaffs}
					closeModal={() => closeModal()}
				/>
			)}
			{showAccountModal && (
				<ModalEditUserAccount
					staff={staff}
					staffs={staffs}
					updateStaffs={updateStaffs}
					closeModal={() => closeModal()}
				/>
			)}
		</div>
	);
};

export default StaffList;
