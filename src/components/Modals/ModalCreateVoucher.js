import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import {
	renderSelect,
	renderTextArea,
	renderTextInput,
} from '../../services/utilities';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import waiting from '../../assets/images/waiting.gif';
import { closeModals } from '../../actions/general';

const validate = values => {
	const errors = {};

	if (!values.patient_id || values.patient_id === '') {
		errors.patient_id = 'Please enter patient id ';
	}

	if (!values.amount || values.amount === '') {
		errors.amount = 'please specify you amount';
	}

	return errors;
};
export class ModalCreateVoucher extends Component {
	state = {
		voucher_date: null,
		submitting: false,
	};

	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	setDate = (date, type) => {
		this.setState({ [type]: date });
	};

	render() {
		const { error } = this.props;
		const { submitting, voucher_date } = this.state;
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
							<h4 className="onboarding-title">Create New Voucher</h4>

							<div className="form-block">
								<form>
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
												name="voucher_n"
												component={renderTextInput}
												label="Voucher No"
												type="text"
												readOnly={true}
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-6">
											<Field
												id="patient_id"
												name="patient_id"
												component={renderTextInput}
												label="Patient Id"
												type="text"
												placeholder="Enter Patient Id"
											/>
										</div>

										<div className="col-sm-6">
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

									<div className="row">
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
export default connect(null, { closeModals })(ModalCreateVoucher);
