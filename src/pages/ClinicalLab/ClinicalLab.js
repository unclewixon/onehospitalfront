/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ClinicalLabItem from '../../components/ClinicalLabItem';
import { request } from '../../services/utilities';
import { patientAPI } from '../../services/constants';
import { loadClinicalLab } from '../../actions/patient';
import searchingGIF from '../../assets/images/searching.gif';
import waiting from '../../assets/images/waiting.gif';
import moment from 'moment';
import uniqBy from 'lodash.uniqby';
import DatePicker from 'antd/lib/date-picker';
import ModalClinicalLab from '../../components/Modals/ModalClinicalLab';
import Select from 'react-select';
const { RangePicker } = DatePicker;

class ClinicalLab extends Component {
	state = {
		loading: false,
		showModal: false,
		filtering: false,
		activeRequest: null,
		startDate: moment(Date.now())
			.subtract(1, 'days')
			.format('YYYY-MM-DD'),
		endDate: moment(Date.now()).format('YYYY-MM-DD'),
	};
	componentDidMount() {
		this.fetchClinicalLab();
	}

	fetchClinicalLab = async patientId => {
		const { startDate, endDate } = this.state;
		try {
			this.setState({ ...this.state, loading: true });
			let today = moment().format('YYYY-MM-DD');
			console.log(today);
			const rs = await request(
				patientId
					? `${patientAPI}/${patientId}/request/lab?startDate=${startDate}=&endDate=${endDate}`
					: `${patientAPI}/requests/lab?startDate=${startDate}=&endDate=${endDate}`,
				'GET',
				true
			);

			const filterResponse = () => {
				const res = rs.map(lab => {
					const filtered = lab.requestBody.groups.filter(group => {
						const filt = group.parameters.some(param => param.result === '');
						return filt;
					});
					return filtered && filtered.length ? lab : [];
				});
				return res && res.length ? res : null;
			};
			const newResp = filterResponse().filter(fil => fil.length !== 0);

			this.props.loadClinicalLab(newResp);
			return this.setState({ ...this.state, loading: false });
		} catch (error) {
			this.setState({ ...this.state, loading: false });
		}
	};

	onModalClick = () => {
		this.setState({
			showModal: !this.state.showModal,
		});
	};

	dateChange = e => {
		let date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		this.setState({
			...this.state,
			startDate: date[0],
			endDate: date[1],
		});
	};

	filterEntries = () => {
		this.setState({ filtering: true });
		this.fetchClinicalLab(this.state.patientId);
	};

	modalFunction = lab => {
		this.onModalClick();
		this.setState({ activeRequest: lab });
	};

	render() {
		const { clinicalLab } = this.props;
		const { loading, filtering } = this.state;

		const filteredNames =
			this.props && this.props.clinicalLab && this.props.clinicalLab.length
				? this.props.clinicalLab.map(patient => {
						return {
							value: patient.patient_id,
							label: patient.patient_name,
						};
				  })
				: [];

		const filteredOptions = uniqBy(filteredNames, 'value');

		const customStyle = {
			control: (provided, state) => ({
				...provided,
				minHeight: '24px !important',
				height: '2rem',
				width: '12rem',
			}),
		};

		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">Clinical Lab</h6>
					<div className="row">
						<div className="col-sm-12">
							<div className="element-content">
								<div className="row">
									{this.state.activeRequest ? (
										<ModalClinicalLab
											activeRequest={this.state.activeRequest}
											showModal={this.state.showModal}
											onModalClick={this.onModalClick}
										/>
									) : null}
									<div className="col-sm-4 col-xxxl-4">
										<a className="element-box el-tablo">
											<div className="label">Pending Requests</div>
											<div className="value">57</div>
										</a>
									</div>
									<div className="col-sm-4 col-xxxl-4">
										<a className="element-box el-tablo">
											<div className="label">Pending Approval</div>
											<div className="value text-center">457</div>
										</a>
									</div>
									<div className="col-sm-4 col-xxxl-4">
										<a className="element-box el-tablo">
											<div className="label">Completed Requests</div>
											<div className="value">125</div>
										</a>
									</div>
								</div>
							</div>
						</div>
						<div className="col-sm-12">
							<div className="element-wrapper">
								<h6 className="element-header">Recent Requests</h6>
								<form className="row">
									<div className="form-group col-md-6">
										<label>From - To</label>
										<RangePicker onChange={e => this.dateChange(e)} />
									</div>
									<div className="form-group col-md-3">
										<label className="mr-2 " htmlFor="id">
											Patient
										</label>
										<Select
											styles={customStyle}
											id="patientId"
											isSearchable={true}
											name="patientId"
											options={filteredOptions}
											onChange={e => this.setState({ patientId: e.value })}
										/>
									</div>
									<div className="form-group col-md-3 mt-4">
										<div
											className="btn btn-sm btn-primary btn-upper text-white filter-btn"
											onClick={() => {
												this.filterEntries();
											}}>
											<i className="os-icon os-icon-ui-37" />
											<span>
												{filtering ? (
													<img src={waiting} alt="submitting" />
												) : (
													'Filter'
												)}
											</span>
										</div>
									</div>
								</form>
								<div className="element-box">
									<div className="table table-responsive">
										<table
											id="table"
											className="table table-theme v-middle table-hover">
											<thead>
												<tr>
													<th>
														<div className="th-inner "></div>
														<div className="fht-cell"></div>
													</th>
													<th>
														<div className="th-inner sortable both">S/N</div>
														<div className="fht-cell"></div>
													</th>
													<th>
														<div className="th-inner sortable both">
															Request Date
														</div>
														<div className="fht-cell"></div>
													</th>
													<th>
														<div className="th-inner sortable both">
															Patient Name
														</div>
														<div className="fht-cell"></div>
													</th>
													<th>
														<div className="th-inner sortable both">
															Request By
														</div>
														<div className="fht-cell"></div>
													</th>
													<th>
														<div className="th-inner "></div>
														<div className="fht-cell"></div>
													</th>
												</tr>
											</thead>

											{loading ? (
												<tbody>
													<tr>
														<td colSpan="4" className="text-center">
															<img alt="searching" src={searchingGIF} />
														</td>
													</tr>
												</tbody>
											) : (
												<tbody>
													{clinicalLab &&
														clinicalLab.map((lab, index) => {
															return (
																<ClinicalLabItem
																	key={lab.id}
																	lab={lab}
																	index={index}
																	modalClick={LAB =>
																		this.modalFunction(LAB, index)
																	}
																/>
															);
														})}
												</tbody>
											)}
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		clinicalLab: state.patient.clinicalLab,
	};
};
export default connect(mapStateToProps, { loadClinicalLab })(ClinicalLab);
