/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import Popover from 'antd/lib/popover';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { request, upload, parseRoster } from '../../services/utilities';
import { API_URI, rosterAPI } from '../../services/constants';
import { loadRoster } from '../../actions/hr';
import waiting from '../../assets/images/waiting.gif';
import { notifyError } from '../../services/notify';
import { notifySuccess } from '../../services/notify';

const DownloadRoster = ({ onHide, downloading, doDownload, departments }) => {
	const [department, setDepartment] = useState('');
	const [period, setPeriod] = useState(null);

	return (
		<div className="onboarding-modal fade animated show" role="dialog" style={{ width: '300px' }}>
			<div className="modal-centered" role="document">
				<div className="modal-content text-center">
					<button aria-label="Close" className="close" type="button" onClick={() => onHide()}>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<div className="form-block">
							<form onSubmit={(e) => doDownload(e, period, department)}>
								<div className="row">
									<div className="col-sm-12">
										<div className="form-group">
											<label htmlFor="">Period</label>
											<div className="custom-date-input">
												<DatePicker
													selected={period}
													onChange={date => setPeriod(date)}
													peekNextMonth
													dateFormat="MMM-yyyy"
													className="single-daterange form-control"
													placeholderText="Select period"
												/>
											</div>
										</div>
									</div>
									<div className="col-sm-12">
										<div className="form-group">
											<label htmlFor="department">Department</label>
											<select id="department" className="form-control" onChange={e => setDepartment(e.target.value)}>
												<option>Select Department</option>
												{departments.map(((dept,i) => {
													return <option key={i} value={dept.id}>{dept.name}</option>
												}))}
											</select>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12 text-right">
										<button className="btn btn-primary" disabled={downloading} type="submit">{downloading ? <img src={waiting} alt="submitting"/> : 'download'}</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const UploadRoster = ({ onHide, uploading, doUpload, departments }) => {
	const [department, setDepartment] = useState('');
	const [period, setPeriod] = useState(null);
	const [files, setFile] = useState(null);
	let uploadAttachment;

	return (
		<div className="onboarding-modal fade animated show" role="dialog" style={{ width: '300px' }}>
			<div className="modal-centered" role="document">
				<div className="modal-content text-center">
					<button aria-label="Close" className="close" type="button" onClick={() => onHide()}>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<div className="form-block">
							<form onSubmit={(e) => doUpload(e, files, period, department)}>
								<div className="row">
									<div className="col-sm-12">
										<div className="form-group">
											<label htmlFor="">Period</label>
											<div className="custom-date-input">
												<DatePicker
													selected={period}
													onChange={date => setPeriod(date)}
													peekNextMonth
													dateFormat="MMM-yyyy"
													className="single-daterange form-control"
													placeholderText="Select period"
												/>
											</div>
										</div>
									</div>
									<div className="col-sm-12">
										<div className="form-group">
											<label htmlFor="department">Department</label>
											<select id="department" className="form-control" onChange={e => setDepartment(e.target.value)}>
												<option>Select Department</option>
												{departments.map(((dept,i) => {
													return <option key={i} value={dept.id}>{dept.name}</option>
												}))}
											</select>
										</div>
									</div>
									<div className="col-sm-12">
										<div className="form-group">
											<input className="d-none" onClick={(e) => { e.target.value = null; }} type="file" ref={(el) => { uploadAttachment = el; }} onChange={(e) => setFile(e.target.files)} />
											<label htmlFor="department">File</label>
											<a className="btn btn-outline-secondary ml-4" onClick={() => { uploadAttachment.click() }}>
												<i className="os-icon os-icon-ui-51"/>
												<span>Select File</span>
											</a>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12 text-right">
										<button className="btn btn-primary" disabled={uploading} type="submit">{uploading ? <img src={waiting} alt="submitting"/> : 'upload'}</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

class Roster extends Component {
	state = {
		upload_visible: false,
		download_visible: false,
		downloading: false,
		uplaading: false,
		department_id: '',
		period: null,
		filtering: false,
	};

	componentDidMount() {
		const { departments } = this.props;
		const period = moment().format('YYYY-MM');
		const department = departments.length > 0 ? departments[0] : null;
		if (department) {
			this.setState({ department_id: department.id, period });
			this.fetchRoster(period, department.id);
		}
	}

	hide = () => {
		this.setState({ upload_visible: false, download_visible: false });
	};

	downloadTemplate = async (e, period, department) => {
		e.preventDefault();
		this.setState({ downloading: true });
		try {
			if(!period) {
				this.setState({ downloading: false });
				notifyError('select period');
				return false;
			}
			if(department === '') {
				this.setState({ downloading: false });
				notifyError('select department');
				return false;
			}
			const data = {
				department_id: department,
				period: moment(period).format('YYYY-MM'),
			};
			const qs = Object.keys(data).map(k => k + '=' + data[k]).join('&');
			const url = `${API_URI}${rosterAPI}/download-roaster?${qs}`;
			setTimeout(() => {
				window.open(url, '_blank').focus();
				this.setState({ downloading: false, download_visible: false });
			}, 2000);
		} catch (error) {
			notifyError(error.message || 'could not download template');
			this.setState({ downloading: false });
		}
		return false;
	};

	onDownloadVisibleChange = visible => {
		this.setState({ download_visible: visible });
	};

	handleUploadVisibleChange = visible => {
		this.setState({ upload_visible: visible });
	};
	
	fetchRoster = async (period, department_id) => {
		try {
			const data = { period, department_id };
			const rs = await request(`${API_URI}${rosterAPI}/list-roaster`, 'POST', true, data);
			const rosters = parseRoster(rs);
			this.props.loadRoster(rosters);
			this.setState({ filtering: false });
		} catch (error) {
			console.log(error);
			this.props.loadRoster([]);
			this.setState({ filtering: false });
		}
	};

	doFilter = e => {
		e.preventDefault();
		this.setState({ filtering: true });
		const { period, department_id } = this.state;
		this.fetchRoster(period, department_id);
	};
	
	onUpload = async (e, files, period, department_id) => {
		e.preventDefault();
		const { departments } = this.props;
		const file = files[0];
		if (file) {
			this.setState({ uplaading: true });
			try {
				let formData = new FormData();
				formData.append('file', file);
				formData.append('period', moment(period).format('YYYY-MM'));
				formData.append('department_id', department_id);

				const rs = await upload(`${API_URI}${rosterAPI}/upload-roaster`, 'POST', formData);
				const rosters = parseRoster(rs);
				this.props.loadRoster(rosters);
				const dept = departments.find(d => d.id === department_id);
				notifySuccess(`roster uploaded for ${dept ? dept.name : ''} department`);
				this.setState({ uplaading: false, period, department_id });
				this.fetchRoster(period, department_id);
				this.setState({ upload_visible: false });
			} catch (error) {
				console.log(error);
				this.setState({ uplaading: false });
			}
		}
	};

	onChange = e => {
		this.setState({ department_id: e.target.value });
	};

	handleDateClick = arg => {
		console.log(arg);
	};

	render() {
		const { duty_rosters, departments } = this.props;
		const { upload_visible, download_visible, downloading, uploading, filtering, department_id } = this.state;
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<div className="element-actions">
									<Popover
										content={
											<DownloadRoster 
												onHide={this.hide}
												downloading={downloading}
												doDownload={this.downloadTemplate}
												departments={departments}
											/>
										}
										overlayClassName="download-roster"
										trigger="click"
										visible={download_visible}
										onVisibleChange={this.onDownloadVisibleChange}
									>
										<a className="btn btn-success btn-sm text-white"><i className="os-icon os-icon-download"/><span>Download Template</span></a>
									</Popover>
									<Popover
										content={
											<UploadRoster 
												onHide={this.hide}
												uploading={uploading}
												doUpload={this.onUpload}
												departments={departments}
											/>
										}
										overlayClassName="upload-roster"
										trigger="click"
										visible={upload_visible}
										onVisibleChange={this.handleUploadVisibleChange}
									>
										<a className="btn btn-sm btn-link btn-upper mr-4 d-lg-inline-block">
											<i className="os-icon os-icon-upload"/>
											<span>Upload Roster</span>
										</a>
									</Popover>
								</div>
								<h6 className="element-header">Duty Roster</h6>
								<div className="control-header">
									<div className="row align-items-center">
										<div className="col-8">
											<form action="" className="form-inline">
												<div className="form-group">
													<label className="mr-2" htmlFor="">Filter by: </label>
												</div>
												<div className="form-group mr-4">
													<label className="mr-2" htmlFor="">Department</label>
													<select id="department" className="form-control-sm" onChange={this.onChange} value={department_id}>
														{departments.map(((dept,i) => {
															return <option key={i} value={dept.id}>{dept.name}</option>
														}))}
													</select>
												</div>
												<div className="form-group mr-4">
													<a className="btn btn-sm btn-primary btn-upper text-white" onClick={this.doFilter}>
														<i className="os-icon os-icon-ui-37"/>
														<span>{filtering ? <img src={waiting} alt="submitting"/> : 'Filter'}</span>
													</a>
												</div>
											</form>
										</div>
										<div className="col-4 text-right"/>
									</div>
								</div>
								<div className="element-box">
									<FullCalendar
										header={{
											left: 'title',
											center: '',
											right: ''
										}}
										defaultView="dayGridMonth" 
										plugins={[ dayGridPlugin, interactionPlugin ]} 
										events={duty_rosters}
										dateClick={this.handleDateClick}
										eventClick={(info) => console.log(info)}
										showNonCurrentDates={false}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		duty_rosters: state.hr.duty_rosters,
		departments: state.setting.departments,
	}
};

export default connect(mapStateToProps, { loadRoster })(Roster);
