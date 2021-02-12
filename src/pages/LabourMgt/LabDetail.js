/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
// import { viewPayPoint } from '../actions/general';
import moment from 'moment';
import Splash from '../../components/Splash';
import {
	createLabourMeasurement,
	createRiskAssessment,
	createRecordDelivery,
	createRecordVital,
} from '../../actions/general';
import { getAge, request } from '../../services/utilities';
import isEmpty from 'lodash.isempty';
import { clearLabourDetails, loadLabourDetails } from '../../actions/patient';
import { labourAPI } from '../../services/constants';
import { notifyError } from '../../services/notify';
const Measurement = lazy(() => import('./Measurement'));
const Partograph = lazy(() => import('./Partograph'));
const RiskAssessment = lazy(() => import('./RiskAssessment'));
const Recorddelivery = lazy(() => import('./Recorddelivery'));

class LabDetail extends Component {
	state = {
		tab: 'measurement',
		newForm: false,
		loading: false,
		displaylabAction: true,
	};
	componentDidMount() {
		this.fetchEnrollmentByID();
		this.setState({ ...this.state, displaylabAction: true });
	}

	fetchEnrollmentByID = async () => {
		try {
			this.setState({ loading: true });
			const rs = await request(
				`${labourAPI}/${this.props.match.params.id}`,
				'GET',
				true
			);
			console.log('from RS', rs);

			this.props.loadLabourDetails(rs);
			console.log(rs);
			this.setState({ loading: false });
		} catch (error) {
			console.log(error);
			notifyError('Error fetching labour details');
			this.setState({ loading: false });
		}
	};

	setTab = value => {
		if (value !== 'parto-graph') {
			this.setState({ tab: value, newForm: false, displaylabAction: true });
		} else {
			this.setState({ tab: value, newForm: false });
		}
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

	findTrueLabour = () => {
		this.props.labourMeasurement.findIndex(labour =>
			labour.isFalseLabour === true ? true : false
		);
	};

	labMgtActions = () => {
		switch (this.state.tab) {
			case 'measurement':
				return 'Take Measurment';
			case 'parto-graph':
				if (this.findTrueLabour()) {
					this.setState({ ...this.state, displaylabAction: false });
					break;
				} else {
					return 'Record Vital';
				}
			case 'risk-assessment':
				return 'Take Risk Assessment';
			case 'delivery':
				return 'Record Delivery';
			default:
				break;
		}
	};

	const;
	render() {
		const { tab, loading } = this.state;
		const { params, labourDetail } = this.props;
		console.log('parammm', params);
		console.log(labourDetail);
		return (
			<div className="row">
				<div className="col-md-12">
					{!loading && labourDetail && (
						<div className="element-content">
							<div className="element-box">
								<div className="element-header d-flex justify-content-between">
									<h6>
										{labourDetail.patient_name} (
										{!isEmpty(this.props.labourDetail)
											? getAge(labourDetail.date_of_birth)
											: ''}{' '}
										old)
									</h6>
									{this.props.canCloseLabour && (
										<button
											className={
												'mr-4 mx-2 btn btn-success btn-sm btn-primary'
											}>
											close labour
										</button>
									)}
								</div>

								<table className="labmgt">
									<tbody>
										<tr>
											<td className="labmgtTd">
												<div className="labmgtKey">
													{moment(labourDetail.createdAt).format('DD/MM/YYYY')}
												</div>
												<div className="labmgtValue">
													ADMITTED ('DD/MM/YYYY'):
												</div>
											</td>
											<td className="labmgtTd">
												<div className="labmgtKey">
													{moment(labourDetail.lmp).format('DD/MM/YYYY')}
												</div>
												<div className="labmgtValue">LMP</div>
											</td>

											<td className="labmgtTd">
												<div className="labmgtKey">
													{moment(labourDetail.lmp)
														.add(9, 'M')
														.format('DD/MM/YYYY')}
												</div>
												<div className="labmgtValue">EDD</div>
											</td>
											<td className="labmgtTd">
												<div className="labmgtKey">47 WEEKS</div>
												<div className="labmgtValue">GESTATIONAL AGE</div>
											</td>
										</tr>
										<tr>
											<td className="labmgtTd">
												<div className="labmgtKey">
													{labourDetail.presentPregnancy}
												</div>
												<div className="labmgtValue">PRESENT PREGNANCY</div>
											</td>
											<td className="labmgtTd">
												<div className="labmgtKey">0</div>
												<div className="labmgtValue">GRAVIDA</div>
											</td>
											<td className="labmgtTd">
												<div className="labmgtKey">{labourDetail.parity}</div>
												<div className="labmgtValue">PARITY</div>
											</td>
											<td className="labmgtTd">
												<div className="labmgtKey">
													{labourDetail.alive}/{labourDetail.miscarriage}
												</div>
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
												<div className="labmgtKey"></div>
												<div className="labmgtValue"></div>
											</td>
											<td className="labmgtTd">
												<div className="labmgtKey"></div>
												<div className="labmgtValue"></div>
											</td>
										</tr>
									</tbody>
								</table>
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
									<div className="row justify-content-center align-items-center">
										{this.state.displaylabAction && (
											<button
												className={
													'mr-4 text-center mx-2 btn btn-primary btn-sm'
												}
												onClick={() => this.createForm()}>
												{this.labMgtActions()}{' '}
												<i className="os-icon os-icon-plus"></i>
											</button>
										)}
									</div>
								</div>
								<Suspense fallback={<Splash />}>
									{tab === 'measurement' && <Measurement />}
									{tab === 'parto-graph' && <Partograph />}
									{tab === 'risk-assessment' && <RiskAssessment />}
									{tab === 'delivery' && <Recorddelivery />}
								</Suspense>
							</div>
						</div>
					)}
				</div>

				{/* <button
					type="button"
					className="labmgtAddButton btn-success"
					onClick={() => this.createForm()}></button> */}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		labourDetail: state.patient.labourDetail,
		labourMeasurement: state.patient.labourMeasurement,
		canCloseLabour: state.patient.canCloseLabour,
	};
};

export default connect(mapStateToProps, {
	createLabourMeasurement,
	createRiskAssessment,
	createRecordDelivery,
	createRecordVital,
	clearLabourDetails,
	loadLabourDetails,
})(LabDetail);
