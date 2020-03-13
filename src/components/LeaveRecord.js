/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
export class LeaveRecord extends Component {
	render() {
		return (
			<>
				<tr data-index="0" data-id="20">
					<td className="flex text-center">
						<a className="item-title text-color"></a>
					</td>
					<td className="flex text-center">
						<a className="item-title text-color">Sick Leave</a>
					</td>
					<td className="flex text-center">
						<a className="item-title text-color">03-26-2013</a>
					</td>
					<td className="flex text-center">
						<a className="item-title text-color">4-2-2013</a>
					</td>
					<td className="flex text-center">
						<a className="item-title text-color">Not on Leave</a>
					</td>

					<td className="text- row-actions">
						<Tooltip title="Receive Request">
							<a className="secondary">
								<i className="os-icon os-icon-folder-plus" />
							</a>
						</Tooltip>
						<Tooltip title="Edit Request">
							<a className="secondary">
								<i className="os-icon os-icon-edit-32" />
							</a>
						</Tooltip>
						<Tooltip title="Delete Request">
							<a className="danger">
								<i className="os-icon os-icon-ui-15" />
							</a>
						</Tooltip>
					</td>
				</tr>
			</>
		);
	}
}

export default LeaveRecord;
