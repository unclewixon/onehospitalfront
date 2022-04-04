/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import Pagination from 'antd/lib/pagination';
import { useDispatch } from 'react-redux';

import { request, itemRender } from '../../services/utilities';
import { hmoAPI } from '../../services/constants';
import { notifyError } from '../../services/notify';
import RoomHmo from '../../components/RoomHmo';
import ModalAddRoom from '../../components/Modals/ModalAddRoom';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { resetService } from '../../actions/settings';

const RoomMgmt = () => {
	const [toggled, setToggled] = useState([]);
	const [schemes, setSchemes] = useState([]);
	const [meta, setMeta] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);

	const dispatch = useDispatch();

	const doToggle = index => {
		const found = toggled.find(t => t.id === index);
		if (found) {
			setToggled([...toggled.filter(t => t.id !== index)]);
		} else {
			setToggled([...toggled, { id: index }]);
		}
	};

	const fetchHmos = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `${hmoAPI}/schemes?page=${p}&limit=10`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setSchemes([...result]);
				setToggled([]);
				setMeta(meta);
				dispatch(stopBlock());
				setLoaded(true);
			} catch (e) {
				console.log(e);
				dispatch(stopBlock());
				notifyError('could not fetch hmo schemes');
				setLoaded(true);
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (!loaded) {
			dispatch(resetService());
			fetchHmos();
		}
	}, [dispatch, fetchHmos, loaded]);

	const onNavigatePage = nextPage => {
		fetchHmos(nextPage);
	};

	const addRoom = () => {
		document.body.classList.add('modal-open');
		setShowAddModal(true);
	};

	const closeModal = () => {
		setShowAddModal(false);
		document.body.classList.remove('modal-open');
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="os-tabs-w mx-1">
								<div className="os-tabs-controls os-tabs-complex">
									<ul className="nav nav-tabs upper">
										<li className="nav-item">
											<a aria-expanded="false" className="nav-link active">
												Rooms
											</a>
										</li>
										<li className="nav-item nav-actions d-sm-block">
											<a
												className="btn btn-primary btn-sm text-white"
												onClick={() => addRoom()}
											>
												<i className="os-icon os-icon-plus-circle"></i>
												<span>Add Room Category</span>
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-12">
									<div
										className="rentals-list-w"
										style={{ flexDirection: 'column' }}
									>
										{schemes.map((hmo, i) => {
											const toggle = toggled.find(t => t.id === hmo.id);
											return (
												<RoomHmo
													key={i}
													hmo={hmo}
													toggle={toggle}
													doToggle={() => doToggle(hmo.id)}
												/>
											);
										})}
									</div>
									{meta && (
										<div className="pagination pagination-center mt-4">
											<Pagination
												current={parseInt(meta.currentPage, 10)}
												pageSize={parseInt(meta.itemsPerPage, 10)}
												total={parseInt(meta.totalPages, 10)}
												showTotal={total => `Total ${total} HMOs`}
												itemRender={itemRender}
												onChange={current => onNavigatePage(current)}
												showSizeChanger={false}
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{showAddModal && <ModalAddRoom closeModal={() => closeModal()} />}
		</div>
	);
};

export default RoomMgmt;
