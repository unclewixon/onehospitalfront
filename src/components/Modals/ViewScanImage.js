import React from 'react';

import { API_URI } from '../../services/constants';

export default function ViewScanImage({ scan, closeModal }) {
	const imageStyle = {
		width: '842px',
		maxWidth: '100%',
		height: '100%',
	};

	return (
		scan && (
			<div
				className="onboarding-modal modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}
			>
				<div className="modal-dialog modal-md modal-centered">
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
							<h4 className="onboarding-title">View Scan 1</h4>
							<div className="element-box m-0 p-2">
								<img
									src={`${API_URI}/uploads/docs/${scan.document.document_name}`}
									alt=""
									style={imageStyle}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	);
}
