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
						<div className="">
							<img
								width="30%"
								height="20%"
								src={require('../assets/images/logo.png')}
								alt="logo"
							/>
						</div>
						<div></div>
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
												<td>{item?.name}</td>
												<td className="text-center">{item?.quantity}</td>
												<td className="text-center">{item?.sales_price}</td>
											</tr>
									  ))
									: null}
								<tr>
									<td colSpan={2} className="text-bold">
										Total
									</td>
									<td className="text-center text-bold">
										{props.calSubTotal()}
									</td>
								</tr>
								<tr>
									<td colSpan={2} className="text-bold">
										Amount Paid
									</td>
									<td className="text-center text-bold">{props.amountPaid}</td>
								</tr>
								<tr>
									<td colSpan={2} className="text-bold">
										Balance
									</td>
									<td className="text-center text-bold">
										{props.calBalance()}
									</td>
								</tr>
							</tbody>
						</table>
						{!props.cart.length ? (
							<div className="text-center">
								No item added, Check back later!
							</div>
						) : null}
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
