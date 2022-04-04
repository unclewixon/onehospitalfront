/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import {
	formatPatientId,
	getAge,
	parseAvatar,
	patientname,
} from '../../services/utilities';

const ProfilePopup = ({ patient }) => {
	return (
		<div className="element-box-tp">
			<div className="profile-tile m-0 p-2">
				<a
					className="profile-tile-box"
					style={{ width: '64px', backgroundColor: 'transparent' }}
				>
					<div className="pt-avatar-w">
						<img
							alt=""
							src={parseAvatar(patient?.profile_pic)}
							style={{ maxWidth: '100%' }}
						/>
					</div>
				</a>
				<div className="profile-tile-meta pl-2">
					<ul>
						<li>
							<strong className="m-0">{patientname(patient)}</strong>
						</li>
						<li>
							EMR:
							<strong>{`#${formatPatientId(patient)}`}</strong>
						</li>
						<li>
							<strong className="m-0">{`${getAge(patient?.date_of_birth)}/${
								patient.gender
							}`}</strong>
						</li>
						<li>
							Coverage: <strong>{patient?.hmo?.name}</strong>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ProfilePopup;
