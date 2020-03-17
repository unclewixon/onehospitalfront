import React, { Component } from 'react';
import PayPoint from '../../components/PayPoint';
import PayPointTable from '../../components/PayPointTable';
import Queue from '../../components/Queue';
class PayPointPage extends Component {
	render() {
		return (
			<>
				<PayPoint />
				<PayPointTable />
			</>
		);
	}
}

export default PayPointPage;
