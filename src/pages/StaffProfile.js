import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleProfile } from '../actions/user';

class StaffProfile extends Component {
	componentDidMount() {
		// fetch profile
	}
	
	render() {
		const { userID } = this.props;
		return (
			<div>
				<button aria-label="Close" className="close" type="button" onClick={() => this.props.toggleProfile(false)}>
					<span className="os-icon os-icon-close"></span>
				</button>
				{`staff profile id: ${userID}`}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		userID: state.user.userID,
		staff: state.user.staff,
	}
};

export default connect(mapStateToProps, { toggleProfile })(StaffProfile);
