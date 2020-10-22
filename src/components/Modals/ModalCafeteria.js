import React from 'react';
import Modal from 'react-bootstrap/Modal';

const ModalCafetaria = ({ showModal, onModalClick, activeRequest, total }) => {
	return (
		<Modal
			className="onboarding-modal"
			show={showModal}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			onHide={onModalClick}>
			<Modal.Header closeButton style={{ borderBottom: 'none' }}>
				Cart Details
			</Modal.Header>
			<Modal.Body>
				<table className="table">
					{activeRequest.map(request => {
						return (
							<tbody>
								<tr>
									<td
										className="text-left"
										style={{
											padding: '5px 0px',
										}}>
										{request.title}
									</td>

									<td
										className="text-right"
										style={{
											textAlign: 'right',
											borderTop: 'none',
											padding: '5px 0px 5px 40px',
										}}>
										{request.price}
									</td>
								</tr>
							</tbody>
						);
					})}
				</table>
				<div>
					<table className="table">
						<tr>
							<td
								style={{
									padding: '5px 0px',
								}}>
								Total:
							</td>
							<td
								style={{
									textAlign: 'right',

									padding: '5px 0px 5px 40px',
								}}>
								{total}
							</td>
						</tr>
					</table>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ModalCafetaria;
