/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import RoomCategory from '../../components/RoomCategory';
import RoomList from '../../components/RoomList';

const RoomMgmt = () => {
	const [ShowRoomCategory, SetRoomCategory] = useState(true);
	const [ShowRoomList, SetRoomList] = useState(false);

	const onRoomCategory = () => {
		SetRoomCategory(true);
		SetRoomList(false);
	};

	const onRoomList = () => {
		SetRoomCategory(false);
		SetRoomList(true);
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="os-tabs-w mx-4">
								<div className="os-tabs-controls os-tabs-complex">
									<ul className="nav nav-tabs upper">
										<li className="nav-item">
											<a
												aria-expanded="true"
												className={
													ShowRoomCategory ? 'nav-link active' : 'nav-link'
												}
												onClick={onRoomCategory}>
												CATEGORIES
											</a>
										</li>
										<li className="nav-item">
											<a
												aria-expanded="false"
												className={
													ShowRoomList ? 'nav-link active' : 'nav-link'
												}
												onClick={onRoomList}>
												ROOM
											</a>
										</li>
									</ul>
								</div>
							</div>
							{ShowRoomCategory === true && <RoomCategory />}
							{ShowRoomList === true && <RoomList />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RoomMgmt;
