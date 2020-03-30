import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Tooltip from 'antd/lib/tooltip';

import { createVoucher } from '../../actions/general';
import VoucherTable from '../../components/VoucherTable';
import { request } from '../../services/utilities';
import { API_URI, patientAPI, vouchersAPI } from '../../services/constants';
import { loadVoucher } from '../../actions/paypoint';
export class Voucher extends Component {
	componentDidMount() {
		this.fetchVoucher();
		document.body.classList.add('modal-open');
	}

	fetchVoucher = async data => {
		try {
			const rs = await request(
				`${API_URI}${vouchersAPI}/list`,
				'GET',
				true,
				data
			);
			this.props.loadVoucher(rs);
		} catch (error) {
			console.log(error);
		}
	};
	render() {
		const { match, location, voucher } = this.props;
		const page = location.pathname.split('/').pop();
		return (
			<>
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="element-actions">
								<button
									className="btn btn-primary"
									onClick={() => this.props.createVoucher(true)}>
									New Voucher
								</button>
							</div>
							<h6 className="element-header">Voucher</h6>
							<div className="element-box">
								<div className="table table-responsive">
									<VoucherTable data={voucher} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		voucher: state.paypoint.voucher,
	};
};
export default connect(mapStateToProps, { loadVoucher, createVoucher })(
	withRouter(Voucher)
);
