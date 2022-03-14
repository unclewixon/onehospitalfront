import React, { useState, useCallback, useEffect } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import {
	renderTextArea,
	formatCurrency,
	request,
} from '../../../services/utilities';

const validate = values => {
	const errors = {};
	return errors;
};

const RadiologyRequest = ({
	handleSubmit,
	change,
	previous,
	next,
	assessment,
}) => {
	const [loaded, setLoaded] = useState(false);
	const [selectedScans, setSelectedScans] = useState([]);
	const [urgentScan, setUrgentScan] = useState(false);

	const dispatch = useDispatch();

	const initData = useCallback(() => {
		setSelectedScans(assessment.scans || []);
		setUrgentScan(assessment?.scan_urgent || false);
	}, [assessment]);

	useEffect(() => {
		if (!loaded) {
			initData();
			setLoaded(true);
		}
	}, [initData, loaded]);

	const getServices = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `services/scans?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	return (
		<div className="form-block encounter">
			<form onSubmit={handleSubmit(next)}>
				<div className="row">
					<div className="form-group col-sm-12">
						<label>Radiology Test</label>
						<AsyncSelect
							isMulti
							isClearable
							getOptionValue={option => option.id}
							getOptionLabel={option => option.name}
							defaultOptions
							value={selectedScans}
							name="service_request"
							loadOptions={getServices}
							onChange={e => {
								setSelectedScans(e || []);
								dispatch(change('scans', e || []));
							}}
							placeholder="Search Scans"
						/>
					</div>
				</div>
				<div className="row mt-2">
					<div className="col-sm-12">
						{selectedScans.map((scan, i) => (
							<span
								className={`badge badge-${
									scan ? 'info' : 'danger'
								} text-white ml-2`}
								key={i}>{`${scan.name}: ${formatCurrency(
								scan?.serviceCost?.tariff || 0
							)}`}</span>
						))}
					</div>
				</div>
				<div className="row mt-4">
					<div className="form-group col-sm-12">
						<Field
							id="note"
							name="scan_note"
							component={renderTextArea}
							label="Scan Request Note"
							type="text"
							placeholder="Enter note"
						/>
					</div>
				</div>
				<div className="row">
					<div className="form-group col-sm-6">
						<div className="form-check col-sm-12">
							<label className="form-check-label">
								<input
									className="form-check-input mt-0"
									name="scan_urgent"
									type="checkbox"
									checked={urgentScan}
									onChange={e => {
										setUrgentScan(!urgentScan);
										dispatch(change('scan_urgent', !urgentScan));
									}}
								/>
								Please check if urgent
							</label>
						</div>
					</div>
					<div className="col-sm-6 text-right"></div>
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
	})(RadiologyRequest)
);
