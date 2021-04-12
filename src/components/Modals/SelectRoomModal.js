/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'reactn';
import { useSelector, useDispatch } from 'react-redux';
import useSWR from 'swr';

import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import SSRStorage from '../../services/storage';
import { loginUser } from '../../actions/user';
import TableLoading from '../TableLoading';

import 'react-datepicker/dist/react-datepicker.css';

const storage = new SSRStorage();

const SelectRoomModal = ({ closeModal }) => {
	const profile = useSelector(state => state.user.profile);

	const dispatch = useDispatch();

	useEffect(() => {
		document.body.classList.add('modal-open');
		return () => {
			document.body.classList.remove('modal-open');
		};
	});

	const setRoom = async room => {
		try {
			const data = { userId: profile.details.id, roomId: room.id };
			const url = 'hr/staffs/set-consulting-room';
			const rs = await request(url, 'POST', true, data);
			if (rs.success) {
				closeModal(rs.room);
				const details = { ...profile.details, room: rs.room };
				dispatch(loginUser({ ...profile, details }));
				storage.setItem('ACTIVE:ROOM', rs.room);
			}
		} catch (e) {
			notifyError('Error selecting consulting room');
		}
	};

	const { data: rooms } = useSWR('consulting-rooms');

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			{!rooms ? (
				<TableLoading />
			) : (
				<div className="modal-dialog modal-centered" role="document">
					<div className="modal-content text-center">
						<div className="modal-header faded smaller">
							<div className="modal-title">Select Room</div>
							<button
								aria-label="Close"
								className="close"
								data-dismiss="modal"
								type="button"
								onClick={() => closeModal(null)}>
								<span aria-hidden="true"> ×</span>
							</button>
						</div>

						<div className="onboarding-content with-gradient">
							<div className="row">
								{rooms.map(room => (
									<div className="col-sm-6" key={room.id}>
										<a
											className="element-box el-tablo"
											onClick={() => setRoom(room)}>
											<div className="value p-4">{room.name}</div>
										</a>
									</div>
								))}

								{rooms.length === 0 && (
									<div className="col-sm-12">No consulting rooms available</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SelectRoomModal;
