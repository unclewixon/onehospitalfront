import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';

import { notifyError } from '../../services/notify';
import { request } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';
import { loadDeliveryRecord } from '../../actions/patient';

const fields = [
	'deliveryType',
	'isMotherAlive',
	'administeredOxytocin',
	'placentaComplete',
	'timeOfBirth',
	'dateOfBirth',
	'babyCried',
	'sexOfBaby',
	'apgarScore',
	'weight',
	'administeredVitaminK',
	'negativeRH',
	'drugsAdministered',
	'transferredTo',
	'comment',
];
export class Recorddelivery extends Component {
	state = {
		loading: false,
		risks: [],
		submitting: false,
	};

	componentDidMount() {
		this.fetchRecord();
	}

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
				<tr>
					<td className="font-weight-bold text-left text-uppercase">
						{el.replace(/([A-Z])/g, ' $1')}
					</td>

					{typeof record[el] === 'boolean' ? (
						<td className="text-right text-capitalize">
							{record[el] ? 'Yes' : 'No'}
						</td>
					) : (
						<td className="text-right text-capitalize">{record[el]}</td>
					)}
				</tr>
			);
		});
	};
	render() {
		const { loading } = this.state;

		let record = this.props.deliveryRecord[0];
		// risk = [...risk].reverse();
		console.log(record);
		return (
			<div className="element-box">
				{loading ? (
					<tr className="text-center">
						<td colSpan="8" className="text-center">
							<img alt="searching" src={searchingGIF} />
						</td>
					</tr>
				) : !isEmpty(record) ? (
					<table className="table table-clean">
						<tbody>{this.detailBody(record)}</tbody>
					</table>
				) : (
					<tr>
						{' '}
						<td colSpan="9" className="text-center">
							No delivery yet
						</td>
					</tr>
				)}
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
