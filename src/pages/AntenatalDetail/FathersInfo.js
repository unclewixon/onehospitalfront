import React, { Component } from 'react';

export default class FathersInfo extends Component {
	render() {
		const { fathersInfo, loopObject } = this.props;

		return (
			<div className="element-box col-lg-9 col-md-12">
				<h6 className="element-header text-left">Father Info</h6>
				<table className="table">
					<tbody>{loopObject(fathersInfo)}</tbody>
				</table>
			</div>
		);
	}
}
