import React, { Component } from 'react';
import CreateNewTransaction from '../../components/CreateNewTransaction';
import { connect } from 'react-redux';
import { getAllHmos } from '../../actions/hmo';
import { getAllService } from '../../actions/settings';

export class NewTransaction extends Component {
	componentDidMount() {
		this.props.getAllHmos();
		this.props.getAllService();
	}
	render() {
		return (
			<>
				<CreateNewTransaction />
			</>
		);
	}
}

export default connect(null, { getAllHmos, getAllService })(NewTransaction);
