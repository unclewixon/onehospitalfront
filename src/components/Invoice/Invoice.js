/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import circleLogo from '../../assets/images/logo-big.png';

const Invoice = ({ data }) => {
	return (
		<div
			style={{
				maxWidth: 600,
				margin: '0px auto',
				// boxShadow: '0px 20px 50px rgba(0,0,0,0.05)',
			}}>
			<table style={{ width: '100%' }}>
				<tbody>
					<tr>
						<td>
							<img
								alt=""
								src={`url(${circleLogo})`}
								style={{ width: 70, padding: 20 }}
							/>
						</td>
					</tr>
				</tbody>
			</table>
			<div style={{ padding: '0px 70px 30px 70px' }}>
				<table style={{ width: '100%' }}>
					<tbody>
						<tr>
							<td style={{ paddingRight: 30 }}>
								<div
									style={{
										textTransform: 'uppercase',
										fontSize: 11,
										letterSpacing: 1,
										fontWeight: 'bold',
										color: '#B8B8B8',
										marginBottom: 5,
									}}>
									Patient Name:
								</div>
								<div
									style={{
										fontSize: 12,
										color: '#111',
										fontWeight: 'bold',
										maxWidth: '100px',
									}}>
									{`${data?.patient?.surname} ${data?.patient?.other_names}`}
								</div>
							</td>
							<td style={{ maxWidth: 150, textAlign: 'right' }}>
								<div
									style={{
										textTransform: 'uppercase',
										fontSize: 11,
										letterSpacing: 1,
										fontWeight: 'bold',
										color: '#B8B8B8',
										marginBottom: 5,
									}}>
									File Number:
								</div>
								<div
									style={{
										fontSize: 12,
										color: '#111',
										fontWeight: 'bold',
										marginBottom: 20,
									}}>
									{data?.patient?.fileNumber}
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<table style={{ marginTop: 40, width: '100%' }}>
					<tbody>
						<tr>
							<td
								style={{
									textTransform: 'uppercase',
									letterSpacing: 1,
									color: '#B8B8B8',
									fontSize: 10,
									fontWeight: 'bold',
								}}>
								Item
							</td>
							<td
								style={{
									textTransform: 'uppercase',
									letterSpacing: 1,
									color: '#B8B8B8',
									fontSize: 10,
									fontWeight: 'bold',
									textAlign: 'right',
								}}>
								Amount
							</td>
						</tr>
						<tr>
							<td
								style={{
									padding: '15px 0px',
									borderBottom: '1px solid rgba(0,0,0,0.05)',
								}}>
								<div
									style={{ color: '#111', fontSize: 14, fontWeight: 'bold' }}>
									{data?.serviceType?.name}
								</div>
								{/* <div style={{ color: '#B8B8B8', fontSize: 12 }}>
									Extended license included
								</div> */}
							</td>
							<td
								style={{
									padding: '15px 0px',
									textAlign: 'right',
									fontSize: 14,
									fontWeight: 'bold',
									color: '#111',
									borderBottom: '1px solid rgba(0,0,0,0.05)',
								}}>
								{data.amount}
							</td>
						</tr>
						{/* <tr>
							<td style={{ padding: '15px 0px' }}>
								<div
									style={{ color: '#111', fontSize: 14, fontWeight: 'bold' }}>
									Bootstrap tutorials books
								</div>
								<div style={{ color: '#B8B8B8', fontSize: 12 }}>
									Complete set with ebook version
								</div>
							</td>
							<td
								style={{
									padding: '15px 0px',
									textAlign: 'right',
									fontSize: 14,
									fontWeight: 'bold',
									color: '#111',
								}}>
								$112.45
							</td>
						</tr> */}
					</tbody>
				</table>
				<table
					style={{
						marginLeft: 'auto',
						marginTop: 0,
						borderTop: '3px solid #eee',
						paddingTop: 10,
						marginBottom: 20,
					}}>
					<tbody>
						<tr>
							<td
								style={{ color: '#B8B8B8', fontSize: 12, padding: '5px 0px' }}>
								Subtotal:
							</td>
							<td
								style={{
									color: '#111',
									textAlign: 'right',
									fontWeight: 'bold',
									padding: '5px 0px 5px 40px',
									fontSize: 12,
								}}>
								$145.98
							</td>
						</tr>
						<tr>
							<td
								style={{ color: '#B8B8B8', fontSize: 12, padding: '5px 0px' }}>
								Tax:
							</td>
							<td
								style={{
									color: '#111',
									textAlign: 'right',
									fontWeight: 'bold',
									padding: '5px 0px 5px 40px',
									fontSize: 12,
								}}>
								$12.83
							</td>
						</tr>
						{/* <tr>
							<td
								style={{ color: '#B8B8B8', fontSize: 12, padding: '5px 0px' }}>
								Shipping
					</td>
							<td
								style={{
									color: '#111',
									textAlign: 'right',
									fontWeight: 'bold',
									padding: '5px 0px 5px 40px',
									fontSize: 12,
								}}>
								$0.00
					</td>
						</tr> */}
						<tr>
							<td
								style={{ color: '#B8B8B8', fontSize: 12, padding: '5px 0px' }}>
								Discount
							</td>
							<td
								style={{
									color: '#45BB4C',
									textAlign: 'right',
									fontWeight: 'bold',
									padding: '5px 0px 5px 40px',
									fontSize: 12,
								}}>
								{}
							</td>
						</tr>
						<tr>
							<td
								style={{
									color: '#111',
									letterSpacing: 1,
									fontSize: 20,
									padding: '10px 0px',
									textTransform: 'uppercase',
									fontWeight: 'bold',
								}}>
								Total
							</td>
							<td
								style={{
									color: '#4B72FA',
									textAlign: 'right',
									fontWeight: 'bold',
									padding: '10px 0px 5px 40px',
									fontSize: 20,
								}}>
								$169.34
							</td>
						</tr>
					</tbody>
				</table>
				{/* <div
					style={{
						color: '#636363',
						fontSize: 14,
						paddingTop: 20,
						borderTop: '1px solid rgba(0,0,0,0.05)',
						marginBottom: 50,
					}}>
					Thank you again for shopping at with us. We appreciate your business
					and look forward to serving you in the near future.
				</div>
				<h4 style={{ marginBottom: 10 }}>Need Help?</h4> */}
				<div style={{ color: '#A5A5A5', fontSize: 12 }}>
					<p>
						If you have any questions you can simply reply to this email or find
						our contact information below. Also contact us at{' '}
						<a style={{ textDecoration: 'underline', color: '#4B72FA' }}>
							test@example.com
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Invoice;
