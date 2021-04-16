/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';
import { notifyError } from '../../services/notify';
import { request } from '../../services/utilities';

import { patientAPI } from '../../services/constants';
import searchingGIF from '../../assets/images/searching.gif';
import { loadAntenatalAssessment } from '../../actions/patient';
import { antenatalAssessmentDetail } from '../../actions/general';
import moment from 'moment';

class Antennatal extends Component {
	state = {
		loading: false,
		startDate: '',
		endDate: '',
	};

	componentDidMount() {
		this.fetchAntennatalAssessment();
	}

	fetchAntennatalAssessment = async () => {
		this.setState({ loading: true });
		const { patient } = this.props;

		try {
			const rs = await request(
				`${patientAPI}/antenatal/visits?patient_id=${patient.id}&startDate=&endDate=&page=&limit=`,
				'GET',
				true
			);
			this.props.loadAntenatalAssessment(rs);
			this.setState({ loading: false });
		} catch (error) {
			this.setState({ loading: false });
			notifyError('Could not fetch antenatal visit for the patient');
		}
	};

	render() {
		const { location, antenatal, isAntenatalOpen } = this.props;
		const { loading } = this.state;
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					{isAntenatalOpen ? (
						''
					) : (
						<div className="element-actions">
							<Link
								to={`${location.pathname}#antennal-request`}
								className="btn btn-primary">
								New Antennatal Assessment
							</Link>
						</div>
					)}

					<h6 className="element-header">Antennatal Assessment</h6>
					<div className="element-box p-3 m-0">
						<div className="bootstrap-table">
							<div className="fixed-table-toolbar">
								<div className="bs-bars float-left">
									<div id="toolbar"></div>
								</div>
							</div>
							<div
								className="fixed-table-container"
								style={{ paddingBottom: '0px' }}>
								<div className="fixed-table-body">
									<table
										id="table"
										className="table table-theme v-middle table-hover">
										<thead>
											<tr>
												<th className="text-center">Request Date</th>
												<th className="text-center">Height of Fundus(cm)</th>
												<th className="text-center">Fetal heart rate(cm)</th>
												<th className="text-center">Position of Fetal</th>
												<th className="text-center">Relationship to Brim</th>
												<th className="text-center">Fetal lie</th>
												<th className="text-center">Actions</th>
											</tr>
										</thead>
										<tbody>
											{loading ? (
												<tr>
													<td colSpan="8" className="text-center">
														<img alt="searching" src={searchingGIF} />
													</td>
												</tr>
											) : (
												<>
													{antenatal.length ? (
														antenatal.map((item, i) => {
															return (
																<tr className="" data-index="0" data-id="20">
																	<td className="text-center">
																		{moment(item.createdAt).format(
																			'DD-MM-YYYY'
																		)}
																	</td>
																	<td className="text-center">
																		{item.heightOfFunds}
																	</td>
																	<td className="text-center">
																		{item.fetalHeartRate}
																	</td>
																	<td className="text-center">
																		{item.positionOfFetus
																			? item.positionOfFetus
																			: '-'}
																	</td>
																	<td className="text-center">
																		{item.relationshipToBrim
																			? item.relationshipToBrim
																			: '-'}
																	</td>
																	<td className="text-center">
																		{' '}
																		{item.fetalLie ? item.fetalLie : '-'}
																	</td>
																	<td className="row-actions text-right">
																		<Tooltip title="View Request">
																			<a
																				onClick={() =>
																					this.props.antenatalAssessmentDetail(
																						true,
																						item
																					)
																				}>
																				<i className="os-icon os-icon-documents-03" />
																			</a>
																		</Tooltip>
																		<Tooltip title="Print Request">
																			<a className="ml-2" href="#">
																				<i className="icon-feather-printer" />
																			</a>
																		</Tooltip>
																	</td>
																</tr>
															);
														})
													) : (
														<tr>
															<td colSpan="8" className="text-center">
																No antenatal visit
															</td>
														</tr>
													)}
												</>
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
		antenatal: state.patient.antenatalAssessment,
		isAntenatalOpen: state.user.isAntenatalOpen,
	};
};

export default withRouter(
	connect(mapStateToProps, {
		loadAntenatalAssessment,
		antenatalAssessmentDetail,
	})(Antennatal)
);
