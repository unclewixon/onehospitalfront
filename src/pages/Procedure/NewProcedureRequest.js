import React, { Component } from 'react';
import ProcedureRequest from '../../components/Patient/ProcedureRequest';
import { withRouter } from 'react-router-dom';
export class NewProcedure extends Component {
	render() {
		return (
			<>
				<div className="col-sm-12">
					<ProcedureRequest />
				</div>
			</>
		);
	}
}

export default withRouter(NewProcedure);
