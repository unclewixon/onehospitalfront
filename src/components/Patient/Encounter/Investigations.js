/* eslint-disable no-multi-str */
import React, { Component } from 'react';

class Investigations extends Component {
	render() {
		const { previous, next } = this.props;
		return (
			<div className="form-block encounter">
				<h5>Lab Requests</h5>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Business Unit/Service Center</label>
							<select
								placeholder="-- Select a service center --"
								className="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Lab Combos</label>
							<select
								placeholder="-- Search and select lab combos --"
								className="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>Lab Tests To Request</label>
							<select
								placeholder="-- Search and select lab tests --"
								className="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>
								<input type="checkbox" className="form-control" /> Please tick
								if urgent
							</label>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Preferred Specimen(s)</label>
							<input type="text" className="form-control" />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Lab Request Note</label>
							<textarea className="form-control" cols="4"></textarea>
						</div>
					</div>
				</div>
				<h5 className="mt-4">Radiological Investigation</h5>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Business Unit/Service Center</label>
							<select
								placeholder="-- Select a service center --"
								className="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Scans To Request</label>
							<select
								placeholder="-- Select a scan --"
								className="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>
								<input type="checkbox" className="form-control" /> Please tick
								if urgent
							</label>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Request Note/Reason</label>
							<textarea className="form-control" cols="4"></textarea>
						</div>
					</div>
				</div>

				<div className="row mt-5">
					<div className="col-sm-12 d-flex ant-row-flex-space-between">
						<button className="btn btn-primary" onClick={previous}>
							Previous
						</button>
						<button className="btn btn-primary" onClick={next}>
							Next
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Investigations;
