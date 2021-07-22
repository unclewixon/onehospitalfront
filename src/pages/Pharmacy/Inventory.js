/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect } from 'react';
import Pagination from 'antd/lib/pagination';
import { useDispatch } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';

import { paginate } from '../../services/constants';
import { itemRender } from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import TableLoading from '../../components/TableLoading';

const Inventory = () => {
	const [drugs, setDrugs] = useState([]);
	const [meta, setMeta] = useState({ ...paginate });
	const [loaded, setLoaded] = useState(false);

	const dispatch = useDispatch();

	const loadDrugs = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const rs = await request(`inventory/drugs?page=${p}`, 'GET', true);
				const { result, ...meta } = rs;
				setDrugs(result);
				setMeta(meta);
				window.scrollTo({ top: 0, behavior: 'smooth' });
				setLoaded(true);
				dispatch(stopBlock());
			} catch (e) {
				dispatch(stopBlock());
				notifyError('Error while fetching drugs');
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (!loaded) {
			loadDrugs();
		}
	}, [loadDrugs, loaded]);

	const onNavigatePage = async nextPage => {
		await loadDrugs(nextPage);
	};

	return (
		<>
			<div className="element-box m-0 mb-4 p-3">
				<div className="table table-responsive">
					{!loaded ? (
						<TableLoading />
					) : (
						<>
							<table
								id="table"
								className="table table-theme v-middle table-hover">
								<thead>
									<tr>
										<th>Drug Name</th>
										<th>Generic Name</th>
										<th>Unit of Measure</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{drugs.map((item, index) => {
										return (
											<tr key={index}>
												<td>{item.name}</td>
												<td>{item.generic.name}</td>
												<td>{item.unitOfMeasure}</td>
												<td>
													<Tooltip title="Edit Drug">
														<i
															className="os-icon os-icon-ui-49"
															onClick={() => {}}
														/>
													</Tooltip>
													<Tooltip title="Manage Batches">
														<i
															className="os-icon os-icon-ui-46 ml-1"
															onClick={() => {}}
														/>
													</Tooltip>
												</td>
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
									/>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default Inventory;
