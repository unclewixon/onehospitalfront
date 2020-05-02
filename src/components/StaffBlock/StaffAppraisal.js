import React, { Component } from 'react';
import { connect } from 'react-redux';
import { request } from '../../services/utilities';
import { API_URI, staffAPI, hmoAPI } from '../../services/constants';
import { loadStaff } from '../../actions/hr';

export class StaffAppraisal extends Component {
	componentDidMount() {
		if (this.props.staffs.length === 0) {
			this.fetchStaffs();
		}
	}

	fetchStaffs = async () => {
		try {
			const rs = await request(`${API_URI}${staffAPI}`, 'GET', true);
			this.props.loadStaff(rs);
		} catch (error) {
			console.log(error);
		}
	};
	render() {
		const { staffs, departments } = this.props;
		return <div>staff appraisal</div>;
	}
}

const mapStateToProps = ({ settings, hr }) => {
	return {
		departments: settings.departments,
		staffs: hr.staffs,
	};
};

export default connect(mapStateToProps, {
	loadStaff,
})(StaffAppraisal);
