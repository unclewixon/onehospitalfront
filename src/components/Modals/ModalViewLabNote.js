import React from 'react';

const ModalViewLabNote = ({ closeModal, lab }) => {
	const item = lab.items[0];
	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div className="modal-dialog modal-md modal-centered">
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}>
						<span className="os-icon os-icon-close" />
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Lab Note</h4>
						<div className="onboarding-text alert-custom mb-3">
							<div>{item.labTest.name}</div>
							<div>
								{item.labTest.specimens.map((s, i) => (
									<span key={i} className="badge badge-info text-white mr-2">
										{s.label}
									</span>
								))}
							</div>
						</div>
						<div className="element-box p-2">
							<div className="row">
								<div className="col-sm-12 text-left">{lab.requestNote}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalViewLabNote;
