import React from 'react';

const ViewRequestNote = ({ closeModal, title, note }) => {
	return (
		<div
			className="onboarding-modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div className="modal-centered" style={{ maxWidth: '360px' }}>
				<div className="modal-content text-center">
					<button className="close" type="button" onClick={closeModal}>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title mb-1">{title}</h4>
						<div className="element-wrapper p-0">
							<div className="element-box-tp">{note}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewRequestNote;
