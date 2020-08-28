/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import capitalize from 'lodash.capitalize';
import { uploadHmoTariff, uploadHmo } from '../actions/general';
import { notifyError } from '../services/notify';
import { API_URI, hmoAPI } from '../services/constants';
import searchingGIF from '../assets/images/searching.gif';
import { getAllHmos, fetchHmoTariff } from '../actions/hmo';
import { formatNumber } from '../services/utilities';

const HmoBulkUpload = props => {
	const initialState = {
		selectedHmo: null,
	};
	const urlParam = new URLSearchParams(props.location.search);
	const selected = urlParam.get('selected');

	const [{ selectedHmo }, setState] = useState(initialState);
	const [loading, setLoading] = useState(true);
	const [services, setServices] = useState([]);
	const [filtered, setFiltered] = useState([]);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState({ [name]: value });
		setLoading(true);
		getTariffs(value);
	};

	useEffect(() => {
		if (selected) {
			setState({ selectedHmo: selected });
			getTariffs(selected);
		} else {
			setLoading(false);
		}
	}, [selected]);

	useEffect(() => {
		props
			.getAllHmos()
			.then(response => {})
			.catch(e => {
				console.log(e);
				notifyError(e.message || 'could not fetch lab tests');
			});
	}, []);

	const getTariffs = selected => {
		props
			.fetchHmoTariff(selected)
			.then(response => {
				setServices(response);
				setFiltered(response);
				setLoading(false);
			})
			.catch(error => {
				console.log(error);
				setLoading(false);
			});
	};

	const hmos = props.hmoList.map(hmo => {
		return { label: capitalize(hmo.name), value: hmo.id };
	});

	const doFilter = e => {
		const value = e.target.value;
		if (value.length > 3) {
			setFiltered(
				services.filter(item =>
					item.name.toLowerCase().includes(value.toLowerCase())
				)
			);
		}
		if (value.length === 0) {
			setFiltered(services);
		}
	};
	return (
		<div className="content-i">
			<div className="content-box">
				<div className="element-wrapper">
					<div className="element-actions">
						<a
							className="btn btn-success btn-sm"
							onClick={() => props.uploadHmoTariff(true)}
							href="#">
							<i className="os-icon os-icon-grid-10"></i>
							<span>Upload HMO Services</span>
						</a>
						<a
							className="btn btn-primary btn-sm"
							href={`${API_URI}/${hmoAPI}/download-tariff-sample?downloadType=services`}
							download>
							<i className="os-icon os-icon-ui-22"></i>
							<span>Download Sample</span>
						</a>
					</div>
					<h6 className="element-header">HMO Services</h6>

					<div className="pipelines-w">
						<div className="row">
							<div className="col-lg-12 col-xxl-12">
								<div className="element-wrapper">
									<div className="element-box-tp">
										<div className="controls-above-table">
											<div className="row">
												<div className="col-sm-4">
													<form className="form-inline justify-content-sm-start">
														<input
															type="text"
															style={{ width: '100%' }}
															onChange={doFilter}
															placeholder="Search by service Name"
															className="form-control form-control-sm full-width rounded"
														/>
													</form>
												</div>
												<div className="col-sm-4"></div>
												<div className="col-sm-4">
													<form className="form-inline justify-content-sm-end">
														<label className="mr-2">Select HMO</label>
														<select
															className="form-control form-control-sm rounded bright"
															name="selectedHmo"
															value={selectedHmo}
															onChange={handleInputChange}>
															{hmos.map((hmo, i) => {
																return (
																	<option key={i} value={hmo.value}>
																		{hmo.label}
																	</option>
																);
															})}
														</select>
													</form>
												</div>
											</div>
										</div>
										<div className="table-responsive">
											<table className="table table-padded">
												<thead>
													<tr>
														<th>Code</th>
														<th>Service</th>
														<th>rate</th>
														<th>Coverage</th>
														<th>Discount</th>
														<th>Actions</th>
													</tr>
												</thead>
												<tbody>
													{loading ? (
														<tr>
															<td colSpan="6" className="text-center">
																<img alt="searching" src={searchingGIF} />
															</td>
														</tr>
													) : (
														<>
															{filtered.map((hmo, i) => {
																return (
																	<tr key={i}>
																		<td>
																			<div className="smaller lighter">
																				{i + 1}
																			</div>
																		</td>
																		<td>
																			<div className="smaller">{hmo.name}</div>
																		</td>
																		<td>
																			<span>{formatNumber(hmo.rate)}</span>
																		</td>

																		<td className="nowrap">
																			<span>{hmo.percentage}%</span>
																		</td>
																		<td className="nowrap">
																			<span>
																				{hmo.discount
																					? formatNumber(hmo.discount)
																					: 0}
																			</span>
																		</td>
																		<td className="row-actions">
																			<a href="#">
																				<i
																					className="os-icon os-icon-grid-10"
																					onClick={() => alert(hmo)}></i>
																			</a>
																			<a href="#">
																				<i className="os-icon os-icon-ui-44"></i>
																			</a>
																			<a className="danger">
																				<i
																					className="os-icon os-icon-ui-15"
																					onClick={() => alert(hmo)}></i>
																			</a>
																		</td>
																	</tr>
																);
															})}

															{!loading && filtered.length < 1 ? (
																<tr>
																	<td colSpan="7" className="text-center">
																		No Tariff has been uploaded
																	</td>
																</tr>
															) : null}
														</>
													)}
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div>
									<div></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		hmoList: state.hmo.hmo_list,
	};
};

export default connect(mapStateToProps, {
	uploadHmoTariff,
	uploadHmo,
	getAllHmos,
	fetchHmoTariff,
})(HmoBulkUpload);
