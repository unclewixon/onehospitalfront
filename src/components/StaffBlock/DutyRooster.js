/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';

import { loadRoster } from '../../actions/hr';
import { rosterAPI } from '../../services/constants';
import { request, parseRoster } from '../../services/utilities';

export class DutyRooster extends Component {
	componentDidMount() {
		const { departments } = this.props;
		const period = moment().format('YYYY-MM');
		const department = departments.length > 0 ? departments[0] : null;
		if (department) {
			this.setState({ department_id: department.id, period });
			this.fetchRoster(period, department.id);
		}
	}

	fetchRoster = async (period, department_id) => {
		try {
			const data = { period, department_id };
			const rs = await request(`${rosterAPI}/list-roaster`, 'POST', true, data);
			const rosters = parseRoster(rs);
			this.props.loadRoster(rosters);
			this.setState({ filtering: false });
		} catch (error) {
			console.log(error);
			this.props.loadRoster([]);
			this.setState({ filtering: false });
		}
	};

	handleDateClick = arg => {
		console.log(arg);
	};

	render() {
		const { duty_rosters } = this.props;
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<h6 className="element-header">Duty Rooster</h6>
						<div className="element-box">
							<FullCalendar
								header={{
									left: 'title',
									center: '',
									right: '',
								}}
								defaultView="dayGridMonth"
								plugins={[dayGridPlugin, interactionPlugin]}
								events={duty_rosters}
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
		duty_rosters: state.hr.duty_rosters,
		departments: state.settings.departments,
	};
};
export default connect(mapStateToProps, { loadRoster })(DutyRooster);
