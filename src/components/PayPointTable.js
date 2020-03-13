import React, { Component } from 'react';
import us from '../assets/images/flags-icons/us.png';
import ca from '../assets/images/flags-icons/ca.png';
import uk from '../assets/images/flags-icons/uk.png';
import es from '../assets/images/flags-icons/es.png';
import fr from '../assets/images/flags-icons/fr.png';

export class PayPointTable extends Component {
	render() {
		return (
			<div className="col-sm-12">
				<div className="element-box">
					<h6 class="element-header">Recent Transactions</h6>

					<div className="table-responsive">
						<table className="table table-striped">
							<thead>
								<tr>
									<th>PATIENT ID</th>
									<th>SERVICE/ITEM</th>
									<th>PAY MODE</th>
									<th className="text-right">AMOUNT</th>
									<th className="text-center">ACTIONS</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>John Mayers</td>
									<td>12</td>
									<td>
										<img alt="" src={us} style={{ width: '25px' }} />
									</td>
									<td className="text-center">
										<div
											className="status-pill green"
											data-title="Complete"
											data-toggle="tooltip"
											data-original-title=""
											title=""></div>
									</td>
									<td className="text-right">$354</td>
								</tr>
								<tr>
									<td>Kelly Brans</td>
									<td>45</td>
									<td>
										<img alt="" src={ca} style={{ width: '25px' }} />
									</td>
									<td className="text-center">
										<div
											className="status-pill red"
											data-title="Cancelled"
											data-toggle="tooltip"
											data-original-title=""
											title=""></div>
									</td>
									<td class="text-right">$94</td>
								</tr>
								<tr>
									<td>Tim Howard</td>
									<td>112</td>
									<td>
										<img alt="" src={uk} style={{ width: '25px' }} />
									</td>
									<td className="text-center">
										<div
											className="status-pill green"
											data-title="Complete"
											data-toggle="tooltip"
											data-original-title=""
											title=""></div>
									</td>
									<td className="text-right">$156</td>
								</tr>
								<tr>
									<td>Joe Trulli</td>
									<td>1,256</td>
									<td>
										<img alt="" src={es} style={{ width: '25px' }} />
									</td>
									<td className="text-center">
										<div
											className="status-pill yellow"
											data-title="Pending"
											data-toggle="tooltip"
											data-original-title=""
											title=""></div>
									</td>
									<td className="text-right">$1,120</td>
								</tr>
								<tr>
									<td>Fred Kolton</td>
									<td>74</td>
									<td>
										<img alt="" src={fr} style={{ width: '25px' }} />
									</td>
									<td className="text-center">
										<div
											className="status-pill green"
											data-title="Complete"
											data-toggle="tooltip"
											data-original-title=""
											title=""></div>
									</td>
									<td className="text-right">$74</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default PayPointTable;
