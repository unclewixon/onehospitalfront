import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModals } from '../../actions/general';
import { request, requestPatch } from '../../services/utilities';
import { API_URI, inventoryUpdateQuantityAPI } from '../../services/constants';
import { notifySuccess } from '../../services/notify';
import { SubmissionError } from 'redux-form';
import waiting from '../../assets/images/waiting.gif';
import { updateInventory } from '../../actions/inventory';

class ModalUpdInventoryQty extends Component {
	state = {
		item: [],
		submitting: false,
		reload: false,
	};

	componentDidMount() {
		const { item } = this.props;
		this.setState({ item: item });
		document.body.classList.add('modal-open');

		//this.fetchStock();
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	editInventoryQuantity = async e => {
		e.preventDefault();
		let data = {
			id: this.state.item.id,
			quantity: this.state.quantity,
		};
		this.setState({ submitting: true });
		try {
			const rs = await request(
				`${API_URI}${inventoryUpdateQuantityAPI}`,
				'PATCH',
				true,
				data
			);
			this.props.updateInventory(rs);
			notifySuccess('Quantity Updated');
			this.props.closeModals(true);
			this.setState({ submitting: false });
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not create inventory item',
			});
		}
	};

	myChangeHandler = event => {
		this.setState({ quantity: event.target.value });
	};

	render() {
		const { submitting } = this.state;
		const { item } = this.props;
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
							onClick={() => this.props.closeModals(false)}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">Update Quantity</h4>
							<div className="form-block">
								<form>
									<div className="row">
										<div className="col-sm-12">
											<div className="form-group">
												<label>Name</label>
												<input
													className="form-control"
													placeholder="Enter quantity"
													disabled="disabled"
													value={item.name}
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12">
											<div className="form-group">
												<label>Quantity</label>
												<input
													name="Quantity"
													className="form-control"
													placeholder="Enter quantity"
													onChange={this.myChangeHandler}
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12 text-right">
											<button
												className="btn btn-primary"
												onClick={this.editInventoryQuantity}
												disabled={submitting}
												type="submit">
												{submitting ? (
													<img src={waiting} alt="submitting" />
												) : (
													'save'
												)}
											</button>
										</div>
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

const mapStateToProps = (state, ownProps) => {
	return {
		item: state.inventory.item,
	};
};

export default connect(mapStateToProps, { closeModals, updateInventory })(
	ModalUpdInventoryQty
);
