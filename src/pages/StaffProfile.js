import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleProfile } from '../actions/general';

class StaffProfile extends Component {
	render() {
		return (
			<div>
				<button aria-label="Close" className="close" type="button" onClick={() => this.props.toggleProfile(false)}>
					<span className="os-icon os-icon-close"></span>
				</button>
				staff profile
			</div>
		);
	}
}

export default connect(null, { toggleProfile })(StaffProfile);
