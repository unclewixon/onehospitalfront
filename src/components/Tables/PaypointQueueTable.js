import React from 'react';
import { useState, useEffect } from 'react';
import searchingGif from '../../assets/images/searching.gif';

const PaypointQueueTable = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(false);
	});

	return (
		<>
			<table className="table table-light-border">
				<thead>
					<tr>
						<th>Customer Name</th>
						<th>Orders</th>
						<th>Location</th>
						<th class="text-center">Status</th>
						<th class="text-right">Action</th>
					</tr>
				</thead>
				{loading ? (
					<img src="" alt="searchingGif" />
				) : (
					<tbody>
						<tr>
							<td>John Mayers</td>
							<td>12</td>
							<td>
								<img alt="" src="img/flags-icons/us.png" width="25px" />
							</td>
							<td class="text-center">
								<div
									class="status-pill green"
									data-title="Complete"
									data-toggle="tooltip"
									data-original-title=""
									title=""></div>
							</td>
							<td class="text-right">$354</td>
						</tr>
					</tbody>
				)}
			</table>
		</>
	);
};

export default PaypointQueueTable;
