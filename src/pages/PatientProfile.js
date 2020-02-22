import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleProfile } from '../actions/user';

const data = [
	{
		date: '20 Oct',
		Temperature: 24,
	},
	{
		date: '21 Oct',
		Temperature: 13,
	},
	{
		date: '22 Oct',
		Temperature: 98,
	},
	{
		date: '23 Oct',
		Temperature: 39,
	},
];

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
