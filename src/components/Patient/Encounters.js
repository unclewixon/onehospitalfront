import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { withRouter } from 'react-router-dom';

import { openEncounter } from '../../actions/general';

class Encounters extends Component {
	doOpenEncounter = e => {
		e.preventDefault();
		this.props.openEncounter(true, 1);
	};

	doOpenPreEncounter = () => {
		console.log('print pre encounter');
	};

	doViewEncounter = () => {
		console.log('view encounter');
	};

	doPrint = () => {
		console.log('print encounter');
	};

	doCancel = () => {
		console.log('cancel encounter');
	};

	render() {
		return (
			<div className="col-md-12">
				<div className="element-wrapper">
					<h6 className="element-header">Encounters</h6>
					<div className="element-box">
						<div className="table-responsive">
							<table className="table table-striped">
								<thead>
									<tr>
										<th>Date</th>
										<th>Department</th>
										<th>Specialization</th>
										<th>Saved</th>
										<th>Signed</th>
										<th className="text-right">Actions</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<span>20-Mar-2020 </span>
											<span className="smaller lighter">1:52pm</span>
										</td>
										<td>Family Medicine</td>
										<td>Consultation Gynaecology</td>
										<td>N/A</td>
										<td>N/A</td>
										<td className="text-right">
											<DropdownButton
												id="dropdown-basic-button"
												title="Action"
												size="sm">
												<Dropdown.Item onClick={this.doOpenEncounter}>
													Chart
												</Dropdown.Item>
												<Dropdown.Item onClick={this.doOpenPreEncounter}>
													Pre-Encounter
												</Dropdown.Item>
												<Dropdown.Item onClick={this.doViewEncounter}>
													View Details
												</Dropdown.Item>
												<Dropdown.Item onClick={this.doPrint}>
													Print
												</Dropdown.Item>
												<Dropdown.Item onClick={this.doCancel}>
													Cancel
												</Dropdown.Item>
											</DropdownButton>
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

const mapStateToProps = (state, ownProps) => {
	return {
		encounters: state.patient.encounters,
	};
};

export default withRouter(
	connect(mapStateToProps, { openEncounter })(Encounters)
);
