import React from 'react';

import { formatCurrency } from '../../services/utilities';

const ModalServiceDetails = ({ closeModal, transaction }) => {
	// console.log(transaction);

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
			case 'ward':
				return 'Room';
			default:
				return 'Billing Details';
		}
	};

	const item = transaction.patientRequestItem;

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div className="modal-dialog modal-md modal-centered">
				<div className="modal-content text-center">
					<button className="close" type="button" onClick={closeModal}>
						<span className="os-icon os-icon-close" />
					</button>
					<div className="onboarding-content with-gradient">
						<h6 className="onboarding-title">
							{renderServiceType(transaction?.bill_source)}
						</h6>
						{transaction?.bill_source === 'drugs' && (
							<div className="element-box p-2">
								<div className="table-responsive">
									<table className="table table-striped">
										<thead>
											<tr>
												<th>ID</th>
												<th>ITEM</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>{item?.request?.code}</td>
												<td>{`${item.fill_quantity} ${
													item.drug.unitOfMeasure
												} of ${item.drugGeneric.name} (${
													item.drug.name
												}) at ${formatCurrency(
													item.drugBatch.unitPrice
												)} each`}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						)}
						{transaction?.bill_source === 'consultancy' && (
							<div className="element-box p-2">
								<div>{transaction.service?.item?.name || ''}</div>
							</div>
						)}
						{(transaction?.bill_source === 'labs' ||
							transaction?.bill_source === 'scans' ||
							transaction?.bill_source === 'procedure' ||
							transaction?.bill_source === 'nursing-service') && (
							<div className="element-box p-2">
								<div className="table-responsive">
									<table className="table table-striped">
										<thead>
											<tr>
												<th>ID</th>
												<th>ITEM</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>{item?.request?.code}</td>
												<td>{transaction?.service?.item?.name}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						)}
						{(transaction?.bill_source === 'ward' ||
							transaction?.bill_source === 'nicu-accommodation') && (
							<div className="element-box p-2">
								<div>{transaction.description}</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalServiceDetails;
