/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

class PastHistory extends Component {
	state = {
		histories: [],
	};

	addHistory = () => {
		const { histories } = this.state;
		this.setState({
			histories: [...histories, { id: histories.length, deleted: 0 }],
		});
	};

	updateHistories = (id, type, value) => {
		const { histories } = this.state;
		const history = histories.find(d => d.id === id);
		if (history) {
			const idx = histories.findIndex(d => d.id === id);
			const _histories = [
				...histories.slice(0, idx),
				{ ...history, [type]: value },
				...histories.slice(idx + 1),
			];

			return _histories;
		}
		return [];
	};

	removeHistory = id => () => {
		const histories = this.updateHistories(id, 'deleted', 1);
		this.setState({ histories: [...histories] });
	};

	render() {
		const { histories } = this.state;
		return (
			<div className="form-block encounter">
				<div className="row">
					<div className="col-md-12">
						<a
							className="btn btn-success btn-sm text-white"
							onClick={this.addHistory}>
							<i className="os-icon os-icon-plus-circle" />
							<span>add</span>
						</a>
					</div>
				</div>
				<div className="row mt-1">
					<div className="col-md-6">
						<label>Past Medical History:</label>
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
				{histories.map((hist, i) => {
					return (
						hist.deleted === 0 && (
							<div className="row" key={i}>
								<div className="col-sm-4">
									<div className="form-group">
										<label>Diagnosis</label>
										<select
											placeholder="Enter the diagnosis name or ICD-10/ICPC-2 code"
											className="form-control">
											<option value=""></option>
										</select>
									</div>
								</div>
								<div className="col-sm-2">
									<div className="form-group">
										<label>Date Diagnosed</label>
										<input
											placeholder="Date Diagnosed"
											className="form-control"
										/>
									</div>
								</div>
								<div className="col-sm-5">
									<div className="form-group">
										<label>Comment</label>
										<input
											placeholder="Comment on the past medical history"
											className="form-control"
										/>
									</div>
								</div>
								<div className="col-sm-1" style={{ position: 'relative' }}>
									<a
										className="text-danger delete-icon"
										onClick={this.removeHistory(hist.id)}>
										<i className="os-icon os-icon-cancel-circle" />
									</a>
								</div>
							</div>
						)
					);
				})}
			</div>
		);
	}
}

export default PastHistory;
