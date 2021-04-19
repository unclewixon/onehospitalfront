import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import Pagination from 'antd/lib/pagination';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import waiting from '../../assets/images/waiting.gif';
import { request, itemRender } from '../../services/utilities';
import { searchAPI } from '../../services/constants';
import { notifyError } from '../../services/notify';
import ProcedureBlock from '../../components/ProcedureBlock';

const { RangePicker } = DatePicker;

const status = [
	{ label: 'All' },
	{ label: 'Open' },
	{ label: 'Started' },
	{ label: 'Scheduled' },
	{ label: 'Closed' },
];

class AllRequest extends Component {
	state = {
		filtering: false,
		loading: false,
		startDate: '',
		endDate: '',
		status: '',
		procedures: [],
		meta: null,
		patient_id: '',
	};

	componentDidMount() {
		this.fetchRequests();
	}

	fetchRequests = async page => {
		try {
			const { startDate, endDate, status, patient_id } = this.state;
			this.setState({ loading: true });
			const p = page || 1;
			const url = `requests/list/procedure?page=${p}&limit=10&startDate=${startDate}&endDate=${endDate}&status=${status}&patient_id=${patient_id}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			this.setState({
				procedures: result,
				loading: false,
				filtering: false,
				meta,
			});
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (error) {
			console.log(error);
			notifyError('Error fetching all procedure request');
		}
	};

	doFilter = e => {
		if (e) e.preventDefault();
		this.setState({ filtering: true });
		this.fetchRequests();
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

	updateProcedure = items => {
		this.setState({ procedures: items });
	};

	onNavigatePage = nextPage => {
		this.fetchRequests(nextPage);
	};

	getPatients = async q => {
		if (!q || q.length < 3) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	render() {
		const { filtering, loading, procedures, meta, patient_id } = this.state;
		return (
			<>
				<div className="element-box m-0 mb-4 p-3">
					<form className="row">
						<div className="form-group col-md-3">
							<label>From - To</label>
							<RangePicker onChange={e => this.dateChange(e)} />
						</div>
						<div className="form-group col-sm-3">
							<label>Patient</label>
							<AsyncSelect
								isClearable
								getOptionValue={option => option.id}
								getOptionLabel={option =>
									`${option.other_names} ${option.surname}`
								}
								defaultOptions
								name="patient"
								ref={this.patient}
								value={patient_id}
								loadOptions={this.getPatients}
								onChange={e => {
									this.setState({ patient_id: e.id || '' });
								}}
								placeholder="Search for patient"
							/>
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
								{status.map((status, i) => {
									return (
										<option key={i} value={status.label}>
											{status.label}
										</option>
									);
								})}
							</select>
						</div>
						<div className="form-group col-md-3 mt-4">
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
				</div>
				<div className="element-box p-3 m-0 mt-3">
					<div className="table table-responsive">
						<ProcedureBlock
							loading={loading}
							procedures={procedures}
							updateProcedure={this.updateProcedure}
						/>
					</div>
					{meta && (
						<div className="pagination pagination-center mt-4">
							<Pagination
								current={parseInt(meta.currentPage, 10)}
								pageSize={parseInt(meta.itemsPerPage, 10)}
								total={parseInt(meta.totalPages, 10)}
								showTotal={total => `Total ${total} procedure requests`}
								itemRender={itemRender}
								onChange={current => this.onNavigatePage(current)}
							/>
						</div>
					)}
				</div>
			</>
		);
	}
}

export default AllRequest;
