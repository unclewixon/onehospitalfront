/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
export class ClinicalLabItem extends Component {
	state = {
		collapse: true,
	};
	toggleCollapse = () => {
		this.setState(prevState => ({
			collapse: !prevState.collapse,
		}));
	};
	render() {
		const { collapse } = this.state;
		return (
			<>
				<tr data-index="0" data-id="20">
					<td>
						<div
							onClick={this.toggleCollapse}
							role="button"
							tabIndex="0"
							className="row-expand-icon row-collapsed"></div>
					</td>
					<td>
						<a>
							<span
								className="w-32 avatar gd-warning"
								style={{ boxShadow: 'none', justifyContent: 'start' }}>
								IN32456789
							</span>
						</a>
					</td>
					<td className="flex">
						<a className="item-title text-color">Netflix hackathon</a>
					</td>
					<td className="flex">
						<a className="item-title text-color">blood</a>
					</td>
					<td className="flex">
						<a className="item-title text-color">Netflix hackathon</a>
					</td>

					<td className="text-right row-actions">
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
				{collapse ? null : (
					<tr className="expanded-row">
						<td colSpan="5">
							<div className="table-responsive">
								<table className="table table-sm">
									<tbody>
										<tr>
											<th>Specimen</th>
											<td>blood</td>
										</tr>
										<tr>
											<th>Lab</th>
											<td>CS</td>
										</tr>
									</tbody>
								</table>
							</div>
						</td>
					</tr>
				)}
			</>
		);
	}
}

export default ClinicalLabItem;
