import React, { useState } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import SunEditor from 'suneditor-react';

const validate = values => {
	const errors = {};
	return errors;
};

const GeneralComments = ({ handleSubmit, previous, next }) => {
	const [comment, setComment] = useState('');

	const submit = () => {
		next({ comment });
	};

	return (
		<div className="form-block encounter">
			<form onSubmit={handleSubmit(submit)}>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Note</label>
							<SunEditor
								width="100%"
								placeholder="Please type here..."
								setContents={comment}
								name="comment"
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
									setComment(String(e));
								}}
							/>
						</div>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-sm-12 d-flex space-between">
						<button className="btn btn-primary" onClick={previous}>
							Previous
						</button>
						<button className="btn btn-primary" type="submit">
							Next
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		initialValues: { ...ownProps.assessment },
	};
};

export default connect(mapStateToProps)(
	reduxForm({
		form: 'antenatalAssessment', //Form name is same
		destroyOnUnmount: false,
		forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
		validate,
	})(GeneralComments)
);
