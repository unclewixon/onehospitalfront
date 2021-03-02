/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import { connect } from 'react-redux';

import { notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import waiting from '../../assets/images/waiting.gif';
import { loadAntennatal } from '../../actions/patient';
import { viewAntenatalDetail } from '../../actions/general';
import isEmpty from 'lodash.isempty';
import { patientAPI } from '../../services/constants';
import { toggleProfile } from '../../actions/user';
import Pagination from 'antd/lib/pagination';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { request, confirmAction, itemRender } from '../../services/utilities';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import { searchAPI } from '../../services/constants';

const getOptionValues = option => option.id;
const getOptionLabels = option => `${option.other_names} ${option.surname}`;

const getOptions = async q => {
	if (!q || q.length < 3) {
		return [];
	}

	const url = `${searchAPI}?q=${q}`;
	const res = await request(url, 'GET', true);
	return res;
};

const { RangePicker } = DatePicker;
export class AllEnrollment extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		startDate: '',
		endDate: '',
		meta: null,
		patient_id: '',
	};

	componentDidMount() {
		this.fetchAntennatal();
	}

	fetchAntennatal = async page => {
		const { patient_id, startDate, endDate } = this.state;
		try {
			this.setState({ loading: true });
			const p = page || 1;
			const rs = await request(
				`${patientAPI}/antenatal/list?page=${p}&&limit=24&patient_id=${patient_id}&startDate=${startDate}&endDate=${endDate}`,
				'GET',
				true
			);
			const { result, ...meta } = rs;
			const arr = [...result];
			this.props.loadAntennatal(arr);
			this.setState({ loading: false, filtering: false, meta });
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
			this.setState({ loading: false, filtering: false });
			notifyError(
				error.message || 'Error fetching antenatal enrolment requests'
			);
		}
	};

	onNavigatePage = nextPage => {
		this.props.startBlock();
		this.fetchAntennatal(nextPage);
	};

	doFilter = e => {
		e.preventDefault();
		this.setState({ ...this.state, filtering: true });
		this.fetchAntennatal();
	};

	dateChange = e => {
		let date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		this.setState({
			...this.state,
			startDate: date[0] ? date[0] : '',
			endDate: date[1] ? date[1] : '',
		});
	};

	loadDetail = id => {
		this.props.viewAntenatalDetail(true, id);
	};

	tableBody = () => {
		return this.props.antennatal.map((el, i) => {
			return (
				<tr key={i}>
					<td className="text-center">
						{moment(el.createdAt).format('DD-MM-YYYY')}
					</td>
					<td className="text-center">
						{el.surname || ''} {el.other_names || ''}
					</td>
					<td className="text-center">{el.l_m_p}</td>
					<td className="text-center">{el.e_o_d}</td>
					<td className="text-center">{el.bookingPeriod}</td>
					<td className="text-center">{el.lmpSource}</td>
					<td className="text-center">{el.enrollmentPackage}</td>

					<td className="text-center">
						{Array.isArray(el.requiredCare)
							? el.requiredCare.join(',')
							: el.requiredCare}
					</td>

					<td className="text-right row-actions">
						<Tooltip title="view details">
							<a className="secondary" onClick={() => this.loadDetail(el.id)}>
								<i className="os-icon os-icon-eye" />
							</a>
						</Tooltip>
						<Tooltip title="Edit Request">
							<a className="secondary">
								<i className="os-icon os-icon-edit-32" />
							</a>
						</Tooltip>
						<Tooltip title="Delete Request">
							<a className="danger">
								<i className="os-icon os-icon-ui-15" />
							</a>
						</Tooltip>
					</td>
				</tr>
			);
		});
	};

	render() {
		const { filtering, loading, meta } = this.state;
		const { location } = this.props;
		const path = location.pathname.split('/').pop();
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<div className="element-actions">
						<Link
							className={`btn btn-primary ${
								path === '' ? 'btn-outline-primary' : ''
							}`}
							to="/antenatal">
							All Enrollment
						</Link>
						<Link
							className={`btn btn-primary ${
								path === 'enrol' ? 'btn-outline-primary' : ''
							}`}
							to="/antenatal/enrol">
							New Enrollment
						</Link>
					</div>
					<h6 className="element-header">Enrollment</h6>
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<div className="col-md-12 px-0">
									<form className="row">
										<div className="form-group col-md-3">
											<label htmlFor="patient_id">Patient</label>

											<AsyncSelect
												isClearable
												getOptionValue={getOptionValues}
												getOptionLabel={getOptionLabels}
												defaultOptions
												name="patient_id"
												id="patient_id"
												loadOptions={getOptions}
												onChange={e => {
													this.setState({ patient_id: e?.id });
												}}
												placeholder="Search patients"
											/>
										</div>
										<div className="form-group col-md-3">
											<label>From - To</label>
											<RangePicker onChange={e => this.dateChange(e)} />
										</div>

										<div className="form-group col-md-3 mt-4">
											<div
												className="btn btn-sm btn-primary btn-upper text-white"
												onClick={this.doFilter}>
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

								<div className="element-box">
									<div className="table table-responsive">
										<table id="table" className="table">
											<thead>
												<tr className="text-bold">
													<td className="text-center">Date</td>
													<td className="text-center">Patient Name</td>

													<td className="text-center">LMP</td>
													<td className="text-center">EOD</td>
													<td className="text-center">Booking Period</td>
													<td className="text-center">LMP Source</td>
													<td className="text-center">Package</td>
													<td className="text-center">Required Care</td>

													<td className="text-center">Actions</td>
												</tr>
											</thead>
											<tbody>
												{loading ? (
													<tr>
														<td colSpan="8" className="text-center">
															<img alt="searching" src={searchingGIF} />
														</td>
													</tr>
												) : !isEmpty(this.props.antennatal) ? (
													this.tableBody()
												) : (
													<tr>
														{' '}
														<td colSpan="9" className="text-center">
															No antenatal enrolment
														</td>
													</tr>
												)}
											</tbody>
										</table>
									</div>
									{meta && (
										<div className="pagination pagination-center mt-4">
											<Pagination
												current={parseInt(meta.currentPage, 10)}
												pageSize={parseInt(meta.itemsPerPage, 10)}
												total={parseInt(meta.totalPages, 10)}
												showTotal={total => `Total ${total} transactions`}
												itemRender={itemRender}
												onChange={current => this.onNavigatePage(current)}
											/>
										</div>
									)}
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
		antennatal: state.patient.antennatal,
	};
};

export default withRouter(
	connect(mapStateToProps, {
		loadAntennatal,
		viewAntenatalDetail,
		startBlock,
		stopBlock,
	})(AllEnrollment)
);
