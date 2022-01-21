/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import AsyncCreatableSelect from 'react-select/async-creatable/dist/react-select.esm';

import { request } from '../../services/utilities';
import { updateLabTest } from '../../actions/settings';
import { notifySuccess, notifyError } from '../../services/notify';
import waiting from '../../assets/images/waiting.gif';

const ModalLabParameters = ({ closeModal, labTest }) => {
	const [loaded, setLoaded] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [options, setOptions] = useState([]);
	const [parameters, setParameters] = useState([]);

	const elementRef = useRef(null);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!loaded) {
			setParameters(
				labTest.parameters.map((p, i) => ({
					id: i,
					deleted: 0,
					name: p.name,
					reference: p.reference,
					ref_id: p.id,
				}))
			);
			setOptions(labTest.parameters.map((p, i) => ({ id: i, name: p.name })));
			setLoaded(true);
		}
	}, [labTest.parameters, loaded]);

	const update = (allParameters, id, type, value) => {
		const parameter = allParameters.find(d => d.id === id);
		if (parameter) {
			const idx = allParameters.findIndex(d => d.id === id);
			const newParameters = [
				...allParameters.slice(0, idx),
				{ ...parameter, [type]: value },
				...allParameters.slice(idx + 1),
			];

			return newParameters;
		}

		return [];
	};

	const add = () => {
		setParameters([
			...parameters,
			{
				id: parameters.length,
				deleted: 0,
				name: '',
				reference: '',
				ref_id: null,
			},
		]);

		elementRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const onChange = (e, type, id, hasData) => {
		let allParameters = [];
		if (e) {
			const value = hasData ? e.name || e.value : e.target.value;
			allParameters = update(parameters, id, type, value);
			if (hasData) {
				if (e.id) {
					allParameters = update(allParameters, id, 'ref_id', e.id);
				}
				if (e.reference) {
					allParameters = update(allParameters, id, 'reference', e.reference);
				} else {
					allParameters = update(allParameters, id, 'reference', '');
				}
			}
		} else {
			allParameters = update(parameters, id, 'name', '');
			allParameters = update(allParameters, id, 'ref_id', '');
			allParameters = update(allParameters, id, 'reference', '');
		}

		setParameters([...allParameters]);
	};

	const remove = id => {
		const allParameters = update(parameters, id, 'deleted', 1);
		setParameters([...allParameters]);
	};

	const save = async () => {
		try {
			const checkEmpty = parameters.find(
				p => (p.name === '' || p.reference === '') && p.deleted === 0
			);
			if (checkEmpty) {
				notifyError('Error fill empty fields');
				return;
			}

			setSubmitting(true);
			const data = {
				...labTest,
				lab_category_id: labTest.category.id,
				hmo_id: labTest.service.hmo.id,
				parameters: parameters
					.filter(p => p.deleted === 0)
					.map(p => ({ id: p.ref_id, name: p.name, reference: p.reference })),
			};
			const url = `lab-tests/${labTest.id}`;
			const rs = await request(url, 'PATCH', true, data);
			dispatch(updateLabTest(rs));
			setSubmitting(false);
			notifySuccess('Lab test updated');
			closeModal();
		} catch (error) {
			console.log(error);
			setSubmitting(false);
			notifyError('Error updating lab test');
		}
	};

	const getOptions = async q => {
		if (!q || q.length <= 1) {
			return [];
		}

		const url = `lab-tests/parameters?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div className="modal-dialog modal-md modal-centered">
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}
					>
						<span className="os-icon os-icon-close" />
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Lab Test Parameters</h4>
						<div className="onboarding-text alert-custom mb-3">
							{labTest.name}
						</div>
						<div className="element-box p-2">
							<div className="row">
								<div className="col-sm-12 text-right">
									<a
										className="btn btn-success btn-sm text-white"
										onClick={() => add()}
									>
										<i className="os-icon os-icon-ui-22" /> Add New Parameter
									</a>
									{parameters.length > 0 && (
										<button
											onClick={() => save()}
											className="btn btn-primary"
											disabled={submitting}
										>
											{submitting ? (
												<img src={waiting} alt="submitting" />
											) : (
												'Save'
											)}
										</button>
									)}
								</div>
								<div className="col-sm-12 mt-3 no-scroll-1">
									<table className="table table-bordered table-sm table-v2 table-striped m-0">
										<thead>
											<tr>
												<td>Parameter</td>
												<td>Reference</td>
												<td />
											</tr>
										</thead>
									</table>
									<div className="scroll-within-1">
										<table className="table table-bordered table-sm table-v2 table-striped">
											<tbody>
												{parameters.map((param, i) => {
													return (
														param.deleted === 0 && (
															<tr key={i}>
																<td className="w-50">
																	<div className="form-group mb-0">
																		<AsyncCreatableSelect
																			cacheOptions
																			defaultOptions
																			getOptionValue={option => option.id}
																			getOptionLabel={option =>
																				option.name || option.label
																			}
																			createOptionPosition="first"
																			loadOptions={getOptions}
																			formatCreateLabel={inputValue => {
																				return `Create ${inputValue}`;
																			}}
																			value={options[i] || ''}
																			placeholder="Parameter"
																			onChange={e => {
																				if (e) {
																					setOptions([
																						...options,
																						{
																							...e,
																							id: param.id,
																							name: e.value || e.name,
																						},
																					]);
																				}
																				onChange(e, 'name', param.id, true);
																			}}
																		/>
																	</div>
																</td>
																<td>
																	<div className="form-group mb-0">
																		<input
																			className="form-control"
																			placeholder="Reference"
																			name="reference"
																			value={param.reference || ''}
																			onChange={e =>
																				onChange(e, 'reference', param.id)
																			}
																		/>
																	</div>
																</td>
																<td>
																	<a
																		className="close text-danger"
																		onClick={() => remove(param.id)}
																	>
																		<i className="os-icon os-icon-cancel-circle" />
																	</a>
																</td>
															</tr>
														)
													);
												})}
											</tbody>
										</table>
										<div ref={elementRef} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalLabParameters;
