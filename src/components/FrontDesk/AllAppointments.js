import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import { connect } from 'react-redux';

import waiting from '../../assets/images/waiting.gif';
import { request, confirmAction } from '../../services/utilities';
import {
	applyVoucher,
	approveTransaction,
	viewAppointmentDetail,
} from '../../actions/general';
import { deleteTransaction, loadTransaction } from '../../actions/transaction';
import FrontDeskTable from './FrontDeskTable';

const { RangePicker } = DatePicker;

export class AllAppointments extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		patients: [],
		hmos: [],
		patient_id: '',
		startDate: '',
		endDate: '',
		status: '',
	};

	componentDidMount() {
		this.fetchTransaction();
	}

	doCancelApppointment = async data => {
		const { reviewTransaction } = this.props;
		try {
			this.setState({ loading: true, filtering: true });
			const rs = await request(
				`front-desk/appointments/${data.id}/cancel`,
				'PATCH',
				true
			);
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

	fetchTransaction = async () => {
		const { startDate, endDate } = this.state;
		try {
			this.setState({ loading: true });
			const rs = await request(
				`front-desk/appointments?startDate=${startDate}&endDate=${endDate}`,
				'GET',
				true
			);
			const arr = rs.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
			this.props.loadTransaction(arr);
			this.setState({ loading: false, filtering: false });
		} catch (error) {
			console.log(error);
		}
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
		const { filtering, loading } = this.state;
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
})(AllAppointments);
