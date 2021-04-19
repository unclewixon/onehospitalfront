import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

const PhysicalExamSummary = ({ previous, next }) => {
	const { register, handleSubmit } = useForm();

	const [summary, setSummary] = useState('');

	const dispatch = useDispatch();

	const onSubmit = async values => {
		dispatch(next);
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
								setContents={summary}
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
									setSummary(String(evt));
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

export default PhysicalExamSummary;
