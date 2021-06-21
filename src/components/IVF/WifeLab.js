/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import {
	renderTextInput,
	renderSelect,
	request,
} from '../../services/utilities';
import { searchAPI, genotype, bloodGroup } from '../../services/constants';
import { loadPatientIVFForm } from '../../actions/patient';

const validate = {};

const WifeLab = ({ page, onSubmit, handleSubmit, error, location }) => {
	const [selectedPatient, setSelectedPatient] = useState([]);
	const [hmo, setHmo] = useState(null);

	// const ivf = useSelector(state => state.patient.ivf);

	const dispatch = useDispatch();

	const onSubmitForm = data => {
		const ivfData = { wifeLabDetails: data, hmo, wife: selectedPatient };

		dispatch(loadPatientIVFForm(ivfData));
		onSubmit();
	};

	const patientSet = patient => {
		// setValue('patient_id', pat.id);
		// console.log(pat);
		// let name =
		// 	(pat?.surname ? pat?.surname : '') +
		// 	' ' +
		// 	(pat?.other_names ? pat?.other_names : '');
		// let res = { label: pat?.id, value: name };
		setSelectedPatient(patient);
		setHmo(patient.hmo?.id);
	};

	const getOptionValues = option => option.id;
	const getOptionLabels = option => `${option.other_names} ${option.surname}`;

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
			<h6 className="element-header">Step {page}. Wife's Lab Details</h6>
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
							<div>{selectedPatient.value}</div>

							<AsyncSelect
								isClearable
								getOptionValue={getOptionValues}
								getOptionLabel={getOptionLabels}
								defaultOptions
								name="patient_id"
								loadOptions={getOptions}
								onChange={e => {
									patientSet(e);
								}}
								placeholder="Search patients"
							/>
						</div>
					</div>

					<h5>Hormonals</h5>
					<br />

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
								id="amh"
								name="hormonals.amh"
								component={renderTextInput}
								label="AMH"
								placeholder="AMH"
							/>
						</div>
					</div>

					<h5>Serology</h5>
					<br />

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
						<div className="col-sm-3">
							<Field
								id="chlamyda"
								name="chlamyda"
								component={renderTextInput}
								label="CHLAMYDA"
								placeholder="CHLAMYDA"
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
						<div className="col-sm-12 text-right">
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
		form: 'WifeLab',
		destroyOnUnmount: false,
		forceUnregisterOnUnmount: true,
		validate,
	})(WifeLab)
);
