import { Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { notifyError, notifySuccess } from '../../services/notify';
import Select from 'react-select';

const NoteForm = () => {
	const [loaded, setLoaded] = useState(false);
	const [note, setNote] = useState('');
	const [specialty, setSpecialty] = useState('');
	const [type, setType] = useState('');

	const handleChangeSpecialtyChange = evt => {
		let value = String(evt.value);
		setSpecialty(value);
	};

	const handleChangeTypeChange = evt => {
		let value = String(evt.value);
		setType(value);
	};

	return (
		<>
			<div className="form-block">
				<form onSubmit={e => console.log(e)}>
					<div className="row">
						<div className="form-group col-sm-6">
							<label>Specialty</label>
							<Select
								name="specialty"
								placeholder="Select Specialty"
								options={[
									{ label: 'General Medicine', value: 'General Medicine' },
									{ label: 'Anaesthesiology', value: 'Anaesthesiology' },
									{ label: 'Paediatrics', value: 'Paediatrics' },
									{
										label: 'Obstetrics & Gynaecology',
										value: 'Obstetrics & Gynaecology',
									},
									{ label: 'IVF', value: 'IVF' },
									{ label: 'Scrub Nurse', value: 'Scrub Nurse' },
								]}
								onChange={evt => handleChangeSpecialtyChange(evt)}
								required
							/>
						</div>
						<div className="form-group col-sm-6">
							<label>Note Type</label>
							<Select
								name="type"
								placeholder="Select Specialty"
								options={[
									{ label: 'Findings', value: 'Findings' },
									{ label: 'Pre-Procedure', value: 'Pre-Procedure' },
									{ label: 'Post-Procedure', value: 'Post-Procedure' },
								]}
								onChange={evt => handleChangeTypeChange(evt)}
								required
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-12">
							<label>Note</label>
							<textarea
								name="notes"
								onChange={e => setNote(e.target.value)}
								placeholder="Enter note"
								rows="10"
								required></textarea>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-12 text-right">
							<button className="btn btn-primary" type="submit">
								Save Note
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

const PreProcedureForm = () => {
	const [note, setNote] = useState('');
	const [specialty, setSpecialty] = useState('');
	const [type, setType] = useState('');

	const handleChangeSpecialtyChange = evt => {
		let value = String(evt.value);
		setSpecialty(value);
	};

	const handleChangeTypeChange = evt => {
		let value = String(evt.value);
		setType(value);
	};

	return (
		<>
			<div className="form-block">
				<form onSubmit={e => console.log(e)}>
					<div className="row">
						<div className="form-group col-sm-6">
							<label>Specialty</label>
							<Select
								name="specialty"
								placeholder="Select Specialty"
								options={[
									{ label: 'General Medicine', value: 'General Medicine' },
									{ label: 'Anaesthesiology', value: 'Anaesthesiology' },
									{ label: 'Paediatrics', value: 'Paediatrics' },
									{
										label: 'Obstetrics & Gynaecology',
										value: 'Obstetrics & Gynaecology',
									},
									{ label: 'IVF', value: 'IVF' },
									{ label: 'Scrub Nurse', value: 'Scrub Nurse' },
								]}
								onChange={evt => handleChangeSpecialtyChange(evt)}
								required
							/>
						</div>
						<div className="form-group col-sm-6">
							<label>Note Type</label>
							<Select
								name="type"
								placeholder="Select Specialty"
								options={[
									{ label: 'Findings', value: 'Findings' },
									{ label: 'Pre-Procedure', value: 'Pre-Procedure' },
									{ label: 'Post-Procedure', value: 'Post-Procedure' },
								]}
								onChange={evt => handleChangeTypeChange(evt)}
								required
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-12">
							<label>Task description</label>
							<textarea
								name="notes"
								onChange={e => setNote(e.target.value)}
								placeholder="Task description"
								rows="5"
								required></textarea>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-12 text-right">
							<button className="btn btn-primary" type="submit">
								Save
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

const NurseForm = () => {
	const [loaded, setLoaded] = useState(false);
	const [note, setNote] = useState('');
	const [service, setService] = useState('');
	const [type, setType] = useState('');

	const handleChangeServiceChange = evt => {
		let value = String(evt.value);
		setService(value);
	};

	const handleChangeTypeChange = evt => {
		let value = String(evt.value);
		setType(value);
	};

	return (
		<>
			<div className="form-block">
				<form onSubmit={e => console.log(e)}>
					<div className="row">
						<div className="form-group col-sm-6">
							<label>Business Unit/Service Centre</label>
							<Select
								name="service"
								placeholder="Select Service"
								options={[
									{ label: 'Family Medicine', value: 'Family Medicine' },
									{ label: 'Paediatrics', value: 'Paediatrics' },
									{
										label: 'Obstetrics & Gynaecology',
										value: 'Obstetrics & Gynaecology',
									},
									{ label: 'IVF', value: 'IVF' },
								]}
								onChange={evt => handleChangeServiceChange(evt)}
								required
							/>
						</div>
						<div className="form-group col-sm-6">
							<label>Nursing Service</label>
							<Select
								name="type"
								placeholder="Select Specialty"
								options={[
									{ label: 'Ear Piercing', value: 'Ear Piercing' },
									{ label: 'Nebulistation', value: 'Nebulistation' },
									{
										label: 'Pediatrics Phototherapy',
										value: 'Pediatrics Phototherapy',
									},
									{
										label: 'Neonatal Resussitation',
										value: 'Neonatal Resussitation',
									},
								]}
								onChange={evt => handleChangeTypeChange(evt)}
								required
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-12">
							<label>Task description</label>
							<textarea
								name="notes"
								onChange={e => setNote(e.target.value)}
								placeholder="Task description"
								rows="5"
								required></textarea>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-12 text-right">
							<button className="btn btn-primary" type="submit">
								Save
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

const PrescriptionForm = () => {
	const [loaded, setLoaded] = useState(false);
	const [note, setNote] = useState('');
	const [service, setService] = useState('');
	const [type, setType] = useState('');

	const handleChangeServiceChange = evt => {
		let value = String(evt.value);
		setService(value);
	};

	const handleChangeTypeChange = evt => {
		let value = String(evt.value);
		setType(value);
	};

	return (
		<>
			<div className="form-block">
				<form onSubmit={e => console.log(e)}>
					<div className="row">
						<div className="form-group col-sm-6">
							<label>Business Unit/Service Centre</label>
							<Select
								name="service"
								placeholder="Select Service"
								options={[
									{ label: 'Family Medicine', value: 'Family Medicine' },
									{ label: 'Paediatrics', value: 'Paediatrics' },
									{
										label: 'Obstetrics & Gynaecology',
										value: 'Obstetrics & Gynaecology',
									},
									{ label: 'IVF', value: 'IVF' },
								]}
								onChange={evt => handleChangeServiceChange(evt)}
								required
							/>
						</div>
						<div className="form-group col-sm-6">
							<label>Nursing Service</label>
							<Select
								name="type"
								placeholder="Select Specialty"
								options={[
									{ label: 'Ear Piercing', value: 'Ear Piercing' },
									{ label: 'Nebulistation', value: 'Nebulistation' },
									{
										label: 'Pediatrics Phototherapy',
										value: 'Pediatrics Phototherapy',
									},
									{
										label: 'Neonatal Resussitation',
										value: 'Neonatal Resussitation',
									},
								]}
								onChange={evt => handleChangeTypeChange(evt)}
								required
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-12">
							<label>Task description</label>
							<textarea
								name="notes"
								onChange={e => setNote(e.target.value)}
								placeholder="Task description"
								rows="5"
								required></textarea>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-12 text-right">
							<button className="btn btn-primary" type="submit">
								Save
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

const ReportForm = () => {
	const [loaded, setLoaded] = useState(false);
	const [note, setNote] = useState('');

	return (
		<>
			<div className="form-block">
				<form onSubmit={e => console.log(e)}>
					<div className="row">
						<div className="col-sm-12">
							<label>Report</label>
							<textarea
								name="notes"
								onChange={e => setNote(e.target.value)}
								placeholder="Task description"
								rows="5"
								required></textarea>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-12 text-right">
							<button className="btn btn-primary" type="submit">
								Save
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

const ProcedureForms = ({ closeModal, tab }) => {
	console.log(tab);

	const renderServiceType = type => {
		switch (type) {
			case 'notes':
				return 'Add a Note';
			case 'pre-procedure':
				return 'Take Pre-Procedure';
			case 'resources':
				return 'Add Resource';
			case 'consumables':
				return 'Add Consumables';
			case 'nursing-services':
				return 'Add Nursing Services';
			case 'medications-used':
				return 'Add Medications Used';
			case 'medical-report':
				return 'Add Medical Report';
			case 'patient-equipment':
				return 'Add Patient Equipment';
			default:
				return 'Add a Note';
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
						<div className="element-info">
							<div className="element-info-with-icon">
								<div className="element-info-text">
									<h5 className="element-inner-header">
										{renderServiceType(tab)}
									</h5>
								</div>
							</div>
						</div>

						{tab === 'medications-used' ? <PrescriptionForm /> : ''}
						{tab === 'notes' ? <NoteForm /> : ''}
						{tab === 'pre-procedure' ? <PreProcedureForm /> : ''}
						{tab === 'medical-report' ? <ReportForm /> : ''}
						{tab === 'nursing-services' ? <NurseForm /> : ''}
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProcedureForms;
