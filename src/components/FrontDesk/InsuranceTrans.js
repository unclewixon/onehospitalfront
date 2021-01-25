import React, { useState } from 'react';
import moment from 'moment';

const InsuranceTrans = () => {
	const [code, setCode] = useState('');

	const handleChange = e => {
		setCode(e.target.value);
	};
	return (
		<div>
			<table className="table table-padded">
				<thead>
					<tr>
						<th>Date</th>
						<th>Patient</th>
						<th>File Number</th>
						<th>Service</th>
						<th>Amount</th>
						<th>Code</th>
						<th className="text-center">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="nowrap">
							{moment(Date.now()).format('DD-MM-YYYY')}
						</td>
						<td className="cell-with-media">
							<span
								style={{
									fontSize: '0.7rem',
								}}>
								test test
							</span>
						</td>

						<td className="cell-with-media">
							<span style={{ fontSize: '0.7rem' }}>DEDA1234</span>
						</td>
						<td className="cell-with-media">
							<span style={{ fontSize: '0.7rem' }}>HMO</span>
						</td>

						<td className="cell-with-media">
							<span style={{ fontSize: '0.7rem' }}>50,000</span>
						</td>
						<td className="insurance-code" style={{ fontSize: '0.7rem' }}>
							<input
								value={code}
								type="number"
								onChange={handleChange}
								style={{ fontSize: '0.7rem', border: 'none' }}
								placeHolder="enter code"
							/>
						</td>

						<td className="row-actions">
							{/* eslint-disable-next-line */}
							<a className="danger" href="">
								<i className="os-icon os-icon-ui-15"></i>
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default InsuranceTrans;
