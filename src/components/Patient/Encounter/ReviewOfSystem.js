import React, { Component, useState } from 'react';
import { reviewOfSystem } from '../../../services/constants';
import Select from 'react-select';
import { connect } from 'react-redux';

const ReviewOfSystem = props => {
	const [selected, setSelected] = useState();
	const [selecteOptions, setSelectedOptions] = useState([]);
	const { storedData } = props;

	const handleChange = e => {
		setSelected(e);
	};

	const handleSelection = e => {
		console.log(e.target.value);
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
											onChange={evt => {
												handleSelection(evt);
											}}
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
		storedData: state.patient.encounterData.reviewOfSystem,
	};
};

export default connect(mapStateToProps, {})(ReviewOfSystem);
