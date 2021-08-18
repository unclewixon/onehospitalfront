import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { request, updateImmutable } from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { hmoAPI } from '../../services/constants';
import { notifyError } from '../../services/notify';

const initialState = {
	name: '',
	address: '',
	email: '',
	phoneNumber: '',
	add: true,
	edit: false,
};

const ModalHmoCompany = ({
	company,
	closeModal,
	companies,
	updateCompany,
	buttonState,
}) => {
	const [{ name, email, phoneNumber, address }, setState] = useState(
		initialState
	);
	const [loaded, setLoaded] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const dispatch = useDispatch();

	const { edit, add } = buttonState;

	useEffect(() => {
		if (!loaded) {
			if (company) {
				setState(prevState => ({
					...prevState,
					name: company.name,
					phoneNumber: company.phoneNumber,
					address: company.address,
					email: company.email,
				}));
			}
			setLoaded(true);
		}
	}, [company, loaded]);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddHmo = async e => {
		try {
			e.preventDefault();
			dispatch(startBlock());
			const data = {
				name,
				email,
				phoneNumber,
				address,
			};
			setSubmitting(true);
			const rs = await request(`${hmoAPI}/owners`, 'POST', true, data);
			updateCompany([...companies, rs]);
			setState({ ...initialState });
			setSubmitting(false);
			dispatch(stopBlock());
			closeModal();
		} catch (e) {
			console.log(e);
			let message = '';
			try {
				message = e.message
					?.map(m => Object.values(m.constraints).join(', '))
					?.join(', ');
			} catch (e) {
				message = 'could not save hmo company';
			}
			notifyError(message);
			dispatch(stopBlock());
			setSubmitting(false);
		}
	};

	const onEditHmo = async e => {
		try {
			e.preventDefault();
			const info = {
				name,
				email,
				phoneNumber,
				address,
			};
			dispatch(startBlock());
			setSubmitting(true);
			const url = `${hmoAPI}/owners/${company.id}`;
			const rs = await request(url, 'PATCH', true, info);
			const list = updateImmutable(companies, rs);
			updateCompany([...list]);
			setState({ ...initialState });
			setSubmitting(false);
			dispatch(stopBlock());
			closeModal();
		} catch (e) {
			console.log(e);
			let message = '';
			try {
				message = e.message
					?.map(m => Object.values(m.constraints).join(', '))
					?.join(', ');
			} catch (e) {
				message = 'could not save hmo company';
			}
			notifyError(message);
			setState({ ...initialState });
			setSubmitting(false);
			dispatch(stopBlock());
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div className="modal-dialog modal-centered">
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => closeModal()}>
						<span className="os-icon os-icon-close" />
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">{`${
							edit ? 'Edit' : 'Add New'
						} HMO Scheme`}</h4>
						<div className="element-box">
							<form onSubmit={edit ? onEditHmo : onAddHmo}>
								<h6 className="form-header">{`${
									edit ? 'Edit' : 'Add New'
								} HMO Company`}</h6>
								<div className="form-group">
									<input
										className="form-control"
										placeholder="Name"
										type="text"
										name="name"
										value={name || ''}
										onChange={handleInputChange}
									/>
								</div>
								<div className="form-group">
									<input
										className="form-control"
										placeholder="E-mail"
										type="email"
										name="email"
										onChange={handleInputChange}
										value={email || ''}
									/>
								</div>
								<div className="form-group">
									<input
										className="form-control"
										placeholder="Phone Number"
										type="Phone"
										name="phoneNumber"
										onChange={handleInputChange}
										value={phoneNumber || ''}
									/>
								</div>
								<div className="form-group">
									<input
										className="form-control"
										placeholder="Address"
										name="address"
										type="text"
										onChange={handleInputChange}
										value={address || ''}
									/>
								</div>
								<div className="form-buttons-w">
									{add && (
										<button
											className={`btn btn-primary ${
												submitting ? 'disabled' : ''
											}`}>
											<span>save</span>
										</button>
									)}
									{edit && (
										<>
											<button
												className={`btn btn-secondary ${
													submitting ? 'disabled' : ''
												}`}
												onClick={() => closeModal()}>
												<span>cancel</span>
											</button>
											<button
												className={`btn btn-primary ${
													submitting ? 'disabled' : ''
												}`}>
												<span>save</span>
											</button>
										</>
									)}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalHmoCompany;
