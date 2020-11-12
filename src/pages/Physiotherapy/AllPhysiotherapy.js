/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import uniqBy from 'lodash.uniqby';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import Select from 'react-select';

import { request } from '../../services/utilities';
import { getPhysiotherapies } from '../../actions/patient';
import { notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import waiting from '../../assets/images/waiting.gif';
import ModalPhysiotherapy from '../../components/Modals/ModalPhysiotherapy';

const { RangePicker } = DatePicker;

class AllPhysiotherapy extends Component {
	state = {
		loaded: false,
		patientId: '',
		startDate: '',
		endDate: '',
		filtering: false,
		showModal: false,
		activeRequest: null,
		meta: null,
	};

	componentDidMount() {
		this.fetchPhysio();
	}

	fetchPhysio = async (patientId, p) => {
		try {
			const page = p || 1;
			const { startDate, endDate } = this.state;
			this.setState({ loaded: true });
			const url = patientId
				? `patient/${patientId}/request/physiotherapy?startDate=${startDate}&endDate=${endDate}&limit=10&page=${page}`
				: `patient/requests/physiotherapy?startDate=${startDate}&endDate=${endDate}&limit=10&page=${page}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			this.props.getPhysiotherapies(result);
			this.setState({ loaded: false, filtering: false, meta });
		} catch (error) {
			notifyError('error fetching physiotherapy requests');
			this.setState({ loaded: false, filtering: false });
		}
	};

	onModalClick = () => {
		this.setState({ showModal: !this.state.showModal });
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

	filterEntries = () => {
		this.setState({ filtering: true });
		this.fetchPhysio(this.state.patientId);
	};

	render() {
		const { loaded, filtering, showModal, activeRequest } = this.state;
		const { physiotherapies } = this.props;

		const filteredNames = physiotherapies.map(patient => {
			return {
				value: patient.patient_id,
				label: patient.patient_name,
			};
		});

		const filteredOptions = uniqBy(filteredNames, 'value');

		const customStyle = {
			control: (provided, state) => ({
				...provided,
				minHeight: '24px !important',
				height: '2rem',
				width: '12rem',
			}),
		};

		return (
			<>
				<div className="col-sm-12">
					<div className="element-wrapper">
						<div className="row">
							<div className="col-md-12">
								<h6 className="element-header">All Appointments:</h6>

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
											styles={customStyle}
											id="patientId"
											isSearchable={true}
											name="patientId"
											options={filteredOptions}
											onChange={e => this.setState({ patientId: e.value })}
										/>
									</div>
									<div className="form-group col-md-3 mt-4">
										<div
											className="btn btn-sm btn-primary btn-upper text-white filter-btn"
											onClick={() => {
												this.filterEntries();
											}}>
											<i className="os-icon os-icon-ui-37" />
											<span>
												{filtering ? (
													<img src={waiting} alt="submitting" />
												) : (
													'Filter'
												)}
											</span>
										</div>
									</div>
								</form>
							</div>

							<div className="col-sm-12">
								<div className="element-box">
									<div className="table-responsive">
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
															Requested by
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
													physiotherapies.map((physio, i) => {
														return (
															<tr key={i}>
																<td>
																	<span className="text-bold">{i + 1}</span>
																</td>
																<td>
																	{moment(physio.createdAt).format(
																		'DD-MM-YYYY'
																	)}
																</td>
																<td>{physio.patient_name}</td>
																<td>{physio.created_by || ''}</td>
																<td className="row-actions text-right">
																	<Tooltip title="View Request">
																		<a
																			onClick={() => {
																				this.onModalClick();
																				this.setState({
																					activeRequest: physio,
																				});
																			}}>
																			<i className="os-icon os-icon-documents-03" />
																		</a>
																	</Tooltip>
																	<Tooltip title="Print Request">
																		<a className="ml-2">
																			<i className="icon-feather-printer" />
																		</a>
																	</Tooltip>
																</td>
															</tr>
														);
													})
												)}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{activeRequest && showModal && (
					<ModalPhysiotherapy
						activeRequest={this.state.activeRequest}
						showModal={this.state.showModal}
						onModalClick={this.onModalClick}
					/>
				)}
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
	connect(mapStateToProps, { getPhysiotherapies })(AllPhysiotherapy)
);
