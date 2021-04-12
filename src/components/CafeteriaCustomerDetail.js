/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';

import avatar1 from '../assets/images/avatar1.jpg';
import isEmpty from 'lodash.isempty';

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
			{!isEmpty(customer) ? (
				<>
					<h6 className="element-header">Customer Detail</h6>
					<div className="profile-tile">
						<a className="profile-tile-box">
							<div className="pt-avatar-w">
								<img src={avatar1} alt="staff profile" />
							</div>
							{/* <div className="pt-user-name">
					{isEmpty(customer) ? 'Walk in Customer' : customerName()}
				</div> */}
						</a>
						<div className="profile-tile-meta">
							{/* !isEmpty(customer) && !_.isNil(customer.department)  */}
							{orderBy === 'staff' && !isEmpty(customer) ? (
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
							) : null}

							{orderBy === 'patient' && !isEmpty(customer) ? (
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
							) : null}
						</div>
					</div>
				</>
			) : null}
		</div>
	);
};

export default CafeteriaCustomerDetail;
