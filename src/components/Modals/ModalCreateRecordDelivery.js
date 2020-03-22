import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import { renderTextInput } from '../../services/utilities';
import TimePicker from 'antd/lib/time-picker';
import DatePicker from 'antd/lib/date-picker';
import waiting from '../../assets/images/waiting.gif';
import { closeModals } from '../../actions/general';
export class ModalCreateRecordDelivery extends Component {
	state = {
		submitting: false,
	};
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}
	render() {
		const { submitting } = this.state;
		const { error, handleSubmit } = this.props;
		return (
			<div
				className="onboarding-modal modal fade animated show"
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
							<h4 className="onboarding-title">Create Record Delivery</h4>
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

									<div className="row mt-2">
										<label>Delivery type</label>
										<div className="col-md-12 d-flex">
											<div className="col-sm-6">
												<Field
													name="delivery_type"
													component="input"
													type="radio"
													value="mormal delivery"
												/>
												<label className="mx-1">
													Full-term normal vaginal delivery
												</label>
											</div>

											<div className="col-sm-6">
												<Field
													name="delivery_type"
													component="input"
													type="radio"
													value="epistomy"
												/>
												<label className="mx-1">
													Normal vaginal delivery with epistomy
												</label>
											</div>
										</div>
										<div className="col-md-12 mt-1 d-flex">
											<div className="col-sm-6">
												<Field
													name="delivery_type"
													component="input"
													type="radio"
													value="malpresentation"
												/>
												<label className="mx-1">
													Vaginal delivery in malpresentation
												</label>
											</div>
											<div className="col-sm-6">
												<Field
													name="delivery_type"
													component="input"
													type="radio"
													value="cesarean"
												/>
												<label className="mx-1">Cesarean</label>
											</div>
										</div>

										<div className="col-md-12 mt-1 d-flex">
											<div className="col-sm-6">
												<Field
													name="delivery_type"
													component="input"
													type="radio"
													value="assisted delivery "
												/>
												<label className="mx-1">
													{' '}
													Assisted delivery(forcep or vent use)
												</label>
											</div>
										</div>
									</div>

									<div className="row mt-2">
										<label>Is mother alive ?</label>

										<div className="col-md-12 d-flex">
											<div className="col-sm-4">
												<Field
													name="mother_alive"
													component="input"
													type="radio"
													value="yes"
												/>
												<label className="mx-1">Yes</label>
											</div>
											<div className="col-sm-4">
												<Field
													name="mother_alive"
													component="input"
													type="radio"
													value="no"
												/>
												<label className="mx-1">No</label>
											</div>
										</div>
									</div>

									<div className="row mt-2">
										<label>Is baby alive ?</label>

										<div className="col-md-12 d-flex">
											<div className="col-sm-4">
												<Field
													name="baby_alive"
													component="input"
													type="radio"
													value="yes"
												/>
												<label className="mx-1">Yes</label>
											</div>
											<div className="col-sm-4">
												<Field
													name="baby_alive"
													component="input"
													type="radio"
													value="no"
												/>
												<label className="mx-1">No</label>
											</div>
										</div>
									</div>

									<div className="row mt-2">
										<label>Administerd 10 units of Oxytocin ?</label>
										<div className="col-md-12 d-flex">
											<div className="col-sm-4">
												<Field
													name="oxytocin"
													component="input"
													type="radio"
													value="yes"
												/>
												<label className="mx-1">Yes</label>
											</div>
											<div className="col-sm-4">
												<Field
													name="oxytocin"
													component="input"
													type="radio"
													value="no"
												/>
												<label className="mx-1">No</label>
											</div>
										</div>
									</div>

									<div className="row mt-2">
										<label>Was the placenta delivered completely ?</label>

										<div className="col-md-12 d-flex">
											<div className="col-sm-4">
												<Field
													name="successful_placenta"
													component="input"
													type="radio"
													value="yes"
												/>
												<label className="mx-1">Yes</label>
											</div>
											<div className="col-sm-4">
												<Field
													name="successful_placenta"
													component="input"
													type="radio"
													value="no"
												/>
												<label className="mx-1">No</label>
											</div>
										</div>
									</div>

									<div className="row mt-2">
										<label>Bleeding with normal unit (&lt;500ml) ?</label>
										<div className="col-md-12 d-flex">
											<div className="col-sm-4">
												<Field
													name="normal_bleeding"
													component="input"
													type="radio"
													value="yes"
												/>
												<label className="mx-1">Yes</label>
											</div>
											<div className="col-sm-4">
												<Field
													name="normal_bleeding"
													component="input"
													type="radio"
													value="no"
												/>
												<label className="mx-1">No</label>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-md-6 pl-0">
											<label>Time of birth</label>
											<br />
											<TimePicker
												use12Hours
												defaultValue={moment('13:30:56', 'HH:mm:ss')}
											/>
										</div>

										<div className="col-md-6 pl-0">
											<label>Date of birth</label>
											<br />
											<DatePicker
												defaultValue={moment('2015-01-01', 'mm/dd/yyyy')}
											/>
										</div>
									</div>

									<div className="row mt-2">
										<label>Baby cried immediately after birth ?</label>

										<div className="col-md-12 d-flex">
											<div className="col-sm-4">
												<Field
													name="baby_cried"
													component="input"
													type="radio"
													value="yes"
												/>
												<label className="mx-1">Yes</label>
											</div>
											<div className="col-sm-4">
												<Field
													name="baby_cried"
													component="input"
													type="radio"
													value="no"
												/>
												<label className="mx-1">No</label>
											</div>
										</div>
									</div>

									<div className="row mt-2">
										<label>Sex of baby?</label>

										<div className="col-md-12 d-flex">
											<div className="col-sm-4">
												<Field
													name="sex"
													component="input"
													type="radio"
													value="female"
												/>
												<label className="mx-1">Female</label>
											</div>
											<div className="col-sm-4">
												<Field
													name="sex"
													component="input"
													type="radio"
													value="male"
												/>
												<label className="mx-1">Male</label>
											</div>
											<div className="col-sm-4">
												<Field
													name="sex"
													component="input"
													type="radio"
													value="other"
												/>
												<label className="mx-1">Other</label>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-6 pl-0">
											<Field
												id="apgar_score"
												name="apgar_score"
												component={renderTextInput}
												label="APGAR Score"
												type="text"
												placeholder="Enter APGAR score"
											/>
										</div>

										<div className="col-sm-6 pl-0">
											<Field
												id="weight"
												name="weight"
												component={renderTextInput}
												label="Weight(kg)"
												placeholder="Enter weight in kg"
											/>
										</div>
									</div>

									<div className="row mt-2">
										<label>Was Vitamin K adminstered ?</label>

										<div className="col-md-12 d-flex">
											<div className="col-sm-4">
												<Field
													name="vitamin_k"
													component="input"
													type="radio"
													value="yes"
												/>
												<label className="mx-1">Yes</label>
											</div>
											<div className="col-sm-4">
												<Field
													name="vitamin_k"
													component="input"
													type="radio"
													value="no"
												/>
												<label className="mx-1">No</label>
											</div>
										</div>
									</div>

									<div className="row mt-2">
										<label>Is mother Rh negative ?</label>

										<div className="col-md-12 d-flex">
											<div className="col-sm-4">
												<Field
													name="rh_negative"
													component="input"
													type="radio"
													value="yes"
												/>
												<label className="mx-1">Yes</label>
											</div>
											<div className="col-sm-4">
												<Field
													name="rh_negative"
													component="input"
													type="radio"
													value="no"
												/>
												<label className="mx-1">No</label>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-12 pl-0">
											<Field
												id="drug_adminstered"
												name="drug_adminstered"
												component={renderTextInput}
												label="Drug"
												placeholder="If drugs were adminstered to the baby then mention"
											/>
										</div>
									</div>

									<div className="row mt-2">
										<label>Where the baby transfered ?</label>

										<div className="col-md-12 d-flex">
											<div className="col-sm-4">
												<Field
													name="baby_transfered"
													component="input"
													type="radio"
													value="transfer out"
												/>
												<label className="mx-1">Transfer out</label>
											</div>
											<div className="col-sm-4">
												<Field
													name="baby_transfered"
													component="input"
													type="radio"
													value="nicu"
												/>
												<label className="mx-1">NICU</label>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-12 pl-0">
											<Field
												id="pediatrician_name"
												name="pediatrician_name"
												component={renderTextInput}
												label="Pediatrician's name"
												placeholder="Enter pediatrician's name"
											/>
										</div>

										<div className="col-sm-12 pl-0">
											<Field
												id="comment"
												name="comment"
												component={renderTextInput}
												label="Comment"
												placeholder="Enter comment"
											/>
										</div>
									</div>
									<div className="row mt-2">
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

											<button
												className="btn btn-primary ml-2"
												onClick={() => this.props.closeModals(false)}
												type="button">
												Cancel
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

ModalCreateRecordDelivery = reduxForm({
	form: 'record_delivery',
})(ModalCreateRecordDelivery);
export default connect(null, { closeModals })(ModalCreateRecordDelivery);
