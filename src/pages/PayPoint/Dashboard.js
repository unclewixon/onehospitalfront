import React, { Component } from 'react';
import PayPoint from '../../components/PayPoint';
import PayPointTable from '../../components/PayPointTable';
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
