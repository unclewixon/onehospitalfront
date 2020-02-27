/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { viewAppraisal } from '../actions/general';

class AppraisalItem extends Component {
	doViewAppraisal = e => {
		e.preventDefault();
		console.log('view appraisal');
		this.props.viewAppraisal(true);
	};

	render() {
		const { approved } = this.props;
		return (
			<tr>
				<td>1</td>
				<td>Mr Akachi</td>
				<td>Nursing</td>
				<td>Mrs GoGo</td>
				<td>1st Quarter 2020 [Jan - Mar]</td>
				<td className="text-center">
					{approved === 1 ? (
						<span className="badge badge-success-inverted">approved</span>
					) : (
						<span className="badge badge-danger-inverted">pending</span>
					)}
				</td>
				<td className="text-right row-actions">
					<a onClick={this.doViewAppraisal} className="secondary" title="View Appraisal">
						<i className="os-icon os-icon-eye" />
					</a>
				</td>
			</tr>
		);
	}
}

export default connect(null, { viewAppraisal })(AppraisalItem);
