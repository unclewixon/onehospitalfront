import React, { useState, useEffect } from 'react';
import avatar1 from '../assets/images/avatar1.jpg';
import _ from 'lodash';
const CafeteriaCustomerDetail = props => {
	const [customer, setCustomer] = useState({});

	const customerName = () => {
		let surname = customer.surname ? customer.surname : customer.last_name;
		let first_name = customer.other_names
			? customer.other_names
			: customer.first_name;
		return `${surname}, ${first_name}`;
	};
	useEffect(() => {
		setCustomer(props.customer);
	}, [props]);
	return (
		<div className="profile-tile">
			<a className="profile-tile-box" href="users_profile_small.html">
				<div className="pt-avatar-w">
					<img src={avatar1} alt="staff profile" />
				</div>
				<div className="pt-user-name">
					{_.isEmpty(customer) ? 'Walk in Customer' : customerName()}
				</div>
			</a>
			<div className="profile-tile-meta">
				{!_.isEmpty(customer) && !_.isNil(customer.department) ? (
					<ul>
						<li>
							Department:
							<strong>{customer.department.name}</strong>
						</li>
						<li>
							Outstanding:<strong>2,000.00</strong>
						</li>
					</ul>
				) : null}
				<div className="pt-btn">
					<a className="btn btn-success btn-sm">Send Message</a>
				</div>
			</div>
		</div>
	);
};

export default CafeteriaCustomerDetail;
