/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';

import { request, updateImmutable } from '../services/utilities';
import { loadPerformancePeriod } from '../actions/hr';
import { notifySuccess, notifyError } from '../services/notify';

const status = value => {
	if (value.isActive) {
		return <span className="badge badge-success-inverted">approved</span>;
	} else {
		return <span className="badge badge-danger-inverted">closed</span>;
	}
};

class AppraisalItem extends Component {
	doDisable = async (e, data) => {
		try {
			e.preventDefault();
			const { performancePeriods } = this.props;
			const url = `hr/appraisal/update-period-status/${data.id}`;
			await request(url, 'DELETE', true);
			data.isActive = false;
			const upd = updateImmutable(performancePeriods, data);
			this.props.loadPerformancePeriod(upd);
			notifySuccess('Staff Disabled');
		} catch (error) {
			console.log(error);
			notifyError('Error Disabling Staff');
		}
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

				<td className="text-center">{status(item)}</td>
				<td className="row-actions">
					<Tooltip title="edit">
						<a
							className=""
							onClick={() => {
								edit(item);
							}}
						>
							<i className="os-icon os-icon-edit-32"></i>
						</a>
					</Tooltip>

					<Tooltip title="open">
						<a className="" onClick={() => this.props.createAppraisal(item)}>
							<i className="os-icon os-icon-folder"></i>
						</a>
					</Tooltip>

					{item.isActive ? (
						<Tooltip title="Close Appraisal">
							<a
								onClick={e => this.doDisable(e, item)}
								className="danger"
								title="Close Appraisal"
							>
								<i className="os-icon os-icon-x-circle" />
							</a>
						</Tooltip>
					) : (
						<Tooltip title="Open Appraisal">
							<a
								onClick={e => this.doDisable(e, item)}
								className="success"
								title="Open Appraisal"
							>
								<i className="os-icon os-icon-check-circle" />
							</a>
						</Tooltip>
					)}
				</td>
			</tr>
		);
	}
}

export default connect(null, { loadPerformancePeriod })(AppraisalItem);
