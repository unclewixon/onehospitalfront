/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { FORM_ERROR } from 'final-form';

import { startBlock, stopBlock } from '../../actions/redux-block';
import {
	diagnosisAPI,
	diagnosisType,
	criticalList,
} from '../../services/constants';
import { notifySuccess } from '../../services/notify';
import {
	Condition,
	ErrorBlock,
	ReactSelectAdapter,
	request,
} from '../../services/utilities';

const required = value => (value ? undefined : 'Required');

const RecordProblem = ({ closeModal, update }) => {
	const dispatch = useDispatch();

	const patient = useSelector(state => state.user.patient);

	const getDiagnoses = async q => {
		if (!q || (q && q.length <= 1)) {
			return [];
		}

		const url = `${diagnosisAPI}/search?q=${q}&diagnosisType=`;
		const res = await request(url, 'GET', true);

		return res;
	};

	const onSubmit = async values => {
		try {
			dispatch(startBlock());
			const data = { ...values, type: 'diagnosis' };
			const uri = `patient/${patient.id}/add-diagnosis`;
			const rs = await request(uri, 'POST', true, data);
			dispatch(stopBlock());
			if (rs.success) {
				update([...rs.diagonsis]);
				notifySuccess('problem diagnosis added!');
				closeModal();
			} else {
				return {
					[FORM_ERROR]: rs.message || 'Error, could not save problem list',
				};
			}
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			return { [FORM_ERROR]: 'Error, could not save problem list' };
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div
				className="modal-dialog modal-lg modal-centered modal-scroll"
				style={{ maxWidth: '1024px' }}
			>
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => closeModal()}
					>
						<span className="os-icon os-icon-close" />
					</button>
					<div className="onboarding-content with-gradient">
						<Form
							onSubmit={onSubmit}
							mutators={{ ...arrayMutators }}
							initialValues={{ diagnoses: [{ status: 'normal' }] }}
							render={({
								handleSubmit,
								form: {
									mutators: { push, pop },
								},
								submitting,
								values,
								submitError,
							}) => {
								return (
									<>
										<h4 className="onboarding-title">Add Diagnosis</h4>
										<div className="onboarding-text alert-custom mb-2">
											<a
												className="btn btn-sm btn-secondary text-white"
												onClick={() => push('diagnoses', { status: 'normal' })}
											>
												<i className="os-icon os-icon-plus" /> add
											</a>
											<a
												className="btn btn-sm btn-secondary text-white"
												onClick={() =>
													values.diagnoses.length > 1 ? pop('diagnoses') : null
												}
											>
												<i className="os-icon os-icon-minus2" /> remove
											</a>
										</div>
										<div className="element-box no-shadow">
											<form onSubmit={handleSubmit}>
												{submitError && (
													<div
														className="alert alert-danger"
														dangerouslySetInnerHTML={{
															__html: `<strong>Error!</strong> ${submitError}`,
														}}
													/>
												)}
												<FieldArray name="diagnoses">
													{({ fields }) => {
														return fields.map((name, i) => {
															return (
																<div key={i} className="element-box shadow-lg">
																	<div className="row">
																		<div className="col-md-6">
																			<div className="form-group">
																				<label>Diagnosis</label>
																				<Field
																					name={`${name}.diagnosis`}
																					validate={required}
																				>
																					{({ input, meta }) => (
																						<AsyncSelect
																							isClearable
																							getOptionValue={option =>
																								option.id
																							}
																							getOptionLabel={option =>
																								`${option.description} (${option.type}: ${option.code})`
																							}
																							defaultOptions
																							loadOptions={getDiagnoses}
																							onChange={e => {
																								input.onChange(e);
																							}}
																							placeholder="Enter the diagnosis or ICD-10/ICPC-2 code"
																						/>
																					)}
																				</Field>
																				<ErrorBlock
																					name={`${name}.diagnosis`}
																				/>
																			</div>
																		</div>
																		<div className="col-sm-3">
																			<div className="form-group">
																				<label>Type</label>
																				<Field
																					name={`${name}.type`}
																					validate={required}
																					component={ReactSelectAdapter}
																					options={diagnosisType}
																					placeholder="Select Type"
																				/>
																				<ErrorBlock name={`${name}.type`} />
																			</div>
																		</div>
																		<div className="col-sm-3">
																			<div className="form-group">
																				<label>Comment</label>
																				<Field
																					name={`${name}.comment`}
																					className="form-control"
																					component="input"
																					type="text"
																					placeholder="Comment"
																				/>
																			</div>
																		</div>
																		<div className="col-sm-3">
																			<div className="form-group">
																				<label>Flag</label>
																				<div className="d-flex">
																					<div>
																						<label>
																							<Field
																								name={`${name}.status`}
																								component="input"
																								type="radio"
																								value="normal"
																							/>{' '}
																							Normal
																						</label>
																					</div>
																					<div className="ml-2">
																						<label>
																							<Field
																								name={`${name}.status`}
																								component="input"
																								type="radio"
																								value="critical"
																							/>{' '}
																							Critical
																						</label>
																					</div>
																				</div>
																			</div>
																		</div>
																		<Condition
																			when={`${name}.status`}
																			is="critical"
																		>
																			<div className="col-sm-3">
																				<div className="form-group">
																					<label>Condition</label>
																					<Field
																						name={`${name}.condition`}
																						validate={required}
																						component={ReactSelectAdapter}
																						options={criticalList}
																						placeholder="Select Condition"
																					/>
																					<ErrorBlock
																						name={`${name}.condition`}
																					/>
																				</div>
																			</div>
																		</Condition>
																	</div>
																</div>
															);
														});
													}}
												</FieldArray>
												<div className="row mt-5">
													<div className="col-sm-12 d-flex space-between">
														<button
															disabled={submitting}
															className="btn btn-primary"
															type="submit"
														>
															Save
														</button>
													</div>
												</div>
											</form>
										</div>
									</>
								);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecordProblem;
