/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import Pagination from 'antd/lib/pagination';

import waiting from '../../assets/images/waiting.gif';
import { request, itemRender } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import LabBlock from '../../components/LabBlock';

const { RangePicker } = DatePicker;

const status = [{ label: 'All' }, { label: 'Filled' }, { label: 'Completed' }];

class AllRequest extends Component {
	state = {
		filtering: false,
		loading: false,
		startDate: '',
		endDate: '',
		status: '',
		labs: [],
		meta: null,
	};

	componentDidMount() {
		this.fetchLabs();
	}

	fetchLabs = async page => {
		try {
			const { startDate, endDate, status } = this.state;
			this.setState({ loading: true });
			const p = page || 1;
			const url = `requests/list/labs?page=${p}&limit=10&startDate=${startDate}&endDate=${endDate}&status=${status}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			this.setState({ labs: result, loading: false, filtering: false, meta });
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (error) {
			console.log(error);
			notifyError('Error fetching all lab request');
		}
	};

	doFilter = e => {
		if (e) e.preventDefault();
		this.setState({ filtering: true });
		this.fetchLabs();
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

	updateLab = labs => {
		this.setState({ labs });
	};

	onNavigatePage = nextPage => {
		this.fetchLabs(nextPage);
	};

	render() {
		const { filtering, loading, labs, meta } = this.state;
		return (
			<>
				<div className="element-box m-0 mb-4 p-3">
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
						<LabBlock
							loading={loading}
							labs={labs}
							updateLab={this.updateLab}
						/>
					</div>
					{meta && (
						<div className="pagination pagination-center mt-4">
							<Pagination
								current={parseInt(meta.currentPage, 10)}
								pageSize={parseInt(meta.itemsPerPage, 10)}
								total={parseInt(meta.totalPages, 10)}
								showTotal={total => `Total ${total} lab results`}
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
