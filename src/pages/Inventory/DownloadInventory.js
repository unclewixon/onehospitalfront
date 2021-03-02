import React from 'react';

import waiting from '../../assets/images/waiting.gif';

const DownloadInventory = ({ onHide, downloading, doDownload }) => {
	return (
		<div
			className="onboarding-modal fade animated show"
			role="dialog"
			style={{ width: '300px' }}>
			<div className="modal-centered" role="document">
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => onHide()}>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<div className="form-block">
							<form onSubmit={e => doDownload(e)}>
								<div className="row">
									<div className="col-sm-6">
										<button
											className="btn btn-primary"
											disabled={downloading}
											type="submit">
											{downloading ? (
												<img src={waiting} alt="submitting" />
											) : (
												'download'
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
};

export default DownloadInventory;
