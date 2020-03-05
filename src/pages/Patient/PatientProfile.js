/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleProfile } from '../../actions/user';
import background from '../../assets/images/b3.jpeg';
import profilepix from '../../assets/images/a6.jpeg';

class PatientProfile extends Component {
	componentDidMount() {
		// fetch profile
	}

	render() {
		const { userID } = this.props;
		return (
			<div className="layout-w">
				<button aria-label="Close" className="close" type="button" onClick={() => this.props.toggleProfile(false)}>
					<span className="os-icon os-icon-close"></span>
				</button>
				<div className="menu-w selected-menu-color-light menu-activated-on-hover menu-has-selected-link color-scheme-dark color-style-bright sub-menu-color-bright menu-position-side menu-side-left menu-layout-compact sub-menu-style-over">
					<ul className="main-menu">
						<li className="sub-header">
							<span>Encounter</span>
						</li>
						<li>
							<a href="index.html">
								<div className="icon-w">
									<div className="os-icon os-icon-layout"></div>
								</div>
								<span>Start Encounter</span>
							</a>
						</li>
						<li className="sub-header">
							<span>General</span>
						</li>
						<li className="sub-header">
							<span>Enroll</span>
						</li>
						<li>
							<a href="layouts_menu_top_image.html">
								<div className="icon-w">
									<div className="os-icon os-icon-layers"></div>
								</div>
								<span>Antenatal</span>
							</a>
						</li>
						<li>
							<a href="layouts_menu_top_image.html">
								<div className="icon-w">
									<div className="os-icon os-icon-layers"></div>
								</div>
								<span>Immunization</span>
							</a>
						</li>
						<li>
							<a href="layouts_menu_top_image.html">
								<div className="icon-w">
									<div className="os-icon os-icon-layers"></div>
								</div>
								<span>IVF</span>
							</a>
						</li>
					</ul>
				</div>
				<div className="content-w">
					<div className="top-bar color-scheme-transparent"></div>
					<div className="content-i">
						<div className="content-box">
							<div className="row">
								<div className="col-sm-12">
									<div className="card-header bg-dark bg-img p-0 no-border" style={{backgroundImage: `url(${background})`, backgroundPosition: '50% -114.052px'}}>
										<div className="bg-dark-overlay r-2x no-r-b">
											<div className="d-md-flex">
												<div className="p-4">
													<div className="d-flex">
														<a href="#">
															<span className="avatar w-64"><img src={profilepix} alt="" /> <i className="on"></i></span>
														</a>
														<div className="mx-3">
															<h5 className="mt-2">Jacqueline Reid</h5>
															<div className="text-fade text-sm">
																<span className="m-r">Senior Industrial Designer</span> <small><i className="fa fa-map-marker mr-2"></i> London, UK</small>
															</div>
														</div>
													</div>
												</div>
												<span className="flex"></span>
												<div className="align-items-center d-flex p-4"></div>
											</div>
										</div>
									</div>
									<div className="p-3">
										<div className="d-flex">
											<ul className="nav nav-pills">
												<li className="nav-item button-space">
													<a className="btn btn-primary" href="#"><i className="os-icon os-icon-documents-03"></i><span>Upload Document</span></a>
												</li>
												<li className="nav-item button-space">
													<a className="btn btn-grey" href="#"><i className="os-icon os-icon-log-out"></i><span>Other Details</span></a>
												</li>
												<li className="nav-item button-space">
													<a className="btn btn-grey" href="#"><i className="os-icon os-icon-edit"></i><span>Edit Profile</span></a>
												</li>
												<li className="nav-item button-space">
													<a className="btn btn-grey d-sm-inline-block" href="#"><i className="os-icon os-icon-plus-circle"></i><span>Request Admission</span></a>
												</li>
												<li className="nav-item button-space">
													<a className="btn btn-grey d-sm-inline-block" href="#"><i className="os-icon os-icon-plus-circle"></i><span>Enroll Antenatal</span></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col-sm-3">
									<div className="user-profile compact">
										<div className="up-contents">
											<div className="m-b">
												<div className="row m-b">
													<div className="col-sm-12 b-r b-b">

													</div>
												</div>
												<div className="element-balances justify-content-between mobile-full-width">
													<div className="balance balance-v2">
														<div className="balance-title">
															Outstanding balance
														</div>
														<div className="balance-value">
															<span className="d-xxl-none">‎72,245</span><span className="d-none d-xxl-inline-block">171,473</span><span className="trending trending-down-basic"><span>NGN</span><i className="os-icon os-icon-arrow-2-down"></i></span>
														</div>
													</div>
												</div>
												<div className="element-box-tp">
													<table className="table table-clean">
														<tbody>
															<tr>
																<td>
																	<div className="value">
																		Gender
																	</div>
																</td>
																<td className="text-right">
																	<div className="value text-success">
																		Female
																	</div>

																</td>
															</tr>
															<tr>
																<td>
																	<div className="value">
																		Date of Birth
																	</div>
																</td>
																<td className="text-right">
																	<div className="value text-success">
																		03 Mar 20
																	</div>

																</td>
															</tr>
															<tr>
																<td>
																	<div className="value">
																		Insurance Status
																	</div>

																</td>
																<td className="text-right">
																	<div className="value text-success">
																		Private
																	</div>

																</td>
															</tr>
															<tr>
																<td>
																	<div className="value">
																		Admission
																	</div>
																</td>
																<td className="text-right">
																	<div className="value text-success">
																		No
																	</div>

																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-sm-9">
									<div className="element-wrapper">
										<div className="element-box">
											&nbsp;
										</div>
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

const mapStateToProps = (state, ownProps) => {
	return {
		userID: state.user.userID,
		patient: state.user.patient,
	}
};

export default connect(mapStateToProps, { toggleProfile })(PatientProfile);
