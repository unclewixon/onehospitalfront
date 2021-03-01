import React, { Component } from 'react';

export default class GynaeHistory extends Component {
	render() {
		const { obstericsHistory, loopObject } = this.props;

		return (
			<div
				className="element-box col-lg-9 col-md-12"
				style={{ overflowY: 'scroll' }}>
				<h6 className="element-header text-left text-capitalize">
					Gynae History
				</h6>
				<table className="table">
					<tbody>{loopObject(obstericsHistory?.gynaeHistory)}</tbody>
				</table>
			</div>
		);
	}
}
