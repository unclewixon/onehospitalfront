/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

class Diagnosis extends Component {
	state = {
		diagnoses: [],
	};

	addDiagnosis = () => {
		const { diagnoses } = this.state;
		this.setState({
			diagnoses: [...diagnoses, { id: diagnoses.length, deleted: 0 }],
		});
	};

	updateDiagnoses = (id, type, value) => {
		const { diagnoses } = this.state;
		const diagnosis = diagnoses.find(d => d.id === id);
		if (diagnosis) {
			const idx = diagnoses.findIndex(d => d.id === id);
			const _diagnoses = [
				...diagnoses.slice(0, idx),
				{ ...diagnosis, [type]: value },
				...diagnoses.slice(idx + 1),
			];

			return _diagnoses;
		}
		return [];
	};

	removeDiagnosis = id => () => {
		const diagnoses = this.updateDiagnoses(id, 'deleted', 1);
		this.setState({ diagnoses: [...diagnoses] });
	};

	render() {
		const { diagnoses } = this.state;
		return (
			<div className="form-block encounter">
				<div className="row">
					<div className="col-md-12">
						<a
							className="btn btn-success btn-sm text-white"
							onClick={this.addDiagnosis}>
							<i className="os-icon os-icon-plus-circle" />
							<span>add diagnosis</span>
						</a>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						{diagnoses.map((dia, i) => {
							return (
								dia.deleted === 0 && (
									<div className="mt-4" key={i}>
										<div className="row mt-1">
											<div className="col-md-6">
												<label>Diagnosis Data</label>
											</div>
											<div className="col-md-6">
												<div className="form-group clearfix diagnosis-type">
													<div className="float-right ml-2">
														<input
															type="radio"
															name="icd10"
															value="icpc2"
															className="form-control"
														/>
														<label>ICPC-2</label>
													</div>
													<div className="float-right">
														<input
															type="radio"
															name="icd10"
															value="icd10"
															className="form-control"
														/>
														<label>ICD-10</label>
													</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-5">
												<div className="form-group">
													<select
														placeholder="-- Select diagnosis name or ICD-10/ICPC-2 --"
														className="form-control">
														<option value=""></option>
													</select>
												</div>
											</div>
											<div className="col-md-3">
												<div className="form-group">
													<select
														placeholder="-- Select --"
														className="form-control">
														<option value=""></option>
													</select>
												</div>
											</div>
											<div className="col-md-3">
												<div className="form-group">
													<input
														type="text"
														placeholder="Comment"
														className="form-control"
													/>
												</div>
											</div>
											<div className="col-md-1">
												<a
													className="text-danger"
													onClick={this.removeDiagnosis(dia.id)}
													style={{ lineHeight: '37px' }}>
													<i className="os-icon os-icon-cancel-circle" />
												</a>
											</div>
										</div>
									</div>
								)
							);
						})}
					</div>
					{diagnoses.length > 0 && (
						<div className="col-sm-6">
							<div className="form-group">
								{/* <label>Existing Diagnoses</label> */}
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Diagnosis;
