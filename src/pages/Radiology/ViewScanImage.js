import React from 'react';

import avatar from '../../assets/images/a6.jpeg';

export default function ViewScanImage({ closeModal }) {
	const imageStyle = {
		width: '842px',
		maxWidth: '100%',
		height: '100%',
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '760px' }}>
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close mr-3 px-2 py-1 rounded-circle bg-white"
						type="button"
						onClick={closeModal}>
						<span className="os-icon os-icon-close"></span>
					</button>

					<div
						className="onboarding-content with-gradient"
						style={{ maxHeight: '100vh', overflow: 'auto' }}>
						<h4 className="onboarding-title">Scan Image</h4>

						<div className="element-box p-1">
							<img src={avatar} alt="" style={imageStyle} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
