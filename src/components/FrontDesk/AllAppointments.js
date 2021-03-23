import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import { connect } from 'react-redux';
import waiting from '../../assets/images/waiting.gif';
import { request, confirmAction, itemRender } from '../../services/utilities';
import {
	applyVoucher,
	approveTransaction,
	viewAppointmentDetail,
} from '../../actions/general';
import { deleteTransaction, loadTransaction } from '../../actions/transaction';
import FrontDeskTable from './FrontDeskTable';
import Pagination from 'antd/lib/pagination';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifySuccess, notifyError } from '../../services/notify';

const { RangePicker } = DatePicker;
const date = moment(new Date()).format('YYYY-MM-DD');

export class AllAppointments extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		patients: [],
		hmos: [],
		patient_id: '',
		startDate: date,
		endDate: date,
		status: '',
		meta: null,
	};

	componentDidMount() {
		this.fetchTransaction();
	}

	doCancelApppointment = async data => {
		const { reviewTransaction } = this.props;
		try {
			this.setState({ loading: true, filtering: true });
			const url = `front-desk/appointments/${data.id}/cancel`;
			const rs = await request(url, 'PATCH', true);
			notifySuccess('appointment cancelled');
			if (rs.isActive === false) {
				const filtr = reviewTransaction.filter(a => a.id !== rs.id);
				this.props.loadTransaction(filtr);
				this.setState({ loading: false, filtering: false });
			}
		} catch (error) {
			console.log(error);
		}
	};

	cancelApppointment = data => {
		confirmAction(this.doCancelApppointment, data);
	};

	fetchTransaction = async page => {
		const { startDate, endDate } = this.state;
		try {
			const p = page || 1;
			this.setState({ loading: true });
			const rs = await request(
				`front-desk/appointments?page=${p}&limit=15&startDate=${startDate}&endDate=${endDate}`,
				'GET',
				true
			);
			const { result, ...meta } = rs;
			const arr = [...result];
			this.props.loadTransaction(arr);
			this.setState({ loading: false, filtering: false, meta });
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
			this.setState({ loading: false, filtering: false });
			notifyError(error.message || 'could not fetch appointments');
		}
	};

	onNavigatePage = nextPage => {
		this.props.startBlock();
		this.fetchTransaction(nextPage);
	};

	doFilter = async e => {
		e.preventDefault();
		this.fetchTransaction();
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

	render() {
		const { filtering, loading, meta } = this.state;
		const transactions = this.props.reviewTransaction;
		return (
			<>
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
								{filtering ? <img src={waiting} alt="submitting" /> : 'Filter'}
							</span>
						</div>
					</div>
				</form>
				<div className="element-box-tp">
					<div className="table-responsive">
						<FrontDeskTable
							appointments={transactions}
							loading={loading}
							today={false}
							cancelApppointment={this.cancelApppointment}
						/>
					</div>

					{meta && (
						<div className="pagination pagination-center mt-4">
							<Pagination
								current={parseInt(meta.currentPage, 10)}
								pageSize={parseInt(meta.itemsPerPage, 10)}
								total={parseInt(meta.totalPages, 10)}
								showTotal={total => `Total ${total} appointments`}
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

const mapStateToProps = state => {
	return {
		reviewTransaction: state.transaction.reviewTransaction,
		//	hmoList: state.hmo.hmo_list,
	};
};

export default connect(mapStateToProps, {
	applyVoucher,
	approveTransaction,
	viewAppointmentDetail,
	loadTransaction,
	deleteTransaction,
	startBlock,
	stopBlock,
})(AllAppointments);
