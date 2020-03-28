import React from 'react';
import moment from 'moment';

const PatientData = ({ patient }) => {
	return (
		<div className="m-b">
			<div className="element-balances justify-content-between mobile-full-width">
				<div className="balance balance-v2">
					<div className="balance-title">Outstanding balance</div>
					<div className="balance-value">
						<span className="inline-block">171,473</span>
						<span className="trending trending-down-basic">
							<span>NGN</span>
						</span>
					</div>
				</div>
			</div>
			<div className="element-box-tp">
				<table className="table table-clean">
					<tbody>
						<tr>
							<td>
								<div className="value">Gender</div>
							</td>
							<td className="text-right">
								<div className="value text-success">{patient.gender}</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className="value">Insurance</div>
							</td>
							<td className="text-right">
								<div className="value text-success">
									{patient.insurranceStatus}
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className="value">Admission</div>
							</td>
							<td className="text-right">
								<div className="value text-success">No</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PatientData;
