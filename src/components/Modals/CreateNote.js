import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import startCase from 'lodash.startcase';

import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifySuccess, notifyError } from '../../services/notify';
import { request } from '../../services/utilities';
import { noteTypes, specialties } from '../../services/constants';
import { messageService } from '../../services/message';

const CreateNote = ({
	closeModal,
	updateNote,
	type,
	ivf_id,
	antenatal_id,
	procedure_id,
	labour_id,
}) => {
	const [note, setNote] = useState('');
	const [noteType, setNoteType] = useState('');
	const [specialty, setSpecialty] = useState('');

	const dispatch = useDispatch();

	const patient = useSelector(state => state.user.patient);

	const onSubmit = async e => {
		try {
			e.preventDefault();
			dispatch(startBlock());

			const data = {
				patient_id: patient.id,
				description: note,
				type,
				ivf_id,
				antenatal_id,
				procedure_id,
				labour_id,
				note_type: noteType,
				specialty,
			};

			const rs = await request('patient-notes', 'POST', true, data);
			dispatch(stopBlock());
			updateNote(rs);
			notifySuccess('Note added!');
			if (type === 'consultation') {
				messageService.sendMessage('patient-note');
			}
			closeModal();
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError('Error, could not save note');
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div className="modal-dialog modal-lg modal-centered">
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
						<h4 className="onboarding-title">
							{type && type !== '' && type !== 'consultation'
								? startCase(type)
								: 'New Note'}
						</h4>
						<div className="element-box">
							<form onSubmit={onSubmit}>
								{type && type === 'findings' && (
									<div className="row">
										<div className="col-sm-12">
											<div className="form-group overtop">
												<label>Specialty</label>
												<Select
													name="specialty"
													placeholder="Select Specialty"
													options={specialties}
													onChange={e => {
														setSpecialty(e?.value || '');
													}}
												/>
											</div>
										</div>
									</div>
								)}
								<div className="row">
									<div className="col-sm-12">
										<div className="form-group">
											<label>Note</label>
											<SunEditor
												width="100%"
												placeholder="Please type here..."
												setContents={note}
												name="note"
												autoFocus={true}
												enableToolbar={true}
												setOptions={{
													height: 300,
													buttonList: [
														[
															'bold',
															'underline',
															'italic',
															'strike',
															'subscript',
															'superscript',
															'list',
															'align',
															'font',
															'fontSize',
															'image',
															'codeView',
														],
													],
												}}
												onChange={e => {
													setNote(String(e));
												}}
											/>
										</div>
									</div>
								</div>
								{type && type === 'findings' && (
									<div className="row">
										<div className="col-sm-12">
											<div className="form-group">
												<label>Note Type</label>
												<Select
													name="type"
													placeholder="Select Findings"
													options={noteTypes}
													onChange={e => {
														setNoteType(e?.value || '');
													}}
												/>
											</div>
										</div>
									</div>
								)}
								<div className="row mt-5">
									<div className="col-sm-12 d-flex ant-row-flex-space-between">
										<button className="btn btn-primary" type="submit">
											Save
										</button>
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

export default CreateNote;
