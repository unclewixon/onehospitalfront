import React, { Component } from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import Select from 'react-select';
import { connect } from 'react-redux';

import { request, updateImmutable } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';

class AssignAccommodation extends Component {
	state = {
		submitting: false,
		accommodations: [],
		accommodation: null,
	};

	handleChange = val => {
		this.setState({ accommodation: val });
	};

	componentDidMount() {
		this.fetchAccommodations();
	}

	fetchAccommodations = async () => {
		try {
			this.props.startBlock();
			const rs = await request('nicu-accommodations', 'GET', true);
			const { result } = rs;
			this.setState({ accommodations: result });
			this.props.stopBlock();
		} catch (error) {
			this.props.stopBlock();
			notifyError(error.message || 'could not fetch accommodations!');
		}
	};

	assignAccommodation = async () => {
		try {
			const { item, patients, updatePatient } = this.props;
			const { accommodation } = this.state;

			this.setState({ submitting: true });

			if (!accommodation) {
				notifyError('please select an accommodation');
				return;
			}

			const data = {
				accommodation_id: accommodation.id,
				patient_id: item.patient.id,
			};

			const url = `nicu/${item.id}/assign-accommodation`;
			const rs = await request(url, 'PATCH', true, data);
			if (rs.success) {
				const update = updateImmutable(patients, rs.nicu);
				updatePatient(update);
				const accommodation_name = rs.nicu.accommodation.name;
				notifySuccess(`patient assigned to a/an ${accommodation_name}`);
				this.setState({ submitting: false });
				this.props.closeModal();
			} else {
				notifyError(rs.message);
				this.setState({ submitting: false });
				this.props.closeModal();
			}
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not assign accommodation',
			});
		}
	};

	render() {
		const { error, handleSubmit, closeModal } = this.props;
		const { submitting, accommodations, accommodation } = this.state;

		return (
			<div
				className="onboarding-modal modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}
			>
				<div
					className="modal-dialog modal-centered"
					style={{ maxWidth: '320px' }}
				>
					<div className="modal-content text-center">
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={closeModal}
						>
							<span className="os-icon os-icon-close" />
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">Assign Accomodation</h4>
							<div className="element-box m-0 p-3">
								<form onSubmit={handleSubmit(this.assignAccommodation)}>
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
											<label>Category</label>
											<Select
												options={accommodations}
												getOptionValue={option => option.id}
												getOptionLabel={option => option.name}
												onChange={e => this.handleChange(e)}
												value={accommodation}
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12 text-right">
											<button
												className="btn btn-primary"
												disabled={submitting}
												type="submit"
											>
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

AssignAccommodation = reduxForm({
	form: 'accommodation',
})(AssignAccommodation);

export default connect(null, { startBlock, stopBlock })(AssignAccommodation);
