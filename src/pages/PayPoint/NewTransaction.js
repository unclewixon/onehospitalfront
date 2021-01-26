import React, { Component } from 'react';

import CreateNewTransaction from '../../components/CreateNewTransaction';
import { connect } from 'react-redux';
import { getAllHmos } from '../../actions/hmo';

export class NewTransaction extends Component {
	componentDidMount() {
		this.props.getAllHmos();
	}

	render() {
		return <CreateNewTransaction />;
	}
}

export default connect(null, { getAllHmos })(NewTransaction);
