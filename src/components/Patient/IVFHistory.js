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
import { notifyError, notifySuccess } from '../../services/notify';
import TableLoading from '../TableLoading';

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
		try {
			const { startDate, endDate } = this.state;
			const patient_id = this.props.patient.id;
			const p = page || 1;
			this.setState({ loading: true });
			const url = `ivf?page=${p}&limit=15&patient_id=${patient_id}&startDate=${startDate}&endDate=${endDate}`;
			const rs = await request(url, 'GET', true);
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
				<div className="element-wrapper">
					<h6 className="element-header">Patient IVF History</h6>
					<form className="row">
						<div className="form-group col-md-10">
							<RangePicker onChange={e => this.dateChange(e)} />
						</div>
						<div className="form-group col-md-2">
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
					<div className="element-box p-3 m-0 mt-3">
						{loading ? (
							<TableLoading />
						) : (
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>DATE ENROLLED</th>
											<th>Assessment Comments</th>
											<th>PROGNOSIS</th>
											<th>TREATMENT PLAN</th>
											<th>INDICATION</th>
											<th>DATE OF COMMENCEMENT</th>
											<th>DATE OF TREATMENT</th>
											<th>RESULT</th>
											<th>INDICATION</th>
											<th>MEDICATION USED</th>
										</tr>
									</thead>
									<tbody>
										{ivfs.map((ivf, index) => {
											return (
												<tr key={index}>
													<td>
														{moment(ivf.createdAt).format('DD-MM-YYYY H:mma')}
													</td>
													<td>{ivf.assessmentComments}</td>
													<td>{ivf?.prognosis}</td>
													<td>
														<span className="text-capitalize">
															{ivf.treatmentPlan}
														</span>
													</td>
													<td>{ivf.indication}</td>
													<td>
														{moment(ivf.dateOfCommencement).format(
															'DD-MM-YYYY H:mma'
														)}
													</td>

													<td>
														{moment(ivf.dateOfTreatment).format(
															'DD-MM-YYYY H:mma'
														)}
													</td>
													<td>{ivf.result}</td>
													<td>{ivf.indication}</td>
													<td>{ivf.meducationUsed}</td>
												</tr>
											);
										})}
										{ivfs.length === 0 && (
											<tr className="text-center">
												<td colSpan="10">No ivf</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						)}
						{meta && (
							<div className="pagination pagination-center mt-4">
								<Pagination
									current={parseInt(meta.currentPage, 10)}
									pageSize={parseInt(meta.itemsPerPage, 10)}
									total={parseInt(meta.totalPages, 10)}
									showTotal={total => `Total ${total} ivfs`}
									itemRender={itemRender}
									onChange={current => this.onNavigatePage(current)}
									showSizeChanger={false}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		antenatal: state.patient.antenatal,
		patient: state.user.patient,
	};
};

export default withRouter(
	connect(mapStateToProps, { setIVF, startBlock, stopBlock })(IVFHistory)
);
