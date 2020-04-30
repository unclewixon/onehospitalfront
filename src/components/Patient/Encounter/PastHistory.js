/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import { request } from '../../../services/utilities';
import { API_URI, diagnosisAPI } from '../../../services/constants';
import DatePicker from 'react-datepicker';

class PastHistory extends Component {
	state = {
		histories: [],
		selectedOption: '',
		start_time: new Date(),
	};

	addHistory = () => {
		const { histories } = this.state;
		this.setState({
			histories: [...histories, { id: histories.length, deleted: 0 }],
		});
	};

	getOptionValues = option => option.id;

	getOptionLabels = option => option.description;

	handleChangeOptions = selectedOption => {
		this.setState({ selectedOption });
	};

	getOptions = async inputValue => {
		if (!inputValue) {
			return [];
		}
		let val = inputValue.toUpperCase();
		const res = await request(
			`${API_URI}${diagnosisAPI}` + 'search?q=' + val,
			'GET',
			true
		);
		return res;
	};

	onChange = date => this.setState({ start_time: date });
	setDate = (date, type) => {
		this.setState({ [type]: date });
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
		const divStyle = {
			height: '500px',
		};
		const { histories, selectedOption, start_time } = this.state;
		const { previous, next } = this.props;
		return (
			<div className="form-block encounter" style={divStyle}>
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
								<div className="col-sm-6">
									<div className="form-group">
										<label>Diagnosis</label>
										<AsyncSelect
											required
											cacheOptions
											value={selectedOption}
											getOptionValue={this.getOptionValues}
											getOptionLabel={this.getOptionLabels}
											defaultOptions
											loadOptions={this.getOptions}
											onChange={this.handleChangeOptions}
											placeholder="Enter the diagnosis name or ICD-10/ICPC-2 code"
										/>
									</div>
								</div>
								<div className="col-sm-2">
									<div className="form-group">
										<label>Date Diagnosed</label>
										<DatePicker
											selected={start_time}
											onChange={date => this.setDate(date, 'start_time')}
											peekNextMonth
											showMonthDropdown
											showYearDropdown
											dropdownMode="select"
											dateFormat="dd-MMM-yyyy"
											className="single-daterange form-control"
											placeholderText="Date Diagnosed"
										/>
									</div>
								</div>
								<div className="col-sm-4">
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

export default PastHistory;
