/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import Pagination from 'antd/lib/pagination';

import waiting from '../../assets/images/waiting.gif';
import { notifyError } from '../../services/notify';
import { request, updateImmutable, itemRender } from '../../services/utilities';
import PrescriptionBlock from '../../components/PrescriptionBlock';

const { RangePicker } = DatePicker;

class PrescriptionRequests extends Component {
	state = {
		filtering: false,
		loading: false,
		startDate: '',
		endDate: '',
		status: '',
		prescriptions: [],
		meta: null,
		patient_id: '',
	};

	componentDidMount() {
		const { startDate, endDate } = this.state;
		this.loadPrescriptions(startDate, endDate);
	}

	loadPrescriptions = async (start, end, p) => {
		try {
			const { status, patient_id } = this.state;
			const page = p || 1;
			this.setState({ loading: true });
			const url = `requests/prescriptions?startDate=${start}&endDate=${end}&limit=10&page=${page}&status=${status}&patient_id=${patient_id}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			this.setState({
				loading: false,
				prescriptions: result,
				meta,
				filtering: false,
			});
		} catch (e) {
			this.setState({ loading: false });
			notifyError('could not fetch prescription requests');
		}
	};

	updatePrescriptions = update => {
		const { prescriptions } = this.state;
		const updatedDrugs = updateImmutable(prescriptions, update);
		this.setState({ prescriptions: updatedDrugs });
	};

	removePrescription = item => {
		const { prescriptions } = this.state;
		const updatedDrugs = prescriptions.filter(p => p.id !== item);
		this.setState({ prescriptions: updatedDrugs });
	};

	filterEntries = () => {
		const { startDate, endDate } = this.state;
		this.setState({ filtering: true });
		this.loadPrescriptions(startDate, endDate);
	};

	onNavigatePage = nextPage => {
		const { startDate, endDate } = this.state;
		this.loadPrescriptions(startDate, endDate, nextPage);
	};

	render() {
		const { filtering, prescriptions, meta, loading } = this.state;

		const customStyle = {
			minHeight: '24px !important',
			height: '2rem',
		};

		return (
			<>
				<div className="element-box m-0 mb-4 p-3">
					<form className="row">
						<div className="form-group col-md-3">
							<label className="mr-2 " htmlFor="id">
								Search
							</label>
							<input
								style={{ height: '32px' }}
								id="search"
								className="form-control"
								type="number"
								name="search"
								onChange={e => this.setState({ patient_id: e.target.value })}
								placeholder="search for patient: emr id"
							/>
						</div>
						<div className="form-group col-md-3">
							<label>From - To</label>
							<RangePicker
								onChange={e => {
									if (e.length > 0) {
										const date = e.map(date => {
											return moment(date._d).format('YYYY-MM-DD');
										});
										this.setState({ startDate: date[0], endDate: date[1] });
									} else {
										this.setState({ startDate: '', endDate: '' });
									}
								}}
							/>
						</div>
						<div className="form-group col-md-3">
							<label className="mr-2 " htmlFor="patient">
								Request
							</label>
							<select
								className="form-control"
								onChange={e => this.setState({ status: e.target.value })}
								style={{ ...customStyle }}
							>
								<option value="">All</option>
								<option value="Open">Open</option>
								<option value="Filled">Filled</option>
								<option value="Completed">Completed</option>
							</select>
						</div>
						<div className="form-group col-md-3 mt-4">
							<a
								className="btn btn-sm btn-primary btn-upper text-white"
								onClick={() => this.filterEntries()}
							>
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
				<div className="element-box m-0 mb-4 p-3">
					<div className="table table-responsive">
						<PrescriptionBlock
							loading={loading}
							prescriptions={prescriptions}
							updatePrescriptions={this.updatePrescriptions}
							removePrescription={this.removePrescription}
						/>
					</div>
					{meta && !filtering && (
						<div className="pagination pagination-center mt-4">
							<Pagination
								current={parseInt(meta.currentPage, 10)}
								pageSize={parseInt(meta.itemsPerPage, 10)}
								total={parseInt(meta.totalPages, 10)}
								showTotal={total => `Total ${total} prescriptions`}
								itemRender={itemRender}
								onChange={current => this.onNavigatePage(current)}
								showSizeChanger={false}
							/>
						</div>
					)}
				</div>
			</>
		);
	}
}

export default PrescriptionRequests;
