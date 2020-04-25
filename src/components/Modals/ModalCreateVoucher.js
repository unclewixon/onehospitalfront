import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import {
	parseRoster,
	renderSelect,
	renderTextArea,
	renderTextInput,
	request,
} from '../../services/utilities';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import waiting from '../../assets/images/waiting.gif';
import { closeModals } from '../../actions/general';
import {
	API_URI,
	inventoryAPI,
	patientAPI,
	rosterAPI,
	vouchersAPI,
} from '../../services/constants';
import { notifySuccess } from '../../services/notify';
import { createVoucher, createVoucherData } from '../../actions/paypoint';

const validate = values => {
	//const {  apply_voucher } = this.props;
	const errors = {};

	// if (
	// 	values.patient_id === null ||
	// 	values.patient_id === '' ||
	// 	!values.patient_id
	// ) {
	// 	errors.patient_id = 'select patient';
	// }

	if (!values.amount || values.amount === '') {
		errors.amount = 'please specify your amount';
	}
	if (!values.duration || values.duration === '') {
		errors.duration = 'please specify a duration';
	}

	console.log(errors);
	return errors;
};

export class ModalCreateVoucher extends Component {
	state = {
		voucher_date: null,
		submitting: false,
		amountClass: 'col-sm-6',
		patientList: [],
	};

	componentDidMount() {
		this.fetchPatient();
		const { apply_voucher } = this.props;
		if (apply_voucher) {
			this.setState({ amountClass: 'col-sm-12' });
		}

		document.body.classList.add('modal-open');
	}

	fetchPatient = async data => {
		try {
			let patientList = [];
			const rs = await request(
				`${API_URI}${patientAPI}/list`,
				'GET',
				true,
				data
			);
			rs.forEach(function(value) {
				patientList = [
					...patientList,
					{ id: value.id, name: value.other_names + ' ' + value.surname },
				];
			});
			this.setState({ patientList });
		} catch (error) {
			console.log(error);
		}
	};

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	createVoucher = async data => {
		this.setState({ submitting: true });
		const { items, apply_voucher, create_voucher } = this.props;
		if (apply_voucher) {
			data.transaction_id = create_voucher.id;
			data.patient_id = create_voucher.patient_id;
		}
		console.log(data, create_voucher);
		try {
			const rs = await request(`${API_URI}${vouchersAPI}`, 'POST', true, data);

			let voucher = {
				id: rs.voucher.q_id,
				voucher_no: rs.voucher.q_voucher_no,
				amount: rs.voucher.q_amount,
				amount_used: null,
				created_by: rs.voucher.q_createdBy,
				patient_name: rs.voucher.surname + ' ' + rs.voucher.other_names,
				patient_id: rs.voucher.q_patientId,
			};
			rs.voucher.patient_name =
				rs.voucher.patient.surname + ' ' + rs.voucher.patient.other_names;
			rs.voucher.patient_id = rs.voucher.patient.id;

			this.props.createVoucherData(rs.voucher);
			notifySuccess(
				apply_voucher ? 'Voucher Applied!' : 'Voucher item created!'
			);
			this.setState({ submitting: false });
			this.props.closeModals(true);
		} catch (e) {
			console.log(e);
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error:
					e.message || apply_voucher
						? 'Could not apply voucher'
						: 'Could not create voucher',
			});
		}
	};

	setDate = (date, type) => {
		this.setState({ [type]: date });
	};

	render() {
		const { error, handleSubmit, apply_voucher } = this.props;
		const { submitting, voucher_date, patientList, amountClass } = this.state;
		return (
			<div
				className="onboarding-modal modal fade animated show d-flex align-items-center"
				role="dialog"
				style={{ display: 'block' }}>
				<div className="modal-dialog modal-lg modal-centered" role="document">
					<div className="modal-content text-center">
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={() => this.props.closeModals(false)}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">
								{apply_voucher ? 'Apply Voucher' : 'Create New Voucher'}
							</h4>

							<div className="form-block">
								<form onSubmit={handleSubmit(this.createVoucher)}>
									{error && (
										<div
											className="alert alert-danger"
											dangerouslySetInnerHTML={{
												__html: `<strong>Error!</strong> ${error}`,
											}}
										/>
									)}

									<div className="row">
										<div className="col-sm-12">
											<Field
												id="voucher_no"
												name="voucher_no"
												component={renderTextInput}
												label="Voucher No"
												type="text"
												readOnly={true}
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-6" hidden={apply_voucher}>
											<Field
												id="patient_id"
												name="patient_id"
												component={renderSelect}
												label="Patient"
												required
												type="text"
												placeholder="Select Patient"
												data={patientList}
											/>
										</div>

										<div className={amountClass}>
											<Field
												id="amount"
												name="amount"
												component={renderTextInput}
												label="Amount"
												type="number"
												min="0"
												placeholder="Enter Amount"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-6">
											<Field
												id="duration"
												name="duration"
												component={renderTextInput}
												label="Duration (Days)"
												placeholder="Enter duration in days"
											/>
										</div>
										<div className="form-group col-sm-6">
											<label>Date</label>
											<div className="custom-date-input">
												<DatePicker
													selected={voucher_date}
													onChange={date => this.setDate(date, 'voucher_date')}
													peekNextMonth
													showMonthDropdown
													showYearDropdown
													dropdownMode="select"
													dateFormat="dd-MMM-yyyy"
													className="single-daterange form-control"
													placeholderText="Select Voucher date"
												/>
											</div>
										</div>
									</div>

									<div className="row" hidden={apply_voucher}>
										<div className="col-sm-12 d-flex">
											<div>
												<Field
													name="immediately"
													id="immediately"
													component={renderTextInput}
													type="checkbox"
												/>
											</div>
											<label
												htmlFor="immediately"
												className="ml-1"
												style={{ marginTop: '-2px' }}>
												Apply immediately
											</label>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12 text-right">
											<button
												className="btn btn-primary"
												disabled={submitting}
												type="submit">
												{submitting ? (
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
			</div>
		);
	}
}

ModalCreateVoucher = reduxForm({
	form: 'create_voucher',
	validate,
})(ModalCreateVoucher);

const mapStateToProps = (state, ownProps) => {
	const toApply = state.general.apply_voucher;
	const voucher = state.general.create_voucher;
	return {
		initialValues: {
			voucher_no: moment()
				.toDate()
				.getTime(),
			patient_id: toApply ? voucher.q_patient_id : '',
		},
		create_voucher: voucher,
		apply_voucher: toApply,
	};
};

export default connect(mapStateToProps, { createVoucherData, closeModals })(
	ModalCreateVoucher
);
