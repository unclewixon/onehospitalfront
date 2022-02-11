/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import { notifyError } from '../../services/notify';
import { request, updateImmutable, itemRender } from '../../services/utilities';
import PrescriptionBlock from '../PrescriptionBlock';

const Pharmacy = ({ location, can_request = true, type, itemId }) => {
	const [loaded, setLoaded] = useState(false);
	const [prescriptions, setPrescriptions] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});

	const patient = useSelector(state => state.user.patient);

	const startDate = '';
	const endDate = '';

	const fetch = useCallback(
		async page => {
			try {
				const block = type || '';
				const url = `requests/prescriptions?startDate=${startDate}&endDate=${endDate}&page=${page}&limit=10&item_id=${itemId ||
					''}&type=${block}&patient_id=${patient.id}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setPrescriptions(result);
				setMeta(meta);
				setLoaded(true);
			} catch (error) {
				setLoaded(true);
				notifyError('Error could not fetch regimen prescriptions');
			}
		},
		[itemId, patient, type]
	);

	useEffect(() => {
		if (!loaded) {
			fetch(1);
		}
	}, [fetch, loaded]);

	const updatePrescriptions = update => {
		const updatedDrugs = updateImmutable(prescriptions, update);
		setPrescriptions(updatedDrugs);
	};

	const removePrescription = item => {
		const updatedDrugs = prescriptions.filter(p => p.id !== item);
		setPrescriptions(updatedDrugs);
	};

	const onNavigatePage = nextPage => {
		fetch(nextPage);
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions">
					{can_request && (
						<Link
							className="btn btn-primary btn-sm"
							to={`${location.pathname}#pharmacy-request`}>
							<i className="os-icon os-icon-plus" />
							New Pharmacy Request
						</Link>
					)}
				</div>
				<h6 className="element-header">Pharmacy Requests</h6>
				<div className="element-box p-3 m-0">
					<div className="bootstrap-table">
						<div className="fixed-table-container pb-0">
							<div className="fixed-table-body">
								<PrescriptionBlock
									loading={!loaded}
									patient={patient}
									prescriptions={prescriptions}
									updatePrescriptions={updatePrescriptions}
									removePrescription={removePrescription}
								/>
							</div>
							{meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalPages, 10)}
										showTotal={total => `Total ${total} prescriptions`}
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

export default withRouter(Pharmacy);
