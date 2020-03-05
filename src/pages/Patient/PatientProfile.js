/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleProfile } from '../../actions/user';
import background from '../../assets/images/b3.jpeg';
import profilepix from '../../assets/images/a6.jpeg';
import PatientData from '../../components/PatientData';
import PatientMenu from '../../components/Navigation/PatientMenu';

class PatientProfile extends Component {
	render() {
		const { patient } = this.props;
		return (
			<div className="layout-w">
				<button aria-label="Close" className="close" type="button" onClick={() => this.props.toggleProfile(false)}>
					<span className="os-icon os-icon-close"></span>
				</button>
				<PatientMenu />
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
															<h5 className="mt-2">{`${patient.surname} ${patient.other_names}`}</h5>
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
													<a className="btn btn-grey" href="#"><i className="os-icon os-icon-edit"></i><span>Edit Profile</span></a>
												</li>
												<li className="nav-item button-space">
													<a className="btn btn-info d-sm-inline-block text-white" href="#"><i className="os-icon os-icon-plus-circle"></i><span>Request Admission</span></a>
												</li>
												<li className="nav-item button-space">
													<a className="btn btn-grey d-sm-inline-block" href="#"><i className="os-icon os-icon-plus-circle"></i><span>Enroll Antenatal</span></a>
												</li>
												<li className="nav-item button-space">
													<a className="btn btn-grey d-sm-inline-block" href="#"><i className="os-icon os-icon-plus-circle"></i><span>Enroll Immunization</span></a>
												</li>
												<li className="nav-item button-space">
													<a className="btn btn-grey d-sm-inline-block" href="#"><i className="os-icon os-icon-plus-circle"></i><span>Enroll IVF</span></a>
												</li>
												<li className="nav-item button-space">
													<a className="btn btn-primary" href="#"><i className="os-icon os-icon-documents-03"></i><span>Upload Document</span></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col-sm-3">
									<div className="user-profile compact">
										<div className="up-contents">
											<PatientData patient={patient}/>
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
		patient: state.user.patient,
	}
};

export default connect(mapStateToProps, { toggleProfile })(PatientProfile);
