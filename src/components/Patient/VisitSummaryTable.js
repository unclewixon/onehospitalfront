/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
// import Pagination from 'antd/lib/pagination';
import DatePicker from 'antd/lib/date-picker';
// import { formValueSelector } from 'redux-form';

// import { request, confirmAction, itemRender } from '../../services/utilities';
// import { notifySuccess, notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import waiting from '../../assets/images/waiting.gif';
import TableLoading from '../TableLoading';

const { RangePicker } = DatePicker;

// const paymentStatus = [
// 	{ value: 0, label: 'processing' },
// 	{ value: 1, label: 'done' },
// ];

class VisitSummaryTable extends Component {
	state = {
		loading: false,
		role: null,
		showModal: false,
		startDate: '',
		endDate: '',
		diagnoses: [],
		vitals: [],
		notes: [],
	};

	componentDidMount() {
		this.fetchSummary();
	}

	fetchSummary = async () => {
		// try {
		// 	const { startDate, endDate } = this.state;
		// 	this.setState({ loading: true });
		// 	const url = `dummy/list?startDate=${startDate}&endDate=${endDate}`;
		// 	const rs = await request(url, 'GET', true);
		// 	const { notes, diagnoses, vitals } = rs;
		// 	this.setState({
		// 		loading: false,
		// 		notes,
		// 		diagnoses,
		// 		vitals,
		// 		filtering: false,
		// 	});
		// } catch (error) {
		// 	console.log(error);
		// 	this.setState({ loading: false, filtering: false });
		// 	notifyError(error.message || 'could not fetch visit notes');
		// }
	};

	doFilter = e => {
		e.preventDefault();
		this.setState({ filtering: true });

		this.fetchSummary();
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

	openPermissionModal = role => () => {
		document.body.classList.add('modal-open');
		this.setState({ role, showModal: true });
	};

	closeModal = () => {
		document.body.classList.remove('modal-open');
		this.setState({ role: null, showModal: false });
	};

	render() {
		const { loading, notes, filtering, diagnoses, vitals } = this.state;
		return (
			<div className="row">
				<div className="m-0 w-100">
					{loading ? (
						<TableLoading />
					) : (
						<div className="">
							<div className="table-responsive">
								<div
									id="dataTable1_wrapper"
									className="dataTables_wrapper container-fluid dt-bootstrap4"
								>
									<form className="row">
										<div className="form-group col-md-4">
											<label>From - To</label>
											<RangePicker onChange={e => this.dateChange(e)} />
										</div>
										<div className="form-group col-md-2 mt-4">
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

									<div className="row">
										<h6>Last Vitals</h6>
										<div className="col-sm-12">
											<table
												id="dataTable1"
												width="100%"
												className="table table-striped table-lightfont dataTable"
												role="grid"
												aria-describedby="dataTable1_info"
												style={{ width: '100%' }}
											>
												<thead style={{ borderCollapse: 'collapse' }}>
													<tr>
														<th rowSpan="1" colSpan="1">
															Date
														</th>
														<th rowSpan="1" colSpan="1">
															Temperature
														</th>
														<th rowSpan="1" colSpan="1">
															Blood Pressure
														</th>
														<th rowSpan="1" colSpan="1">
															Respiration Pulse
														</th>
														<th rowSpan="1" colSpan="1">
															Weight
														</th>
													</tr>
												</thead>

												<tbody>
													{vitals?.map((note, i) => {
														return (
															<tr key={i} role="row" className="odd">
																<td className="sorting_1">
																	{moment(note.note_date).format('DD-MM-YYYY')}
																</td>
																<td>{note.note}</td>
																<td>{note.notedBy}</td>
															</tr>
														);
													})}

													{vitals && vitals.length === 0 && (
														<tr className="text-center">
															<td colSpan="7">No Vitals Within this period</td>
														</tr>
													)}
												</tbody>
											</table>
										</div>
									</div>

									<div className="row">
										<h6>Diagnoses</h6>
										<div className="col-sm-12">
											<table
												id="dataTable1"
												width="100%"
												className="table table-striped table-lightfont dataTable"
												role="grid"
												aria-describedby="dataTable1_info"
												style={{ width: '100%' }}
											>
												<thead style={{ borderCollapse: 'collapse' }}>
													<tr>
														<th rowSpan="1" colSpan="1">
															Date
														</th>
														<th rowSpan="1" colSpan="1">
															Diagnosis
														</th>
														<th rowSpan="1" colSpan="1">
															Type
														</th>
														<th rowSpan="1" colSpan="1">
															By
														</th>
													</tr>
												</thead>

												<tbody>
													{diagnoses?.map((note, i) => {
														return (
															<tr key={i} role="row" className="odd">
																<td className="sorting_1">
																	{moment(note.note_date).format('DD-MM-YYYY')}
																</td>
																<td>{note.note}</td>
																<td>{note.notedBy}</td>
															</tr>
														);
													})}

													{diagnoses && diagnoses.length === 0 && (
														<tr className="text-center">
															<td colSpan="7">
																No Visit Diagnoses Within this period
															</td>
														</tr>
													)}
												</tbody>
											</table>
										</div>
									</div>

									<div className="row">
										<h6>Other Notes</h6>
										<div className="col-sm-12">
											<table
												id="dataTable1"
												width="100%"
												className="table table-striped table-lightfont dataTable"
												role="grid"
												aria-describedby="dataTable1_info"
												style={{ width: '100%' }}
											>
												<thead style={{ borderCollapse: 'collapse' }}>
													<tr>
														<th rowSpan="1" colSpan="1">
															Date
														</th>
														<th rowSpan="1" colSpan="1">
															Notes
														</th>
														<th rowSpan="1" colSpan="1">
															Noted By
														</th>
													</tr>
												</thead>

												<tbody>
													{notes?.map((note, i) => {
														return (
															<tr key={i} role="row" className="odd">
																<td className="sorting_1">
																	{moment(note.note_date).format('DD-MM-YYYY')}
																</td>
																<td>{note.note}</td>
																<td>{note.notedBy}</td>
															</tr>
														);
													})}

													{notes && notes.length === 0 && (
														<tr className="text-center">
															<td colSpan="7">
																No Other Notes Within this period
															</td>
														</tr>
													)}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		roles: state.role.roles,
	};
};

export default connect(mapStateToProps, {
	startBlock,
	stopBlock,
})(VisitSummaryTable);
