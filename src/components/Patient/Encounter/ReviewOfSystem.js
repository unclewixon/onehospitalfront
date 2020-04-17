import React, { Component, useState } from 'react';
import { reviewOfSystem } from '../../../services/constants';
import Select from 'react-select';
import { connect } from 'react-redux';

const ReviewOfSystem = props => {
	const [selected, setSelected] = useState();

	const { encounterData } = props;

	const handleChange = e => {
		setSelected(e);
	};

	return (
		<div className="form-block encounter">
			<div className="row">
				<div className="col-sm-12">
					<div className="form-group">
						<Select
							name="ethnicity"
							options={reviewOfSystem}
							onChange={evt => {
								handleChange(evt);
							}}
						/>
					</div>
				</div>
			</div>
			{selected && (
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>{selected.label}</label>
							{selected.children.map((option, i) => (
								<div key={i}>
									<label>
										<input
											type="checkbox"
											className="form-control"
											value={option}
										/>
										{option}
									</label>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		encounterData: state.patient.encounterData,
	};
};

export default connect(mapStateToProps, {})(ReviewOfSystem);
