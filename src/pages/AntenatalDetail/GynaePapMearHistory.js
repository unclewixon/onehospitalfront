import React, { Component } from 'react';

export default class GynaePapMearHistory extends Component {
	render() {
		const { obstericsHistory, loopObject } = this.props;

		return (
			<div
				className="element-box col-lg-9 col-md-12"
				style={{ overflowY: 'scroll' }}>
				<h6 className="element-header text-left text-capitalize">
					Gynae Pap Mear History
				</h6>
				<table className="table">
					<tbody>{loopObject(obstericsHistory?.gynaePapMearHistory)}</tbody>
				</table>
			</div>
		);
	}
}
