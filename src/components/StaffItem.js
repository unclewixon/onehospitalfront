/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useState } from 'react';
import Tooltip from 'antd/lib/tooltip';
import { Image } from 'react-bootstrap';
import capitalize from 'lodash.capitalize';

import { request, updateImmutable } from '../services/utilities';
import waiting from '../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../services/notify';
import { staffname, parseAvatar } from '../services/utilities';
import ModalCreateStaff from './Modals/ModalCreateStaff';

const UploadPerformanceData = ({ uploading, doUpload, hide }) => {
	const [files, setFiles] = useState(null);
	const [label, setLabel] = useState('');

	const handleChange = e => {
		setFiles(e.target.files[0]);
		setLabel(e.target.files[0].name);
	};

	return (
		<div
			className="onboarding-modal fade animated show"
			role="dialog"
			style={{ width: '400px' }}>
			<div className="modal-centered">
				<div className="modal-content text-center">
					<button onClick={hide} className="close" type="button">
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Upload Performance Indicators</h4>

						<form
							className="form-block w-100"
							onSubmit={e => doUpload(e, files)}>
							<div className="row my-3">
								<div className="custom-file col-12">
									{/* {label ? <textarea>{label}</textarea> : null} */}
									<input
										type="file"
										className="custom-file-input"
										name="file"
										accept=".csv"
										onChange={handleChange}
									/>
									<label className="custom-file-label">
										{label.substring(0, 40) || 'Choose File(s)'}
									</label>
								</div>
							</div>

							<div className="row">
								<div className="col-sm-12 text-right pr-0">
									<button
										className="btn btn-primary"
										disabled={uploading}
										type="submit">
										{uploading ? (
											<img src={waiting} alt="submitting" />
										) : (
											'upload'
										)}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

class StaffItem extends Component {
	state = {
		collapsed: true,
		staff: null,
		form_visible: false,
		uploading: false,
		showModal: false,
	};

	toggle = () => {
		this.setState({ collapsed: !this.state.collapsed });
	};

	doEditStaff = staff => {
		this.setState({ staff, showModal: true });
		document.body.classList.add('modal-open');
	};

	closeModal = () => {
		this.setState({ staff: null, showModal: false });
		document.body.classList.remove('modal-open');
	};

	doEnable = async (e, data) => {
		e.preventDefault();
		try {
			const { staffs } = this.props;
			const url = `hr/staffs/enable/?id=${data.id}`;
			await request(url, 'PATCH', true);
			data.isActive = true;
			const upd = updateImmutable(staffs, data);
			this.props.updateStaffs(upd);
			notifySuccess('Staff Enabled');
		} catch (error) {
			console.log(error);
			notifyError('Error Enabling Staff');
		}
	};

	doDisable = async (e, data) => {
		e.preventDefault();
		try {
			const { staffs } = this.props;
			const url = `hr/staffs/${data.id}`;
			await request(url, 'DELETE', true);
			data.isActive = false;
			const upd = updateImmutable(staffs, data);
			this.props.updateStaffs(upd);
			notifySuccess('Staff Disabled');
		} catch (error) {
			console.log(error);
			notifyError('Error Disabling Staff');
		}
	};

	// togglePopover = req => {
	// 	this.setState({ staff: req, form_visible: true });
	// };

	hide = () => {
		this.setState({ form_visible: false });
	};

	// upload = req => {
	// 	console.log(req);
	// 	const info = { patient: req.patient, type: 'patient' };
	// 	this.props.toggleProfile(true, info);
	// 	this.props.uploadRadiology(true);
	// };

	onUpload = async (e, files) => {
		e.preventDefault();
		console.log(files);
		if (!files) {
			notifyError('You did not select any image file');
			return;
		}
		this.setState({ uploading: true });

		if (files) {
			try {
				let formData = new FormData();
				formData.append('file', files);
				formData.append('document_type', 'Performance Indicators');
				// const rs = await upload(
				// 	`${API_URI}/${patientAPI}/${patient.id}/upload-request-document`,
				// 	'POST',
				// 	formData
				// );
				console.log(this.state.staff);
				notifySuccess(`Performance indicator Uploaded`);
				this.setState({ uploading: false, form_visible: false });
				// console.log(rs);
			} catch (error) {
				console.log(error);
				this.setState({ uploading: false, form_visible: false });
				// throw new SubmissionError({
				// 	_error: e.message || 'could not upload data',
				// });

				notifyError(e.message || 'could not upload data');
			}
		}
	};

	render() {
		const { staffs } = this.props;
		const { collapsed, form_visible, uploading, showModal, staff } = this.state;
		return (
			<>
				{staffs.map((item, i) => {
					return (
						<>
							<tr>
								<td onClick={this.toggle} className="user-avatar-w">
									<div className="user-avatar">
										<Image
											alt=""
											src={parseAvatar(item?.profile_pic)}
											width={50}
										/>
									</div>
								</td>
								<td onClick={this.toggle}>{`${capitalize(staffname(item))} (${
									item.user.username
								})`}</td>
								<td onClick={this.toggle}>{item?.user?.role?.name}</td>
								<td onClick={this.toggle}>{item?.phone_number}</td>
								<td onClick={this.toggle}>
									{item.department ? item.department?.name : ''}
								</td>
								<td className="text-center">
									{item.isActive ? (
										<Tooltip title="Enabled">
											<div className="status-pill green" />
										</Tooltip>
									) : (
										<Tooltip title="Disabled">
											<div className="status-pill red" />
										</Tooltip>
									)}
								</td>
								<td className="row-actions">
									{/* <a onClick={this.doEditStaff} className="secondary" title="Edit Staff">
										<i className="os-icon os-icon-edit-32" />
									</a> */}
									<div
										hidden={!form_visible}
										className="element-actions"
										style={{ position: 'absolute', right: '40px' }}>
										<UploadPerformanceData
											uploading={uploading}
											doUpload={this.onUpload}
											hide={this.hide}
											onBackClick={this.onBackClick}
										/>
									</div>
									<Tooltip title="Edit Staff">
										<a
											onClick={() => {
												this.doEditStaff(item);
											}}>
											<i className="os-icon os-icon-edit-1" />
										</a>
									</Tooltip>
									{/* <Tooltip title="Upload Appraisal">
										<a
											onClick={() => {
												this.togglePopover(item);
											}}>
											<i className="os-icon os-icon-upload-cloud" />
										</a>
									</Tooltip> */}

									{item.isActive ? (
										<Tooltip title="Disable Staff">
											<a
												onClick={e => this.doDisable(e, item)}
												className="danger"
												title="Disable Staff">
												<i className="os-icon os-icon-x-circle" />
											</a>
										</Tooltip>
									) : (
										<Tooltip title="Enable Staff">
											<a
												onClick={e => this.doEnable(e, item)}
												className="success"
												title="Enable Staff">
												<i className="os-icon os-icon-check-circle" />
											</a>
										</Tooltip>
									)}
								</td>
							</tr>
							{!collapsed && (
								<tr className="expanded-row">
									<td />
									<td colSpan="8">
										<div className="table-responsive">
											<table className="table table-striped table-sm">
												<tbody>
													<tr>
														<th>Gender</th>
														<td>{item.gender}</td>
													</tr>
													<tr>
														<th>Email</th>
														<td>{item.email}</td>
													</tr>
													<tr>
														<th>Consultant</th>
														<td>{item.is_consultant ? 'YES' : 'NO'}</td>
													</tr>
												</tbody>
											</table>
										</div>
									</td>
								</tr>
							)}
						</>
					);
				})}
				{showModal && (
					<ModalCreateStaff
						staff={staff}
						staffs={staffs}
						updateStaffs={this.props.updateStaffs}
						closeModal={() => this.closeModal()}
					/>
				)}
			</>
		);
	}
}

export default StaffItem;
