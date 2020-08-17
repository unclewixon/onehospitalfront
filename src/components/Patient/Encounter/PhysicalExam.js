import React, { useEffect, useState } from 'react';
import { physicalExamination } from '../../../services/constants';
import Select from 'react-select';
import { Controller, ErrorMessage, useForm } from 'react-hook-form';
import { connect, useDispatch } from 'react-redux';
import { loadEncounterData, loadEncounterForm } from '../../../actions/patient';

const PhysicalExam = props => {
	const [selected, setSelected] = useState();
	const { encounterData, previous, encounterForm } = props;
	const dispatch = useDispatch();
	const defaultValues = {
		physicalExam: encounterForm.physicalExamination?.physicalExam,
		selectedPhysicalExam:
			encounterForm.physicalExamination?.selectedPhysicalExam,
	};
	const { register, handleSubmit, control, errors } = useForm({
		defaultValues,
	});

	const handleChange = e => {
		setSelected(e);
	};

	useEffect(() => {
		setSelected(encounterForm.physicalExamination?.physicalExam);
	}, [encounterForm.physicalExamination]);

	const divStyle = {
		height: '500px',
	};

	const onSubmit = async values => {
		encounterForm.physicalExamination = values;
		props.loadEncounterForm(encounterForm);

		encounterData.physicalExamination = values.selectedPhysicalExam || [];
		props.loadEncounterData(encounterData);
		dispatch(props.next);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="form-block encounter" style={divStyle}>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<Controller
								as={<Select options={physicalExamination} />}
								control={control}
								//rules={{ required: true }}
								onChange={([selected]) => {
									handleChange(selected);
									return selected;
								}}
								name="physicalExam"
								//defaultValue=""
							/>
							<ErrorMessage
								errors={errors}
								name="physicalExam"
								message="This is required"
								as={<span className="alert alert-danger" />}
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
												name="selectedPhysicalExam"
												ref={register}
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
})(PhysicalExam);
