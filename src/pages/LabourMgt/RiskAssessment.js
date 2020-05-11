import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';
import { API_URI, searchAPI } from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import { request, confirmAction } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';
import { loadRiskAssessment } from '../../actions/patient';
import _ from 'lodash';
import DatePicker from 'antd/lib/date-picker';
import waiting from '../../assets/images/waiting.gif';

export class RiskAssessment extends Component {
	state = {
		loading: false,
		risks: [],
		submitting: false,
	};

	componentDidMount() {
		this.fetchRisk();
	}

	fetchRisk = async () => {
		const { labourDetail } = this.props;

		try {
			this.setState({ loading: true });
			const rs = await request(
				`${API_URI}/labour-management/${labourDetail.id}/risk-assessment`,
				'GET',
				true
			);
			console.log(rs);
			this.props.loadRiskAssessment(rs);
			this.setState({ loading: false });
		} catch (e) {
			console.log(e);
			this.setState({ loading: false });
			notifyError('Error fetching risk assessment request');
		}
	};
	render() {
		const { loading } = this.state;
		let risk = this.props.riskAssessment;
		// risk = [...risk].reverse();
		console.log(risk);
		return (
			<div className="element-box">
				<div className="table table-responsive">
					<table id="table" className="table">
						<thead>
							<tr>
								<th className="text-center">Date</th>
								<th className="text-center">Height(kg)</th>
								<th className="text-center">Weight(kg)</th>
								<th className="text-center">Previous Pregnancy Outcome</th>
								<th className="text-center">Previous Pregnancy Experience</th>
								<th className="text-center">note</th>
								{/* <th className="text-center">Actions</th> */}
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr>
									<td colSpan="8" className="text-center">
										<img alt="searching" src={searchingGIF} />
									</td>
								</tr>
							) : !_.isEmpty(risk) ? (
								risk.map((el, i) => {
									return (
										<tr key={i + 1}>
											<td className="text-center">
												{moment(el.createdAt).format('DD/MM/YYYY')}
											</td>
											<td className="text-center text-capitalize">
												{el.height}
											</td>
											<td className="text-center text-capitalize">
												{el.weight}
											</td>
											<td className="text-center">
												{el.previousPregnancyOutcome}
											</td>
											<td className="text-center">
												{el.previousPregnancyExperience.join(', ')}
											</td>
											<td className="text-center text-capitalize">{el.note}</td>
											{/* <td className="text-center">
												<Tooltip title="view details">
													<a
														className="secondary mx-1"
														onClick={() =>
															this.props.viewImmunizationDetail(true, immun)
														}>
														<i className="os-icon os-icon-eye" />
													</a>
												</Tooltip>
												<Tooltip title="Edit Request ">
													<a className="secondary mx-2">
														<i className="os-icon os-icon-edit-32" />
													</a>
												</Tooltip>
												<Tooltip title="Delete Request">
													<a
														className="text-danger mx-1"
														onClick={() => this.confirmDelete(immun.id)}>
														<i className="os-icon os-icon-ui-15" />
													</a>
												</Tooltip>
											</td> */}
										</tr>
									);
								})
							) : (
								<tr>
									{' '}
									<td colSpan="9" className="text-center">
										No risk assessment yet
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		partographies: state.patient.partographies,
		labourDetail: state.patient.labourDetail,

		riskAssessment: state.patient.riskAssessment,
	};
};
export default connect(mapStateToProps, { loadRiskAssessment })(RiskAssessment);
