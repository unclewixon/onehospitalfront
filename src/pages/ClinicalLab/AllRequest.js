/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_URI, socket, patientAPI } from '../../services/constants';
import Tooltip from 'antd/lib/tooltip';
import waiting from '../../assets/images/waiting.gif';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import { request, formatNumber, confirmAction } from '../../services/utilities';
import ClinicalLabItem from '../../components/ClinicalLabItem';
import { notifySuccess, notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import { loadClinicalLab } from '../../actions/patient';
import _ from 'lodash';
const { RangePicker } = DatePicker;
// const departments = [
//     { id: 'ejejekek', name: 'angel' },
//     { id: 'sislkas', name: 'kafta' },
// ];

const status = [
	{ value: 0, label: 'processing' },
	{ value: 1, label: 'done' },
];
class AllRequest extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		startDate: '',
		endDate: '',
		status: '',
	};

	componentDidMount() {
		this.fetchClinicalLab();
	}
	fetchClinicalLab = async () => {
		const { startDate, endDate, status } = this.state;
		console.log(startDate, endDate, status);
		try {
			this.setState({ loading: true });
			console.log(
				`${API_URI}${patientAPI}/requests/lab?startDate=${startDate}&endDate=${endDate}&status=${status}`
			);
			const rs = await request(
				`${API_URI}${patientAPI}/requests/lab?startDate=${startDate}&endDate=${endDate}&status=${status}`,
				'GET',
				true
			);

			this.props.loadClinicalLab(rs);
			this.setState({ loading: false, filtering: false });
		} catch (error) {
			console.log(error);
			notifyError('Error fetching all lab request');
			this.setState({ loading: false, filtering: false });
		}
	};

	doFilter = e => {
		e.preventDefault();
		this.setState({ filtering: true });

		this.fetchClinicalLab();
	};

	change = e => {
		this.setState({ [e.target.name]: e.target.value });
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

	onDeleteTransaction = data => {
		this.props
			.deleteTransaction(data)
			.then(response => {
				notifySuccess('Transaction deleted');
			})
			.catch(error => {
				notifyError('Error deleting  transaction ');
			});
	};
	confirmDelete = data => {
		confirmAction(this.onDeleteTransaction, data);
	};

	render() {
		const { filtering, loading } = this.state;
		const { location, clinicalLab } = this.props;
		console.log(
			clinicalLab.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
		);

		const page = location.pathname.split('/').pop();
		return (
			<>
				<div className="col-sm-12">
					<div className="element-wrapper">
						<div className="element-actions">
							<Link
								className={`btn btn-primary ${
									page === '/' ? 'btn-outline-primary' : ''
								}`}
								to="/lab">
								Dashboard
							</Link>
							<Link
								className={`btn btn-primary ${
									page === '/all-request' ? 'btn-outline-primary' : ''
								}`}
								to="/lab/all-request">
								All Request
							</Link>
							<Link
								className={`btn btn-primary ${
									page === '/lab-request' ? 'btn-outline-primary' : ''
								}`}
								to="/lab/lab-request">
								New Lab Request
							</Link>
						</div>
						<h6 className="element-header">All Lab Requests</h6>
						<div className="row">
							<div className="col-md-12">
								<h6 className="element-header">Filter by:</h6>

								<form className="row">
									<div className="form-group col-md-6">
										<label>From - To</label>
										<RangePicker onChange={e => this.dateChange(e)} />
									</div>
									<div className="form-group col-md-3">
										<label className="mr-2 " htmlFor="id">
											Status
										</label>
										<select
											style={{ height: '32px' }}
											id="status"
											className="form-control"
											name="status"
											onChange={e => this.change(e)}>
											<option value="">Choose status</option>
											{status.map((status, i) => {
												return (
													<option key={i} value={status.value}>
														{status.label}
													</option>
												);
											})}
										</select>
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
															Patiend ID
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
															Request By
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
												{loading ? (
													<tr>
														<td colSpan="4" className="text-center">
															<img alt="searching" src={searchingGIF} />
														</td>
													</tr>
												) : null}
												{clinicalLab &&
													clinicalLab.reverse().map(lab => {
														return <ClinicalLabItem key={lab.id} lab={lab} />;
													})}
											</tbody>
										</table>
										{!_.isEmpty(clinicalLab) ? null : (
											<div className="text-center">No clinical Lab request</div>
										)}
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

const mapStateToProps = state => {
	return {
		clinicalLab: state.patient.clinicalLab,
	};
};

export default connect(mapStateToProps, { loadClinicalLab })(AllRequest);