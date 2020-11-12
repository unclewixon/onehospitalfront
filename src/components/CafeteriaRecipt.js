import React, { useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';

const CafeteriaRecipt = props => {
	const receiptRef = useRef();

	const handlePrint = useReactToPrint({
		content: () => receiptRef.current,
	});

	return (
		<Modal
			show={props.toggle}
			onHide={props.onModalClick}
			dialogClassName="modal-90w"
			aria-labelledby="example-custom-modal-styling-title"
			className="onboarding-modal modal fade animated show">
			<Modal.Header closeButton onClick={props.onModalClick}></Modal.Header>
			<Modal.Body>
				<div id="divToPrint" ref={receiptRef}>
					<center className="reciept-header">
						<div className="reciept-logo">
							<img src="http://michaeltruong.ca/images/logo1.png" alt="logo" />
						</div>
						<div>
							<h2>Deda Hospital</h2>
						</div>
					</center>

					<div className="recirpt-address">
						<p>
							<strong>
								Plot 1847, Cadastral Zone B07, Katampe Road, Abuja.
								dedahospital.com.ng <br /> 0818 422 7707, 0818 755 7344, 0808
								233 7758
							</strong>
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
										Sold To
									</td>
									<td
										style={{
											textAlign: 'right',
											fontWeight: 'bold',
											padding: '5px 0px 5px 40px',
											fontSize: '12px',
										}}>
										{`${props.customer}-${props.special}`}
									</td>
								</tr>
								<tr>
									<td
										style={{
											fontsize: '12px',
											padding: '5px 0px',
										}}>
										Payment Type
									</td>
									<td
										style={{
											textAlign: 'right',
											fontWeight: 'bold',
											padding: '5px 0px 5px 40px',
											fontSize: '12px',
										}}>
										{props.type}
									</td>
								</tr>
								<tr>
									<td
										style={{
											fontsize: '12px',
											padding: '5px 0px',
										}}>
										Cashier:
									</td>
									<td
										style={{
											textAlign: 'right',
											fontWeight: 'bold',
											padding: '5px 0px 5px 40px',
											fontSize: '12px',
										}}>
										Logged in Cashier
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="element-box-tp">
						<table className="table ">
							<thead>
								<tr>
									<th>Item</th>
									<th className="text-center">Qty</th>
									<th className="text-center">Sub Total(&#x20A6;)</th>
								</tr>
							</thead>
							<tbody>
								{props.cart && props.cart.length
									? props.cart.map((item, i) => (
											<tr key={i}>
												<td>{item?.item}</td>
												<td className="text-center">{item?.quantity}</td>
												<td className="text-center">{item?.price}</td>
											</tr>
									  ))
									: null}
							</tbody>
						</table>
						{!props.cart.length ? (
							<div className="text-center">
								No item added, Check back later!
							</div>
						) : null}
						<div>
							<table
								style={{
									marginLeft: 'auto',
									marginTop: ' 15px',
									borderTop: '3px solid #eee',
									paddingtop: '20px',
									marginBottom: '20px',
									fontsize: '25px',
									fontWeight: 'bold',
								}}>
								<tbody>
									<tr>
										<td
											style={{
												padding: '5px 0px',
											}}>
											Total
										</td>
										<td
											style={{
												textAlign: 'right',
												padding: '5px 0px 5px 40px',
											}}>
											&#x20A6;
											{props.calBalance()}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div>
							<p className="justify-center">
								<strong>Thanks for your patronage!</strong>  Payment is expected
								within 31 days; please process this invoice within that time.
								There will be a 5% interest charge per month on late invoices.
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

export default CafeteriaRecipt;
