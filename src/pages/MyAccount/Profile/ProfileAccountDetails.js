/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { ReactComponent as CurveBg } from '../../../assets/svg-icons/curve.svg';
import { parseAvatar } from '../../../services/utilities';

const AccountDetails = ({ staff, onEdit, buttonText, onView }) => {
	return (
		<div className="col-sm-5">
			<div className="user-profile compact">
				<div
					className="up-head-w"
					style={{
						backgroundImage: `url(${parseAvatar(staff?.details?.profile_pic)})`,
					}}
				>
					<div className="up-social">
						<a href="#">
							<i className="os-icon os-icon-twitter"></i>
						</a>
						<a href="#">
							<i className="os-icon os-icon-facebook"></i>
						</a>
					</div>

					<div className="up-main-info">
						<h2 className="up-header">
							{`${staff?.details?.first_name} ${staff?.details?.last_name}`}
						</h2>
						<h6 className="up-sub-header">{staff?.details?.job_title || ''}</h6>
					</div>
					<CurveBg />
				</div>
				<div className="up-controls">
					<div className="row">
						<div className="col-sm-6">
							<div className="value-pair">
								<div className="label">Role:</div>
								<div className="value badge ">{`${staff?.role?.name}`}</div>
							</div>
						</div>
						<div className="col-sm-6 text-right">
							{buttonText === 'VIEW PROFILE' ? (
								<button
									className="btn btn-primary btn-sm"
									onClick={() => onView()}
								>
									<i className="os-icon os-icon-window-content"></i>
									<span>{buttonText}</span>
								</button>
							) : (
								<button
									className="btn btn-primary btn-sm"
									onClick={() => onEdit()}
								>
									<i className="os-icon os-icon-edit-1"></i>
									<span>{buttonText}</span>
								</button>
							)}
						</div>
					</div>
				</div>
				<div className="up-contents">
					<div className="m-b">
						<table className="table">
							<tbody>
								<tr className="small">
									<th scope="row" className="font-weight-bold">
										Username
									</th>
									<td>{`${staff?.username}`}</td>
								</tr>
								<tr className="small">
									<th scope="row" className="font-weight-bold">
										Email
									</th>
									<td>{`${staff?.details?.email}`}</td>
								</tr>

								<tr className="small">
									<th scope="row" className="font-weight-bold">
										Phone Number
									</th>
									<td>{`${staff?.details?.phone_number}`}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountDetails;
