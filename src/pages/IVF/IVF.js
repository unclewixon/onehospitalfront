/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
import { connect } from 'react-redux';
import { Switch, Link, withRouter, Route } from 'react-router-dom';
import { patientAPI, transactionsAPI, API_URI } from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import { request } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';
import moment from 'moment';
import { loadAntennatal } from '../../actions/patient';
import { viewAntenatalDetail } from '../../actions/general';
import _ from 'lodash';
export class IVF extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		status: '',
	};

	componentDidMount() {}

	render() {
		const { filtering, loading } = this.state;
		const { location } = this.props;
		const page = location.pathname.split('/').pop();
		return (
			<div className="col-sm-12">
				<br />
				<div className="element-wrapper">
					<div className="element-actions">
						<Link
							className={`btn btn-primary ${
								page === '' ? 'btn-outline-primary' : ''
							}`}
							to="/ivf">
							Dashboard
						</Link>
						<Link
							className={`btn btn-primary ${
								page === 'reg-chart' ? 'btn-outline-primary' : ''
							}`}
							to="/ivf/reg-chart">
							Down Regulation Chart
						</Link>
						<Link
							className={`btn btn-primary ${
								page === 'hcg-admin' ? 'btn-outline-primary' : ''
							}`}
							to="/ivf/hcg-admin">
							HCG Administration
						</Link>

						<Link
							className={`btn btn-primary ${
								page === 'enrol' ? 'btn-outline-primary' : ''
							}`}
							to="/ivf/enrol">
							New Enrollment
						</Link>
					</div>
					<h6 className="element-header">IVF Dashboard</h6>
					<div className="row">
						<div className="col-md-12">
							<div className="element-content">
								<div className="row">
									<div className="col-sm-4 col-xxxl-4">
										<a className="element-box el-tablo">
											<div className="label">TOTAL OPEN</div>
											<div className="value text-center">57</div>
										</a>
									</div>
									<div className="col-sm-4 col-xxxl-4">
										<a className="element-box el-tablo">
											<div className="label">TOTAl FILLED</div>
											<div className="value text-center">457</div>
										</a>
									</div>
									<div className="col-sm-4 col-xxxl-4">
										<a className="element-box el-tablo">
											<div className="label">LOW STOCK</div>
											<div className="value text-center">125</div>
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-12">
							<div className="element-box">
								<div className="table table-responsive"></div>
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
		antennatal: state.patient.antennatal,
	};
};

export default withRouter(
	connect(mapStateToProps, { loadAntennatal, viewAntenatalDetail })(IVF)
);
