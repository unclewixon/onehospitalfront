import React, { Component } from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import Select from 'react-select';

import { request, updateImmutable } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';

class AssignAccommodation extends Component {
	state = {
		submitting: false,
		accommodations: [
			{ value: 'incubator', label: 'Incubator' },
			{ value: 'cot', label: 'Cot' },
		],
		accommodation: '',
	};

	handleChange = val => {
		this.setState({ accommodation: val });
	};

	assignAccommodation = async () => {
		try {
			const { item, patients, updatePatient } = this.props;
			const { accommodation } = this.state;

			this.setState({ submitting: true });

			if (accommodation === '') {
				notifyError('please select an accommodation');
				return;
			}

			if (item.accommodation && item.accommodation.slug === accommodation) {
				notifyError('please select another accommodation');
				return;
			}

			const data = { slug: accommodation, patient_id: item.patient.id };

			const url = `nicu/${item.id}/assign-accommodation`;
			const rs = await request(url, 'PATCH', true, data);
			if (rs.success) {
				const update = updateImmutable(patients, rs.nicu);
				updatePatient(update);
				const accommodation = rs.nicu.accommodation.name;
				notifySuccess(`patient assigned to a/an ${accommodation}`);
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
		const { submitting, accommodations } = this.state;

		return (
			<div
				className="onboarding-modal modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}>
				<div
					className="modal-dialog modal-centered"
					style={{ maxWidth: '320px' }}>
					<div className="modal-content text-center">
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={closeModal}>
							<span className="os-icon os-icon-close" />
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">{`Assign Bed`}</h4>
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
												onChange={e => this.handleChange(e.value)}
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

AssignAccommodation = reduxForm({
	form: 'accommodation',
})(AssignAccommodation);

export default AssignAccommodation;