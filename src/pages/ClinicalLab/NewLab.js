import React, { Component } from 'react';
import LabRequest from '../../components/Patient/LabRequest';
import { withRouter } from 'react-router-dom';
export class NewLab extends Component {
	render() {
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
