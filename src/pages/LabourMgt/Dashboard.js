/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import isEmpty from 'lodash.isempty';

import waiting from '../../assets/images/waiting.gif';
import { labourAPI } from '../../services/constants';
import { request, getAge } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { loadLabour, loadLabourDetails } from '../../actions/patient';
import searchingGIF from '../../assets/images/searching.gif';
import { clearLabourDetails } from '../../actions/patient';

const { RangePicker } = DatePicker;

// const departments = [
// 	{ id: 'ejejekek', name: 'angel' },
// 	{ id: 'sislkas', name: 'kafta' },
// ];

class Dashboard extends Component {
	state = {
		filtering: false,
		id: null,
		startDate: '',
		endDate: '',
		loading: false,
		page: '',
	};

	componentDidMount() {
		this.props.clearLabourDetails();
		this.fetchAllEnrolment();
	}

	fetchAllEnrolment = async () => {
		// let startDate = moment()
		// 	.subtract(1, 'd')
		// 	.format('YYYY-MM-DD');
		// let endDate = moment().format('YYYY-MM-DD');
		const { startDate, endDate, page } = this.state;
		try {
			this.setState({ loading: true });
			// console.log(
			// 	`${labourAPI}s/?startDate=${startDate}&endDate=${endDate}&page=${page}`
			// );
			const rs = await request(
				`${labourAPI}s/?startDate=${startDate}&endDate=${endDate}&page=${page}`,
				'GET',
				true
			);
			this.props.loadLabour(rs);
			console.log(rs);
			this.setState({ loading: false, filtering: false });
		} catch (error) {
			console.log(error);
			notifyError('Error fetching labour management enrolment requests');
			this.setState({ loading: false, filtering: false });
		}
	};

	doFilter = e => {
		e.preventDefault();
		this.setState({ filtering: true });
		this.fetchAllEnrolment();
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

	change = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	detail = item => {
		//load data into store
		this.props.loadLabourDetails(item);
		this.props.history.push(`/labour-mgt/detail/${item.id}`);
	};
	render() {
		const { filtering, loading } = this.state;
		const { enrolments } = this.props;
		const reverse = [...enrolments].reverse();
		return (
			<div className="row">
				{/* <div className="col-md-12">
					<div className="element-content">
						<div className="row">
							<div className="col-sm-3 col-xxxl-3">
								<a className="element-box el-tablo">
									<div className="label">TOTAL OPEN</div>
									<div className="value text-center">57</div>
								</a>
							</div>
							<div className="col-sm-3 col-xxxl-3">
								<a className="element-box el-tablo">
									<div className="label">TOTAl FILLED</div>
									<div className="value text-center">457</div>
								</a>
							</div>
							<div className="col-sm-3 col-xxxl-3">
								<a className="element-box el-tablo">
									<div className="label">LOW STOCK</div>
									<div className="value text-center">125</div>
								</a>
							</div>
							<div className="col-sm-3 col-xxxl-3">
								<a className="element-box el-tablo">
									<div className="label">BUDGET</div>
									<div className="value text-center">125</div>
								</a>
							</div>
						</div>
					</div>
				</div> */}
				{/* <div className="col-md-12">
					<h6 className="element-header">Enrolled</h6>
					<div className="row my-4">
						<form action="" className="form-inline pl-3">
							<div className="form-group">
								<label className="mr-2">Filter by: </label>
							</div>
							<div className="form-group mr-2">
								<label className="mr-2 " htmlFor="id">
									ID
								</label>
								<select
									style={{ height: '32px' }}
									id="department"
									className="form-control"
									name="id"
									onChange={e => this.change(e)}>
									{departments.map((dept, i) => {
										return (
											<option key={i} value={dept.id}>
												{dept.name}
											</option>
										);
									})}
								</select>
							</div>
							<div className="form-group mr-2">
								<RangePicker onChange={e => this.dateChange(e)} />
							</div>
							<div className="form-group mr-2">
								<a
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
								</a>
							</div>
						</form>
					</div>
				</div> */}

				<div className="col-sm-12">
					<div className="element-box">
						<div className="table-responsive">
							<table className="table table-striped">
								<thead>
									<tr>
										<th>Folder Id</th>
										<th>Name</th>
										<th>Age</th>
										<th>Date Enrolled</th>
										<th className="text-right">Actions</th>
									</tr>
								</thead>
								<tbody>
									{loading ? (
										<tr>
											<td colSpan="8" className="text-center">
												<img alt="searching" src={searchingGIF} />
											</td>
										</tr>
									) : !isEmpty(reverse) ? (
										reverse.map((el, i) => {
											return (
												<tr key={i + 1}>
													<td>{el.fileNumber}</td>

													<td>{el.patient_name}</td>

													<td>{getAge(el.date_of_birth)}</td>
													<td>{moment(el.createdAt).format('DD-MM-YYYY')}</td>
													<td className="text-right row-actions">
														<Tooltip title="view detail">
															<a
																onClick={() => this.detail(el)}
																className="secondary">
																<i className="os-icon os-icon-folder-plus" />
															</a>
														</Tooltip>
													</td>
												</tr>
											);
										})
									) : (
										<tr>
											<td colSpan="5" className="text-center">
												No Labour Enrolment
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		enrolments: state.patient.enrolments,
	};
};

export default connect(mapStateToProps, {
	loadLabour,
	loadLabourDetails,
	clearLabourDetails,
})(Dashboard);
