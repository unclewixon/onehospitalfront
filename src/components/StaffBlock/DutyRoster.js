/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';

import { notifyError } from '../../services/notify';
import { rosterAPI } from '../../services/constants';
import { request, parseRoster } from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';

class DutyRoster extends Component {
	state = {
		rosters: [],
	};

	componentDidMount() {
		const period = moment().format('YYYY-MM');
		this.fetchRoster(period);
	}

	fetchRoster = async period => {
		try {
			const { profile } = this.props;
			this.props.startBlock();
			const staff_id = profile.details.id;
			const department_id = profile.details.department.id;
			const uri = `${rosterAPI}/rosters?period=${period}&department_id=${department_id}&staff_id=${staff_id}`;
			const rs = await request(uri, 'GET', true);
			const rosters = parseRoster(rs);
			this.setState({ rosters });
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
			notifyError('could not fetch roster');
		}
	};

	handleDateClick = arg => {
		console.log(arg);
	};

	render() {
		const { rosters } = this.state;
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<h6 className="element-header">Duty Rooster</h6>
						<div className="element-box m-0 p-3">
							<FullCalendar
								plugins={[dayGridPlugin, interactionPlugin]}
								events={rosters}
								dateClick={this.handleDateClick}
								eventClick={info => console.log(info)}
								showNonCurrentDates={false}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		profile: state.user.profile,
	};
};

export default connect(mapStateToProps, { startBlock, stopBlock })(DutyRoster);
