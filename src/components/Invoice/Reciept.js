import React from 'react';
import moment from 'moment';

const Reciept = ({ data }) => {
	return (
		<div
			style={{
				maxWidth: 215,
				margin: '0px auto',
				// boxShadow: '0px 20px 50px rgba(0,0,0,0.05)',
			}}>
			{/* <table style={{ width: '100%', borderSpacing: 'none' }}>
				<tbody>
					<tr>
						<td style={{ textAlign: 'center' }}>
							<img style={{ width: 40, padding: 10 }} src="img/logo.png" alt />
						</td>
					</tr>
				</tbody>
			</table> */}
			<div
				style={{
					padding: '10px 15px',
					borderTop: '1px solid rgba(0,0,0,0.05)',
				}}>
				<h5 style={{ margin: 0, textAlign: 'center' }}>DEDA HOSPITAL</h5>
				<div
					style={{
						color: '#636363',
						fontSize: 8,
						marginBottom: 10,
						textAlign: 'center',
					}}>
					Plot 174, Cdastrl Zone B07, Katampe, Behind ABC Cargo, Abuja Municipal
					Area Council, FCT{' '}
				</div>
				<div>
					<div
						style={{
							padding: 5,
							textTransform: 'uppercase',
							color: '#8D929D',
							fontSize: 11,
							fontWeight: 'bold',
							letterSpacing: 1,
							textAlign: 'center',
						}}>
						RECEIPT:
					</div>
					<table style={{ borderCollapse: 'collapse', width: '100%' }}>
						<tbody>
							<tr style={{ lineHeight: '10px' }}>
								<td
									style={{
										padding: 0,
										color: '#111',
										borderTop: '1px solid #e7e7e7',
										width: '100%',
									}}>
									<span
										style={{
											color: '#B8B8B8',
											fontSize: 8,
											fontWeight: 'bold',
											marginBottom: 3,
										}}>
										TRANSACTION DATE:{' '}
									</span>
									<span style={{ fontSize: 8, fontWeight: 'bold' }}>
										{moment(data?.createdAt).format('DD/MM/YY')}
									</span>
								</td>
							</tr>
							<tr style={{ lineHeight: '10px' }}>
								<td style={{ color: '#111', width: '100%' }}>
									<span
										style={{
											color: '#B8B8B8',
											fontSize: 8,
											fontWeight: 'bold',
											marginBottom: 3,
										}}>
										RECEIVED FROM:{' '}
									</span>
									<span style={{ fontSize: 8, fontWeight: 'bold' }}>
										{`${data?.patient?.surname} ${data?.patient?.other_names} (${data?.patient?.fileNumber})`.toUpperCase()}
									</span>
								</td>
							</tr>
							<tr style={{ lineHeight: '10px' }}>
								<td style={{ color: '#111', width: '100%' }}>
									<span
										style={{
											color: '#B8B8B8',
											fontSize: 8,
											fontWeight: 'bold',
											marginBottom: 3,
										}}>
										AMOUNT (NGN):
									</span>
									<span style={{ fontSize: 8, fontWeight: 'bold' }}>
										{data?.amount}
									</span>
								</td>
							</tr>
							<tr style={{ lineHeight: '10px' }}>
								<td style={{ color: '#111', width: '100%' }}>
									<span
										style={{
											color: '#B8B8B8',
											fontSize: 8,
											fontWeight: 'bold',
											marginBottom: 3,
										}}>
										AMOUNT PAID(NGN):
									</span>
									<span style={{ fontSize: 8, fontWeight: 'bold' }}>
										{`${data?.amount_paid}`.toUpperCase()}
									</span>
								</td>
							</tr>
							<tr style={{ lineHeight: '10px' }}>
								<td style={{ color: '#111', width: '100%' }}>
									<span
										style={{
											color: '#B8B8B8',
											fontSize: 8,
											fontWeight: 'bold',
											marginBottom: 3,
										}}>
										PAYMENT TYPE:
									</span>
									<span style={{ fontSize: 8, fontWeight: 'bold' }}>
										{`${data?.payment_type}`.toUpperCase()}
									</span>
								</td>
							</tr>
							<tr style={{ lineHeight: '10px' }}>
								<td style={{ color: '#111', width: '100%' }}>
									<span
										style={{
											color: '#B8B8B8',
											fontSize: 8,
											fontWeight: 'bold',
											marginBottom: 3,
										}}>
										OUTSTANDING BALANCE (NGN):{' '}
									</span>
									<span style={{ fontSize: 8, fontWeight: 'bold' }}>
										{data?.balance ? data?.balance : '0.00'}
									</span>
								</td>
							</tr>
							<tr style={{ lineHeight: '10px' }}>
								<td
									style={{
										color: '#111',
										borderBottom: '1px solid #e7e7e7',
										width: '100%',
									}}>
									<span
										style={{
											color: '#B8B8B8',
											fontSize: 8,
											fontWeight: 'bold',
											marginBottom: 3,
										}}>
										CASHIER:{' '}
									</span>
									<span style={{ fontSize: 8, fontWeight: 'bold' }}></span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div style={{ color: '#A5A5A5', fontSize: 8 }}>
					<p>
						If you have any questions you can simply reply{' '}
						<a
							href="#"
							style={{ textDecoration: 'underline', color: '#4B72FA' }}>
							test@example.com
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Reciept;
