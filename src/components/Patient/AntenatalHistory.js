/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import Pagination from 'antd/lib/pagination';

import { notifyError } from '../../services/notify';
import waiting from '../../assets/images/waiting.gif';
import { loadAntenatal } from '../../actions/patient';
import { viewAntenatalDetail } from '../../actions/general';
import { patientAPI } from '../../services/constants';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { request, itemRender, patientname } from '../../services/utilities';
import TableLoading from '../TableLoading';

const { RangePicker } = DatePicker;

class AntenatalHistory extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		startDate: '',
		endDate: '',
		meta: null,
	};

	componentDidMount() {
		this.fetchAntenatal();
	}

	fetchAntenatal = async page => {
		const { startDate, endDate } = this.state;
		const patient_id = this.props.patient.id;
		try {
			this.setState({ loading: true });
			const p = page || 1;
			const url = `${patientAPI}/antenatal/list?page=${p}&&limit=24&patient_id=${patient_id}&startDate=${startDate}&endDate=${endDate}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			const arr = [...result];
			this.props.loadAntenatal(arr);
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
		this.fetchAntenatal(nextPage);
	};

	doFilter = e => {
		e.preventDefault();
		this.setState({ ...this.state, filtering: true });
		this.fetchAntenatal();
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

	render() {
		const { filtering, loading, meta } = this.state;
		const { antenatals } = this.props;
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">Antenatal History</h6>
					<form className="row">
						<div className="form-group col-md-10">
							<RangePicker onChange={e => this.dateChange(e)} />
						</div>

						<div className="form-group col-md-2">
							<div
								className="btn btn-sm btn-primary btn-upper text-white filter-btn"
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
					<div className="element-box p-3 m-0 mt-3">
						{loading ? (
							<TableLoading />
						) : (
							<div className="table table-responsive">
								<table className="table">
									<thead>
										<tr className="">
											<td>Date</td>
											<td>Patient Name</td>

											<td>LMP</td>
											<td>EOD</td>
											<td>Booking Period</td>
											<td>LMP Source</td>
											<td>Package</td>
											<td>Required Care</td>

											<td>Actions</td>
										</tr>
									</thead>
									<tbody>
										{antenatals.map((el, i) => {
											return (
												<tr key={i}>
													<td>{moment(el.createdAt).format('DD-MM-YYYY')}</td>
													<td>{patientname(el.patient, true)}</td>
													<td>{el.l_m_p}</td>
													<td>{el.e_o_d}</td>
													<td>{el.bookingPeriod}</td>
													<td>{el.lmpSource}</td>
													<td>{el.enrollmentPackage}</td>

													<td>
														{Array.isArray(el.requiredCare)
															? el.requiredCare.join(',')
															: el.requiredCare}
													</td>

													<td className="text-right row-actions">
														<Tooltip title="view details">
															<a
																className="secondary"
																onClick={() => this.loadDetail(el.id)}>
																<i className="os-icon os-icon-eye" />
															</a>
														</Tooltip>
													</td>
												</tr>
											);
										})}
										{antenatals.length === 0 && (
											<tr>
												<td colSpan="9" className="text-center">
													No antenatal enrolment
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						)}
						{meta && (
							<div className="pagination pagination-center mt-4">
								<Pagination
									current={parseInt(meta.currentPage, 10)}
									pageSize={parseInt(meta.itemsPerPage, 10)}
									total={parseInt(meta.totalPages, 10)}
									showTotal={total => `Total ${total} enrollments`}
									itemRender={itemRender}
									onChange={current => this.onNavigatePage(current)}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		antenatals: state.patient.antenatal,
		patient: state.user.patient,
	};
};

export default withRouter(
	connect(mapStateToProps, {
		loadAntenatal,
		viewAntenatalDetail,
		startBlock,
		stopBlock,
	})(AntenatalHistory)
);
