import React, { useState } from 'react';

const ModalDischargePatient = ({
	admissionId,
	nicuId,
	startDischarge,
	closeModal,
	type,
}) => {
	const [note, setNote] = useState('');

	const id = type === 'nicu' ? nicuId : admissionId;

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '720px' }}
			>
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}
					>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<h6 className="onboarding-title">Doctors Discharge Note</h6>
						<div className="element-box p-2">
							<div className="row">
								<div className="col-sm-12">
									<div className="form-group">
										<textarea
											className="form-control"
											name="note"
											rows="10"
											placeholder="Enter discharge note"
											onChange={e => setNote(e.target.value)}
										></textarea>
									</div>
								</div>
								<div className="col-sm-12 mt-2">
									<div
										className="form-inline"
										style={{ justifyContent: 'center' }}
									>
										<button
											onClick={() => startDischarge(id, { note }, type)}
											className="btn btn-primary"
										>
											Discharge Patient
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalDischargePatient;
