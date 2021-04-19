/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import searchingGIF from '../../assets/images/searching.gif';
import { notifyError } from '../../services/notify';
import { request, itemRender } from '../../services/utilities';
import LabBlock from '../LabBlock';

const Lab = ({ location }) => {
	const [loaded, setLoaded] = useState(false);
	const [labs, setLabs] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});

	const startDate = '';
	const endDate = '';

	const patient = useSelector(state => state.user.patient);

	const fetch = useCallback(
		async page => {
			try {
				const p = page || 1;
				const url = `requests/${patient.id}/request/lab?page=${p}&limit=10&startDate=${startDate}&endDate=${endDate}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setLabs(result);
				setMeta(meta);
				setLoaded(true);
			} catch (e) {
				notifyError(e.message || 'could not fetch lab requests');
				setLoaded(true);
			}
		},
		[patient]
	);

	useEffect(() => {
		if (!loaded) {
			fetch(1);
		}
	}, [fetch, loaded]);

	const updateLab = labs => {
		setLabs(labs);
	};

	const onNavigatePage = nextPage => {
		fetch(nextPage);
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions">
					<Link
						to={`${location.pathname}#lab-request`}
						className="btn btn-primary btn-sm">
						<i className="os-icon os-icon-plus" />
						New Lab Request
					</Link>
				</div>
				<h6 className="element-header">Lab Requests</h6>
				<div className="element-box p-3 m-0 mt-3">
					<div className="bootstrap-table">
						{!loaded ? (
							<div className="text-center">
								<img alt="searching" src={searchingGIF} />
							</div>
						) : (
							<div
								className="fixed-table-container"
								style={{ paddingBottom: '0px' }}>
								<div className="fixed-table-body">
									<LabBlock
										loading={false}
										labs={labs}
										updateLab={updateLab}
										patient={patient}
									/>
								</div>
								{meta && (
									<div className="pagination pagination-center mt-4">
										<Pagination
											current={parseInt(meta.currentPage, 10)}
											pageSize={parseInt(meta.itemsPerPage, 10)}
											total={parseInt(meta.totalPages, 10)}
											showTotal={total => `Total ${total} lab results`}
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

export default withRouter(Lab);
