/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showHistory, setLeave } from '../actions/general';

class LeaveItem extends Component {
	doLeaveHistory = e => {
		e.preventDefault();
		console.log('leave history');
		this.props.showHistory(true);
	};

	doSetLeave = e => {
		e.preventDefault();
		console.log('set leave');
		this.props.setLeave(true);
	};

	render() {
		const { onLeave } = this.props;
		return (
			<tr>
				<td>John Mayers</td>
				<td>Doctor</td>
				<td>OPD</td>
				<td className="text-center">{onLeave ? '20 Oct, 2020' : '-'}</td>
				<td className="text-center">{onLeave ? '20 Nov, 2020' : '-'}</td>
				<td className="text-center">
					{onLeave ? (
						<span className="badge badge-danger-inverted">on leave</span>
					) : (
						<span className="badge badge-primary-inverted">not on leave</span>
					)}
				</td>
				<td className="text-right row-actions">
					<a href="#" onClick={this.doSetLeave} className="secondary" title="Set Leave">
						<i className="os-icon os-icon-mail-18" />
					</a>
					<a href="#" onClick={this.doLeaveHistory} className="danger" title="Leave History">
						<i className="os-icon os-icon-basic-2-259-calendar" />
					</a>
				</td>
			</tr>
		);
	}
}

export default connect(null, { showHistory, setLeave })(LeaveItem);
