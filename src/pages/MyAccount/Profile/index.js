import React from 'react';
import AccountDetails from './ProfileAccountDetails';
import AccountUserProfile from './AccountUserProfile';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import EditProfile from './EditProfile';

const AccountProfile = () => {
	const staff = useSelector(({ user }) => user.profile);
	const [editProfile, setEditProfile] = useState(false);
	const [buttonText, setButtonText] = useState('EDIT PROFILE');

	const onEditClick = () => {
		setEditProfile(true);
		setButtonText('VIEW PROFILE');
	};

	const onViewClick = () => {
		setEditProfile(false);
		setButtonText('EDIT PROFILE');
	};

	return (
		<div className="row">
			<AccountDetails
				staff={staff}
				onEdit={onEditClick}
				buttonText={buttonText}
				onView={onViewClick}
			/>
			{editProfile ? (
				<EditProfile staff={staff} />
			) : (
				<AccountUserProfile staff={staff} />
			)}
		</div>
	);
};

export default AccountProfile;
