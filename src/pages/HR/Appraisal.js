import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppraisalItem from '../../components/AppraisalItem';
import { request } from '../../services/utilities';
import { API_URI, appraisalAPI } from '../../services/constants';
import { loadAppraisals } from '../../actions/hr';
import Popover from 'antd/lib/popover';
import waiting from '../../assets/images/waiting.gif';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import { notifySuccess, notifyError } from '../../services/notify';
import { loadPerformancePeriod, addPerformancePeriod } from '../../actions/hr';
const { RangePicker } = DatePicker;

const initialDate = {
	startDate: '',
	endDate: '',
};
const PerformanceIndicatorForm = ({ uploading, doUpload, hide, clear }) => {
	const [period, setPeriod] = useState('');

	const [date, setDate] = useState(initialDate);

	const handleChange = e => {
		setPeriod(e.target.value);
	};

	const dateChange = e => {
		let date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		setDate({
			startDate: date[0],
			endDate: date[1],
		});
	};

	// const clearData = () => {
	// 	setPeriod('');
	// 	setDate({
	// 		startDate: '',
	// 		endDate: '',
	// 	});
	// };
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
						<h4 className="onboarding-title">Create Performance Period</h4>

						<form
							name="performanceForm"
							className="form-block w-100"
							onSubmit={e => doUpload(e, { period, date })}>
							<div className="row my-3">
								<div className="form-group col-12">
									{/* {label ? <textarea>{label}</textarea> : null} */}
									<label>Performance Period</label>
									<input
										type="text"
										className="form-control"
										name="performancePeriod"
										onChange={handleChange}
										required
									/>
								</div>

								<div className="form-group col-12">
									{/* {label ? <textarea>{label}</textarea> : null} */}
									<label>Start Date - End Date</label>

									<RangePicker onChange={e => dateChange(e)} />
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
											'Save'
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
class Appraisal extends Component {
	state = {
		form_visible: false,
		uploading: false,
		performancePeriods: [
			{
				performancePeriod: '1st Quarter 2020 (JAN-MAR)',
				startDate: '2020-03-20',
				endDate: '2020-03-31',
				status: 0,
			},
		],
	};
	componentDidMount() {
		this.fetchApprasails();
	}

	fetchApprasails = async () => {
		try {
			const rs = await request(`${API_URI}${appraisalAPI}`, 'GET', true);
			this.props.loadAppraisals(rs);
		} catch (error) {
			console.log(error);
		}
	};

	onUpload = async (e, data) => {
		e.preventDefault();
		console.log({
			performancePeriod: data.period,
			...data.date,
		});

		let payload = {
			performancePeriod: data.period,
			...data.date,
		};
		this.setState({ uploading: true });
		try {
			//load it into database and add it to the store
			const rs = await request(
				`${API_URI}${appraisalAPI}/save-period`,
				'POST',
				true,
				payload
			);
			console.log(rs);

			//clear
			//close form
			this.setState({ form_visible: false, uploading: false });
			// document.getElementById('performanceForm').reset();
		} catch (e) {
			console.log(e);
			notifyError('Error creating performance period');
			this.setState({ uploading: false });
		}

		//add to the loc
	};

	doClear = () => {};

	performanceIndicatorForm = () => {
		this.setState({ form_visible: true });
	};

	hide = () => {
		this.setState({ form_visible: false });
	};

	render() {
		// const { performancePeriods } = this.props;
		const { form_visible, uploading, performancePeriods } = this.state;
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<div className="element-actions">
									<div
										hidden={!form_visible}
										className="element-actions"
										style={{ position: 'absolute', right: '40px' }}>
										<PerformanceIndicatorForm
											uploading={uploading}
											doUpload={this.onUpload}
											hide={this.hide}
											onBackClick={this.onBackClick}
										/>
									</div>

									<button
										className="btn btn-primary btn-sm text-white"
										onClick={this.performanceIndicatorForm}>
										<i className="os-icon os-icon-ui-22" />
										<span>Create Appraisal</span>
									</button>
								</div>
								<h6 className="element-header">Appraisals</h6>
								<div className="element-box">
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th>S/N</th>
													<th>Performance Period</th>
													<th>Start Date</th>
													<th>End Date</th>
													<th className="text-center">Status</th>
													<th className="text-center">Actions</th>
												</tr>
											</thead>
											<tbody>
												{performancePeriods &&
													performancePeriods.map((el, i) => {
														return (
															<AppraisalItem
																item={el}
																key={i + 1}
																index={i + 1}
															/>
														);
													})}
											</tbody>
										</table>
									</div>
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
		performancePeriods: state.hr.performancePeriods,
	};
};

export default connect(mapStateToProps, {
	loadPerformancePeriod,
	addPerformancePeriod,
})(Appraisal);
