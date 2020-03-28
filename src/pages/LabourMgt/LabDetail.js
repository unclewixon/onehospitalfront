/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
// import { viewPayPoint } from '../actions/general';

import Splash from '../../components/Splash';
import {
	createLabourMeasurement,
	createRiskAssessment,
	createRecordDelivery,
	createRecordVital,
} from '../../actions/general';
const Measurement = lazy(() => import('./Measurement'));
const Partograph = lazy(() => import('./Partograph'));
const RiskAssessment = lazy(() => import('./RiskAssessment'));
const Recorddelivery = lazy(() => import('./Recorddelivery'));
export class LabDetail extends Component {
	state = {
		tab: 'measurement',
		newForm: false,
	};

	setTab = value => {
		this.setState({ tab: value, newForm: false });
	};

	createForm = () => {
		switch (this.state.tab) {
			case 'measurement':
				this.props.createLabourMeasurement(true);
				break;
			case 'parto-graph':
				this.props.createRecordVital(true);
				break;
			case 'risk-assessment':
				this.props.createRiskAssessment(true);
				break;
			case 'delivery':
				this.props.createRecordDelivery(true);
				break;

			default:
				break;
		}
		this.setState({
			newForm: true,
		});
	};

	const;
	render() {
		const { tab } = this.state;
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="element-content">
						<div className="element-box">
							<h6 className="element-header">
								Thelma Abubakar Kayode (35 years old)
							</h6>
							<table className="labmgt">
								<tbody>
									<tr>
										<td className="labmgtTd">
											<div className="labmgtKey">28TH JANUARY 2020</div>
											<div className="labmgtValue">ADMITTED:</div>
										</td>
										<td className="labmgtTd">
											<div className="labmgtKey">11TH APRIL 2025</div>
											<div className="labmgtValue">LMP</div>
										</td>

										<td className="labmgtTd">
											<div className="labmgtKey">24TH JULY 2089</div>
											<div className="labmgtValue">EDD</div>
										</td>
										<td className="labmgtTd">
											<div className="labmgtKey">47 WEEKS</div>
											<div className="labmgtValue">GESTATIONAL AGE</div>
										</td>
									</tr>
									<tr>
										<td className="labmgtTd">
											<div className="labmgtKey">SINGLE</div>
											<div className="labmgtValue">PRESENT PREGNANCY</div>
										</td>
										<td className="labmgtTd">
											<div className="labmgtKey">0</div>
											<div className="labmgtValue">GRAVIDA</div>
										</td>
										<td className="labmgtTd">
											<div className="labmgtKey">0</div>
											<div className="labmgtValue">PARITY</div>
										</td>
										<td className="labmgtTd">
											<div className="labmgtKey">1/0</div>
											<div className="labmgtValue">ALIVE/MISCARRIAGES</div>
										</td>
									</tr>
									<tr>
										<td className="labmgtTd">
											<div className="labmgtKey">- - - -</div>
											<div className="labmgtValue">TRUE/FALSE LABOUR</div>
										</td>
										<td className="labmgtTd">
											<div className="labmgtKey">--</div>
											<div className="labmgtValue">NEXT EXAMINATION</div>
										</td>
										<td className="labmgtTd">
											<div className="labmgtKey">0</div>
											<div className="labmgtValue">PARITY</div>
										</td>
									</tr>
								</tbody>
							</table>
							<div className="mt-4">
								<button className="btn btn-link pl-0">
									<i className="icon-printer" />
									<span>CLOSE MANAGEMENT</span>
								</button>
								<button className="btn btn-link ml-0">
									<i className="icon-printer" />
									<span>PRINT VIEW</span>
								</button>
							</div>

							<div className="os-tabs-controls mt-4">
								<ul className="nav nav-tabs upper">
									<li className="nav-item">
										<a
											className={
												tab === 'measurement' ? 'nav-link active' : 'nav-link'
											}
											onClick={() => this.setTab('measurement')}>
											MEASUREMENT
										</a>
									</li>
									<li className="nav-item">
										<a
											className={
												tab === 'parto-graph' ? 'nav-link active' : 'nav-link'
											}
											onClick={() => this.setTab('parto-graph')}>
											PARTO-GRAPH
										</a>
									</li>

									<li className="nav-item">
										<a
											className={
												tab === 'risk-assessment'
													? 'nav-link active'
													: 'nav-link'
											}
											onClick={() => this.setTab('risk-assessment')}>
											RISK-ASSESSMENT
										</a>
									</li>

									<li className="nav-item">
										<a
											className={
												tab === 'delivery' ? 'nav-link active' : 'nav-link'
											}
											onClick={() => this.setTab('delivery')}>
											DELIVERY
										</a>
									</li>
								</ul>
							</div>
							<Suspense fallback={<Splash />}>
								{tab === 'measurement' && <Measurement />}
								{tab === 'parto-graph' && <Partograph />}
								{tab === 'risk-assessment' && <RiskAssessment />}
								{tab === 'delivery' && <Recorddelivery />}
							</Suspense>
						</div>
					</div>
				</div>

				<button
					type="button"
					className="labmgtAddButton btn-success"
					onClick={() => this.createForm()}>
					+
				</button>
			</div>
		);
	}
}

export default connect(null, {
	createLabourMeasurement,
	createRiskAssessment,
	createRecordDelivery,
	createRecordVital,
})(LabDetail);
