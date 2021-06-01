import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { withRouter } from 'react-router-dom';

import { request, formatDateStr } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import ViewEncounter from './Modals/ViewEncounter';
import TableLoading from '../TableLoading';

class Encounters extends Component {
	state = {
		encounters: [],
		loading: false,
		canView: false,
		showModal: false,
		encounter: null,
		meta: null,
	};

	componentDidMount() {
		this.fetchEncouters();
	}

	fetchEncouters = async () => {
		try {
			this.setState({ loading: true });
			const { patient } = this.props;
			const url = `consultation/encounters?patient_id=${patient.id}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			this.setState({ loading: false, encounters: result, meta });
		} catch (error) {
			console.log(error);
			this.setState({ loading: false });
			notifyError('error fetching encounters');
		}
	};

	viewEncounter = item => {
		document.body.classList.add('modal-open');
		this.setState({ encounter: item, showModal: true });
	};

	print = item => {
		console.log(item);
	};

	closeModal = () => {
		this.setState({ appointment_id: null, patient: null, showModal: false });
		document.body.classList.remove('modal-open');
	};

	render() {
		const { encounters, loading, encounter, showModal } = this.state;
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">Encounters</h6>
					<div className="element-box p-3 m-0">
						{loading ? (
							<TableLoading />
						) : (
							<div className="table-responsive">
								<table className="table">
									<thead>
										<tr>
											<th>Date</th>
											<th>Whom to see</th>
											<th>Specialty</th>
											<th className="text-center">Actions</th>
										</tr>
									</thead>
									<tbody>
										{encounters?.map((item, i) => {
											console.log(item);
											return (
												<tr key={i}>
													<td className="nowrap">
														{formatDateStr(
															item.createdAt,
															'DD-MMM-YYYY h:mm A'
														)}
													</td>

													<td className="cell-with-media">
														<span>
															{`${item.staff?.details?.first_name} ${item.staff?.details?.last_name}`}
														</span>
													</td>

													<td></td>

													<td className="row-actions">
														<DropdownButton
															id="dropdown-basic"
															title="Action"
															size="sm"
															key={item.id}>
															<Dropdown.Item
																onClick={() => this.viewEncounter(item)}>
																View Details
															</Dropdown.Item>
															<Dropdown.Item onClick={() => this.print(item)}>
																Print
															</Dropdown.Item>
														</DropdownButton>
													</td>
												</tr>
											);
										})}

										{encounters?.length === 0 && (
											<tr className="text-center">
												<td colSpan="7">No Encounters</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
				{showModal && (
					<ViewEncounter encounter={encounter} closeModal={this.closeModal} />
				)}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
		staff: state.user.profile.details,
	};
};

export default withRouter(connect(mapStateToProps)(Encounters));
