import React from 'react';

const Cafeteria = ({ details }) => {
	console.log('DisplayBilling =');
	return (
		<>
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
									<td>{tr.amount}</td>
								</tr>
							);
						})}
					{details.length === 0 && (
						<tr className="text-center">
							<td colSpan={3}>No Items</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	);
};

const DisplayBilling = ({ details }) => {
	console.log('DisplayBilling =');
	return (
		<>
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
									<td>{tr.amount}</td>
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
		</>
	);
};

const DisplayLab = ({ details }) => {
	console.log('DisplayLab =', details);
	return (
		<>
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
						<td>{details.data.price}</td>
						<td>{details.data.createdBy}</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

const DisplayPharmacy = ({ details }) => {
	console.log('DisplayPharmacy =');
	return (
		<>
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
									<td>{tr.drug_cost}</td>
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
		</>
	);
};

const ModalServiceDetails = ({ closeModal, details }) => {
	console.log('ModalServiceDetails =');
	console.log(details);

	const renderServiceType = type => {
		switch (type) {
			case 'billing':
				return 'Billing Details';
			case 'lab':
				return 'Lab Tests';
			case 'pharmacy':
				return 'List of Drugs';
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
									<h5 className="element-inner-header">
										{renderServiceType(details?.transaction_type)}
									</h5>
								</div>
							</div>
						</div>

						{details?.transaction_type === 'billing' ? (
							<DisplayBilling details={details} />
						) : (
							''
						)}
						{details?.transaction_type === 'cafeteria' ? (
							<Cafeteria details={details} />
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
	);
};

export default ModalServiceDetails;
