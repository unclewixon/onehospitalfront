/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import {
	renderTextInput,
	renderSelect,
	renderTextArea,
} from '../../services/utilities';
import { request } from '../../services/utilities';
import { searchAPI, genotype, bloodGroup } from '../../services/constants';
import { loadPatientIVFForm } from '../../actions/patient';
import { patientname } from '../../services/utilities';

const validate = values => {
	const errors = {};
	// if (!values.name) {
	// 	errors.name = 'enter vendor';
	// }

	return errors;
};

const HusbandLab = ({ page, onSubmit, handleSubmit, error, previousPage }) => {
	const [loaded, setLoaded] = useState(false);
	const [selectedPatient, setSelectedPatient] = useState(null);

	const dispatch = useDispatch();

	const ivf = useSelector(state => state.patient.ivf);

	useEffect(() => {
		if (!loaded) {
			setSelectedPatient(ivf.husband);
			setLoaded(true);
		}
	}, [ivf, loaded]);

	const onSubmitForm = data => {
		const ivfData = {
			...ivf,
			husbandLabDetails: data,
			husband: selectedPatient,
		};

		dispatch(loadPatientIVFForm(ivfData));
		onSubmit();
	};

	const patientSet = patient => {
		setSelectedPatient(patient);
	};

	const getOptionValues = option => option.id;
	const getOptionLabels = option => patientname(option, true);

	const getOptions = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	return (
		<>
			<h6 className="element-header">Step {page}. Husband's Lab Details</h6>
			<div className="form-block">
				<form onSubmit={handleSubmit(onSubmitForm)}>
					{error && (
						<div
							className="alert alert-danger"
							dangerouslySetInnerHTML={{
								__html: `<strong>Error!</strong> ${error}`,
							}}
						/>
					)}

					<div className="row">
						<div className="form-group col-sm-12">
							<label>Husband (Secondary Patient Patient)</label>
							<AsyncSelect
								isClearable
								getOptionValue={getOptionValues}
								getOptionLabel={getOptionLabels}
								defaultOptions
								value={selectedPatient}
								name="patient_id"
								loadOptions={getOptions}
								onChange={e => {
									patientSet(e);
								}}
								placeholder="Search patients"
							/>
						</div>
					</div>

					<h5>SFA (Andrology)</h5>

					<div className="row">
						<div className="col-sm-3">
							<Field
								id="count"
								name="sfaAndrology.count"
								component={renderTextInput}
								label="Count 10^6 ML"
								placeholder="Count 10^6 ML"
							/>
						</div>

						<div className="col-sm-3">
							<Field
								id="mortility"
								name="sfaAndrology.mortility"
								component={renderTextInput}
								label="Mortility"
								placeholder="Mortility"
							/>
						</div>

						<div className="col-sm-3">
							<Field
								id="morphility"
								name="sfaAndrology.morphility"
								component={renderTextInput}
								label="Morphility"
								placeholder="Morphility"
							/>
						</div>

						<div className="col-sm-6">
							<Field
								id="andrology_summary"
								name="sfaAndrology.summary"
								component={renderTextArea}
								label="Andrology Summary"
								placeholder="Andrology Summary"
							/>
						</div>
					</div>

					<h5>Serology</h5>

					<div className="row">
						<div className="col-sm-3">
							<Field
								id="hiv"
								name="serology.hiv"
								component={renderTextInput}
								label="HIV"
								placeholder="HIV"
							/>
						</div>

						<div className="col-sm-3">
							<Field
								id="hep_b"
								name="serology.hepb"
								component={renderTextInput}
								label="HEP-B"
								placeholder="HEP-B"
							/>
						</div>

						<div className="col-sm-3">
							<Field
								id="hep_c"
								name="serology.hepc"
								component={renderTextInput}
								label="HEP-C"
								placeholder="HEP-C"
							/>
						</div>

						<div className="col-sm-3">
							<Field
								id="vdrl"
								name="serology.vdrl"
								component={renderTextInput}
								label="VDRL"
								placeholder="VDRL"
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-6">
							<Field
								id="genotype"
								name="genotype"
								component={renderSelect}
								label="Genotype"
								placeholder="Select genotype"
								data={genotype}
							/>
						</div>

						<div className="col-sm-6">
							<Field
								id="bloodGroup"
								name="bloodGroup"
								component={renderSelect}
								label="Blood Group"
								placeholder="Select Blood Group"
								data={bloodGroup}
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-6">
							<Field
								id="randomBlood"
								name="randomBloodSugar"
								component={renderTextInput}
								label="Random Blood Sugar"
								placeholder="Random Blood Sugar"
							/>
						</div>

						<div className="col-sm-6">
							<Field
								id="fastingBlood"
								name="fastingBloodSugar"
								component={renderTextInput}
								label="Fasting Blood Sugar"
								placeholder="Fasting Blood Sugar"
							/>
						</div>
					</div>

					<h5>Hormonals</h5>

					<div className="row">
						<div className="col-sm-3">
							<Field
								id="fsh"
								name="hormonals.fsh"
								component={renderTextInput}
								label="FSH"
								placeholder="FSH"
							/>
						</div>

						<div className="col-sm-3">
							<Field
								id="lh"
								name="hormonals.lh"
								component={renderTextInput}
								label="LH"
								placeholder="LH"
							/>
						</div>

						<div className="col-sm-3">
							<Field
								id="prol"
								name="hormonals.prol"
								component={renderTextInput}
								label="PROL"
								placeholder="PROL"
							/>
						</div>

						<div className="col-sm-3">
							<Field
								id="testosterone"
								name="hormonals.testosterone"
								component={renderTextInput}
								label="Testosterone"
								placeholder="Testosterone"
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-12 text-right">
							<button
								className="btn btn-primary"
								type="button"
								onClick={previousPage}
							>
								Previous
							</button>
							<button className="btn btn-primary" type="submit">
								Next
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default withRouter(
	reduxForm({
		form: 'HusbandLab',
		destroyOnUnmount: false,
		forceUnregisterOnUnmount: true,
		validate,
	})(HusbandLab)
);
