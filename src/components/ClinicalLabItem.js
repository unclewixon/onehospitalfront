/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';

import { Can } from './common/Can';
import { notifyError, notifySuccess } from '../services/notify';
import { confirmAction, request } from '../services/utilities';

class ClinicalLabItem extends Component {
	approve = async data => {
		try {
			const url = `patient/request/${data.id}/approve-result`;
			const res = await request(url, 'GET', true);
			if (res.success) {
				notifySuccess('Result has been approved');
				this.props.refresh();
			} else {
				notifyError(res.message);
			}
		} catch (error) {
			console.log(error);
			notifyError('Error approving result	');
		}
	};

	confirmApproval = data => {
		confirmAction(
			this.approve,
			data,
			'You want to approve this result',
			'Are you sure?'
		);
	};

	render() {
		const { lab } = this.props;
		return (
			<>
				{lab.requestBody.map((item, i) => {
					return (
						<tr key={i} className={item.urgent ? 'urgent' : ''}>
							<td className="flex">
								<span
									className="w-32 avatar gd-warning"
									style={{ boxShadow: 'none', justifyContent: 'start' }}>
									{moment(lab.createdAt).format('DD-MM-YYYY h:mmA')}
								</span>
							</td>
							<td className="flex">
								<p className="item-title text-color m-0">{item.name}</p>
							</td>
							<td className="flex">
								<p className="item-title text-color m-0">{lab.patient_name}</p>
							</td>
							<td className="flex">
								<a className="item-title text-color">{lab.created_by}</a>
							</td>
							<td className="text-right row-actions">
								<Tooltip title="Take Specimen">
									<a className="secondary" onClick={() => {}}>
										<i className="os-icon os-icon-folder-plus" />
									</a>
								</Tooltip>
								<Tooltip title="Fill Result">
									<a className="secondary" onClick={() => {}}>
										<i className="os-icon os-icon-folder-plus" />
									</a>
								</Tooltip>
								{lab.status === 0 && (
									<Can I="approve-lab-result" on="all">
										<Tooltip title="Approve Result">
											<a
												className="secondary"
												onClick={() => this.confirmApproval(lab)}>
												<i className="os-icon os-icon-thumbs-up" />
											</a>
										</Tooltip>
									</Can>
								)}
							</td>
						</tr>
					);
				})}
			</>
		);
	}
}

export default ClinicalLabItem;
