/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import TableLoading from '../TableLoading';
import { request, itemRender, formatDate } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';

const FluidChart = () => {
	const [loading, setLoading] = useState(true);
	const [charts, setCharts] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});
	const [sumInputs, setSumInputs] = useState(0);
	const [sumOutputs, setSumOutputs] = useState(0);

	const dispatch = useDispatch();

	const patient = useSelector(state => state.user.patient);

	const fetchCharts = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `fluid-charts?patient_id=${patient.id}&page=${p}&limit=10`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setCharts(result);
				setMeta(meta);
				setSumInputs(sum(result, 'input'));
				setSumOutputs(sum(result, 'output'));
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				dispatch(stopBlock());
				notifyError('error fetching fluid charts');
			}
		},
		[dispatch, patient]
	);

	useEffect(() => {
		if (loading) {
			fetchCharts();
			setLoading(false);
		}
	}, [fetchCharts, loading]);

	const onNavigatePage = nextPage => {
		fetchCharts(nextPage);
	};

	const sum = (arr, type) => {
		return arr
			.filter(e => e.type === type)
			.reduce((total, item) => total + parseFloat(item.volume || 0), 0);
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<h6 className="element-header">Fluid Chart</h6>
				<div className="element-box p-3 m-0">
					{loading ? (
						<TableLoading />
					) : (
						<div className="table-responsive">
							<table className="table table-bordered table-md table-v2 table-striped">
								<thead>
									<tr>
										<th>Date</th>
										<th>Time</th>
										<th>Input</th>
										<th>Output</th>
										<th>Volume (ml)</th>
										<th>Entry By</th>
									</tr>
								</thead>
								<tbody>
									{charts.map((item, i) => {
										return (
											<tr key={i}>
												<td>{formatDate(item.createdAt, 'D-MMM-YYYY')}</td>
												<td>{formatDate(item.createdAt, 'h:mm A')}</td>
												<td>
													{item.type === 'input' ? item.fluid_route : '--'}
												</td>
												<td>
													{item.type === 'output' ? item.fluid_route : '--'}
												</td>
												<td>{item.volume}</td>
												<td>{item.createdBy}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							<table className="table table-bordered table-md table-v2 table-striped mt-4">
								<tbody>
									<tr>
										<td>{`Total Inputs: ${sumInputs}ml`}</td>
										<td>{`Total Outputs: ${sumOutputs}ml`}</td>
										<td>{`Balance: ${sumInputs - sumOutputs}ml`}</td>
									</tr>
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
	);
};

export default FluidChart;
