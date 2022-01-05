import React from 'react';

import { formatDate, parseSource, formatCurrency } from '../services/utilities';

const PatientBillItem = ({ transactions, onChecked, total }) => {
	return (
		<>
			{transactions.map((item, i) => {
				return (
					<tr key={i}>
						<td>
							<input
								type="checkbox"
								name="select"
								id={`select${i}`}
								value={item.id}
								onChange={onChecked}
							/>
						</td>
						<td>{formatDate(item.createdAt, 'DD-MMM-YYYY h:mm a')}</td>
						<td className="flex">
							<span className="text-capitalize">
								{parseSource(item.bill_source)}
							</span>
						</td>
						<td>{formatCurrency(item.amount || 0, true)}</td>
					</tr>
				);
			})}
			<tr>
				<td colSpan="3" className="text-right">
					Total:
				</td>
				<td>{formatCurrency(total, true)}</td>
			</tr>
		</>
	);
};

export default PatientBillItem;
