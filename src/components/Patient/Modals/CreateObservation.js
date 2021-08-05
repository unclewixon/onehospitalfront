import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import { useSelector, useDispatch } from 'react-redux';

import { startBlock, stopBlock } from '../../../actions/redux-block';
import { notifySuccess, notifyError } from '../../../services/notify';
import { request } from '../../../services/utilities';

const CreateObservation = ({ closeModal, updateNote, item }) => {
	const [observation, setObservation] = useState('');

	const dispatch = useDispatch();

	const patient = useSelector(state => state.user.patient);

	const onSubmit = async e => {
		try {
			e.preventDefault();
			dispatch(startBlock());
			const data = {
				patient_id: patient.id,
				description: observation,
				type: 'nurse-observation',
				admission_id: item.id,
			};

			const rs = await request('patient-notes', 'POST', true, data);
			dispatch(stopBlock());
			updateNote(rs);
			notifySuccess('Observation note added!');
			closeModal();
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError('Error, could not save observation');
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div className="modal-dialog modal-lg modal-centered">
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => closeModal()}>
						<span className="os-icon os-icon-close" />
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">New Observation</h4>
						<div className="element-box">
							<form onSubmit={onSubmit}>
								<div className="row">
									<div className="col-sm-12">
										<div className="form-group">
											<label>Note</label>
											<SunEditor
												width="100%"
												placeholder="Please type here..."
												setContents={observation}
												name="observation"
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
													setObservation(String(e));
												}}
											/>
										</div>
									</div>
								</div>
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

export default CreateObservation;
