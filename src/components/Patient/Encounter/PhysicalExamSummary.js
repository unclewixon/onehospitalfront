import React, { Component } from 'react';
import SunEditor from 'suneditor-react';

class PhysicalExamSummary extends Component {
	render() {
		const { previous, next } = this.props;
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

				<div className="row mt-5">
					<div className="col-sm-12 d-flex ant-row-flex-space-between">
						<button className="btn btn-primary" onClick={previous}>
							Previous
						</button>
						<button className="btn btn-primary" onClick={next}>
							Next
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default PhysicalExamSummary;
