import React, { Component } from 'react';

export default class PreviousPregnancy extends Component {
	render() {
		const { previousPregnancy, loopObject } = this.props;

		return (
			<div className="element-box col-lg-9 col-md-12">
				<h6 className="element-header text-left">Previous Pregnancy</h6>
				<table className="table">
					<tbody>{loopObject(previousPregnancy)}</tbody>
				</table>
			</div>
		);
	}
}
