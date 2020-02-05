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
								<div className="element-wrapper pb-4 mb-4 border-bottom">
									<div className="element-box-tp">
										<button className="btn btn-primary" onClick={() => this.props.createRole(true)}>
											<i className="os-icon os-icon-plus-circle" />
											<span>Create New Role</span>
										</button>
									</div>
								</div>
								<div className="element-box">
									<h5 className="form-header">Roles</h5>
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
