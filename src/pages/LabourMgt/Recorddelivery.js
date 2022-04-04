/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notifyError } from '../../services/notify';
import { request } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';
import { loadDeliveryRecord } from '../../actions/patient';
import Tooltip from 'antd/lib/tooltip';
import ModalDeliveryDetails from '../../components/Modals/ModalDeliveryDetails';

const fields = [
	'dateOfBirth',
	'timeOfBirth',
	'deliveryType',
	'isMotherAlive',
	'sexOfBaby',
	'placentaComplete',
];
export class Recorddelivery extends Component {
	state = {
		loading: false,
		risks: [],
		showModal: false,
		detail: null,
		labour: null,
		submitting: false,
	};

	componentDidMount() {
		this.fetchRecord();
	}

	viewDetails = data => {
		document.body.classList.add('modal-open');
		this.setState({ showModal: true, detail: data });
	};

	closeModal = () => {
		document.body.classList.remove('modal-open');
		this.setState({ showModal: false, detail: null });
	};

	fetchRecord = async () => {
		const { labourDetail } = this.props;

		try {
			this.setState({ loading: true });
			const rs = await request(
				`labour-management/${labourDetail.id}/delivery-record`,
				'GET',
				true
			);
			console.log(rs);
			this.props.loadDeliveryRecord(rs);
			this.setState({ loading: false });
		} catch (e) {
			console.log(e);
			this.setState({ loading: false });
			notifyError('Error fetching delivery record request');
		}
	};

	detailBody = record => {
		return fields.map((el, i) => {
			console.log(typeof record[el], record[el]);
			return (
				<>
					{typeof record[el] === 'boolean' ? (
						<td className="text-center">{record[el] ? 'Yes' : 'No'}</td>
					) : (
						<td className="text-right text-capitalize">{record[el]}</td>
					)}
				</>
			);
		});
	};
	render() {
		const { loading, showModal, detail } = this.state;

		const { deliveryRecord } = this.props;
		return (
			<div className="element-box">
				<div className="table table-responsive">
					<table id="table" className="table">
						<thead>
							<tr>
								<th className="text-center">Date OF BIRTH</th>
								<th className="text-center">Time OF BIRTH</th>
								<th className="text-center">DELIVERY TYPE</th>
								<th className="text-center">IS MOTHER ALIVE</th>
								<th className="text-center">SEX OF BABY</th>
								<th className="text-center">PLACENTA COMPLETE</th>
								<th className="text-center">Actions</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr className="text-center">
									<td colSpan="8" className="text-center">
										<img alt="searching" src={searchingGIF} />
									</td>
								</tr>
							) : deliveryRecord.length > 0 ? (
								deliveryRecord.map(record => (
									<tr className="text-center">
										{this.detailBody(record)}
										<td className="text-center">
											<Tooltip title="view details">
												<a
													className="secondary mx-1"
													onClick={() => this.viewDetails(record)}
												>
													<i className="os-icon os-icon-eye" />
												</a>
											</Tooltip>
										</td>
									</tr>
								))
							) : (
								<tr>
									{' '}
									<td colSpan="9" className="text-center">
										No delivery yet
									</td>
								</tr>
							)}
						</tbody>
					</table>
					{showModal && (
						<ModalDeliveryDetails
							detail={detail}
							closeModal={() => this.closeModal()}
						/>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		labourDetail: state.patient.labourDetail,
		deliveryRecord: state.patient.deliveryRecord,
	};
};
export default connect(mapStateToProps, {
	loadDeliveryRecord,
})(Recorddelivery);
