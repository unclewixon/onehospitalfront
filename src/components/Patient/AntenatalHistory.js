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
import { startBlock, stopBlock } from '../../actions/redux-block';
import { request, itemRender } from '../../services/utilities';
import TableLoading from '../TableLoading';
import { staffname } from '../../services/utilities';
import { toggleProfile } from '../../actions/user';

const { RangePicker } = DatePicker;

class AntenatalHistory extends Component {
	state = {
		enrollments: [],
		filtering: false,
		loading: false,
		startDate: '',
		endDate: '',
		meta: null,
	};

	componentDidMount() {
		this.fetchAntenatal();
	}

	fetchAntenatal = async page => {
		try {
			const { startDate, endDate } = this.state;
			const patient_id = this.props.patient.id;
			this.setState({ loading: true });
			const p = page || 1;
			const url = `patient/antenatal?page=${p}&limit=12&patient_id=${patient_id}&startDate=${startDate}&endDate=${endDate}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			this.setState({
				enrollments: [...result],
				loading: false,
				filtering: false,
				meta,
			});
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
			this.setState({ loading: false, filtering: false });
			notifyError(error.message || 'Error fetching antenatal enrollments');
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
		const date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		this.setState({
			...this.state,
			startDate: date[0] ? date[0] : '',
			endDate: date[1] ? date[1] : '',
		});
	};

	openAntenatal = (patient, antenatal) => {
		const info = { patient, type: 'antenatal', item: antenatal };
		this.props.toggleProfile(true, info);
	};

	render() {
		const { filtering, loading, meta } = this.state;
		const { enrollments } = this.state;
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
								onClick={this.doFilter}
							>
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
						<div className="table-responsive">
							{loading ? (
								<TableLoading />
							) : (
								<>
									<table className="table table-striped">
										<thead>
											<tr>
												<th>Date of Enrollment</th>
												<th>Enrolled By</th>
												<th>Status</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{enrollments.map((item, i) => {
												return (
													<tr key={i}>
														<td>
															{moment(item.createdAt).format(
																'DD-MMM-YYYY h:mm A'
															)}
														</td>
														<td>{staffname(item.staff)}</td>
														<td>
															{item.status === 0 ? (
																<span className="badge badge-secondary">
																	Open
																</span>
															) : (
																<span className="badge badge-success">
																	Closed
																</span>
															)}
														</td>
														<td className="row-actions">
															<Tooltip title="Open Antenatal">
																<a
																	onClick={() =>
																		this.openAntenatal(item.patient, item)
																	}
																>
																	<i className="os-icon os-icon-user-male-circle2" />
																</a>
															</Tooltip>
														</td>
													</tr>
												);
											})}
											{enrollments.length === 0 && (
												<tr>
													<td colSpan="7" className="text-center">
														No enrolments found!
													</td>
												</tr>
											)}
										</tbody>
									</table>

									{meta && (
										<div className="pagination pagination-center mt-4">
											<Pagination
												current={parseInt(meta.currentPage, 10)}
												pageSize={parseInt(meta.itemsPerPage, 10)}
												total={parseInt(meta.totalPages, 10)}
												showTotal={total => `Total ${total} enrollments`}
												itemRender={itemRender}
												onChange={current => this.onNavigatePage(current)}
												showSizeChanger={false}
											/>
										</div>
									)}
								</>
							)}
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
	};
};

export default withRouter(
	connect(mapStateToProps, { startBlock, stopBlock, toggleProfile })(
		AntenatalHistory
	)
);
