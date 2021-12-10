import React, { useState, useEffect, useCallback } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import capitalize from 'lodash.capitalize';

import { renderTextInput, request } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifyError, notifySuccess } from '../../services/notify';
import { allUnitOfMeasures } from '../../services/constants';

const validate = values => {
	const errors = {};
	if (!values.name) {
		errors.name = 'enter name';
	}

	return errors;
};

const ModalEditDrug = ({
	closeModal,
	drug,
	handleSubmit,
	error,
	updateDrug,
}) => {
	const [loaded, setLoaded] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [generic, setGeneric] = useState(null);
	const [unitOfMeasure, setUnitOfMeasure] = useState(null);
	const [manufacturer, setManufacturer] = useState(null);
	const [generics, setGenerics] = useState([]);
	const [unitOfMeasures, setUnitOfMeasures] = useState([]);

	const dispatch = useDispatch();

	const fetchManufacturers = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `inventory/manufacturers?q=${q}`;
		const res = await request(url, 'GET', true);
		return res?.result || [];
	};

	const loadGenericDrugs = useCallback(async () => {
		try {
			dispatch(startBlock());
			const rs = await request('inventory/generics?limit=1000', 'GET', true);
			setGenerics(rs.result);
			dispatch(stopBlock());
		} catch (e) {
			dispatch(stopBlock());
			notifyError('Error while fetching generic names');
		}
	}, [dispatch]);

	useEffect(() => {
		if (!loaded) {
			loadGenericDrugs();
			setGeneric(drug.generic);
			if (drug.unitOfMeasure && drug.unitOfMeasure !== '') {
				const uom = capitalize(drug.unitOfMeasure);
				setUnitOfMeasure({ id: uom, name: uom });
			}
			setManufacturer(drug.manufacturer);
			setUnitOfMeasures(allUnitOfMeasures);
			setLoaded(true);
		}
	}, [drug, loadGenericDrugs, loaded]);

	const save = async data => {
		try {
			if (!generic || (generic && generic === '')) {
				notifyError('Please select generic name');
				return;
			}

			if (!unitOfMeasure || (unitOfMeasure && unitOfMeasure === '')) {
				notifyError('Please select unit of measure');
				return;
			}

			dispatch(startBlock());
			setSubmitting(true);
			const info = {
				...data,
				generic_id: generic.id,
				unitOfMeasure: unitOfMeasure.name,
				manufacturer_id: manufacturer?.id || '',
			};
			const url = `inventory/drugs/${drug.id}`;
			const rs = await request(url, 'PUT', true, info);
			updateDrug(rs.drug);
			setSubmitting(false);
			dispatch(stopBlock());
			notifySuccess('Drug updated!');
			closeModal();
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			setSubmitting(false);
			throw new SubmissionError({
				_error: 'could not update drug',
			});
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '320px' }}>
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}>
						<span className="os-icon os-icon-close" />
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Edit Drug</h4>
						<div className="form-block">
							<form onSubmit={handleSubmit(save)}>
								{error && (
									<div
										className="alert alert-danger"
										dangerouslySetInnerHTML={{
											__html: `<strong>Error!</strong> ${error}`,
										}}
									/>
								)}
								<div className="row">
									<div className="col-sm-12">
										<div className="form-group">
											<label>Drug Generic Name</label>
											<Select
												isClearable
												placeholder="Select generic name"
												defaultValue
												getOptionValue={option => option.id}
												getOptionLabel={option => option.name}
												onChange={e => setGeneric(e)}
												value={generic}
												isSearchable={true}
												options={generics}
											/>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12">
										<Field
											id="name"
											name="name"
											component={renderTextInput}
											label="Drug name"
											type="text"
										/>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12">
										<div className="form-group">
											<label>Unit of Measure</label>
											<Select
												isClearable
												placeholder="Select unit of measure"
												defaultValue
												getOptionValue={option => option.id}
												getOptionLabel={option => option.name}
												onChange={e => {
													setUnitOfMeasure(e);
												}}
												value={unitOfMeasure}
												isSearchable={true}
												options={unitOfMeasures.map(u => ({ id: u, name: u }))}
											/>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12">
										<div className="form-group">
											<label>Drug Manufacturer</label>
											<AsyncSelect
												isClearable
												getOptionValue={option => option.id}
												getOptionLabel={option => option.name}
												defaultOptions
												loadOptions={fetchManufacturers}
												value={manufacturer}
												onChange={e => {
													setManufacturer(e);
												}}
												placeholder="Select drug manufacturer"
											/>
										</div>
									</div>
								</div>
								<div className="row mt-4">
									<div className="col-sm-12 text-right">
										<button
											className="btn btn-primary"
											disabled={submitting}
											type="submit">
											{submitting ? (
												<img src={waiting} alt="submitting" />
											) : (
												'Save'
											)}
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		initialValues: { ...ownProps.drug },
	};
};

export default connect(mapStateToProps)(
	reduxForm({ form: 'edit-drug', validate })(ModalEditDrug)
);
