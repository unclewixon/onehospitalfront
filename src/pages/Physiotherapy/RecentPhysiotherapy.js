/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import Select from 'react-select';
import uniqBy from 'lodash.uniqby';
import DatePicker from 'antd/lib/date-picker';

import { request } from '../../services/utilities';
import { getPhysiotherapies } from '../../actions/patient';
import { notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';

const { RangePicker } = DatePicker;

class RecentPhysiotherapy extends Component {
	state = {
		loaded: false,
		patientId: '',
		startDate: moment().format('YYYY-MM-DD'),
		endDate: '',
	};

	componentDidMount() {
		this.fetchPhysio();
	}

	fetchPhysio = async patientId => {
		try {
			const { startDate, endDate } = this.state;
			this.setState({ loaded: true });
			const url = patientId
				? `patient/${patientId}/request/physiotherapy?startDate=${startDate}&endDate=${endDate}`
				: `patient/requests/physiotherapy?startDate=${startDate}&endDate=${endDate}`;
			const rs = await request(url, 'GET', true);
			this.props.getPhysiotherapies(rs.result);
			return this.setState({ loaded: false });
		} catch (error) {
			notifyError('error fetching physiotherapy requests');
			this.setState({ loaded: false });
		}
	};

	formRow = (data, i) => {
		return (
			<tr className="" data-index="0" key={i}>
				<td className="text-center">
					<span className="text-bold">{i + 1}</span>
				</td>
				<td className="text-center">
					{moment(data.createdAt).format('DD-MM-YYYY')}
				</td>
				<td className="text-center">{data.patient_name}</td>
				<td className="text-center">
					{data && data.requestBody && data.requestBody.length
						? data.requestBody.map(body => body.specialization)
						: ''}
				</td>
				<td className="text-center">
					{data && data.requestBody && data.requestBody.length
						? data.requestBody.map(body => body.sessionCount)
						: ''}
				</td>
				<td className="row-actions text-right">
					<Tooltip title="View Request">
						<a href="#">
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
	};

	dateChange = e => {
		let date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		this.setState({
			...this.state,
			startDate: date[0],
			endDate: date[1],
		});
	};

	table = () =>
		this.props &&
		this.props.physiotherapies &&
		this.props.physiotherapies.length
			? this.props.physiotherapies.map((physio, i) => {
					return this.formRow(physio, i);
			  })
			: [];

	filterEntries = () => {
		this.fetchPhysio(this.state.patientId);
	};

	render() {
		const { loaded } = this.state;

		const filteredNames =
			this.props &&
			this.props.physiotherapies &&
			this.props.physiotherapies.length
				? this.props.physiotherapies.map(patient => {
						return {
							value: patient.patient_id,
							label: patient.patient_name,
						};
				  })
				: [];

		const filteredOptions = uniqBy(filteredNames, 'value');

		return (
			<>
				<div className="col-sm-12">
					<div className="element-wrapper">
						<div className="row">
							<div className="col-md-12">
								{/* {this.state.activeRequest ? (
									<ModalClinicalLab
										activeRequest={this.state.activeRequest}
										showModal={this.state.showModal}
										onModalClick={this.onModalClick}
									/>
								) : null} */}
								<h6 className="element-header">Filter by:</h6>

								<form className="row">
									<div className="form-group col-md-6">
										<label>From - To</label>
										<RangePicker onChange={e => this.dateChange(e)} />
									</div>
									<div className="form-group col-md-3">
										<label className="mr-2 " htmlFor="id">
											Patient
										</label>
										<Select
											id="patientId"
											isSearchable={true}
											name="patientId"
											options={filteredOptions}
											onChange={e => this.setState({ patientId: e.value })}
										/>
									</div>
									<div className="form-group col-md-3 mt-4">
										<div
											className="btn btn-sm btn-primary btn-upper text-white"
											onClick={() => {
												this.filterEntries();
											}}>
											<i className="os-icon os-icon-ui-37" />
											<span>
												{/* {filtering ? (
													<img src={waiting} alt="submitting" />
												) : (
														'Filter'
													)} */}
											</span>
										</div>
									</div>
								</form>
							</div>

							<div className="col-sm-12">
								<div className="element-box">
									<div className="table-responsive">
										{
											<table className="table table-striped">
												<thead>
													<tr>
														<th>
															<div className="th-inner "></div>
															<div className="fht-cell"></div>
														</th>
														<th>
															<div className="th-inner sortable both">
																Request Date
															</div>
															<div className="fht-cell"></div>
														</th>
														<th>
															<div className="th-inner sortable both">
																Patient Name
															</div>
															<div className="fht-cell"></div>
														</th>
														<th>
															<div className="th-inner sortable both">
																Specialization
															</div>
															<div className="fht-cell"></div>
														</th>
														<th>
															<div className="th-inner sortable both">
																Session Count
															</div>
															<div className="fht-cell"></div>
														</th>
														<th>
															<div className="th-inner "></div>
															<div className="fht-cell"></div>
														</th>
													</tr>
												</thead>

												<tbody>
													{loaded ? (
														<tr>
															<td colSpan="6" className="text-center">
																<img alt="searching" src={searchingGIF} />
															</td>
														</tr>
													) : (
														<>{this.table()}</>
													)}
												</tbody>
											</table>
										}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
		physiotherapies: state.patient.physiotherapies,
	};
};

export default withRouter(
	connect(mapStateToProps, { getPhysiotherapies })(RecentPhysiotherapy)
);
