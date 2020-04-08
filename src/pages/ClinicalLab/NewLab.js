import React, { Component } from 'react';
import LabRequest from '../../components/Patient/LabRequest';
import { Link, withRouter } from 'react-router-dom';
export class NewLab extends Component {
	render() {
		const { location } = this.props;

		const page = location.pathname.split('/').pop();

		return (
			<>
				<div className="col-sm-12">
					<LabRequest />
				</div>
			</>
		);
	}
}

export default withRouter(NewLab);
