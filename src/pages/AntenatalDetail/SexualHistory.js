import React, { Component } from 'react';

export default class SexualHistory extends Component {
	render() {
		const { obstericsHistory, loopObject } = this.props;

		return (
			<div
				className="element-box col-lg-9 col-md-12"
				style={{ overflowY: 'scroll' }}>
				<h6 className="element-header text-left text-capitalize">
					Sexual History
				</h6>
				<table className="table">
					<tbody>{loopObject(obstericsHistory?.sexualHistory)}</tbody>
				</table>
			</div>
		);
	}
}
