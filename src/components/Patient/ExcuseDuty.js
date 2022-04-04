/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';

import { notifyError } from '../../services/notify';
import {
	formatDate,
	itemRender,
	request,
	countDate,
	staffname,
} from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import TableLoading from '../TableLoading';

const ExcuseDuty = ({ location }) => {
	const [loaded, setLoaded] = useState(false);
	const [duties, setDuties] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});

	const dispatch = useDispatch();

	const patient = useSelector(state => state.user.patient);

	const fetch = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const url = `patient/excuse-duties?page=${page}&limit=10&patient_id=${patient.id}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setDuties(result);
				setMeta(meta);
				setLoaded(true);
				dispatch(stopBlock());
			} catch (error) {
				setLoaded(true);
				dispatch(stopBlock());
				notifyError('Error could not fetch excuse duties');
			}
		},
		[dispatch, patient]
	);

	useEffect(() => {
		if (!loaded) {
			fetch(1);
		}
	}, [fetch, loaded]);

	const onNavigatePage = nextPage => {
		fetch(nextPage);
	};

	const doPrint = item => {
		console.log(item);
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions">
					<Link
						className="btn btn-primary btn-sm"
						to={`${location.pathname}#new-excuse-duty`}
					>
						<i className="os-icon os-icon-plus" />
						New Excuse Duty
					</Link>
				</div>
				<h6 className="element-header">Excuse Duties</h6>
				<div className="element-box p-3 m-0">
					<div className="bootstrap-table">
						<div className="fixed-table-container pb-0">
							<div className="fixed-table-body">
								{!loaded ? (
									<TableLoading />
								) : (
									<>
										<table className="table table-striped">
											<thead>
												<tr>
													<th>Request Date</th>
													<th>Date</th>
													<th>Note</th>
													<th>Consultant</th>
													<th />
												</tr>
											</thead>
											<tbody>
												{duties.map((item, i) => {
													console.log(item);
													return (
														<tr key={i}>
															<td nowrap="nowrap">
																{formatDate(
																	item.createdAt,
																	'DD-MMM-YYYY h:mmA'
																)}
															</td>
															<td>{item.comment || ''}</td>
															<td>{`${formatDate(
																item.start_date,
																'DD-MMM-YYYY'
															)} - ${formatDate(
																item.end_date,
																'DD-MMM-YYYY'
															)} (${`${countDate(item)}`}days)`}</td>
															<td>
																{item.diagnosis
																	.map(
																		d =>
																			`${d.diagnosis?.type} (${d.diagnosis?.code}): ${d.diagnosis?.description}`
																	)
																	.join(', ')}
															</td>
															<td>{staffname(item.staff)}</td>
															<td className="row-actions">
																<Tooltip title="Print Excuse Duty">
																	<a
																		className="ml-2"
																		onClick={() => doPrint(item)}
																	>
																		<i className="icon-feather-printer" />
																	</a>
																</Tooltip>
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</>
								)}
							</div>
							{meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalPages, 10)}
										showTotal={total => `Total ${total} requests`}
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
	);
};

export default withRouter(ExcuseDuty);
