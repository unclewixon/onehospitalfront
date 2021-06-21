import React, { useState, useEffect, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import { notifyError } from '../../services/notify';
import { request, itemRender } from '../../services/utilities';
import ProcedureBlock from '../ProcedureBlock';
import TableLoading from '../TableLoading';

const Procedure = ({ location }) => {
	const [loaded, setLoaded] = useState(false);
	const [procedures, setProcedures] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});

	const startDate = '';
	const endDate = '';

	const patient = useSelector(state => state.user.patient);

	const fetchProcedures = useCallback(
		async page => {
			try {
				const url = `requests/${patient.id}/request/procedure?page=${page}&limit=10&startDate=${startDate}&endDate=${endDate}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setProcedures(result);
				setMeta(meta);
				setLoaded(true);
			} catch (e) {
				notifyError(e.message || 'could not fetch procedure requests');
				setLoaded(true);
			}
		},
		[patient.id]
	);

	useEffect(() => {
		if (!loaded) {
			fetchProcedures(1);
		}
	}, [fetchProcedures, loaded]);

	const updateProcedure = items => {
		setProcedures(items);
	};

	const onNavigatePage = nextPage => {
		setProcedures(nextPage);
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions">
					<Link
						to={`${location.pathname}#procedure-request`}
						className="btn btn-primary btn-sm">
						<i className="os-icon os-icon-plus" />
						New Procedure Request
					</Link>
				</div>
				<h6 className="element-header">Procedure Requests</h6>
				<div className="element-box p-3 m-0 mt-3">
					<div className="bootstrap-table">
						{!loaded ? (
							<TableLoading />
						) : (
							<div
								className="fixed-table-container"
								style={{ paddingBottom: '0px' }}>
								<div className="fixed-table-body">
									<ProcedureBlock
										loading={false}
										procedures={procedures}
										updateProcedure={updateProcedure}
										patient={patient}
									/>
								</div>
								{meta && (
									<div className="pagination pagination-center mt-4">
										<Pagination
											current={parseInt(meta.currentPage, 10)}
											pageSize={parseInt(meta.itemsPerPage, 10)}
											total={parseInt(meta.totalPages, 10)}
											showTotal={total => `Total ${total} procedure requests`}
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
	);
};

export default withRouter(Procedure);
