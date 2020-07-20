/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URI, socket } from '../services/constants';
import { notifyError } from '../services/notify';
import { request } from '../services/utilities';
import axios from 'axios';

const Queue = props => {
	const [queues, setQueues] = useState([]);

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
				setQueues(queues => [...queues, queue]);
			}
		});
	}, [queues]);

	async function getQueueList() {
		try {
			const res = await request(
				`${API_URI}/front-desk/queue-system/get-lists`,
				'GET',
				true
			);
			setQueues(res);
		} catch (e) {
			notifyError(e.message || 'could not fetch queue list');
		}
	}

	return (
		<div className="element-wrapper compact pt-3">
			<h6 className="element-header">Queue</h6>
			<div className="element-box-tp">
				<div className="todo-list">
					{queues &&
						queues.map((queue, i) => (
							<Link className="todo-item" to="/dashboard/patient/123" key={i}>
								<div className="ti-info">
									<div className="ti-header">{queue.patientName}</div>
									<div className="ti-sub-header">
										Queue No: {queue.queueNumber}
									</div>
								</div>
								<div className="ti-icon">
									<i className="os-icon os-icon-arrow-right7" />
								</div>
							</Link>
						))}
				</div>
			</div>
		</div>
	);
};

export default Queue;
