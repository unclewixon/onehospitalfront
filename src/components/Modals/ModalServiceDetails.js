import React from 'react';

const ModalServiceDetails = ({ closeModal, transaction }) => {
	console.log(transaction);

	const renderServiceType = type => {
		switch (type) {
			case 'labs':
				return 'Lab Tests';
			case 'drugs':
				return 'Prescription';
			case 'consultancy':
				return 'Consultation';
			case 'scans':
				return 'Scans';
			case 'procedure':
				return 'Procedure';
			case 'cafeteria':
				return 'Cafeteria';
			default:
				return 'Billing Details';
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div className="modal-dialog modal-md modal-centered">
				<div className="modal-content text-center">
					<button className="close" type="button" onClick={closeModal}>
						<span className="os-icon os-icon-close" />
					</button>
					<div className="onboarding-content with-gradient">
						<h6 className="onboarding-title">
							{renderServiceType(transaction?.bill_source)}
						</h6>
						<div className="element-box p-2">
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>ID</th>
											<th>ITEM</th>
											<th>AMOUNT</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td></td>
											<td></td>
											<td></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalServiceDetails;
