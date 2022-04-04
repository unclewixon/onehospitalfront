/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';

class JournalItem extends Component {
	render() {
		const { item, edit } = this.props;
		return (
			<tr>
				<td>{item.createdAt}</td>
				<td>{item.description}</td>
				<td>{item.glCode}</td>
				<td>{item.debit}</td>

				<td className="text-center">{item.credit}</td>
				<td className="row-actions">
					<Tooltip title="Edit">
						<a
							className=""
							onClick={() => {
								edit(item);
							}}
						>
							<i className="os-icon os-icon-edit-32"></i>
						</a>
					</Tooltip>

					<Tooltip title="Delete">
						<a className="danger">
							<i className="os-icon os-icon-ui-15" />
						</a>
					</Tooltip>
				</td>
			</tr>
		);
	}
}

export default JournalItem;
