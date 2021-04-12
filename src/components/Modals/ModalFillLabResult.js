/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';

import { request, updateImmutable } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import waiting from '../../assets/images/waiting.gif';
import { patientAPI } from '../../services/constants';
import { startBlock, stopBlock } from '../../actions/redux-block';

const allOptions = [
	{ label: 'N/A', value: 'N/A' },
	{ label: 'Abnormal High', value: 'Abnormal High' },
	{ label: 'Abnormal Low', value: 'Abnormal Low' },
	{ label: 'Abnormal Positive', value: 'Abnormal Positive' },
	{ label: 'Abnormal Negative', value: 'Abnormal Negative' },
	{ label: 'Normal', value: 'Normal' },
	{ label: 'Low', value: 'Low' },
	{ label: 'High', value: 'High' },
	{ label: 'Positive', value: 'Positive' },
	{ label: 'Negative', value: 'Negative' },
];

const ModalFillLabResult = ({ closeModal, lab, labs, updateLab }) => {
	const [loaded, setLoaded] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [options, setOptions] = useState([]);
	const [parameters, setParameters] = useState([]);
	const [note, setNote] = useState(null);
	const [result, setResult] = useState(null);

	const item = lab.items[0];

	const dispatch = useDispatch();

	useEffect(() => {
		if (!loaded) {
			setNote(item.note);
			setParameters(item.labTest.parameters);
			setLoaded(true);
		}
	}, [item, loaded]);

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

	const onChange = (e, type, id, hasData) => {
		const value = hasData ? e.value : e.target.value;
		const allParameters = update(parameters, id, type, value);
		setParameters([...allParameters]);
	};

	const save = async () => {
		if (note === null || result === null) {
			notifyError('Please fill in result and note');
			return;
		}
		try {
			dispatch(startBlock());
			setSubmitting(true);
			const data = { parameters, note, result };
			const url = `${patientAPI}/${item.id}/fill-result`;
			const rs = await request(url, 'PATCH', true, data);
			const lab_request = labs.find(l => l.id === lab.id);
			const newItem = { ...lab_request, items: [rs.data] };
			const newLabs = updateImmutable(labs, newItem);
			updateLab(newLabs);
			notifySuccess('lab result filled!');
			setSubmitting(false);
			dispatch(stopBlock());
			closeModal();
		} catch (error) {
			console.log(error);
			setSubmitting(false);
			notifyError('Error while trying to fill lab result');
			dispatch(stopBlock());
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div className="modal-dialog modal-md modal-centered">
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}>
						<span className="os-icon os-icon-close" />
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Fill Lab Result</h4>
						<div className="onboarding-text alert-custom mb-3">
							<div>{item.labTest.name}</div>
							<div>
								{item.labTest.specimens.map((s, i) => (
									<span key={i} className="badge badge-info text-white mr-2">
										{s.label}
									</span>
								))}
							</div>
						</div>
						<div className="element-box p-2">
							<div className="row">
								<div className="col-sm-12">
									<table className="table table-bordered table-sm table-v2 table-striped">
										<tbody>
											{item.labTest.hasParameters ? (
												parameters.map((param, i) => {
													return (
														<tr key={i}>
															<td>
																<div className="form-group mb-0">
																	<label>{param.name}</label>
																	<input
																		className="form-control"
																		placeholder="value"
																		name="value"
																		value={param.value || ''}
																		onChange={e =>
																			onChange(e, 'value', param.id)
																		}
																	/>
																</div>
															</td>
															<td>
																<div className="form-group mb-0">
																	<label>Reference</label>
																	<input
																		className="form-control"
																		placeholder="Reference"
																		name="reference"
																		value={param.reference}
																		disabled
																	/>
																</div>
															</td>
															<td className="w-50">
																<div className="form-group mb-0">
																	<label>Inference</label>
																	<Select
																		name="inference"
																		options={allOptions}
																		value={options[i] || ''}
																		onChange={e => {
																			setOptions([...options, e]);
																			onChange(e, 'inference', param.id, true);
																		}}
																	/>
																</div>
															</td>
														</tr>
													);
												})
											) : (
												<tr>
													<td>
														<label>Lab Result</label>
														<input
															className="form-control"
															placeholder="Lab Result"
															name="result"
															value={result || ''}
															onChange={e => setResult(e.target.value)}
														/>
													</td>
												</tr>
											)}
										</tbody>
									</table>
								</div>
								<div className="col-md-12 mt-4">
									<div className="form-group col-sm-12 text-left">
										<label>Result Note</label>
										<textarea
											className="form-control"
											name="note"
											rows="3"
											onChange={e => setNote(e.target.value)}
											placeholder="Enter note"
											value={note || ''}></textarea>
									</div>
								</div>
								<div className="col-md-12 mt-4">
									<button
										onClick={() => save()}
										className="btn btn-primary"
										disabled={submitting}>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Save'
										)}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalFillLabResult;
