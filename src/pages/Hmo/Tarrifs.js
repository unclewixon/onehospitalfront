/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import { notifyError } from '../../services/notify';
import { formatCurrency, request, itemRender } from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import TableLoading from '../../components/TableLoading';

const Tarrifs = ({ location }) => {
	// const [searching, setSearching] = useState(false);
	const [loaded, setLoaded] = useState(false);

	const [tarrifs, setTarrifs] = useState([]);
	const [hmo, setHmo] = useState('');
	const [search, setSearch] = useState('');

	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 25,
		totalPages: 0,
	});

	const dispatch = useDispatch();

	const hmoList = useSelector(state => state.hmo.hmo_list);

	const fetchTarrifs = useCallback(
		async (page, q, hmo_id) => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `hmos/tariffs?hmo_id=${hmo_id}&q=${q}&listType=services&page=${p}&limit=25`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setMeta(meta);
				setTarrifs([...result]);
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				notifyError('error fetching tariffs');
				dispatch(stopBlock());
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (!loaded) {
			fetchTarrifs(1, '', '');
		}
		setLoaded(true);
	}, [fetchTarrifs, loaded]);

	const onNavigatePage = nextPage => {
		fetchTarrifs(nextPage, search, hmo);
	};

	const handleInputChange = async e => {
		console.log(e);
		const { value } = e.target;
		setHmo(value);
		// await fetchTarrifs(1, '', value);
	};

	return (
		<>
			<div className="os-tabs-w mx-1">
				<div className="os-tabs-controls os-tabs-complex">
					<ul className="nav nav-tabs upper">
						<li className="nav-item">
							<a aria-expanded="true" className="nav-link active">
								HMO Tarrifs
							</a>
						</li>
						<li
							className="nav-item nav-actions d-sm-block"
							style={{ width: '480px' }}>
							<div className="row">
								<div className="col-md-6">
									<input
										type="text"
										style={{ width: '100%' }}
										placeholder="Search by service Name"
										className="form-control form-control-sm rounded bright"
										value={search}
										onChange={e => setSearch(e.target.value)}
									/>
								</div>
								<div className="col-md-6">
									<select
										className="form-control form-control-sm rounded bright"
										name="selectedHmo"
										value={hmo}
										onChange={handleInputChange}>
										{hmoList.map((hmo, i) => {
											return (
												<option key={i} value={hmo.value}>
													{hmo.label}
												</option>
											);
										})}
									</select>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div className="pipelines-w">
				<div className="row">
					<div className="col-lg-12">
						<div className="element-wrapper">
							<div className="element-box-tp p-3">
								{!loaded ? (
									<TableLoading />
								) : (
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th>Category</th>
													<th>Service</th>
													<th>HMO</th>
													<th>Amount</th>
													<th>HMO Amount</th>
													<th></th>
												</tr>
											</thead>
											<tbody>
												{tarrifs.map((item, i) => {
													return (
														<tr key={i}>
															<td>{item.category?.name}</td>
															<td>{item.name}</td>
															<td>{item.hmo?.name}</td>
															<td>
																<span>{formatCurrency(item.tariff)}</span>
															</td>
															<td>
																<span>{formatCurrency(item.hmoTarrif)}</span>
															</td>
															<td className="row-actions"></td>
														</tr>
													);
												})}

												{tarrifs.length === 0 && (
													<tr>
														<td colSpan="6" className="text-center">
															No Tariffs has been uploaded
														</td>
													</tr>
												)}
											</tbody>
										</table>

										{meta && (
											<div className="pagination pagination-center mt-4">
												<Pagination
													current={parseInt(meta.currentPage, 10)}
													pageSize={parseInt(meta.itemsPerPage, 10)}
													total={parseInt(meta.totalPages, 10)}
													showTotal={total => `Total ${total} transactions`}
													itemRender={itemRender}
													onChange={current => onNavigatePage(current)}
												/>
											</div>
										)}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Tarrifs;
