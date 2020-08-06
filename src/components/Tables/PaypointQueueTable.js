import React from 'react';
import { useState, useEffect } from 'react';
import searchingGif from '../../assets/images/searching.gif';
import { Tooltip } from 'antd';
import InvoiceModal from '../Modals/InvoiceModal';

const PaypointQueueTable = () => {
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [activeRequest, setActiveRequest] = useState(null);

	useEffect(() => {
		setLoading(false);
	});

	const onModalClick = () => {
		setShowModal(!showModal);
	};

	return (
		<>
			{activeRequest ? (
				<InvoiceModal
					showModal={showModal}
					onModalClick={onModalClick}
					activeRequest={activeRequest}
				/>
			) : null}
			<table className="table table-light-border">
				<thead>
					<tr>
						<th>Customer Name</th>
						<th>Orders</th>
						<th>Location</th>
						<th class="text-center">Status</th>
						<th class="text-right">Action</th>
					</tr>
				</thead>
				{loading ? (
					<img src="" alt="searchingGif" />
				) : (
					<tbody>
						<tr>
							<td>John Mayers</td>
							<td>12</td>
							<td>
								<img alt="" src="img/flags-icons/us.png" width="25px" />
							</td>
							<td class="text-center">
								<div
									class="status-pill green"
									data-title="Complete"
									data-toggle="tooltip"
									data-original-title=""
									title=""></div>
							</td>
							<td class="text-right">
								<Tooltip title="View Invoice/Receipt">
									<a
										onClick={() => {
											onModalClick();
											setActiveRequest(true);
										}}>
										<i class="os-icon os-icon-newspaper"></i>
									</a>
								</Tooltip>
								<Tooltip title="Print Details">
									<a onClick>
										<i class="os-icon os-icon-printer"></i>
									</a>
								</Tooltip>
							</td>
						</tr>
					</tbody>
				)}
			</table>
		</>
	);
};

export default PaypointQueueTable;
