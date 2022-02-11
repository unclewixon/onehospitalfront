/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import TableLoading from '../TableLoading';
import { request, itemRender, formatDate } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import RequestConsumable from '../Modals/RequestConsumable';

const Consumables = ({ itemId, type, can_request }) => {
	const [loading, setLoading] = useState(true);
	const [consumables, setConsumables] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});
	const [showModal, setShowModal] = useState(false);

	const dispatch = useDispatch();

	const patient = useSelector(state => state.user.patient);

	const fetchServices = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `patient/consumables/${patient.id}?page=${p}&limit=10&item_id=${itemId}&type=${type}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setConsumables(result);
				setMeta(meta);
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				dispatch(stopBlock());
				notifyError('error fetching consumables');
			}
		},
		[dispatch, itemId, patient, type]
	);

	useEffect(() => {
		if (loading) {
			fetchServices();
			setLoading(false);
		}
	}, [fetchServices, loading]);

	const onNavigatePage = nextPage => {
		fetchServices(nextPage);
	};

	const newRequest = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
	};

	const refresh = () => {
		fetchServices();
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions flex-action">
					{can_request && (
						<a
							className="btn btn-sm btn-secondary text-white"
							onClick={() => newRequest()}>
							Add Consumable
						</a>
					)}
				</div>
				<h6 className="element-header">Consumables</h6>
				<div className="element-box p-3 m-0">
					{loading ? (
						<TableLoading />
					) : (
						<div className="table-responsive">
							<table className="table table-theme v-middle table-hover">
								<thead>
									<tr>
										<th>Date</th>
										<th>Name</th>
										<th>Added By</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{consumables.map((item, i) => {
										return (
											<tr key={i}>
												<td nowrap="nowrap">
													{formatDate(item.createdAt, 'D-MMM-YYYY h:mm A')}
												</td>
												<td>{item.comsumable?.name || '--'}</td>
												<td nowrap="nowrap">{item.createdBy}</td>
												<td></td>
											</tr>
										);
									})}
								</tbody>
							</table>
							{meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalPages, 10)}
										showTotal={total => `Total ${total} items`}
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
			{showModal && (
				<RequestConsumable
					closeModal={closeModal}
					refresh={refresh}
					module={type}
					itemId={itemId}
				/>
			)}
		</div>
	);
};

export default Consumables;
