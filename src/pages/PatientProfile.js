import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleProfile } from '../actions/user';

class PatientProfile extends Component {
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
				{`patient profile id: ${userID}`}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		userID: state.user.userID,
		patient: state.user.patient,
	}
};

export default connect(mapStateToProps, { toggleProfile })(PatientProfile);
