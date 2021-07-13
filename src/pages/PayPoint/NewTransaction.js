import React, { Component } from 'react';

import CreateNewTransaction from '../../components/CreateNewTransaction';

export class NewTransaction extends Component {
	render() {
		return (
			<div className="element-box p-3 m-0">
				<CreateNewTransaction />
			</div>
		);
	}
}

export default NewTransaction;
