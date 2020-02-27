/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerNewPatient, createNewAppointment } from '../actions/general';

class Queue extends Component {
	
	render() {
		return (
			<div className="element-wrapper compact">
				<h6 className="element-header">Queue</h6>
				<div className="element-box-tp">
					<div className="todo-list">
						<Link className="todo-item" to="/dashboard/patient/123">
							<div className="ti-info">
								<div className="ti-header">Appointment</div>
								<div className="ti-sub-header">EMR ID: 25322</div>
							</div>
							<div className="ti-icon">
								<i className="os-icon os-icon-arrow-right7" />
							</div>
						</Link>
						<Link className="todo-item" to="/dashboard/patient/23">
							<div className="ti-info">
								<div className="ti-header">Lab</div>
								<div className="ti-sub-header">EMR ID: 20923</div>
							</div>
							<div className="ti-icon">
								<i className="os-icon os-icon-arrow-right7" />
							</div>
						</Link>
						<Link className="todo-item complete" to="/dashboard/patient/3">
							<div className="ti-info">
								<div className="ti-header">Appointment</div>
								<div className="ti-sub-header">EMR ID: 5343</div>
							</div>
							<div className="ti-icon">
								<i className="os-icon os-icon-check" />
							</div>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Queue;
