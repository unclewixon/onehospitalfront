/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import capitalize from 'lodash.capitalize';
import Pagination from 'antd/lib/pagination';

import { notifyError } from '../services/notify';
import searchingGIF from '../assets/images/searching.gif';
import { getAllHmos, fetchHmoTariff } from '../actions/hmo';
import { formatNumber, request, itemRender } from '../services/utilities';
import { startBlock, stopBlock } from '../actions/redux-block';

const Tarrifs = props => {
	const initialState = {
		selectedHmo: null,
	};
	const urlParam = new URLSearchParams(props.location.search);
	const selected = urlParam.get('selected');
	const dispatch = useDispatch();
	const [{ selectedHmo }, setState] = useState(initialState);
	const [loading, setLoading] = useState(true);
	const [loaded, setLoaded] = useState(false);
	const [services] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [hmo, setHmo] = useState(1);
	const [meta, setMeta] = useState(null);

	const handleInputChange = e => {
		const { value } = e.target;
		setHmo(value);
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected]);

	useEffect(() => {
		props
			.getAllHmos()
			.then(response => {
				setState({ selectedHmo: response[0] });
			})
			.catch(e => {
				console.log(e);
				notifyError(e.message || 'could not fetch lab tests');
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onNavigatePage = nextPage => {
		dispatch(startBlock());
		fetch(hmo, nextPage);
	};

	const fetch = async (data, page) => {
		try {
			setLoaded(true);
			const p = page || 1;
			const url = `hmos/${data ||
				1}/tariff?listType=services&page=${p}&limit=25`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			setMeta(meta);
			const arr = [...result];
			setFiltered(arr);
			setLoading(false);
			setLoaded(true);
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			notifyError('error fetching tariff');
			setLoading(false);
			setLoaded(true);
			dispatch(stopBlock());
		}
	};

	useEffect(() => {
		if (!loaded) {
			fetch(1);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loaded]);

	const getTariffs = selected => {
		fetch(selected);
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
														<th>Amount</th>
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
																console.log(hmo);
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
																			<span>{formatNumber(hmo.tariff)}</span>
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

															{!loading && filtered.length < 1 && (
																<tr>
																	<td colSpan="7" className="text-center">
																		No Tariff has been uploaded
																	</td>
																</tr>
															)}
														</>
													)}
												</tbody>
											</table>

											{meta && (
												<div className="pagination pagination-center mt-4">
													<Pagination
														current={parseInt(meta.currentPage, 10)}
														pageSize={parseInt(meta.itemsPerPage, 10)}
														total={parseInt(meta.totalPages, 10)}
														showTotal={total => `Total ${total} transactions`}
														itemRender={itemRender}
														onChange={current => onNavigatePage(current)}
													/>
												</div>
											)}
										</div>
									</div>
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
	getAllHmos,
	fetchHmoTariff,
})(Tarrifs);
