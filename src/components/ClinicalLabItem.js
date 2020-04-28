/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import { Label } from 'recharts';
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
		const { lab, modalClick, index } = this.props;
		return (
			<>
				<tr
					data-index="0"
					data-id="20"
					className={
						lab && lab.requestBody && lab.requestBody.urgent
							? 'table urgent'
							: ''
					}>
					<td>
						<div
							onClick={this.toggleCollapse}
							role="button"
							tabIndex="0"
							className="row-expand-icon row-collapsed"></div>
					</td>
					<td>
						<a className="item-title text-color">{index + 1}</a>
					</td>
					<td className="flex">
						<span
							className="w-32 avatar gd-warning"
							style={{ boxShadow: 'none', justifyContent: 'start' }}>
							{moment(lab.createdAt).format('DD-MM-YYYY')}
						</span>
					</td>
					<td className="flex">
						<p className="item-title text-color">
							{lab.patient_name ? lab.patient_name : ''}
						</p>
					</td>
					<td className="flex">
						<a className="item-title text-color">
							{lab.created_by ? lab.created_by : 'No yet available'}
						</a>
					</td>

					<td className="text-right row-actions">
						<Tooltip title="Fill Request">
							<a
								className="secondary"
								onClick={() => {
									if (typeof modalClick === 'function') {
										modalClick(lab);
									}
								}}>
								<i className="os-icon os-icon-folder-plus" />
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
											<td>{lab.requestBody.refferredSpecimen}</td>
										</tr>
										<tr>
											<th>Lab</th>
											<td>
												{lab.requestBody.test &&
													lab.requestBody.test.map(test => test.name).join(',')}
											</td>
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
