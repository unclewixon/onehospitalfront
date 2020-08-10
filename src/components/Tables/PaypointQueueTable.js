import React from 'react';
import { useState, useEffect, useRef } from 'react';
import searchingGif from '../../assets/images/searching.gif';
import { Tooltip } from 'antd';
import InvoiceModal from '../Modals/InvoiceModal';
import useSWR from 'swr';
import { socket } from '../../services/constants';
import axios from 'axios';

const PaypointQueueTable = () => {
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [activeRequest, setActiveRequest] = useState(null);
	const [show, setShow] = useState(false);
	const [target, setTarget] = useState(null);

	const newWindow = document.createElement('div');

	const onReceiptClick = () => {
		return ReactDOM.createPortal();
	};

	const ref = useRef(null);

	useEffect(() => {
		setLoading(false);
	});

	const handlePrintClick = event => {
		setShow(!show);
		setTarget(event.target);
	};

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
			<Overlay
				show={show}
				target={target}
				placement="left"
				container={ref.current}>
				<Popover id="print" style={{ width: '10rem' }}>
					<Popover.Title>Print</Popover.Title>
					<div action>
						<button
							style={{
								border: 'none',
								background: '#fff',
								width: '100%',
								textAlign: 'center',
								paddingTop: '0.5rem',
								paddingBottom: '0.5rem',
							}}>
							INVOICE
						</button>
					</div>
					<div action>
						<button
							style={{
								border: 'none',
								background: '#fff',
								width: '100%',
								textAlign: 'center',
								paddingTop: '0.5rem',
								paddingBottom: '0.5rem',
							}}>
							RECEIPT
						</button>
					</div>
				</Popover>
			</Overlay>
			<table className="table table-light-border">
				<thead>
					<tr>
						<th>Customer Name</th>
						<th>Orders</th>
						<th>Location</th>
						<th className="text-center">Status</th>
						<th className="text-right">Action</th>
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
									<a onClick={handlePrintClick}>
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
