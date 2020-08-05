import React from 'react';
import AccountDetails from './ProfileAccountDetails';
import AccountUserProfile from './AccountUserProfile';

const AccountProfile = () => {
	return (
		<div className="row">
			<AccountDetails />
			<AccountUserProfile />
		</div>
	);
};

export default AccountProfile;
