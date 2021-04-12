import React from 'react';

const ViewEncounter = ({ closeModal }) => {
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
						<h4 className="onboarding-title">Encounter</h4>
						<div></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewEncounter;
