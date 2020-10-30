import React from 'react';
import Modal from 'react-bootstrap/Modal';

const CafeteriaRecipt = props => {
	return (
		<Modal
			show={props.toggle}
			onHide={props.onModalClick}
			dialogClassName="modal-90w"
			aria-labelledby="example-custom-modal-styling-title"
			className="onboarding-modal modal fade animated show">
			<Modal.Header closeButton onClick={props.onModalClick}></Modal.Header>
			<Modal.Body>
				<div>
					<div className="invoice-POS">
						<center id="top">
							<div className="logo"></div>
							<div className="info">
								<h2>SBISTechs Inc</h2>
							</div>
						</center>

						<div id="mid">
							<div className="info">
								<h2>Contact Info</h2>
								<p>
									Address : street city, state 0000 <br />
									Email : JohnDoe@gmail.com <br />
									Phone : 555-555-5555
								</p>
							</div>
						</div>

						<div id="bot">
							<table>
								<thead>
									<tr className="tabletitle">
										<th className="item">
											<h2>Item</h2>
										</th>
										<th className="Hours">
											<h2>Qty</h2>
										</th>
										<th className="Rate">
											<h2>Sub Total</h2>
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="service">
										<td className="tableitem">
											<p className="itemtext">Communication</p>
										</td>
										<td className="tableitem">
											<p className="itemtext">5</p>
										</td>
										<td className="tableitem">
											<p className="itemtext">$375.00</p>
										</td>
									</tr>

									<tr className="service">
										<td className="tableitem">
											<p className="itemtext">Asset Gathering</p>
										</td>
										<td className="tableitem">
											<p className="itemtext">3</p>
										</td>
										<td className="tableitem">
											<p className="itemtext">$225.00</p>
										</td>
									</tr>
								</tbody>
							</table>
							<div id="legalcopy">
								<p className="legal">
									<strong>Thank you for your business!</strong>  Payment is
									expected within 31 days; please process this invoice within
									that time. There will be a 5% interest charge per month on
									late invoices.
								</p>
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default CafeteriaRecipt;
