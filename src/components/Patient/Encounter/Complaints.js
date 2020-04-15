import React, { Component, useEffect, useState } from 'react';
import SunEditor from 'suneditor-react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

const Complaints = props => {
	const [complaint, setComplaint] = useState();
	const { complaints } = props;

	useEffect(() => {
		return () => {
			console.log(complaint);
		};
	});
	return (
		<div className="form-block encounter">
			<div className="row">
				<div className="col-sm-12">
					<div className="form-group">
						<label>Presenting Complaints</label>
						<SunEditor
							width="100%"
							placeholder="Please type here..."
							setContents={complaints}
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
							onChange={evt => {
								setComplaint(String(evt));
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		complaints: state.patient.encounterData.complaints,
	};
};

export default connect(mapStateToProps, {})(Complaints);
