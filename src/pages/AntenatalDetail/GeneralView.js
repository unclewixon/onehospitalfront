import React, { Component } from 'react';
import moment from 'moment';

export default class GeneralView extends Component {
	render() {
		const { ant } = this.props;

		return (
			<div className="element-box col-lg-9 col-md-12">
				<h6 className="element-header text-left">General</h6>
				<table className="table ">
					<tbody>
						<tr>
							<td className="font-weight-bold text-left">Enrolment Date</td>
							<td className="text-right">
								{moment(ant.createdAt).format('DD-MM-YYYY')}
							</td>
						</tr>

						<tr>
							<td className="font-weight-bold text-left">LMP</td>
							<td className="text-right">{ant.l_m_p}</td>
						</tr>
						<tr>
							<td className="font-weight-bold text-left">EOD</td>
							<td className="text-right">{ant.e_o_d}</td>
						</tr>
						<tr>
							<td className="font-weight-bold text-left">Booking Period</td>
							<td className="text-right">{ant.bookingPeriod}</td>
						</tr>
						<tr>
							<td className="font-weight-bold text-left">LMP SOURCE</td>
							<td className="text-right">{ant.lmpSource}</td>
						</tr>
						<tr>
							<td className="font-weight-bold text-left">Enrolment Package</td>
							<td className="text-right"> {ant.enrollmentPackage}</td>
						</tr>
						<tr>
							<td className="font-weight-bold text-left">Required Care</td>
							<td className="text-right">
								{' '}
								{Array.isArray(ant.requiredCare)
									? ant.requiredCare.join(',')
									: ant.requiredCare}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
