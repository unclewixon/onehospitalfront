import React, { Component } from 'react';
import DentistryRequest from '../../components/Patient/DentistryRequest';
import { withRouter } from 'react-router-dom';
export class NewDentistry extends Component {
	render() {
		return (
			<>
				<div className="col-sm-12">
					<DentistryRequest />
				</div>
			</>
		);
	}
}

export default withRouter(NewDentistry);
