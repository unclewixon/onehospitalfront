/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popover from 'antd/lib/popover';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { request, upload, parseRoster } from '../../services/utilities';
import { API_URI, rosterAPI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { notifyError } from '../../services/notify';
import { notifySuccess } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import DownloadRoster from '../../components/Roster/DownloadRoster';
import UploadRoster from '../../components/Roster/UploadRoster';

class Roster extends Component {
	state = {
		upload_visible: false,
		download_visible: false,
		downloading: false,
		department_id: '',
		period: null,
		filtering: false,
		rosters: [],
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
		try {
			e.preventDefault();
			if (!period) {
				notifyError('select period');
				return false;
			}
			if (department === '') {
				notifyError('select department');
				return false;
			}

			this.props.startBlock();
			this.setState({ downloading: true });
			const data = {
				department_id: department,
				period: moment(period).format('YYYY-MM'),
			};
			const qs = Object.keys(data)
				.map(k => k + '=' + data[k])
				.join('&');
			const uri = `${rosterAPI}/download-roster?${qs}`;
			const rs = await request(uri, 'GET', true);
			this.setState({ downloading: false });
			this.props.stopBlock();
			if (rs.success) {
				setTimeout(() => {
					this.hide();
					window.open(rs.url, '_blank').focus();
				}, 200);
			} else {
				notifyError(rs.message || 'could not download template');
			}
		} catch (error) {
			this.props.stopBlock();
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
			this.props.startBlock();
			const uri = `${rosterAPI}/rosters?period=${period}&department_id=${department_id}`;
			const rs = await request(uri, 'GET', true);
			const rosters = parseRoster(rs);
			this.setState({ filtering: false, rosters });
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
			this.setState({ filtering: false, rosters: [] });
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
			try {
				const periodTime = moment(period).format('YYYY-MM');

				let formData = new FormData();
				formData.append('file', file);
				formData.append('period', periodTime);
				formData.append('department_id', department_id);

				this.props.startBlock();

				const uri = `${API_URI}/${rosterAPI}/upload-roster`;
				await upload(uri, 'POST', formData);

				await this.fetchRoster(periodTime, department_id);
				this.setState({
					period: periodTime,
					department_id,
					upload_visible: false,
				});

				this.props.stopBlock();

				const dept = departments.find(d => d.id === department_id);
				notifySuccess(
					`roster uploaded for ${dept ? dept.name : ''} department`
				);
			} catch (error) {
				console.log(error);
				this.props.stopBlock();
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
		const { departments } = this.props;
		const { rosters } = this.state;
		const {
			upload_visible,
			download_visible,
			downloading,
			uploading,
			filtering,
			department_id,
		} = this.state;
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
										onVisibleChange={this.onDownloadVisibleChange}>
										<a className="btn btn-success btn-sm text-white">
											<i className="os-icon os-icon-download" />
											<span>Download Template</span>
										</a>
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
										onVisibleChange={this.handleUploadVisibleChange}>
										<a className="btn btn-sm btn-link btn-upper mr-4 d-lg-inline-block">
											<i className="os-icon os-icon-upload" />
											<span>Upload Roster</span>
										</a>
									</Popover>
								</div>
								{/* <h6 className="element-header"></h6> */}
								<div className="control-header">
									<div className="row align-items-center">
										<div className="col-8">
											<form action="" className="form-inline">
												<div className="form-group">
													<label className="mr-2">Filter by: </label>
												</div>
												<div className="form-group mr-4">
													<label className="mr-2">Department</label>
													<select
														id="department"
														className="form-control-sm"
														onChange={this.onChange}
														value={department_id}>
														{departments.map((dept, i) => {
															return (
																<option key={i} value={dept.id}>
																	{dept.name}
																</option>
															);
														})}
													</select>
												</div>
												<div className="form-group mr-4">
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
										<div className="col-4 text-right" />
									</div>
								</div>
								<div className="element-box m-0 p-3">
									<FullCalendar
										plugins={[dayGridPlugin, interactionPlugin]}
										events={rosters}
										dateClick={this.handleDateClick}
										eventClick={info => console.log(info)}
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
		departments: state.department,
	};
};

export default connect(mapStateToProps, { startBlock, stopBlock })(Roster);
