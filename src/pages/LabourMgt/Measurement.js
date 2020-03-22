import React, { Component } from 'react';

export class Measurement extends Component {
	render() {
		return (
			<div className="my-3" style={{ display: 'flex' }}>
				<button className="btn btn-primary col-md-6">Most Viewed</button>
				<button className="btn btn-primary col-md-6">Show detail</button>
			</div>
		);
	}
}

export default Measurement;
