/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createRole } from '../actions/general';

class Roles extends Component {
	render() {
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<div className="element-actions">
									<a className="btn btn-primary btn-sm" href="#" onClick={() => this.props.createRole(true)}>
										<i className="os-icon os-icon-plus-circle"/>
										<span>Create New Role</span>
									</a>
								</div>
								<h6 className="element-header">Roles</h6>
								<div className="element-box">
									<div>content / table here</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null, { createRole })(Roles);
