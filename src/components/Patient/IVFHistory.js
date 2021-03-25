/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from 'antd/lib/date-picker';
import Pagination from 'antd/lib/pagination';

import waiting from '../../assets/images/waiting.gif';
import { request, itemRender, confirmAction } from '../../services/utilities';
import { setIVF } from '../../actions/patient';
import { startBlock, stopBlock } from '../../actions/redux-block';
import searchingGIF from '../../assets/images/searching.gif';
import { notifyError, notifySuccess } from '../../services/notify';

const { RangePicker } = DatePicker;

class IVFHistory extends Component {
	state = {
		filtering: false,
		loading: false,
		startDate: '',
		endDate: '',
		ivfs: [],
		meta: null,
	};

	componentDidMount() {
		this.fetchIVF();
	}

	cancelRequest = async data => {
		try {
			const url = `ivf/${data.id}`;
			await request(url, 'DELETE', true);
			const new_arr = this.state.ivfs.filter(r => r.id !== data.id);
			this.setState({ ivfs: new_arr });
			notifySuccess(`IVF Cancelled!`);
		} catch (error) {
			console.log('this', error);
			notifyError('Error deleting all IVF Enrollment');
		}
	};

	confirmDelete = data => {
		confirmAction(this.cancelRequest, data);
	};

	viewDetails = data => {
		const { location, history, setIVF } = this.props;
		setIVF(data);
		history.push(`${location.pathname}/ivf-details`);
	};

	fetchIVF = async page => {
		const { startDate, endDate } = this.state;
		const patient_id = this.props.patient.id;
		console.log(patient_id, startDate, endDate);
		try {
			const p = page || 1;
			this.setState({ loading: true });
			const rs = await request(
				`ivf/enrollments?page=${p}&limit=15&patient_id=${patient_id}&startDate=${startDate}&endDate=${endDate}`,
				'GET',
				true
			);
			const { result, ...meta } = rs;
			const arr = [...result];
			this.setState({ ivfs: arr, loading: false, filtering: false, meta });
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
		}
	};

	onNavigatePage = nextPage => {
		this.props.startBlock();
		this.fetchivf(nextPage);
	};

	doFilter = e => {
		e.preventDefault();
		this.setState({ filtering: true });
		this.fetchIVF();
	};

	change = e => {
		//console.log(e.target.value)
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

	render() {
		const { filtering, loading, meta, ivfs } = this.state;
		return (
			<div className="col-sm-12">
				<br />
				<div className="element-wrapper">
					<h6 className="element-header">Patient IVF History</h6>
					<div className="row">
						<div className="col-md-12 p-4">
							<form className="row">
								<div className="form-group col-md-10">
									<label>From - To</label>
									<RangePicker onChange={e => this.dateChange(e)} />
								</div>
								<div className="form-group col-md-2 mt-4">
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

						<div className="col-md-12">
							<div className="element-box">
								<div className="table-responsive">
									<table className="table table-striped">
										<thead>
											<tr>
												<th className="text-center">DATE ENROLLED</th>
												<th className="text-center">Assessment Comments</th>
												<th className="text-center">PROGNOSIS</th>
												<th className="text-center">TREATMENT PLAN</th>
												<th className="text-center">INDICATION</th>
												<th className="text-center">DATE OF COMMENCEMENT</th>
												<th className="text-center">DATE OF TREATMENT</th>
												<th className="text-center">RESULT</th>
												<th className="text-center">INDICATION</th>
												<th className="text-center">MEDICATION USED</th>
											</tr>
										</thead>
										<tbody>
											{loading ? (
												<tr>
													<td colSpan="6" className="text-center">
														<img alt="searching" src={searchingGIF} />
													</td>
												</tr>
											) : ivfs.length > 0 ? (
												ivfs.map((ivf, index) => {
													return (
														<tr key={index}>
															<td className="text-center">
																{moment(ivf.createdAt).format(
																	'DD-MM-YYYY H:mma'
																)}
															</td>
															<td className="text-center">
																{ivf.assessmentComments}
															</td>
															<td className="text-center">{ivf?.prognosis}</td>
															<td className="text-center">
																<span className="text-capitalize">
																	{ivf.treatmentPlan}
																</span>
															</td>
															<td className="text-center">{ivf.indication}</td>
															<td className="text-center">
																{moment(ivf.dateOfCommencement).format(
																	'DD-MM-YYYY H:mma'
																)}
															</td>

															<td className="text-center">
																{moment(ivf.dateOfTreatment).format(
																	'DD-MM-YYYY H:mma'
																)}
															</td>
															<td className="text-center">{ivf.result}</td>
															<td className="text-center">{ivf.indication}</td>
															<td className="text-center">
																{ivf.meducationUsed}
															</td>
														</tr>
													);
												})
											) : (
												<tr className="text-center">
													<td colSpan="7">No ivf</td>
												</tr>
											)}
										</tbody>
									</table>
								</div>
								{meta && (
									<div className="pagination pagination-center mt-4">
										<Pagination
											current={parseInt(meta.currentPage, 10)}
											pageSize={parseInt(meta.itemsPerPage, 10)}
											total={parseInt(meta.totalPages, 10)}
											showTotal={total => `Total ${total} ivfs`}
											itemRender={itemRender}
											onChange={current => this.onNavigatePage(current)}
										/>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		antennatal: state.patient.antennatal,
		patient: state.user.patient,
	};
};

export default withRouter(
	connect(mapStateToProps, { setIVF, startBlock, stopBlock })(IVFHistory)
);
