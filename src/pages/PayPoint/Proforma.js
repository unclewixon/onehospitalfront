import React, { Component } from 'react';

import ProformaInvoice from '../../components/ProformaInvoice';
import { connect } from 'react-redux';
import { getAllHmos } from '../../actions/hmo';

export class Proforma extends Component {
	componentDidMount() {
		this.props.getAllHmos();
	}

	render() {
		return <ProformaInvoice />;
	}
}

export default connect(null, { getAllHmos })(Proforma);
