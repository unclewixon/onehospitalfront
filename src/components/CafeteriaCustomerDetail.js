/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import isEmpty from 'lodash.isempty';

import avatar1 from '../assets/images/avatar1.jpg';

const CafeteriaCustomerDetail = props => {
	const [customer, setCustomer] = useState({});
	const [orderBy, setOrderBy] = useState('');
	const [loaded, setLoaded] = useState(null);

	useEffect(() => {
		if (!loaded) {
			setCustomer(props.customer);
			setOrderBy(props.orderBy);
			setLoaded(true);
		}
	}, [props, loaded]);

	return (
		<div>
			{!isEmpty(customer) && (
				<>
					<h6 className="element-header">Customer Detail</h6>
					<div className="profile-tile">
						<a className="profile-tile-box">
							<div className="pt-avatar-w">
								<img src={avatar1} alt="staff profile" />
							</div>
						</a>
						<div className="profile-tile-meta">
							{orderBy === 'staff' && !isEmpty(customer) && (
								<ul>
									<li>
										Staff ID:
										<strong>
											{customer.emp_code ? customer.emp_code : ''}
										</strong>
									</li>
									<li>
										Staff Name:
										<strong>
											{`${customer.first_name ? customer.first_name : ''} ${
												customer.last_name ? customer.last_name : ''
											}`}
										</strong>
									</li>
									<li>
										Department:
										<strong>
											{customer.department
												? customer.department.name
												: 'No department'}
										</strong>
									</li>
								</ul>
							)}

							{orderBy === 'patient' && !isEmpty(customer) && (
								<ul>
									<li>
										PatientID:
										<strong>{customer.id}</strong>
									</li>
									<li>
										Patient Name:
										<strong>
											{`${customer.other_names ? customer.other_names : ''} ${
												customer.surname ? customer.surname : ''
											}`}
										</strong>
									</li>
									<li>
										Patient Room:<strong></strong>
									</li>
								</ul>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default CafeteriaCustomerDetail;
