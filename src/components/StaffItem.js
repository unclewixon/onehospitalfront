/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

class StaffItem extends Component {
	state = {
		collapsed: true,
	};

	toggle = () => {
		this.setState({ collapsed: !this.state.collapsed });
	}

	render() {
		const { collapsed } = this.state;
		return (
			<>
				<tr>
					<td><div role="button" tabIndex="0" className={`row-expand-icon ${collapsed ? 'row-collapsed' : 'row-expanded'}`} onClick={this.toggle}/></td>
					<td>John Mayers</td>
					<td>john.meyers</td>
					<td>56366383</td>
					<td className="text-center">
						<div className="status-pill green"/>
						{/* <div className="status-pill red"/> */}
						{/* <div className="status-pill yellow"/> */}
					</td>
					<td className="text-right row-actions">
						
						<a href="#" className="success" title="Enable Staff">
							<i className="os-icon os-icon-check-circle" />
						</a>
						<a href="#" className="danger" title="Disable Staff">
							<i className="os-icon os-icon-x-circle" />
						</a>
					</td>
				</tr>
				{!collapsed && (
					<tr className="expanded-row">
						<td/>
						<td colSpan="8">
							<div className="table-responsive">
								<table className="table table-striped">
									<tbody>
										<tr>
											<th>Specialization</th>
											<td>Consultant</td>
										</tr>
										<tr>
											<th>Email</th>
											<td>caihedoro@gmail.com</td>
										</tr>
										<tr>
											<th>Consultant</th>
											<td>YES</td>
										</tr>
										<tr>
											<th>Folio Number</th>
											<td>RA(MLS):18881</td>
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

export default StaffItem;
