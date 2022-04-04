import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import waiting from '../../../assets/images/waiting.gif';
import { request } from '../../../services/utilities';
import { startBlock, stopBlock } from '../../../actions/redux-block';
import { notifySuccess, notifyError } from '../../../services/notify';
import { readingDone } from '../../../actions/patient';

const entries = [
	{ type: 'input', name: 'Oral' },
	{ type: 'input', name: '5% Dextrose/Water' },
	{ type: 'input', name: '5% Dextrose/0.9% Saline' },
	{ type: 'input', name: '10% Dextrose/Water' },
	{ type: 'input', name: '20% Dextrose/Water' },
	{ type: 'input', name: 'Normal Saline (0.9% Saline)' },
	{ type: 'input', name: 'Half Strength Darrows' },
	{ type: 'input', name: 'Full Strength Darrows' },
	{ type: 'input', name: '50% Dextrose' },
	{ type: 'input', name: 'Hartmans Solution' },
	{ type: 'input', name: 'Plasma Solution' },
	{ type: 'input', name: '10% Mannitol' },
	{ type: 'input', name: '20% Mannitol' },
	{ type: 'input', name: 'Tube' },
	{ type: 'input', name: '4.3% Dextrose Saline' },
	{ type: 'input', name: 'Blood' },
	{ type: 'input', name: 'Sedimented Cell' },
	{ type: 'input', name: 'Whole Blood' },
	{ type: 'output', name: 'Urine' },
	{ type: 'output', name: 'Vomitus' },
	{ type: 'output', name: 'Drainage' },
	{ type: 'output', name: 'Loose Stool' },
	{ type: 'output', name: 'Aspirated Fluids' },
];

const CreateChart = ({ closeModal, taskItem }) => {
	const [submitting, setSubmitting] = useState(false);
	const [fluidRoute, setFluidRoute] = useState('');
	const [volume, setVolume] = useState('');
	const [type, setType] = useState('input');

	const dispatch = useDispatch();

	const onSubmit = async e => {
		try {
			e.preventDefault();
			dispatch(startBlock());
			setSubmitting(true);
			const data = {
				patient_id: taskItem.patient_id,
				type,
				fluidRoute,
				volume,
				task_id: taskItem.id,
			};

			await request('fluid-charts', 'POST', true, data);
			dispatch(stopBlock());
			setSubmitting(false);
			notifySuccess('Fluid chart saved!');
			dispatch(readingDone(taskItem.id));
			closeModal();
		} catch (error) {
			console.log(error);
			setSubmitting(false);
			dispatch(stopBlock());
			notifyError('Error, could not save fluid chart');
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div className="modal-dialog modal-centered">
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
						<h4 className="onboarding-title">New Fluid Chart Entry</h4>
						<div className="pipeline white lined-warning">
							<form onSubmit={onSubmit}>
								<div className="row">
									<div className="col-md-12">
										<div className="form-group mb-0">
											<label>Select Type</label>
											<select
												className="form-control bright"
												name="type"
												value={type}
												onChange={e => {
													setType(e.target.value);
												}}
											>
												<option value="input">Input</option>
												<option value="output">Output</option>
											</select>
										</div>
									</div>
								</div>
								<div className="row mt-3">
									<div className="col-md-12">
										<div className="form-group">
											<label>Fluid Route</label>
											<select
												className="form-control bright"
												name="fluid_route"
												value={fluidRoute}
												onChange={e => {
													setFluidRoute(e.target.value);
												}}
											>
												<option value="">Select Route</option>
												{entries
													.filter(e => e.type === type)
													.map((item, i) => {
														return (
															<option key={i} value={item.name}>
																{item.name}
															</option>
														);
													})}
											</select>
										</div>
									</div>
								</div>
								<div className="row mt-3">
									<div className="col-md-12">
										<div className="form-group mb-0">
											<label>Volume (in ml)</label>
											<input
												className="form-control"
												placeholder="Volume"
												type="number"
												name="volume"
												onChange={e => setVolume(e.target.value)}
											/>
										</div>
									</div>
								</div>
								<div className="row mt-3">
									<div className="col-md-12">
										<div className="ml-2">
											<button
												className={`btn btn-primary ${
													submitting ? 'disabled' : ''
												}`}
												style={{ marginTop: '6px' }}
											>
												{submitting ? (
													<img src={waiting} alt="submitting" />
												) : (
													<span> Save</span>
												)}
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateChart;
