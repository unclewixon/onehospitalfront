import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { request } from '../../services/utilities';
import { inventoryAPI } from '../../services/constants';
import { notifySuccess } from '../../services/notify';
import waiting from '../../assets/images/waiting.gif';
import { updateInventory } from '../../actions/inventory';

class ModalExpiryDate extends Component {
	state = {
		submitting: false,
		expiry_date: null,
		error: '',
	};

	componentDidMount() {
		const { inventory } = this.props;
		const expiry_date = inventory.expiry_date
			? new Date(moment(inventory.expiry_date, 'YYYY-MM-DD'))
			: null;
		this.setState({ expiry_date });
	}

	update = async () => {
		try {
			this.setState({ submitting: true, error: '' });
			const { inventory } = this.props;
			const { expiry_date } = this.state;
			const data = { expiry_date: moment(expiry_date).format('YYYY-MM-DD') };
			const url = `${inventoryAPI}/${inventory.id}/update-expiry`;
			const rs = await request(url, 'PATCH', true, data);
			this.props.updateInventory(rs);
			this.setState({ submitting: false });
			notifySuccess('Inventory Updated!');
			this.props.closeModal();
		} catch (e) {
			this.setState({ submitting: false });
			const message = e.message || 'could not update inventory';
			this.setState({ error: message });
		}
	};

	onChangeDate = e => this.setState({ expiry_date: e });

	render() {
		const { submitting, expiry_date, error } = this.state;
		return (
			<div
				className="onboarding-modal modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}>
				<div className="modal-dialog modal-sm modal-centered" role="document">
					<div className="modal-content text-center">
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={() => this.props.closeModal()}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">Update Expiry Date</h4>
							<div className="form-block">
								<form>
									{error !== '' && (
										<div
											className="alert alert-danger"
											dangerouslySetInnerHTML={{
												__html: `<strong>Error!</strong> ${error}`,
											}}
										/>
									)}
									<div className="row">
										<div className="col-sm-12">
											<div className="form-group">
												<label htmlFor="expiry">Expiry Date</label>
												<DatePicker
													className="single-daterange form-control"
													dateFormat="yyyy-MM-dd"
													selected={expiry_date}
													onChange={this.onChangeDate}
													disabledKeyboardNavigation
													placeholderText="Expiry Date"
												/>
											</div>
										</div>
									</div>
									<div>
										<button
											className="btn btn-primary"
											disabled={submitting}
											type="submit"
											onClick={this.update}>
											{submitting ? (
												<img src={waiting} alt="submitting" />
											) : (
												'save'
											)}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null, { updateInventory })(ModalExpiryDate);
