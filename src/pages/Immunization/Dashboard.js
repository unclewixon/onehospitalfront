import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';
import { API_URI } from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import { request } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';
import { loadImmunization } from '../../actions/patient';

export class Dashboard extends Component {
	state = {
		loading: false,
	};
	componentDidMount() {
		// this.fetchImmunization();
	}

	fetchImmunization = () => {
		try {
			const rs = request();
			this.props.loadImmunization(rs);
		} catch (e) {
			notifyError('Cannot fetch immuninazation enrolment');
			this.setState({ loading: false });
		}
	};
	render() {
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<div className="element-actions"></div>
						<h6 className="element-header">
							Today's ({moment().format('DD-MMM-YYYY')}) Enrolment
						</h6>
						<div className="table-responsive">
							<table className="table table-striped">
								<thead>
									<tr>
										<th className="text-center">S/N</th>
										<th className="text-center">Patient Name</th>
										<th className="text-center">Date</th>
										<th className="text-center">Type</th>
										<th className="text-center">Actions</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="text-center">1</td>
										<td className="text-center">Penicillin</td>
										<td className="text-center">04/12/1978</td>
										<td className="text-center">Type 1</td>
										<td className="text-center">
											<Tooltip title="Delete Request">
												<a className="text-danger">
													<i className="os-icon os-icon-ui-15" />
												</a>
											</Tooltip>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		immunization: state.patient.immunization,
	};
};

export default connect(mapStateToProps, { loadImmunization })(Dashboard);
