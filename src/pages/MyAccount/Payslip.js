/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useState } from 'react';

import PayslipModal from './../../components/Modals/PayslipModal';

const Payslip = () => {
	const [showModal, setShowModal] = useState(false);

	const onModalClick = () => {
		setShowModal(!showModal);
	};

	return (
		<div className="row">
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">Payslip</h6>
					<div className="element-box m-0 p-3">
						<div className="table-responsive">
							<table className="table table-striped">
								<thead>
									<tr>
										<th>
											<div>Date (Month/Year)</div>
										</th>
										<th>
											<div>Monthly Salary</div>
										</th>
										<th>
											<div>Amount Paid</div>
										</th>
										<th>
											<div>Actions</div>
										</th>
									</tr>
								</thead>
								<tbody>
									{/* <tr>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td>
											<Tooltip title="View Breakdown" className="p-2">
												<a onClick={onModalClick}>
													<i className="os-icon os-icon-documents-15" />
												</a>
											</Tooltip>
											<Tooltip title="Print Payslip" className="p-2">
												<a>
													<i className="os-icon os-icon-printer" />
												</a>
											</Tooltip>
										</td>
									</tr> */}
									<tr>
										<td colSpan="4" className="text-center">
											No payslips found!
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			{showModal && (
				<PayslipModal
					showModal={showModal}
					onModalClick={() => onModalClick()}
				/>
			)}
		</div>
	);
};

export default Payslip;
