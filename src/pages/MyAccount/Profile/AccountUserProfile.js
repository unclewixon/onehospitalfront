import React from 'react';

const AccountUserProfile = () => {
	return (
		<div className="col-sm-7">
			<div className="element-wrapper">
				<div className="element-box">
					<form id="formValidate">
						<div className="element-info">
							<div className="element-info-with-icon">
								<div className="element-info-icon">
									<div className="os-icon os-icon-wallet-loaded"></div>
								</div>
								<div className="element-info-text">
									<h5 className="element-inner-header">Profile Settings</h5>
									<div className="element-inner-desc">
										Validation of the form is made possible using powerful
										validator plugin for bootstrap.{' '}
										<a
											href="http://1000hz.github.io/bootstrap-validator/"
											target="_blank">
											Learn more about Bootstrap Validator
										</a>
									</div>
								</div>
							</div>
						</div>
						<div className="form-group">
							<label for="">Email address</label>
							<input
								className="form-control"
								data-error="Your email address is invalid"
								placeholder="Enter email"
								required="required"
								type="email"
							/>
							<div className="help-block form-text with-errors form-control-feedback"></div>
						</div>
						<div className="row">
							<div className="col-sm-6">
								<div className="form-group">
									<label for="">Password</label>
									<input
										className="form-control"
										data-minlength="6"
										placeholder="Password"
										required="required"
										type="password"
									/>
									<div className="help-block form-text text-muted form-control-feedback">
										Minimum of 6 characters
									</div>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="form-group">
									<label for="">Confirm Password</label>
									<input
										className="form-control"
										data-match-error="Passwords don&#39;t match"
										placeholder="Confirm Password"
										required="required"
										type="password"
									/>
									<div className="help-block form-text with-errors form-control-feedback"></div>
								</div>
							</div>
						</div>
						<div className="form-group">
							<label for="">Regular select</label>
							<select className="form-control">
								<option value="New York">New York</option>
								<option value="California">California</option>
								<option value="Boston">Boston</option>
								<option value="Texas">Texas</option>
								<option value="Colorado">Colorado</option>
							</select>
						</div>
						<div className="form-group">
							<label for="">Multiselect</label>
							<select className="form-control select2" multiple="true">
								<option selected="true">New York</option>
								<option selected="true">California</option>
								<option>Boston</option>
								<option>Texas</option>
								<option>Colorado</option>
							</select>
						</div>
						<fieldset className="form-group">
							<legend>
								<span>Section Example</span>
							</legend>
							<div className="row">
								<div className="col-sm-6">
									<div className="form-group">
										<label for="">First Name</label>
										<input
											className="form-control"
											data-error="Please input your First Name"
											placeholder="First Name"
											required="required"
											type="text"
										/>
										<div className="help-block form-text with-errors form-control-feedback"></div>
									</div>
								</div>
								<div className="col-sm-6">
									<div className="form-group">
										<label for="">Last Name</label>
										<input
											className="form-control"
											data-error="Please input your Last Name"
											placeholder="Last Name"
											required="required"
											type="text"
										/>
										<div className="help-block form-text with-errors form-control-feedback"></div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-6">
									<div className="form-group">
										<label for="">Date of Birth</label>
										<input
											className="single-daterange form-control"
											placeholder="Date of birth"
											type="text"
											value="04/12/1978"
										/>
									</div>
								</div>
								<div className="col-sm-6">
									<div className="form-group">
										<label for="">Twitter Username</label>
										<div className="input-group">
											<div className="input-group-prepend">
												<div className="input-group-text">@</div>
											</div>
											<input
												className="form-control"
												placeholder="Twitter Username"
												type="text"
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="form-group">
								<label for="">Date Range Picker</label>
								<input
									className="multi-daterange form-control"
									type="text"
									value="03/31/2017 - 04/06/2017"
								/>
							</div>
							<div className="form-group">
								<label>Example textarea</label>
								<textarea className="form-control" rows="3"></textarea>
							</div>
						</fieldset>
						<div className="form-check">
							<label className="form-check-label">
								<input className="form-check-input" type="checkbox" />I agree to
								terms and conditions
							</label>
						</div>
						<div className="form-buttons-w">
							<button className="btn btn-primary" type="submit">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AccountUserProfile;
