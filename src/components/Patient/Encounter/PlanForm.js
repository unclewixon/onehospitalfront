/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-multi-str */
import React, { Component } from 'react';
import SunEditor from 'suneditor-react';

class PlanForm extends Component {
	state = {
		regimens: [],
	};

	addRegimen = () => {
		const { regimens } = this.state;
		this.setState({
			regimens: [...regimens, { id: regimens.length, deleted: 0 }],
		});
	};

	updateRegimens = (id, type, value) => {
		const { regimens } = this.state;
		const regimen = regimens.find(d => d.id === id);
		if (regimen) {
			const idx = regimens.findIndex(d => d.id === id);
			const _regimens = [
				...regimens.slice(0, idx),
				{ ...regimen, [type]: value },
				...regimens.slice(idx + 1),
			];

			return _regimens;
		}
		return [];
	};

	removeRegimen = id => () => {
		const regimens = this.updateRegimens(id, 'deleted', 1);
		this.setState({ regimens: [...regimens] });
	};

	render() {
		const { regimens } = this.state;
		return (
			<div className="form-block encounter">
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Plan:</label>
							<SunEditor
								width="100%"
								placeholder="Please type here..."
								setContents="Treatment Plan:"
								autoFocus={false}
								enableToolbar={true}
								setOptions={{
									height: 300,
									buttonList: [
										[
											'bold',
											'underline',
											'italic',
											'strike',
											'subscript',
											'superscript',
											'list',
											'align',
											'font',
											'fontSize',
											'image',
										],
									],
								}}
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Business Unit/Service Center</label>
							<select
								placeholder="-- Select a service center --"
								className="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>Formulary</label>
							<select
								placeholder="-- Select formulary --"
								className="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
				</div>
				<h5 className="mt-4">Add Medication</h5>
				<div className="row mt-4">
					<div className="col-md-12">
						<a
							className="btn btn-success btn-sm text-white"
							onClick={this.addRegimen}>
							<i className="os-icon os-icon-plus-circle" />
							<span>add</span>
						</a>
					</div>
				</div>
				{regimens.map((drug, i) => {
					return (
						drug.deleted === 0 && (
							<div className="mt-4" key={i}>
								<div className="row">
									<div className="col-sm-6">
										<div className="form-group">
											<label>Drug Generic Name</label>
											<select
												placeholder="-- Select drug generic name --"
												className="form-control">
												<option value=""></option>
											</select>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group">
											<label>Drug Name</label>
											<select
												placeholder="-- Select drug name --"
												className="form-control">
												<option value=""></option>
											</select>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-6">
										<div className="row">
											<div className="col-sm-5">
												<div className="form-group">
													<label>Frequency</label>
													<input
														type="number"
														placeholder="eg. 3"
														className="form-control"
													/>
												</div>
											</div>
											<div className="col-sm-4">
												<div className="form-group">
													<label>Frequency Type</label>
													<select
														placeholder="-- Select frequency type --"
														className="form-control">
														<option value=""></option>
													</select>
												</div>
											</div>
											<div className="col-sm-3">
												<div className="form-group">
													<label>Dose</label>
													<input
														type="number"
														placeholder="Dose quantity"
														className="form-control"
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="col-sm-5">
										<div className="row">
											<div className="col-sm-4">
												<div className="form-group">
													<label>Duration</label>
													<input
														type="number"
														placeholder="(value in days) eg. 7"
														className="form-control"
													/>
												</div>
											</div>
											<div className="col-sm-8">
												<div className="form-group">
													<label>Note</label>
													<input
														type="number"
														placeholder="Regimen line instruction"
														className="form-control"
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="col-sm-1">
										<a
											className="text-danger"
											onClick={this.removeRegimen(drug.id)}
											style={{ lineHeight: '78px' }}>
											<i className="os-icon os-icon-cancel-circle" />
										</a>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12">
										<div className="form-group">
											<label>
												<input
													type="checkbox"
													name="refillable"
													className="form-control"
												/>{' '}
												Refilable?
											</label>
										</div>
									</div>
								</div>
							</div>
						)
					);
				})}
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Regimen Note</label>
							<textarea
								placeholder="Enter regimen note"
								className="form-control"
								cols="3"></textarea>
						</div>
					</div>
				</div>
				<h5 className="mt-4">Add Appointment (Schedule Next Appointment)</h5>
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Appontment Date</label>
							<input
								type="text"
								placeholder="Select Start Date"
								className="form-control"
							/>
						</div>
					</div>
					<div className="col-sm-3">
						<div className="form-group">
							<label>Duration</label>
							<input
								type="number"
								placeholder="eg. 5"
								className="form-control"
							/>
						</div>
					</div>
					<div className="col-sm-3">
						<div className="form-group">
							<label>(Minutes/Hour/Days/etc)</label>
							<select
								placeholder="-- Select an option here --"
								className="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Select Location</label>
							<select
								placeholder="-- Select location --"
								className="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>Select Clinic</label>
							<select
								placeholder="-- Select appointment clinic --"
								className="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Description/Reason</label>
							<textarea
								placeholder="Enter description"
								className="form-control"
								cols="3"></textarea>
						</div>
					</div>
				</div>
				<h5 className="mt-4">Add New Procedure</h5>
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Select Location</label>
							<select
								placeholder="-- Select location --"
								className="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>Business Unit/Service Center</label>
							<select
								placeholder="-- Select a receiving procedure center --"
								className="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Procedure</label>
							<select
								placeholder="-- Select procedure service --"
								className="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>Primary Diagnoses</label>
							<input
								type="text"
								placeholder="Diagnoses"
								className="form-control"
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Request Note</label>
							<textarea
								placeholder="Enter note"
								className="form-control"
								cols="3"></textarea>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<div className="row">
							<div className="col-sm-6">
								<div className="form-group">
									<label>
										<input type="checkbox" className="form-control" /> Requires
										Anesthesiologist
									</label>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="form-group">
									<label>
										<input type="checkbox" className="form-control" /> Requires
										Surgeon
									</label>
								</div>
							</div>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="row">
							<div className="col-sm-6">
								<div className="form-group">
									<label>
										<input type="radio" className="form-control" /> Bill Now
									</label>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="form-group">
									<label>
										<input type="radio" className="form-control" /> Bill Later
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PlanForm;
