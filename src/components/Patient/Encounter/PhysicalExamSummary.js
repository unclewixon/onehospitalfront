import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import { connect, useDispatch } from 'react-redux';
import { loadEncounterData, loadEncounterForm } from '../../../actions/patient';
import { useForm } from 'react-hook-form';

const PhysicalExamSummary = props => {
	const { register, handleSubmit } = useForm();
	let { encounterData, previous } = props;
	const [summary, setSummary] = useState('');
	const dispatch = useDispatch();
	const handleChange = e => {
		setSummary(e);
	};
	const onSubmit = async values => {
		encounterData.physicalExaminationSummary = [summary];
		props.loadEncounterData(encounterData);
		dispatch(props.next);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="form-block encounter">
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Template</label>
							<select
								placeholder="-- Select custom text templates --"
								className="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Exam Note</label>
							<SunEditor
								width="100%"
								placeholder="Please type here..."
								//setContents={summary}
								name="summary"
								ref={register}
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
										],
									],
								}}
								//onFocus={handleFocus}
								onChange={evt => {
									handleChange(String(evt));
								}}
							/>
						</div>
					</div>
				</div>

				<div className="row mt-5">
					<div className="col-sm-12 d-flex ant-row-flex-space-between">
						<button className="btn btn-primary" onClick={previous}>
							Previous
						</button>
						<button className="btn btn-primary" type="submit">
							Next
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

const mapStateToProps = state => {
	return {
		encounterData: state.patient.encounterData,
		encounterForm: state.patient.encounterForm,
	};
};

export default connect(mapStateToProps, {
	loadEncounterData,
	loadEncounterForm,
})(PhysicalExamSummary);
