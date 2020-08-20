/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import SunEditor from 'suneditor-react';
import { connect } from 'react-redux';
import Select from 'react-select';
import {
	Field,
	formValueSelector,
	reduxForm,
	SubmissionError,
} from 'redux-form';
import { useDispatch } from 'react-redux';

import { loadEncounterData, loadEncounterForm } from '../../../actions/patient';
import {
	consultationAPI,
	stockByCategoryAPI,
} from '../../../services/constants';
import {
	renderSelect,
	renderTextArea,
	renderTextInput,
	request,
} from '../../../services/utilities';
import searchingGIF from '../../../assets/images/searching.gif';
import { notifyError, notifySuccess } from '../../../services/notify';
import { closeModals } from '../../../actions/general';

const selector = formValueSelector('consumableForm');
let Consumable = props => {
	const { previous, encounterData } = props;

	let [data, setData] = useState([]);
	let [loading, setLoading] = useState(true);
	const [summary, setSummary] = useState('');
	let [stocks, setStock] = useState(false);
	const append = () => {
		setData([...data, { id: data.length }]);
	};
	const handleChange = e => {
		setSummary(e);
	};

	const dispatch = useDispatch();

	const listConsumable = async () => {
		try {
			const url = `${stockByCategoryAPI}/Consumable`;
			const rs = await request(url, 'GET', true);
			setStock(rs);
			setLoading(false);
		} catch (e) {
			setLoading(false);
			throw new SubmissionError({
				_error: e.message || 'could not load data',
			});
		}
	};

	useEffect(() => {
		listConsumable();
	}, []);

	const remove = index => {
		setData([...data.slice(0, index), ...data.slice(index + 1)]);
	};

	const onSubmit = async data => {
		const { patient, appointmentId } = props.encounterInfo;

		encounterData.consumable = data || [];
		encounterData.consumable.instruction = summary;
		encounterData.appointment_id = appointmentId;

		props.loadEncounterData(encounterData);

		console.log(encounterData);
		console.log(JSON.stringify(encounterData));
		// dispatch(props.next);
		setLoading(true);

		try {
			const url = `${consultationAPI}${patient.id}/save`;
			const rs = await request(url, 'POST', true, encounterData);
			console.log(rs);
			// dispatch(updateAppointment(data.appointment));
			dispatch(closeModals());
			notifySuccess('Consultation created successfully');
			setLoading(false);
		} catch (error) {
			console.log(error);
			notifyError('Consultation failed');
			setLoading(false);
		}
	};

	return (
		<form onSubmit={props.handleSubmit(onSubmit)}>
			{loading ? (
				<div className="form-block encounter">
					<img alt="searching" src={searchingGIF} />
				</div>
			) : (
				<>
					<div className="form-block encounter">
						<div className="row">
							<div className="col-sm-12">
								<div className="form-group">
									<Select
										options={[{ label: 'Consumable', value: 'Consumable' }]}
										defaultValue={{ label: 'Consumable', value: 'Consumable' }}
										placeholder="Select Service Center"
										name="service_center"
									/>
								</div>
							</div>
						</div>
						<div className="row mt-4">
							<div className="col-md-12">
								{!loading ? (
									<a
										className="btn btn-success btn-sm text-white"
										onClick={() => {
											append();
										}}>
										<i className="os-icon os-icon-plus-circle" />
										<span>add</span>
									</a>
								) : (
									''
								)}
							</div>
						</div>
						{data.map((item, i) => {
							return (
								<div className="row" key={i}>
									<div className="col-sm-5">
										<div className="form-group">
											<Field
												id="item"
												name={`items[${item.id}].item`}
												component={renderSelect}
												label="Item"
												placeholder="Item"
												data={stocks}
											/>
										</div>
									</div>
									<div className="col-sm-4">
										<div className="form-group">
											<Field
												id="quantity"
												name={`items[${item.id}].quantity`}
												component={renderTextInput}
												label="Quantity"
												placeholder="Quantity"
											/>
										</div>
									</div>
									<div className="col-sm-1" style={{ position: 'relative' }}>
										<a
											className="text-danger delete-icon"
											onClick={() => remove(item.id)}>
											<i className="os-icon os-icon-cancel-circle" />
										</a>
									</div>
								</div>
							);
						})}
						<div className="row">
							<div className="col-sm-12">
								<div className="form-group">
									<label>Note</label>
									<Field
										id="note"
										name="note"
										component={renderTextArea}
										label="Request Note"
										placeholder="Request Note"
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12">
								<div className="form-group">
									<label>Add patient instructions</label>
									<SunEditor
										width="100%"
										name="instructions"
										placeholder="Please type here..."
										autoFocus={false}
										enableToolbar={true}
										onChange={evt => {
											handleChange(String(evt));
										}}
										setOptions={{
											height: 300,
											buttonList: [
												[
													'bold',
													'underline',
													'italic',
													'strike',
													'subscript',
													'superscript',
													'list',
													'align',
													'font',
													'fontSize',
													'image',
												],
											],
										}}
									/>
								</div>
							</div>
						</div>

						<div className="row mt-5">
							<div className="col-sm-12 d-flex ant-row-flex-space-between">
								<button className="btn btn-primary" onClick={previous}>
									Previous
								</button>
								<button className="btn btn-primary" type="submit">
									Finish
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</form>
	);
};

Consumable = reduxForm({
	form: 'consumableForm', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(Consumable);

const mapStateToProps = (state, ownProps) => {
	return {
		encounterData: state.patient.encounterData,
		encounterForm: state.patient.encounterForm,
		encounterInfo: state.general.encounterInfo,
		value: selector(state, 'consumable'),
	};
};

export default connect(mapStateToProps, {
	loadEncounterData,
	closeModals,
	loadEncounterForm,
})(Consumable);
