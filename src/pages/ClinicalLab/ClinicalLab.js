import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ClinicalLabItem from '../../components/ClinicalLabItem';
import { request } from '../../services/utilities';
import { API_URI, patientAPI } from '../../services/constants';
import { loadClinicalLab } from '../../actions/patient';
import searchingGIF from '../../assets/images/searching.gif';
import moment from 'moment';
import _ from 'lodash';

class ClinicalLab extends Component {
	state = {
		loading: false,
	};
	componentDidMount() {
		this.fetchClinicalLab();
	}

	fetchClinicalLab = async () => {
		try {
			this.setState({ ...this.state, loading: true });

			let today = moment().format('YYYY-MM-DD');
			const rs = await request(
				`${API_URI}${patientAPI}/requests/lab?startDate=${today}=&endDate=${today}`,
				'GET',
				true
			);
			this.props.loadClinicalLab(rs);
			this.setState({ ...this.state, loading: false });
		} catch (error) {
			console.log(error);
			this.setState({ ...this.state, loading: false });
		}
	};
	render() {
		const { location, clinicalLab } = this.props;
		const { loading } = this.state;
		const page = location.pathname.split('/').pop();
		console.log(clinicalLab);

		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<div className="element-actions">
						<Link
							className={`btn btn-primary ${
								page === '/' ? 'btn-outline-primary' : ''
								}`}
							to="/lab">
							Dashboard
						</Link>
						<Link
							to={`/lab/recent-request`}
							className={`btn btn-primary ${
								page === '/recent-request' ? 'btn-outline-primary' : ''
								}`}>
							{' '}
										Recent Request
									</Link>
						<Link
							to={`/lab/filled-request`}
							className={`btn btn-primary ${
								page === '/filled-request' ? 'btn-outline-primary' : ''
								}`}>
							{' '}
										Filled Request
									</Link>
						<Link
							className={`btn btn-primary ${
								page === '/all-request' ? 'btn-outline-primary' : ''
								}`}
							to="/lab/all-request">
							All Request
						</Link>
						<Link
							className={`btn btn-primary ${
								page === '/lab-request' ? 'btn-outline-primary' : ''
								}`}
							to="/lab/lab-request">
							New Lab Request
						</Link>
					</div>
					<h6 className="element-header">Lab</h6>
					<div className="row">
						<div className="col-sm-12">
							<div className="element-content">
								<div className="row">
									<div className="col-sm-4 col-xxxl-4">
										<Link className="element-box el-tablo">
											<div className="label">Pending Requests</div>
											<div className="value">57</div>
										</Link>
									</div>
									<div className="col-sm-4 col-xxxl-4">
										<Link className="element-box el-tablo">
											<div className="label">Pending Approval</div>
											<div className="value text-center">457</div>
										</Link>
									</div>
									<div className="col-sm-4 col-xxxl-4">
										<Link className="element-box el-tablo">
											<div className="label">Completed Requests</div>
											<div className="value">125</div>
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-sm-12">
							<div className="element-wrapper">
								<h6 className="element-header">Incomplete</h6>
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
														<div className="th-inner sortable both">
															Request Date
														</div>
														<div className="fht-cell"></div>
													</th>
													<th>
														<div className="th-inner sortable both">
															Patiend ID
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
											<tbody>
												{loading ? (
													<tr>
														<td colSpan="4" className="text-center">
															<img alt="searching" src={searchingGIF} />
														</td>
													</tr>
												) : null}
												{clinicalLab &&
													clinicalLab.map(lab => {
														return <ClinicalLabItem key={lab.id} lab={lab} />;
													})}
											</tbody>
										</table>
										{!_.isEmpty(clinicalLab) ? null : (
											<div className="text-center">No clinical Lab request</div>
										)}
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
