import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppraisalItem from '../../components/AppraisalItem';
import { request } from '../../services/utilities';
import { API_URI, appraisalAPI } from '../../services/constants';
import { loadAppraisals } from '../../actions/hr';

class Appraisal extends Component {
	componentDidMount() {
		this.fetchApprasails();
	}

	fetchApprasails = async () => {
		try {
			const rs = await request(`${API_URI}${appraisalAPI}`, 'GET', true);
			this.props.loadAppraisals(rs);
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { appraisals } = this.props;
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<h6 className="element-header">Appraisals</h6>
								<div className="element-box">
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th>ID</th>
													<th>Name</th>
													<th>Department</th>
													<th>HOD/Line Manager</th>
													<th>Period</th>
													<th className="text-center">Status</th>
													<th className="text-right">Actions</th>
												</tr>
											</thead>
											<tbody>
												{/* {appraisals.map((item, i) => {
													return ( */}
												<AppraisalItem key={1} item={null} approved={1} />
												{/* ) */}
												{/* })} */}
											</tbody>
										</table>
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
		appraisals: state.hr.appraisals,
	};
};

export default connect(mapStateToProps, { loadAppraisals })(Appraisal);
