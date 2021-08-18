import React, { useState, useEffect, useCallback } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable/dist/react-select.esm';
import { useDispatch } from 'react-redux';

import { notifyError, notifySuccess } from '../../services/notify';
import { request, updateImmutable } from '../../services/utilities';
import { hmoAPI } from '../../services/constants';
import { startBlock, stopBlock } from '../../actions/redux-block';

const initialState = {
	name: '',
	address: '',
	phoneNumber: '',
	email: '',
	type: '',
	cacNumber: '',
	coverageType: '',
	coverage: '',
};

const HmoSchemeForm = ({
	scheme,
	closeModal,
	schemes,
	updateScheme,
	buttonState,
}) => {
	const [
		{
			name,
			email,
			phoneNumber,
			address,
			cacNumber,
			coverageType,
			coverage,
			type,
		},
		setState,
	] = useState(initialState);
	const [loaded, setLoaded] = useState(false);
	// const [logo, setLogo] = useState('');1
	const [submitting, setSubmitting] = useState(false);
	const [hmo, setHmo] = useState(null);
	const [insuranceTypes, setInsuranceTypes] = useState([]);

	const dispatch = useDispatch();

	const { edit, add } = buttonState;

	const loadInsuranceTypes = useCallback(async () => {
		try {
			const rs = await request(`${hmoAPI}/insurance-types`, 'GET', true);
			setInsuranceTypes(rs);
		} catch (e) {
			const message = e.message || 'could not fetch insurance types';
			notifyError(message);
		}
	}, []);

	useEffect(() => {
		if (!loaded) {
			loadInsuranceTypes();
			if (scheme) {
				setState(prevState => ({
					...prevState,
					name: scheme.name,
					email: scheme.email,
					phoneNumber: scheme.phoneNumber,
					address: scheme.address,
					cacNumber: scheme.cacNumber,
					coverageType: scheme.coverageType,
					coverage: scheme.coverage,
					type: scheme.hmoType?.id || '',
				}));
				setHmo(scheme.owner);
			}
			setLoaded(true);
		}
	}, [loadInsuranceTypes, loaded, scheme]);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddHmo = async e => {
		try {
			e.preventDefault();
			const data = {
				name,
				hmo_id: hmo?.id || '',
				hmo,
				hmo_type_id: type,
				address,
				phoneNumber,
				email,
				cacNumber,
				coverageType,
				coverage,
				logo: '',
			};
			dispatch(startBlock());
			setSubmitting(true);
			const rs = await request(`${hmoAPI}/schemes`, 'POST', true, data);
			dispatch(stopBlock());
			setSubmitting(false);
			if (rs.success) {
				notifySuccess('scheme tariff saved!');
				updateScheme([...schemes, rs]);
				setState({ ...initialState });
				closeModal();
			} else {
				notifyError(rs.message || 'could not save scheme');
			}
		} catch (e) {
			console.log(e);
			let message = '';
			try {
				message = e.message
					?.map(m => Object.values(m.constraints).join(', '))
					?.join(', ');
			} catch (e) {
				message = 'could not save hmo scheme';
			}
			dispatch(stopBlock());
			notifyError(message);
			setSubmitting(false);
		}
	};

	const onEditHmo = async e => {
		try {
			e.preventDefault();
			const data = {
				name,
				hmo_id: hmo?.id || '',
				hmo,
				hmo_type_id: type,
				address,
				phoneNumber,
				email,
				cacNumber,
				coverageType,
				coverage,
				logo: '',
			};
			dispatch(startBlock());
			setSubmitting(true);
			const url = `${hmoAPI}/schemes/${scheme.id}`;
			const rs = await request(url, 'PATCH', true, data);
			const list = updateImmutable(schemes, rs);
			updateScheme([...list]);
			setState({ ...initialState });
			setSubmitting(false);
			notifySuccess('scheme tariff saved!');
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
				message = 'could not save hmo scheme';
			}
			notifyError(message);
			dispatch(stopBlock());
			setState({ ...initialState });
			setSubmitting(false);
		}
	};

	const getOptions = async q => {
		if (!q || q.length <= 1) {
			return [];
		}

		const url = `${hmoAPI}/owners?q=${q}`;
		const { result } = await request(url, 'GET', true);
		return result;
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
								<div className="row">
									<div className="col-md-6">
										<div className="form-group">
											<label>Insurance Company</label>
											<AsyncCreatableSelect
												cacheOptions
												defaultOptions
												getOptionValue={option => option.id}
												getOptionLabel={option => option.name || option.label}
												createOptionPosition="first"
												loadOptions={getOptions}
												formatCreateLabel={inputValue => {
													return `Create ${inputValue}`;
												}}
												value={hmo}
												placeholder="Insurance Company"
												onChange={e => {
													setHmo(e);
												}}
											/>
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<label>HMO Scheme</label>
											<input
												className="form-control"
												placeholder="HMO Name"
												type="text"
												name="name"
												value={name || ''}
												onChange={handleInputChange}
											/>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-6">
										<div className="form-group">
											<label>Email Address</label>
											<input
												className="form-control"
												placeholder="E-mail"
												type="email"
												name="email"
												onChange={handleInputChange}
												value={email || ''}
											/>
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<label>Phone Number</label>
											<input
												className="form-control"
												placeholder="Phone Number"
												type="Phone"
												name="phoneNumber"
												onChange={handleInputChange}
												value={phoneNumber || ''}
											/>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-6">
										<div className="form-group">
											<label>Address</label>
											<input
												className="form-control"
												placeholder="Address"
												name="address"
												type="text"
												onChange={handleInputChange}
												value={address || ''}
											/>
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<label>Insurance Type</label>
											<select
												name="type"
												className="form-control"
												placeholder="Select Insurance Type"
												onChange={handleInputChange}
												value={type}>
												<option>Select Insurance Type</option>
												{insuranceTypes.map((item, i) => (
													<option key={i} value={item.id}>
														{item.name}
													</option>
												))}
											</select>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-6">
										<div className="form-group">
											<label>CAC Number</label>
											<input
												className="form-control"
												placeholder="CAC Number"
												type="text"
												name="cacNumber"
												onChange={handleInputChange}
												value={cacNumber || ''}
											/>
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<label>Coverage Type</label>
											<select
												name="coverageType"
												className="form-control"
												placeholder="Select Coverage Type"
												onChange={handleInputChange}
												value={coverageType}>
												<option>Select Coverage Type</option>
												<option value="partial">Partial</option>
												<option value="full">Full</option>
											</select>
										</div>
									</div>
								</div>
								{coverageType && coverageType === 'partial' && (
									<div className="row">
										<div className="col-md-6">
											<div className="form-group">
												<label>Coverage (%)</label>
												<input
													className="form-control"
													placeholder="Coverage (%)"
													type="text"
													name="coverage"
													onChange={handleInputChange}
													value={coverage || ''}
												/>
											</div>
										</div>
									</div>
								)}
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

export default HmoSchemeForm;
