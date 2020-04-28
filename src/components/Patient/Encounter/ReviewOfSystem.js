import React, { Component, useState } from 'react';
import { reviewOfSystem } from '../../../services/constants';
import Select from 'react-select';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

const ReviewOfSystem = props => {
	const [selected, setSelected] = useState();
	const { register, handleSubmit } = useForm();
	const { storedData, previous, next } = props;

	const handleChange = e => {
		setSelected(e);
	};

	const handleSelection = e => {
		console.log(e.target.value);
	};

	return (
		<div className="form-block encounter">
			<form onSubmit={handleSubmit(next)}>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<Select
								name="system"
								ref={register({ name: 'system' })}
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
												ref={register({ name: 'selectedSystem' })}
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
			</form>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		storedData: state.patient.encounterData.reviewOfSystem,
	};
};

export default connect(mapStateToProps, {})(ReviewOfSystem);
