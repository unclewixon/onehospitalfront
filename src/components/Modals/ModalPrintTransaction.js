import React from 'react';

const ModalPrintTransaction = ({ transaction, closeModal }) => {
	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '480px' }}>
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div
						className="onboarding-content with-gradient"
						style={{ backgroundImage: 'none' }}>
						<h6 className="onboarding-title">Title</h6>
						<div className="p-2">Print Body</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalPrintTransaction;
