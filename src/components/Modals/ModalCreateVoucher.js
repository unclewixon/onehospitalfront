import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Field,
	reduxForm,
	SubmissionError,
	formValueSelector,
	change,
} from 'redux-form';
import moment from 'moment';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import {
	renderTextInput,
	request,
	patientname,
} from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { vouchersAPI } from '../../services/constants';
import { notifySuccess } from '../../services/notify';
import { searchAPI } from '../../services/constants';

const validate = values => {
	const errors = {};

	if (!values.amount || values.amount === '') {
		errors.amount = 'please specify your amount';
	}
	if (!values.duration || values.duration === '') {
		errors.duration = 'please specify a duration';
	}

	return errors;
};

const getOptionValues = option => option.id;
const getOptionLabels = option => patientname(option, true);

const getOptions = async q => {
	if (!q || q.length < 1) {
		return [];
	}

	const url = `${searchAPI}?q=${q}`;
	const res = await request(url, 'GET', true);
	return res;
};

class ModalCreateVoucher extends Component {
	state = {
		patient_id: null,
		submitting: false,
	};

	createVoucher = async data => {
		const { applyNow, closeModal } = this.props;
		try {
			this.setState({ submitting: true });
			const { patient_id } = this.state;
			let value = {
				...data,
				patient_id,
				expiration_date: moment(data.voucher_date, 'DD-MM-YYYY').format(
					'MM-DD-YYYY'
				),
			};
			if (applyNow) {
				const date = moment().format('MM-DD-YYYY');
				value = { ...value, duration: 0, expiration_date: date };
			}
			console.log(value);
			const rs = await request(vouchersAPI, 'POST', true, value);
			this.props.update(rs.voucher);
			notifySuccess(applyNow ? 'Voucher Applied!' : 'Voucher Created!');
			this.setState({ submitting: false });
			closeModal();
		} catch (e) {
			console.log(e);
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: applyNow
					? 'Could not apply voucher'
					: 'Could not create voucher',
			});
		}
	};

	setDate = (date, type) => {
		this.setState({ [type]: date });
	};

	setPatient = val => {
		this.setState({ patient_id: val });
	};

	render() {
		const { error, handleSubmit, closeModal, applyNow } = this.props;
		const { submitting } = this.state;
		return (
			<div
				className="onboarding-modal modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}
			>
				<div className="modal-dialog modal-centered" role="document">
					<div className="modal-content text-center">
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={closeModal}
						>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">Create New Voucher</h4>

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
										<div className="col-sm-6">
											<label>Patient</label>

											<AsyncSelect
												isClearable
												getOptionValue={getOptionValues}
												getOptionLabel={getOptionLabels}
												defaultOptions
												name="patient"
												loadOptions={getOptions}
												onChange={e => {
													this.setPatient(e?.id);
												}}
												placeholder="Search patients"
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

									{!applyNow && (
										<div className="row">
											<div className="col-sm-6">
												<Field
													id="duration"
													name="duration"
													component={renderTextInput}
													label="Duration (Days)"
													placeholder="Enter duration in days"
													onChange={e => {
														const date = moment()
															.add(parseInt(e.target.value, 10), 'days')
															.format('DD-MM-YYYY');
														this.props.change('voucher_date', date);
													}}
												/>
											</div>
											<div className="form-group col-sm-6">
												<Field
													id="voucher_date"
													name="voucher_date"
													component={renderTextInput}
													label="Expiration Date"
													placeholder="Enter date"
													readOnly={true}
												/>
											</div>
										</div>
									)}

									{/* <div className="row">
										<div className="col-sm-4">
											<label className="d-flex">
												<Field
													name="applyNow"
													id="immediately"
													component={renderTextInput}
													type="checkbox"
													className="mr-2"
												/>
												Apply immediately
											</label>
										</div>
									</div> */}
									<div className="row">
										<div className="col-sm-12 text-right">
											<button
												className="btn btn-primary"
												disabled={submitting}
												type="submit"
											>
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

const selector = formValueSelector('create_voucher');

const mapStateToProps = (state, ownProps) => {
	const applyNow = selector(state, 'applyNow');

	return {
		initialValues: {
			voucher_no: moment().toDate().getTime(),
			voucher_date: '',
		},
		applyNow,
	};
};

export default connect(mapStateToProps, { change })(ModalCreateVoucher);
