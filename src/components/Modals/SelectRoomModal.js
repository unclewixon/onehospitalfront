/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'reactn';
import { connect } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import useSWR from 'swr';
import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import SSRStorage from '../../services/storage';
const storage = new SSRStorage();

const SelectRoomModal = props => {
	useEffect(() => {
		document.body.classList.add('modal-open');
		return () => {
			document.body.classList.remove('modal-open');
		};
	});

	const setRoom = room => {
		request('hr/staffs/set-consulting-room', 'POST', true, {
			userId: props.profile.details.id,
			roomId: room.id,
		})
			.then(res => {
				if (res.success) {
					props.setCloseModal(room);
					storage.setItem('ACTIVE:ROOM', room);
				}
			})
			.catch(err => {
				notifyError('Error selecting consulting room');
			});
	};

	const { data: rooms } = useSWR('consulting-rooms');

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div className="modal-dialog modal-centered" role="document">
				<div className="modal-content text-center">
					<div className="modal-header faded smaller">
						<div className="modal-title">Select Room</div>
						<button
							aria-label="Close"
							className="close"
							data-dismiss="modal"
							type="button"
							onClick={() => props.setCloseModal()}>
							<span aria-hidden="true"> ×</span>
						</button>
					</div>

					<div className="onboarding-content with-gradient">
						<div className="row">
							{rooms &&
								rooms.map(room => (
									<div className="col-sm-6" key={room.id}>
										<a
											className="element-box el-tablo"
											onClick={() => setRoom(room)}>
											<div className="value p-4">{room.name}</div>
										</a>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		profile: state.user.profile,
	};
};

export default connect(mapStateToProps)(SelectRoomModal);
