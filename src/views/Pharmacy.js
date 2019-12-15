/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

// import avatar1 from '../assets/images/avatar1.jpg';
// import avatar2 from '../assets/images/avatar2.jpg';
// import avatar3 from '../assets/images/avatar3.jpg';
// import avatar4 from '../assets/images/avatar4.jpg';
// import usFlag from '../assets/images/flags-icons/us.png';
// import caFlag from '../assets/images/flags-icons/ca.png';
// import ukFlag from '../assets/images/flags-icons/uk.png';
import TopBar from '../components/TopBar';
import MainMenu from '../components/MainMenu';
import Queue from '../components/Queue';

class Pharmacy extends Component {
	componentDidMount() {
		window.document.body.className =
			'menu-position-side menu-side-left with-content-panel';
	}

	render() {
		return (
			<div className="all-wrapper with-side-panel solid-bg-all">
				<div className="layout-w">
					<MainMenu role="pharmacist" />
					<div className="content-w">
						<TopBar role="pharmacist" />
						<div className="content-i">
							<div className="content-box">
								<div className="content-box">
									<div className="row">
										<div className="col-sm-12">
											<div className="element-wrapper">
												<div className="element-actions">
													<form className="form-inline justify-content-sm-end">
														<select className="form-control form-control-sm rounded">
															<option value="Pending">Today</option>
															<option value="Active">Last Week</option>
															<option value="Cancelled">Last 30 Days</option>
														</select>
													</form>
												</div>
												<h6 className="element-header">Doctor Info</h6>
												<div className="element-content">
													<div className="row">
														<div className="col-sm-4 col-xxxl-3">
															<a className="element-box el-tablo" href="#">
																<div className="label">Appointments Seen</div>
																<div className="value">57</div>
																<div className="trending">
																	<span>Patients</span>
																</div>
															</a>
														</div>
														<div className="col-sm-4 col-xxxl-3">
															<a className="element-box el-tablo" href="#">
																<div className="label">Appointments Left</div>
																<div className="value">47</div>
																<div className="trending">
																	<span>Patients</span>
																</div>
															</a>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="content-panel compact">
								<Queue />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Pharmacy;
