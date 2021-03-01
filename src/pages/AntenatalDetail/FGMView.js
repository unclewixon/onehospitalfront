import React, { Component } from 'react';

export default class FGMView extends Component {
	render() {
		const { obstericsHistory, loopObject } = this.props;

		return (
			<div
				className="element-box col-lg-9 col-md-12"
				style={{ overflowY: 'scroll' }}>
				<h6 className="element-header text-left text-capitalize">F.G.M</h6>
				<table className="table">
					<tbody>{loopObject(obstericsHistory?.f_g_m)}</tbody>
				</table>
			</div>
		);
	}
}
