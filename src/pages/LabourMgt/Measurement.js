/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';

import { notifyError } from '../../services/notify';
import { request } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';
import { loadLabourMeasurement } from '../../actions/patient';
import { labourMeasurementDetail } from '../../actions/general';
import isEmpty from 'lodash.isempty';

export class Measurement extends Component {
	state = { loading: false, measurements: [], submitting: false };

	componentDidMount() {
		this.fetchMeasurement();
	}

	fetchMeasurement = async () => {
		const { labourDetail } = this.props;
		try {
			this.setState({ loading: true });
			const rs = await request(
				`labour-management/${labourDetail.id}/measurement`,
				'GET',
				true
			);
			console.log(rs);
			this.props.loadLabourMeasurement(rs);
			this.setState({ loading: false });
		} catch (e) {
			console.log(e);
			this.setState({ loading: false });
			notifyError('Error fetching labour measurement request');
		}
	};
	render() {
		const { loading } = this.state;
		let measurement = this.props.labourMeasurement;
		return (
			<div className="my-3">
				<div className="element-box">
					<div className="table table-responsive">
						<table id="table" className="table">
							<thead>
								<tr>
									<th className="text-center">Date and time of measurement</th>
									<th className="text-center">False Labour</th>
									<th className="text-center">Moulding</th>
									<th className="text-center">Caput</th>
									<th className="text-center">Presentation</th>
									<th className="text-center">Position of Foetus</th>
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
								) : !isEmpty(measurement) ? (
									measurement.map((el, i) => {
										return (
											<tr key={i + 1}>
												<td className="text-center">
													{el.dateOfMeasurement + ' ' + el.timeOfMeasurement}
												</td>
												<td className="text-center text-capitalize">
													{!el.isFalseLabour ? 'Yes' : 'No'}
												</td>
												<td className="text-center text-capitalize">
													{el.moulding}
												</td>
												<td className="text-center">{el.caput}</td>
												<td className="text-center">{el.presentation}</td>
												<td className="text-center text-capitalize">
													{el.positionOfFestus ? el.positionOfFestus : '-'}
												</td>
												<td className="text-center">
													<Tooltip title="view details">
														<a
															className="secondary mx-1"
															onClick={() =>
																this.props.labourMeasurementDetail(true, el)
															}
														>
															<i className="os-icon os-icon-eye" />
														</a>
													</Tooltip>

													{/* <Tooltip title="Delete Request">
													<a
														className="text-danger mx-1"
														onClick={() => this.confirmDelete(immun.id)}>
														<i className="os-icon os-icon-ui-15" />
													</a>
												</Tooltip> */}
												</td>
											</tr>
										);
									})
								) : (
									<tr>
										{' '}
										<td colSpan="9" className="text-center">
											No measurment yet
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		partographies: state.patient.partographies,
		labourDetail: state.patient.labourDetail,
		labourMeasurement: state.patient.labourMeasurement,
	};
};

export default connect(mapStateToProps, {
	loadLabourMeasurement,
	labourMeasurementDetail,
})(Measurement);
