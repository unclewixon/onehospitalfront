import React, { Component } from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import Modal from 'react-bootstrap/Modal';

import { request, updateImmutable } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';

class InputCode extends Component {
	state = {
		submitting: false,
		hmo_approval_code: '',
	};

	componentDidMount() {
		const { transaction } = this.state;
		if (transaction && transaction.hmo_approval_code !== null) {
			this.setState({ hmo_approval_code: transaction.hmo_approval_code });
		}
	}

	asignCode = async () => {
		const { transaction, transactions, loadTransaction } = this.props;
		const { hmo_approval_code } = this.state;
		this.setState({ submitting: true });
		try {
			transaction.hmo_approval_code = hmo_approval_code;
			const url = `transactions/${transaction.id}/update?hmo_approval_code=${hmo_approval_code}`;
			const rs = await request(url, 'PATCH', true);

			if (rs.success) {
				const uptdTransactions = updateImmutable(transactions, transaction);
				loadTransaction(uptdTransactions);
				notifySuccess(`Hmo code ${hmo_approval_code} added`);
				this.setState({ submitting: false });
				this.props.doHide();
			} else {
				notifyError(`${rs.message}`);
				this.setState({ submitting: false });
				this.props.doHide();
			}
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || `could not assign code`,
			});
		}
	};

	// set selected value
	handleInput(val) {
		this.setState({ hmo_approval_code: val });
	}

	render() {
		const { error, handleSubmit } = this.props;
		const { submitting, hmo_approval_code } = this.state;

		return (
			<div className="onboarding-modal fade animated show">
				<div className="modal-centered">
					<div className="modal-content text-center">
						<div className="onboarding-content with-gradient">
							<Modal.Header
								className="center-header"
								closeButton
								onClick={() => this.props.doHide()}>
								<h4 className="onboarding-title">{`Input Code`}</h4>
							</Modal.Header>
							<div className="form-block">
								<form onSubmit={handleSubmit(this.asignCode)}>
									{error && (
										<div
											className="alert alert-danger"
											dangerouslySetInnerHTML={{
												__html: `<strong>Error!</strong> ${error}`,
											}}
										/>
									)}
									<div className="row form-group">
										<div className="col-sm-12">
											<span>Code</span>
											<input
												value={hmo_approval_code}
												className="form-control"
												placeholder="Enter code"
												name="hmo_approval_code"
												onChange={evt => this.handleInput(evt.target.value)}
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12 text-right">
											<button
												className="btn btn-primary"
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

InputCode = reduxForm({
	form: 'input_code',
})(InputCode);

export default InputCode;
