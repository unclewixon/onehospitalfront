import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import intersectionBy from 'lodash.intersectionby';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import {
	getAllLabTests,
	getAllLabGroups,
	getAllLabTestCategories,
} from '../../actions/settings';
import { createLabRequest } from '../../actions/patient';

const serviceCenter = [
	{
		value: 'lab',
		label: 'LAB',
	},
];
const LabRequest = props => {
	// const page = location.pathname.split('/').pop();
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			service_center: 'lab',
		},
	});
	const [submitting, setSubmitting] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [category, setCategory] = useState('');
	const [labTests, setLabTests] = useState(null);
	const [labCombos, setLabCombos] = useState(null);

	const handleMultipleSelectInput = (field, selected) => {
		if (field === 'lab_combos') {
			setLabCombos(selected);
		}
		if (field === 'lab_tests_torequest') {
			setLabTests(selected);
		}
	};

	const onCategoryChange = e => {
		setCategory(e.value);
	};

	const labCatsOptions =
		props && props.LabCategories
			? props.LabCategories.map((cats, index) => {
					return { value: cats.id, label: cats.name };
			  })
			: [];

	const labGroupOptions =
		props && props.LabGroups
			? props.LabGroups.filter(groups =>
					groups && groups.category && groups.category.id === category
						? true
						: false
			  ).map((grp, index) => {
					return { value: grp.id, label: grp.name, id: grp.id };
			  })
			: [];

	const labTestOptions =
		props && props.LabTests
			? props.LabTests.filter(test => test.category.id === category).map(
					(test, index) => {
						return { value: test.id, label: test.name, id: test.id };
					}
			  )
			: [];

	const lab_test = labTests
		? intersectionBy(props.LabTests, labTests, 'id')
		: [];

	const lab_combo = labCombos
		? intersectionBy(props.LabGroups, labCombos, 'id')
		: [];

	const onSubmit = ({ service_center, referred_specimen, request_note }) => {
		const { patient } = props;
		if (!category) {
			notifyError('Please select a category');
			return;
		}
		setSubmitting(true);
		props
			.createLabRequest({
				service_center,
				referred_specimen,
				request_note,
				lab_test,
				lab_combo,
				category,
				patient_id: patient && patient.id ? patient.id : '',
			})
			.then(response => {
				setSubmitting(false);
				notifySuccess('Lab request created');
			})
			.catch(error => {
				setSubmitting(false);
				notifyError('Error creating lab request');
			});
	};

	useEffect(() => {
		const { getAllLabGroups, getAllLabTests, getAllLabTestCategories } = props;
		if (!loaded) {
			getAllLabGroups();
			getAllLabTests();
			getAllLabTestCategories();
		}
		setLoaded(true);
	}, [loaded, props]);

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<h6 className="element-header">New Lab Request</h6>
				<div className="element-box">
					<div className="form-block w-100">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="row">
								<div className="form-group col-sm-6">
									<label>Service Center</label>
									<Select
										name="service_center"
										placeholder="Select Service Center"
										options={serviceCenter}
										value={{ label: 'LAB', value: 'lab' }}
										ref={register({ name: 'service_center' })}
										onChange={evt => {
											setValue('service_center', String(evt.value));
										}}
										required
									/>
								</div>
								<div className="form-group col-sm-6">
									<label>Lab Categories</label>
									<Select
										name="lab_categories"
										placeholder="Select Lab Categories"
										ref={register({ name: 'lab_categories' })}
										options={labCatsOptions}
										onChange={onCategoryChange}
										required
									/>
								</div>
							</div>
							<div className="row">
								<div className="form-group col-sm-6">
									<label>Lab Combination</label>
									<Select
										name="lab_combos"
										placeholder="Select Lab Combination"
										isMulti
										options={labGroupOptions}
										ref={register({ name: 'lab_combos' })}
										value={labCombos}
										onChange={val =>
											handleMultipleSelectInput('lab_combos', val)
										}
										required
									/>
								</div>
								<div className="form-group col-sm-6">
									<label>Lab Tests to request</label>
									<Select
										name="lab_tests_torequest"
										placeholder="Select lab tests to request"
										isMulti
										options={labTestOptions}
										ref={register({ name: 'lab_test_torequest' })}
										value={labTests}
										onChange={val =>
											handleMultipleSelectInput('lab_tests_torequest', val)
										}
										required
									/>
								</div>
							</div>

							<div className="row">
								<div className="form-group col-sm-6">
									<label>Referred Specimen</label>
									<textarea
										required
										className="form-control"
										name="referred_specimen"
										rows="3"
										placeholder="Enter referred specimen"
										ref={register}></textarea>
								</div>
								<div className="form-group col-sm-6">
									<label>Request Note</label>
									<textarea
										required
										className="form-control"
										name="request_note"
										rows="3"
										placeholder="Enter request note"
										ref={register}></textarea>
								</div>
							</div>

							<div className="row">
								<div className="form-check col-sm-6">
									<label className="form-check-label">
										<input
											className="form-check-input mt-0"
											name="urgent"
											type="checkbox"
											value={true}
											ref={register}
										/>{' '}
										Please check if urgent
									</label>
								</div>

								<div className="col-sm-6 text-right">
									<button className="btn btn-primary" disabled={submitting}>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Create Lab Request'
										)}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		LabCategories: state.settings.lab_categories,
		LabTests: state.settings.lab_tests,
		LabGroups: state.settings.lab_groups,
		patient: state.user.patient,
	};
};

export default connect(mapStateToProps, {
	createLabRequest,
	getAllLabGroups,
	getAllLabTests,
	getAllLabTestCategories,
})(LabRequest);
