import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

const Tab = ({ match, location }) => {
	// const page = location.pathname.split('/').pop();

	return (
		<div className="header">
			<div className="content-i">
				<div className="content-box">
					<div className="os-tabs-w">
						<div className="os-tabs-controls os-tabs-complex">
							<ul className="nav nav-tabs" style={{ justifyContent: 'center' }}>
								<li className="nav-item">
									<a
										aria-expanded="false"
										className="nav-link"
										data-toggle="tab"
										href="#tab_overview">
										<span className="tab-label">Your Portfolio</span>
										<span className="badge badge-success">
											<i className="os-icon os-icon-arrow-up6" />
											<span>22%</span>
										</span>
									</a>
								</li>
								<li className="nav-item">
									<a
										aria-expanded="false"
										className="nav-link"
										data-toggle="tab"
										href="#tab_sales">
										<span className="tab-label">Bitcoin</span>
										<span className="tab-value">$7,839.23</span>
										<span className="badge badge-success">
											<i className="os-icon os-icon-arrow-up6" />
											<span>25%</span>
										</span>
									</a>
								</li>
								<li className="nav-item">
									<a
										aria-expanded="false"
										className="nav-link active show"
										data-toggle="tab"
										href="#tab_sales">
										<span className="tab-label">Etherium</span>
										<span className="tab-value">$839.11</span>
										<span className="badge badge-danger">
											<i className="os-icon os-icon-arrow-down6"></i>
											<span>5%</span>
										</span>
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div style={{ display: 'flex' }}>
						<div className="one-third" style={{ marginTop: '20px' }}>
							<ul className="boxed gold">
								<li className="{page === 'proteintable' ? 'active' : '' >}light">
									<span>
										<Link to="/tab/proteintable">Protein</Link>
									</span>

									<i className="icon icon-themeenergy_crown" />
									{/* <span>Recipe</span> */}
									{/* </a> */}
								</li>

								<li className="medium">
									{/* <a href="#" title="Was featured"> */}
									<span>
										<Link to="/">Carbohydrate</Link>
									</span>
									<i className="icon icon-themeenergy_top-rankings" />
									{/* <span>Carbohydrate</span> */}
									{/* </a> */}
								</li>
								<li className="dark">
									{/* <a href="#" title="Added a first recipe"> */}
									<span>
										<Link to="/">Vitamins</Link>
									</span>

									<i className="icon  icon-themeenergy_medal-first-place" />
									{/* <span>Protein</span> */}
									{/* </a> */}
								</li>
								<li className="medium">
									{/* <a href="#" title="Added 10-20 recipes"> */}
									<span>
										<Link to="/">Fats</Link>
									</span>
									<i className="icon icon-themeenergy_medal-8" />
									{/* <span>Vitamins</span> */}
									{/* </a> */}
								</li>
								<li className="dark">
									{/* <a href="recipes.html" title="Events"> */}
									<span>
										<Link to="/">Suagar</Link>
									</span>
									<i className="icon icon-themeenergy_pencil" />
									{/* <span>Vegetables</span> */}
									{/* </a> */}
								</li>
								<li className="light">
									<a href="recipes.html" title="Fish">
										<i className="icon icon-themeenergy_chat-bubbles" />
										<span>Energy</span>
									</a>
								</li>
								<li className="dark">
									<a href="recipes.html" title="Fish">
										<i className="icon icon-themeenergy_cup2" />
										<span>Strength</span>
									</a>
								</li>
								<li className="light">
									<a href="recipes.html" title="Healthy">
										<i className="icon icon-themeenergy_share3" />
										<span>Sugar</span>
									</a>
								</li>
								<li className="medium">
									<a href="#" title="Was featured">
										<i className="icon icon-themeenergy_top-rankings" />
										<span>Categories</span>
									</a>
								</li>
							</ul>
						</div>

						<div className="element-wrapper">
							<div
								className="element-box"
								style={{ padding: '1.5rem 2rem', marginBottom: '2rem' }}>
								<div
									className="table-responsive"
									style={{ border: '1px solid rgba(83, 101, 140, 0.33)' }}>
									<table className="table table-striped">
										<thead>
											<tr>
												<th>Customer Name</th>
												<th>Orders</th>
												<th>Location</th>
												<th className="text-center">Status</th>
												<th className="text-right">Order Total</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>John Mayers</td>
												<td>12</td>
												<td>
													<img
														alt=""
														src="img/flags-icons/us.png"
														width="25px"
													/>
												</td>
												<td className="text-center">
													<div
														className="status-pill green"
														data-title="Complete"
														data-toggle="tooltip"
														data-original-title
														title
													/>
												</td>
												<td className="text-right">$354</td>
											</tr>
											<tr>
												<td>Kelly Brans</td>
												<td>45</td>
												<td>
													<img
														alt=""
														src="img/flags-icons/ca.png"
														width="25px"
													/>
												</td>
												<td className="text-center">
													<div
														className="status-pill red"
														data-title="Cancelled"
														data-toggle="tooltip"
														data-original-title
														title></div>
												</td>
												<td className="text-right">$94</td>
											</tr>
											<tr>
												<td>Tim Howard</td>
												<td>112</td>
												<td>
													<img
														alt=""
														src="img/flags-icons/uk.png"
														width="25px"
													/>
												</td>
												<td className="text-center">
													<div
														className="status-pill green"
														data-title="Complete"
														data-toggle="tooltip"
														data-original-title
														title></div>
												</td>
												<td className="text-right">$156</td>
											</tr>
											<tr>
												<td>Joe Trulli</td>
												<td>1,256</td>
												<td>
													<img
														alt=""
														src="img/flags-icons/es.png"
														width="25px"
													/>
												</td>
												<td className="text-center">
													<div
														className="status-pill yellow"
														data-title="Pending"
														data-toggle="tooltip"
														data-original-title
														title></div>
												</td>
												<td className="text-right">$1,120</td>
											</tr>
											<tr>
												<td>Fred Kolton</td>
												<td>74</td>
												<td>
													<img
														alt=""
														src="img/flags-icons/fr.png"
														width="25px"
													/>
												</td>
												<td className="text-center">
													<div
														className="status-pill green"
														data-title="Complete"
														data-toggle="tooltip"
														data-original-title
														title></div>
												</td>
												<td className="text-right">$74</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-2 d-none d-xxl-block">
							<div className="element-box less-padding">
								<h6 className="element-box-header text-center">
									Portfolio Distribution
								</h6>
								<div className="el-chart-w">
									<canvas
										height={0}
										id="donutChart1"
										width={0}
										className="chartjs-render-monitor"
										style={{ display: 'block', width: '0px', height: '0px' }}
									/>
									<div className="inside-donut-chart-label">
										<strong>263</strong>
										<span>Coins</span>
									</div>
								</div>
								<div className="el-legend condensed">
									<div className="row">
										<div className="col-auto col-xxxxl-6 ml-sm-auto mr-sm-auto">
											<div className="legend-value-w">
												<div
													className="legend-pin legend-pin-squared"
													style={{ backgroundColor: '#6896f9' }}
												/>
												<div className="legend-value">
													<span>Bitcoins</span>
													<div className="legend-sub-value">17%, 12 Coins</div>
												</div>
											</div>
											<div className="legend-value-w">
												<div
													className="legend-pin legend-pin-squared"
													style={{ backgroundColor: '#85c751' }}
												/>
												<div className="legend-value">
													<span>Litecoin</span>
													<div className="legend-sub-value">22%, 0.3 Coins</div>
												</div>
											</div>
										</div>
										<div className="col-sm-6 d-none d-xxxxl-block">
											<div className="legend-value-w">
												<div
													className="legend-pin legend-pin-squared"
													style={{ backgroundColor: '#806ef9' }}
												/>
												<div className="legend-value">
													<span>Etherium</span>
													<div className="legend-sub-value">3%, 7 Coins</div>
												</div>
											</div>
											<div className="legend-value-w">
												<div
													className="legend-pin legend-pin-squared"
													style={{ backgroundColor: '#d97b70' }}
												/>
												<div className="legend-value">
													<span>Ripple</span>
													<div className="legend-sub-value">15%, 4 Coins</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-sm-4 d-none d-lg-block"></div>
					</div>
				</div>

				<div className="content-panel compact color-scheme-dark">
					<div className="content-panel-close">
						<i className="os-icon os-icon-close"></i>
					</div>
					<div className="element-wrapper">
						<div className="element-actions actions-only">
							<a className="element-action element-action-fold" href="#">
								<i className="os-icon os-icon-minus-circle"></i>
							</a>
						</div>

						<h6 className="element-header">Quick Conversion</h6>
						<div className="element-box-tp">
							<form action="#">
								<div className="row">
									<div className="col-6">
										<div className="form-group">
											<label htmlFor>From</label>
											<select className="form-control">
												<option>Bitcoins</option>
												<option>Litecoins</option>
												<option>Ripple</option>
												<option>Dogecoin</option>
											</select>
										</div>
									</div>
									<div className="col-6">
										<div className="form-group">
											<label htmlFor>To</label>
											<select className="form-control">
												<option>USD</option>
												<option>Litecoins</option>
												<option>Ripple</option>
												<option>Dogecoin</option>
											</select>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-6">
										<div className="form-group">
											<label htmlFor>Amount</label>
											<div className="input-group">
												<input
													className="form-control"
													placeholder="Amount..."
													type="text"
													defaultValue="1.37"
												/>
												<div className="input-group-append">
													<div className="input-group-text">BTC</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-6">
										<div className="form-group">
											<label htmlFor>Price per BTC</label>
											<div className="input-group">
												<input
													className="form-control"
													type="text"
													defaultValue="8,284"
												/>
												<div className="input-group-append">
													<div className="input-group-text">USD</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<button className="btn btn-primary btn-block btn-lg">
									<i className="os-icon os-icon-refresh-ccw" />
									<span>Transfer Now</span>
								</button>
							</form>
						</div>
					</div>
					<div className="element-wrapper compact">
						<div className="element-actions actions-only">
							<a className="element-action element-action-fold" href="#">
								<i className="os-icon os-icon-minus-circle"></i>
							</a>
						</div>
						<h6 className="element-header" style={{ marginTop: '3rem' }}>
							Order History
						</h6>
						<div className="element-box-tp">
							<table className="table table-compact smaller text-faded mb-0">
								<thead>
									<tr>
										<th>Type</th>
										<th className="text-center">Date</th>
										<th className="text-right">Amount</th>
										<th className="text-right">Fee</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<span>BTC</span>
											<i className="os-icon os-icon-repeat icon-separator" />
											<span>USD</span>
										</td>
										<td className="text-center">01.08</td>
										<td className="text-right text-bright">$25.38</td>
										<td className="text-right text-danger">-$1.23</td>
									</tr>
									<tr>
										<td>
											<span>RPX</span>
											<i className="os-icon os-icon-repeat icon-separator" />
											<span>ETH</span>
										</td>
										<td className="text-center">01.07</td>
										<td className="text-right text-bright">$15.21</td>
										<td className="text-right text-danger">-$1.13</td>
									</tr>
									<tr>
										<td>
											<span>LTC</span>
											<i className="os-icon os-icon-repeat icon-separator"></i>
											<span>BTC</span>
										</td>
										<td className="text-center">01.05</td>
										<td className="text-right text-bright">$17.43</td>
										<td className="text-right text-danger">-$2.14</td>
									</tr>
									<tr>
										<td>
											<span>PRX</span>
											<i className="os-icon os-icon-repeat icon-separator"></i>
											<span>LTC</span>
										</td>
										<td className="text-center">01.05</td>
										<td className="text-right text-bright">$23.18</td>
										<td className="text-right text-danger">-$3.17</td>
									</tr>
									<tr>
										<td>
											<span>ETH</span>
											<i className="os-icon os-icon-repeat icon-separator" />
											<span>USD</span>
										</td>
										<td className="text-center">01.04</td>
										<td className="text-right text-bright">$35.42</td>
										<td className="text-right text-danger">-$3.12</td>
									</tr>
									<tr>
										<td>
											<span>BTC</span>
											<i className="os-icon os-icon-repeat icon-separator" />
											<span>ETH</span>
										</td>
										<td className="text-center">01.02</td>
										<td className="text-right text-bright">$72.62</td>
										<td className="text-right text-danger">-$4.15</td>
									</tr>
									<tr>
										<td>
											<span>RPX</span>
											<i className="os-icon os-icon-repeat icon-separator" />
											<span>USD</span>
										</td>
										<td className="text-center">12.29</td>
										<td className="text-right text-bright">$25.38</td>
										<td className="text-right text-danger">-$1.23</td>
									</tr>
									<tr>
										<td>
											<span>ETH</span>
											<i className="os-icon os-icon-repeat icon-separator" />
											<span>BTC</span>
										</td>
										<td className="text-center">12.28</td>
										<td className="text-right text-bright">$52.11</td>
										<td className="text-right text-danger">-$4.72</td>
									</tr>
								</tbody>
							</table>
							<a className="centered-load-more-link smaller" href="#">
								<span>Load More Transactions</span>
							</a>
						</div>
					</div>
					<div className="element-wrapper compact">
						<div className="element-actions actions-only">
							<a className="element-action element-action-fold" href="#">
								<i className="os-icon os-icon-minus-circle"></i>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Tab;
