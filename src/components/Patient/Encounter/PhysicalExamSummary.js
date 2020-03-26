import React, { Component } from 'react';
import SunEditor from 'suneditor-react';

class PhysicalExamSummary extends Component {
	render() {
		return (
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
								autoFocus={false}
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
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PhysicalExamSummary;
