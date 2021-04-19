/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import patientProfilePic from '../../assets/images/placeholder.jpg';
import { formatPatientId, getAge } from '../../services/utilities';

const ProfilePopup = ({ patient }) => {
	return (
		<div className="element-box-tp">
			<div className="profile-tile m-0 p-2">
				<a
					className="profile-tile-box"
					style={{ width: '64px', backgroundColor: 'transparent' }}>
					<div className="pt-avatar-w">
						<img
							alt=""
							src={
								patient?.profile_pic ? patient?.profile_pic : patientProfilePic
							}
							style={{ maxWidth: '100%' }}
						/>
					</div>
				</a>
				<div className="profile-tile-meta pl-2">
					<ul>
						<li>
							<strong className="m-0">{`${patient.surname} ${patient.other_names}`}</strong>
						</li>
						<li>
							EMR:
							<strong>{`#${formatPatientId(patient.id)} [${
								patient.folderNumber
							}]`}</strong>
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