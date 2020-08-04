/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URI, socket } from '../services/constants';
import { notifyError } from '../services/notify';
import { request } from '../services/utilities';
import axios from 'axios';
import QueueOverlay from './QueueOverlay';

const Queue = ({ department }) => {
	const [queues, setQueues] = useState([]);
	const [showQueue, setShowQueue] = useState(false);
	const [activeRequest, setActiveRequest] = useState(null);

	useEffect(() => {
		getQueueList();
	}, []);

	useEffect(() => {
		socket.on('new-queue', queue => {
			console.log('new queue', queue);
			if (queue) {
				axios.get(
					`${process.env.REACT_APP_VOICE_RSS_API}Queue number ${queue.queueNumber}, ${queue.patientName}`
				);
				getQueueList();
			}
		});
	}, [queues]);

	async function getQueueList() {
		try {
			const res = await request(
				`front-desk/queue-system/get-lists`,
				'GET',
				true
			);
			setQueues(res);
		} catch (e) {
			notifyError(e.message || 'could not fetch queue list');
		}
	}

	const handleQueueClick = data => {
		setShowQueue(true);
		setActiveRequest(data);
	};

	const handleClose = () => {
		setShowQueue(false);
	};

	return (
		<div className="element-wrapper compact pt-3">
			<h6 className="element-header">Queue</h6>
			<div className="element-box-tp">
				<div className="todo-list">
					{activeRequest ? (
						<QueueOverlay
							isOpen={showQueue}
							handleClose={() => handleClose()}
							data={activeRequest}
						/>
					) : null}
					{department === 'all' || department === 'admin'
						? queues &&
						  queues.map((queue, i) => (
								<div
									className="todo-item"
									onClick={() => handleQueueClick(queue)}
									key={i}>
									<div className="ti-info">
										<div className="ti-header">{queue.patientName}</div>
										<div className="ti-sub-header">
											Queue No: {queue.queueNumber}
										</div>
									</div>
									<div className="ti-icon">
										<i className="os-icon os-icon-arrow-right7" />
									</div>
								</div>
						  ))
						: queues &&
						  queues
								.filter(
									queue => queue?.appointment?.department?.name === department
								)
								.map((queue, i) => (
									<div
										className="todo-item"
										onClick={() => handleQueueClick(queue)}
										key={i}>
										<div className="ti-info">
											<div className="ti-header">{queue.patientName}</div>
											<div className="ti-sub-header">
												Queue No: {queue.queueNumber}
											</div>
										</div>
										<div className="ti-icon">
											<i className="os-icon os-icon-arrow-right7" />
										</div>
									</div>
								))}
				</div>
			</div>
		</div>
	);
};

export default Queue;
