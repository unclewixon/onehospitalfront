import React, { Component } from 'react';

class NoMatch extends Component {
	render() {
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="big-error-w" style={{ marginTop: '0' }}>
						<h1>404</h1>
						<h5>Page not Found</h5>
						<h4>Oops, Something went missing...</h4>
					</div>
				</div>
			</div>
		);
	}
}

export default NoMatch;
