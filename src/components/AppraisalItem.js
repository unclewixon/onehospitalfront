/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';
import { viewAppraisal } from '../actions/general';

const status = value => {
	switch (value) {
		case 1:
			return <span className="badge badge-success-inverted">approved</span>;
		case 2:
			return <span className="badge badge-danger-inverted">pending</span>;
		default:
			return <span className="badge badge-warning-inverted">closing</span>;
	}
};

class AppraisalItem extends Component {
	doViewAppraisal = e => {
		e.preventDefault();
		console.log('view appraisal');
		this.props.viewAppraisal(true);
	};

	render() {
		const { item, index, edit } = this.props;
		console.log(item);
		return (
			<tr>
				<td>{index}</td>
				<td>{item.performancePeriod}</td>
				<td>{item.startDate}</td>
				<td>{item.endDate}</td>

				<td className="text-center">{status(item.status)}</td>
				<td className="text-right row-actions">
					<Tooltip title="edit">
						<a
							className=""
							onClick={() => {
								edit(item);
							}}>
							<i className="os-icon os-icon-edit-32"></i>
						</a>
					</Tooltip>

					<Tooltip title="open">
						<a className="">
							<i className="os-icon os-icon-folder"></i>
						</a>
					</Tooltip>

					<Tooltip title="view">
						<a className="">
							<i className="os-icon os-icon-documents-03"></i>
						</a>
					</Tooltip>

					<Tooltip title="close">
						<a className="danger">
							<i className="os-icon os-icon-ui-15" />
						</a>
					</Tooltip>
				</td>
			</tr>
		);
	}
}

export default connect(null, { viewAppraisal })(AppraisalItem);
