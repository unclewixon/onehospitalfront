/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ClinicalLabItem from '../../components/ClinicalLabItem';
import { request } from '../../services/utilities';
import { patientAPI } from '../../services/constants';
import { loadClinicalLab } from '../../actions/patient';
import searchingGIF from '../../assets/images/searching.gif';
import ModalClinicalLab from '../../components/Modals/ModalClinicalLab';

class LabQueue extends Component {
	state = {
		loading: false,
		showModal: false,
		filtering: false,
		activeRequest: null,
		startDate: '',
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
			const filterResponse = () => {
				const res = rs.map(lab => {
					const filtered = lab.requestBody.groups.filter(group => {
						const filt = group.parameters.some(param => param.result === '');
						return filt;
					});
					return filtered && filtered.length ? lab : [];
				});
				return res && res.length ? res : null;
			};
			const newResp = filterResponse().filter(fil => fil.length !== 0);
			this.props.loadClinicalLab(newResp);
			return this.setState({ ...this.state, loading: false });
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
		const { clinicalLab } = this.props;
		const { loading } = this.state;

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
										<div className="th-inner "></div>
										<div className="fht-cell"></div>
									</th>
									<th>
										<div className="th-inner sortable both">S/N</div>
										<div className="fht-cell"></div>
									</th>
									<th>
										<div className="th-inner sortable both">Request Date</div>
										<div className="fht-cell"></div>
									</th>
									<th>
										<div className="th-inner sortable both">Patient Name</div>
										<div className="fht-cell"></div>
									</th>
									<th>
										<div className="th-inner sortable both">Request By</div>
										<div className="fht-cell"></div>
									</th>
									<th>
										<div className="th-inner "></div>
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
									{clinicalLab.map((lab, index) => {
										return (
											<ClinicalLabItem
												key={lab.id}
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

const mapStateToProps = state => {
	return {
		clinicalLab: state.patient.clinicalLab,
	};
};
export default connect(mapStateToProps, { loadClinicalLab })(LabQueue);
