import React from 'react';

const ModalServiceDetails = ({ closeModal, details }) => {
	console.log(details);
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
					<div className="onboarding-content with-gradient"></div>
				</div>
			</div>
		</div>
	);
};

export default ModalServiceDetails;
