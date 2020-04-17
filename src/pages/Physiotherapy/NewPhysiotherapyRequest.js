import React, { Component } from 'react';
import PhysiotherapyRequest from '../../components/Patient/PhysiotherapyRequest';
import { withRouter } from 'react-router-dom';
export class NewPhysiotherapy extends Component {
	render() {
		return (
			<>
				<div className="col-sm-12">
					<PhysiotherapyRequest />
				</div>
			</>
		);
	}
}

export default withRouter(NewPhysiotherapy);
