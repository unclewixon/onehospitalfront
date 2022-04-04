import React, { useState, useCallback, useEffect } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import Select from 'react-select';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import {
	renderTextArea,
	formatCurrency,
	request,
} from '../../../services/utilities';
import { startBlock, stopBlock } from '../../../actions/redux-block';
import { notifyError } from '../../../services/notify';

const validate = values => {
	const errors = {};
	return errors;
};

const LabInvestigation = ({
	handleSubmit,
	change,
	previous,
	next,
	assessment,
}) => {
	const [loaded, setLoaded] = useState(false);
	const [groups, setGroups] = useState([]);
	const [selectedTests, setSelectedTests] = useState([]);
	const [urgentLab, setUrgentLab] = useState(false);

	const dispatch = useDispatch();

	const initData = useCallback(() => {
		setSelectedTests(assessment.lab_tests || []);
		setUrgentLab(assessment?.lab_urgent || false);
	}, [assessment]);

	const fetchLabCombo = useCallback(async () => {
		try {
			dispatch(startBlock());

			try {
				const url = 'lab-tests/groups';
				const rs = await request(url, 'GET', true);
				setGroups(rs);
			} catch (e) {
				notifyError('Error fetching lab groups');
			}

			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			notifyError('Error fetching groups');
			dispatch(stopBlock());
		}
	}, [dispatch]);

	useEffect(() => {
		if (!loaded) {
			fetchLabCombo();
			initData();
			setLoaded(true);
		}
	}, [fetchLabCombo, initData, loaded]);

	const getLabTests = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `lab-tests?q=${q}`;
		const res = await request(url, 'GET', true);
		return res?.result || [];
	};

	return (
		<div className="form-block encounter">
			<form onSubmit={handleSubmit(next)}>
				<div className="row">
					<div className="form-group col-sm-6">
						<label>Lab Group</label>
						<Select
							name="lab_group"
							placeholder="Select Lab Group"
							options={groups}
							getOptionValue={option => option.id}
							getOptionLabel={option => option.name}
							onChange={e => {
								const items = [
									...selectedTests,
									...e.tests.map(t => ({ ...t.labTest })),
								];
								setSelectedTests(items);
								dispatch(change('lab_tests', items));
							}}
						/>
					</div>
					<div className="form-group col-sm-6">
						<label>Lab Test</label>
						<AsyncSelect
							isMulti
							isClearable
							getOptionValue={option => option.id}
							getOptionLabel={option =>
								`${option.name} (${option.category.name})`
							}
							defaultOptions
							value={selectedTests}
							name="lab_test"
							loadOptions={getLabTests}
							onChange={e => {
								if (e) {
									setSelectedTests(e);
									dispatch(change('lab_tests', e));
								} else {
									setSelectedTests([]);
									dispatch(change('lab_tests', []));
								}
							}}
							placeholder="Search Lab Test"
						/>
					</div>
				</div>
				<div className="row mt-2">
					<div className="col-sm-12">
						{selectedTests.map((lab, i) => (
							<span
								className={`badge badge-${
									lab ? 'info' : 'danger'
								} text-white ml-2`}
								key={i}
							>{`${lab.name}: ${formatCurrency(
								lab?.service?.tariff || 0
							)}`}</span>
						))}
					</div>
				</div>
				<div className="row mt-4">
					<div className="form-group col-sm-12">
						<Field
							id="note"
							name="lab_note"
							component={renderTextArea}
							label="Lab Request Note"
							type="text"
							placeholder="Enter note"
						/>
					</div>
				</div>
				<div className="row">
					<div className="form-group col-sm-4">
						<div className="form-check col-sm-12">
							<label className="form-check-label">
								<input
									className="form-check-input mt-0"
									name="lab_urgent"
									type="checkbox"
									checked={urgentLab}
									onChange={e => {
										setUrgentLab(!urgentLab);
										dispatch(change('lab_urgent', !urgentLab));
									}}
								/>
								Please check if urgent
							</label>
						</div>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-sm-12 d-flex space-between">
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

const mapStateToProps = (state, ownProps) => {
	return {
		initialValues: { ...ownProps.assessment },
	};
};

export default connect(mapStateToProps, { change })(
	reduxForm({
		form: 'antenatalAssessment', //Form name is same
		destroyOnUnmount: false,
		forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
		validate,
	})(LabInvestigation)
);
