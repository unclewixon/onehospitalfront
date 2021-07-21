import React, { useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import { patientname } from '../../services/utilities';

const DisplayBilling = ({ details, total }) => {
	console.log('DisplayBilling =');
	return (
		<div>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>S/N</th>
						<th>NAME</th>
						<th>AMOUNT (&#x20A6;)</th>
					</tr>
				</thead>
				<tbody>
					{details &&
						details.map((tr, index) => {
							return (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{tr.name}</td>
									<td className="flex">{tr.amount}</td>
								</tr>
							);
						})}
					<tr className="text-center">
						<td></td>
						<td>
							<span style={{ fontSize: '12px', fontWeight: 'bold' }}>
								Total Amount:
							</span>
						</td>
						<td>
							<span style={{ fontSize: '12px', fontWeight: 'bold' }}>
								{' '}
								&#x20A6;{total}
							</span>
						</td>
					</tr>
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

const ModalProformaInvoice = ({
	showModal,
	closeModal,
	details,
	total,
	hmo,
	patient,
	user,
	description,
}) => {
	const receiptRef = useRef();
	console.log({ user: user });
	const handlePrint = useReactToPrint({
		content: () => receiptRef.current,
	});

	return (
		<Modal
			show={showModal}
			onHide={closeModal}
			dialogClassName="modal-90w"
			aria-labelledby="example-custom-modal-styling-title"
			className="onboarding-modal modal fade animated show">
			<Modal.Header closeButton onClick={closeModal}></Modal.Header>
			<Modal.Body>
				<div id="divToPrint" ref={receiptRef}>
					<center className="reciept-header">
						<div className="">
							<img
								width="30%"
								height="20%"
								src={require('../../assets/images/logo.png')}
								alt="logo"
							/>
						</div>
						<h2>Proforma Invoice</h2>
					</center>

					<div className="reciept-address">
						<p style={{ fontSize: '9px' }}>
							Plot 1847, Cadastral Zone B07, Katampe Road, Abuja.
							dedahospital.com.ng <br /> 0818 422 7707, 0818 755 7344, 0808 233
							7758
						</p>
					</div>

					<div>
						<table
							style={{
								// marginLeft: 'auto',
								marginTop: ' 15px',
								borderTop: '3px solid #eee',
								paddingtop: '20px',
								marginBottom: '20px',
							}}>
							<tbody>
								<tr>
									<td
										style={{
											fontsize: '12px',
											padding: '5px 0px',
										}}>
										{moment(Date.now()).format('DD-MM-YYYY')}
									</td>
									<td
										style={{
											textAlign: 'right',
											fontWeight: 'bold',
											padding: '5px 0px 5px 40px',
											fontSize: '12px',
										}}>
										{moment(new Date().getTime()).format('h:mm a')}
									</td>
								</tr>
								<tr>
									<td
										style={{
											fontsize: '12px',
											padding: '5px 0px',
										}}>
										Requested By:
									</td>
									<td
										style={{
											textAlign: 'right',
											fontWeight: 'bold',
											padding: '5px 0px 5px 40px',
											fontSize: '12px',
										}}>
										{patientname(patient)}
									</td>
								</tr>
								<tr>
									<td
										style={{
											fontsize: '12px',
											padding: '5px 0px',
										}}>
										HMO:
									</td>
									<td
										style={{
											textAlign: 'right',
											fontWeight: 'bold',
											padding: '5px 0px 5px 40px',
											fontSize: '12px',
										}}>
										{hmo?.name}
									</td>
								</tr>
								<tr>
									<td
										style={{
											fontsize: '12px',
											padding: '5px 0px',
										}}>
										Prepared BY:
									</td>
									<td
										style={{
											textAlign: 'right',
											fontWeight: 'bold',
											padding: '5px 0px 5px 40px',
											fontSize: '12px',
										}}>
										{user?.details?.first_name} {user?.details?.last_name}
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="element-box-tp">
						<DisplayBilling details={details} total={total} />
						<div>
							<p className="justify-center">
								<strong>Thanks for your patronage!</strong> {description}.
							</p>
						</div>
					</div>
				</div>
				<div className="text-right">
					<button
						onClick={handlePrint}
						className="btn btn-primary btn-sm mx-3"
						type="submit">
						<i className="icon-feather-printer"></i>
					</button>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ModalProformaInvoice;
