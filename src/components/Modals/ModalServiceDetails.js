import React from 'react';

const DisplayBilling = ({ details }) => {
	console.log('DisplayBilling =');
	return (
		<div>
			<h2>List of services</h2>

			<table className="table table-striped">
				<thead>
					<tr>
						<th>S/N</th>
						<th>NAME</th>
						<th>AMOUNT (&#x20A6;)</th>
					</tr>
				</thead>
				<tbody>
					{details.data &&
						details.data.map((tr, index) => {
							return (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{tr.name}</td>
									<td className="flex">{tr.amount}</td>
								</tr>
							);
						})}
					{details.length === 0 && (
						<tr className="text-center">
							<td colSpan={3}>No Services</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

const DisplayLab = ({ details }) => {
	console.log('DisplayLab =');
	return (
		<div>
			<h2>Lab Request Detail</h2>

			<table className="table table-striped">
				<thead>
					<tr>
						<th>NAME</th>
						<th>AMOUNT (&#x20A6;)</th>
						<th>CREATED BY</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{details.data.name}</td>
						<td className="flex">{details.data.price}</td>
						<td>{details.data.createdBy}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

const DisplayPharmacy = ({ details }) => {
	console.log('DisplayPharmacy =');
	return (
		<div>
			<h2>List of Prescriptions</h2>

			<table className="table table-striped">
				<thead>
					<tr>
						<th>S/N</th>
						<th>NAME</th>
						<th>DRUG COST (&#x20A6;)</th>
						<th>FILLED BY</th>
					</tr>
				</thead>
				<tbody>
					{details.data &&
						details.data.map((tr, index) => {
							return (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{tr.drug_name}</td>
									<td className="flex">{tr.drug_cost}</td>
									<td>{tr.filled_by}</td>
								</tr>
							);
						})}
					{details.length === 0 && (
						<tr className="text-center">
							<td colSpan={3}>No Precriptions</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

const ModalServiceDetails = ({ closeModal, details }) => {
	console.log('ModalServiceDetails =');
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
					<div className="onboarding-content with-gradient">
						<div className="element-info">
							<div className="element-info-with-icon">
								<div className="element-info-text">
									<h5 className="element-inner-header">Service Details</h5>
								</div>
							</div>
						</div>

						<div className="table-responsive">
							{details?.transaction_type === 'billing' ? (
								<DisplayBilling details={details} />
							) : (
								''
							)}
							{details?.transaction_type === 'lab' ? (
								<DisplayLab details={details} />
							) : (
								''
							)}
							{details?.transaction_type === 'pharmacy' ? (
								<DisplayPharmacy details={details} />
							) : (
								''
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalServiceDetails;
