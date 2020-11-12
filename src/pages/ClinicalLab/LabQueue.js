/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import moment from 'moment';

import ClinicalLabItem from '../../components/ClinicalLabItem';
import { request } from '../../services/utilities';
import { patientAPI } from '../../services/constants';
import searchingGIF from '../../assets/images/searching.gif';
import ModalClinicalLab from '../../components/Modals/ModalClinicalLab';

class LabQueue extends Component {
	state = {
		loading: false,
		showModal: false,
		filtering: false,
		activeRequest: null,
		labs: [],
		startDate: moment().format('YYYY-MM-DD'),
		endDate: '',
	};

	componentDidMount() {
		this.fetchRequests();
	}

	fetchRequests = async () => {
		try {
			const { startDate, endDate } = this.state;
			this.setState({ ...this.state, loading: true });
			const url = `${patientAPI}/requests/lab?startDate=${startDate}&endDate=${endDate}`;
			const rs = await request(url, 'GET', true);
			this.setState({ ...this.state, loading: false, labs: rs });
		} catch (error) {
			this.setState({ ...this.state, loading: false });
		}
	};

	onModalClick = () => {
		this.setState({
			showModal: !this.state.showModal,
		});
	};

	render() {
		const { loading, labs } = this.state;
		return (
			<>
				<div className="element-box p-3 m-0 mt-3">
					<div className="table table-responsive">
						<table
							id="table"
							className="table table-theme v-middle table-hover">
							<thead>
								<tr>
									<th>
										<div className="th-inner sortable both">Request Date</div>
										<div className="fht-cell"></div>
									</th>
									<th>
										<div className="th-inner sortable both">Lab</div>
										<div className="fht-cell"></div>
									</th>
									<th>
										<div className="th-inner sortable both">Patient</div>
										<div className="fht-cell"></div>
									</th>
									<th>
										<div className="th-inner sortable both">By</div>
										<div className="fht-cell"></div>
									</th>
									<th>
										<div className="th-inner"></div>
										<div className="fht-cell"></div>
									</th>
								</tr>
							</thead>
							{loading ? (
								<tbody>
									<tr>
										<td colSpan="4" className="text-center">
											<img alt="searching" src={searchingGIF} />
										</td>
									</tr>
								</tbody>
							) : (
								<tbody>
									{labs.map((lab, index) => {
										return (
											<ClinicalLabItem
												key={index}
												lab={lab}
												index={index}
												modalClick={item => {
													this.onModalClick();
													this.setState({ activeRequest: item });
												}}
												refresh={() => {}}
											/>
										);
									})}
								</tbody>
							)}
						</table>
					</div>
				</div>
				{this.state.activeRequest && (
					<ModalClinicalLab
						activeRequest={this.state.activeRequest}
						showModal={this.state.showModal}
						onModalClick={this.onModalClick}
					/>
				)}
			</>
		);
	}
}

export default LabQueue;
