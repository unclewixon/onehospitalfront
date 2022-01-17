import { io } from 'socket.io-client';

import { API_URI } from './constants';
import { messageService } from './message';

let socket;

export const initSocket = () => {
	console.log('socket initiatied');

	socket = io(`${API_URI}/socket`, {
		transports: ['websocket', 'polling'],
	});

	if (socket) {
		socket.on('connect', () => {
			console.log(`connected to socket.io: ${socket.connected}: ${socket.id}`);
		});

		socket.io.on('reconnect', () => {
			console.log(`re-connected to socket.io`);
		});

		socket.on('disconnect', reason => {
			console.log(`user disconnected: ${reason}`);
		});
	}
};

export const subscribeIO = () => {
	if (socket) {
		// new appointment
		socket.on('new-appointment', data => {
			messageService.sendMessage({ type: 'new-appointment', data });
		});

		// new transactions
		socket.on('paypoint-queue', data => {
			console.log(data);
		});

		// nursing vitals
		socket.on('nursing-queue', data => {
			messageService.sendMessage({ type: 'nursing-queue', data });
		});

		// consultation queue
		socket.on('consultation-queue', data => {
			messageService.sendMessage({ type: 'consultation-queue', data });
		});

		// update appointment
		socket.on('appointment-update', data => {
			messageService.sendMessage({ type: 'appointment-update', data });
		});
	}
};

export const emit = (event, data) => {
	if (socket) {
		socket.emit(event, data);
	}
};

export const disconnectSocket = () => {
	if (socket) socket.disconnect();
};

export const getSocket = () => socket;
