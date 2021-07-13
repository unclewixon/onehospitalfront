import React, { Component } from 'react';

import ProformaInvoice from '../../components/ProformaInvoice';

export class Proforma extends Component {
	render() {
		return (
			<div className="element-box m-0 p-3">
				<ProformaInvoice />
			</div>
		);
	}
}

export default Proforma;
