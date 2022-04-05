import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import TableLoading from '../TableLoading';
import { formatDate, itemRender, request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { allVitalItems } from '../../services/constants';

const VisitSummary = () => {
	const [loading, setLoading] = useState(true);
	const [summary, setSummary] = useState(null);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 1,
		totalPages: 0,
	});
	const [vital, setVital] = useState(null);
	const [diagnoses, setDiagnoses] = useState(null);

	const dispatch = useDispatch();

	const patient = useSelector(state => state.user.patient);

	const fetchSummary = useCallback(async () => {
		try {
			dispatch(startBlock());
			const url = `patient/${patient.id}/summary`;
			const rs = await request(url, 'GET', true);
			setLoading(false);
			dispatch(stopBlock());
			if (rs.success) {
				setSummary(rs.summary);
				setMeta({ ...meta, totalPages: rs.summary?.vitals.length || 0 });
				setVital(rs.summary.vitals[0]);
				setDiagnoses(rs.summary.diagnosis[0]);
			} else {
				notifyError(rs.message || 'could not fetch summary');
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
			dispatch(stopBlock());
			notifyError(error.message || 'could not fetch summary');
		}
	}, [dispatch, meta, patient]);

	useEffect(() => {
		if (loading) {
			fetchSummary();
		}
	}, [fetchSummary, loading]);

	const onNavigatePage = nextPage => {
		setVital(summary.vitals[nextPage - 1]);
		setDiagnoses(summary.diagnosis[nextPage - 1]);
		setMeta({ ...meta, currentPage: nextPage });
	};

	console.log(diagnoses);

	return (
		<div className="m-0 w-100">
			{loading && !summary ? (
				<TableLoading />
			) : (
				<div className="table-responsive">
					<div className="dataTables_wrapper container-fluid dt-bootstrap4">
						<div className="row">
							<div className="col-sm-12">
								<h6 className="text-center">Last Vitals</h6>
								{vital && (
									<table
										className="table table-striped table-lightfont dataTable mt-2"
										style={{ width: '100%' }}
									>
										<thead style={{ borderCollapse: 'collapse' }}>
											<tr>
												<th>Date</th>
												{vital.data.map((v, i) => (
													<th key={i}>{v.readingType}</th>
												))}
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>{formatDate(vital.created_at, 'DD-MMM-YYYY')}</td>
												{vital.data.map((item, i) => {
													const values = Object.values(item.reading);
													const v = allVitalItems.find(
														v => v.name === item.readingType
													);
													return <td key={i}>{`${values[0]}${v?.unit}`}</td>;
												})}
											</tr>
										</tbody>
									</table>
								)}
							</div>
							<div className="col-sm-12 mt-4">
								<h6 className="text-center">Diagnoses</h6>
								{diagnoses && (
									<table
										className="table table-striped table-lightfont dataTable mt-2"
										style={{ width: '100%' }}
									>
										<thead style={{ borderCollapse: 'collapse' }}>
											<tr>
												<th>Date</th>
												<th>Diagnosis</th>
												<th>Type</th>
												<th>Comment</th>
												<th>Consultant</th>
												<th>Status</th>
											</tr>
										</thead>
										<tbody>
											{diagnoses.data.map((item, i) => {
												return (
													<tr key={i}>
														<td>
															{formatDate(item.createdAt, 'DD-MMM-YYYY h:mmA')}
														</td>
														<td>{`${item.diagnosis.type.toUpperCase()} (${
															item.diagnosis.code
														}): ${item.diagnosis.description}`}</td>
														<td>{item.diagnosis_type}</td>
														<td>{item.comment || ''}</td>
														<td>{item.createdBy}</td>
														<td>{item.status}</td>
													</tr>
												);
											})}
											{diagnoses.data.length === 0 && (
												<tr>
													<td colSpan="6" className="text-center">
														No Visit Diagnoses Within this period
													</td>
												</tr>
											)}
										</tbody>
									</table>
								)}
							</div>
						</div>
						{meta && (
							<div className="pagination pagination-center mt-4">
								<Pagination
									current={parseInt(meta.currentPage, 10)}
									pageSize={parseInt(meta.itemsPerPage, 10)}
									total={parseInt(meta.totalPages, 10)}
									showTotal={total => `Total ${total} summary`}
									itemRender={itemRender}
									onChange={current => onNavigatePage(current)}
									showSizeChanger={false}
								/>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default VisitSummary;
