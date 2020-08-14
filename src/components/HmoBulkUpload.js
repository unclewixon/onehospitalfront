/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { uploadHmoTariff, uploadHmo } from '../actions/general';
import { notifyError } from '../services/notify';
import { hmoAPI } from '../services/constants';
import searchingGIF from '../assets/images/searching.gif';
import { getAllHmos, fetchHmoTariff } from '../actions/hmo';

const HmoBulkUpload = props => {
	const initialState = {
		selectedHmo: null,
	};

	const [{ selectedHmo }, setState] = useState(initialState);
	const [loaded, setLoaded] = useState(false);
	const [dataLoaded, setDataLoaded] = useState(false);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState({ [name]: value });
		props
			.fetchHmoTariff(value)
			.then(response => {
				setDataLoaded(true);
			})
			.catch(error => {
				setDataLoaded(true);
			});
	};

	useEffect(() => {
		if (!loaded) {
			props
				.getAllHmos()
				.then(response => {})
				.catch(e => {
					console.log(e);
					notifyError(e.message || 'could not fetch lab tests');
				});
		}
		setLoaded(true);
	}, [loaded, props]);

	props
		.fetchHmoTariff(selectedHmo)
		.then(response => {
			setDataLoaded(true);
		})
		.catch(error => {
			console.log(error);
			setDataLoaded(true);
		});

	const hmos = props.hmoList.map(hmo => {
		return { label: hmo.name, value: hmo.id };
	});
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
												<div className="col-sm-12">
													<form className="form-inline justify-content-sm-end">
														<select
															className="form-control form-control-sm rounded bright"
															name="selectedHmo"
															value={selectedHmo}
															onChange={handleInputChange}>
															{hmos.map(hmo => {
																return (
																	<option value={hmo.value}>{hmo.label}</option>
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
														<th className="text-center">rate</th>
														<th>percentage</th>
														{/* <th>Discount</th> */}
														<th>Actions</th>
													</tr>
												</thead>
												<tbody>
													{!dataLoaded ? (
														<tr>
															<td colSpan="5" className="text-center">
																<img alt="searching" src={searchingGIF} />
															</td>
														</tr>
													) : (
														<>
															{props.hmoTariff.map((hmo, i) => {
																return (
																	<tr key={i}>
																		<td>
																			<div className="smaller lighter">
																				{i + 1}
																			</div>
																		</td>
																		<td>
																			<div className="smaller lighter">
																				{hmo.service.name}
																			</div>
																		</td>
																		<td>
																			<span>{hmo.rate}</span>
																		</td>

																		<td className="nowrap">
																			<span>{hmo.percentage}</span>
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
		hmoTariff: state.hmo.hmo_tariff,
	};
};

export default connect(mapStateToProps, {
	uploadHmoTariff,
	uploadHmo,
	getAllHmos,
	fetchHmoTariff,
})(HmoBulkUpload);
