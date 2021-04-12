/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { patientAPI } from '../../services/constants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { request } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import cellEditFactory from 'react-bootstrap-table2-editor';
import BootstrapTable from 'react-bootstrap-table-next';
import { Type } from 'react-bootstrap-table2-editor';
import { reduxForm } from 'redux-form';

import Tooltip from 'antd/lib/tooltip';
import searchingGIF from '../../assets/images/searching.gif';

class HcgAdminTable extends Component {
	state = {
		hcgRecord: [],
		allPatients: [],
		patientList: [],
		loading: false,
	};

	componentDidMount() {
		this.loadPatients();
	}

	loadPatients = async () => {
		try {
			this.setState({ loading: true });
			// console.log(`${patientAPI}/list`);
			const rs = await request(`${patientAPI}/list`, 'GET', true);

			let patientList = [];
			// eslint-disable-next-line array-callback-return
			rs.map((value, i) => {
				patientList = [
					...patientList,
					{
						//value: value.id,
						label: value.other_names + ' ' + value.surname,
						value: value.other_names + ' ' + value.surname,
					},
				];
			});
			this.setState({ patientList });
			this.setState({ allPatients: rs });
			this.setState({ loading: false });
		} catch (error) {
			console.log(error);
			notifyError('Error fetching all radiology request');
			this.setState({ loading: false });
		}
	};

	deleteRow = (cellContent, row) => {
		const { hcgRecord } = this.state;
		// eslint-disable-next-line array-callback-return
		hcgRecord.map((value, i) => {
			if (value.id === row.id) {
				hcgRecord.splice(i, 1);
			}
		});
		this.setState({ hcgRecord });
	};

	addRow = () => {
		const { hcgRecord } = this.state;
		let row = {
			id: uuidv4(),
			name_of_patient: '',
			file_no: '',
			time: '',
			time_of_admin: '',
			hcg_type: '',
			dosage_hcg: '',
			admin_route: '',
			nurse: '',
			remarks: '',
		};
		hcgRecord.push(row);
		this.setState({ hcgRecord });
	};

	onSubmitForm = async data => {
		let { hcgRecord, allPatients } = this.state;
		let { history } = this.props;
		let hcgAdmin = [];
		// eslint-disable-next-line array-callback-return
		hcgRecord.map((value, index, array) => {
			const patient = allPatients.find(
				c => c.other_names + ' ' + c.surname === value.name_of_patient
			);
			let rec = {
				ivf_enrollment_id: value.id,
				patient_id: patient.id,
				timeOfEntry: value.time,
				timeOfAdmin: value.time_of_admin,
				typeOfDosage: value.dosage_hcg,
				typeOfHcg: value.dosage_hcg,
				routeOfAdmin: value.admin_route,
				nurse_id: value.nurse,
				remarks: value.remarks,
				id: value.id,
			};
			hcgAdmin = [...hcgAdmin, rec];
		});

		try {
			await request('IVFHCGAdmin', 'POST', true, hcgAdmin);
			//props.closeModals(true);
			notifySuccess('HCG Administration created successfully');
			history.push('/ivf/hcg-admin');
			this.setState({ loading: false });
		} catch (error) {
			console.log(error);
			notifyError('HCG Administration creation failed');
			this.setState({ loading: false });
		}
	};

	render() {
		let { hcgRecord, loading, patientList, allPatients } = this.state;
		const afterSaveCell = (oldValue, newValue, row, column) => {
			let patientList2 = [];
			const result = allPatients.find(
				c => c.other_names + ' ' + c.surname === row.name_of_patient
			);
			let theFIle = result.folderNumber;
			// eslint-disable-next-line array-callback-return
			hcgRecord.map((value, index, array) => {
				let datas = { ...value };
				if (value.name_of_patient === row.name_of_patient) {
					datas.file_no = theFIle;
				}
				patientList2.push(datas);
			});

			hcgRecord = [...patientList2];
			this.setState({ hcgRecord });
		};

		function numberingFormatter(cell, row, rowIndex, formatExtraData) {
			return rowIndex + 1;
		}

		const columns = [
			{
				dataField: 'index',
				text: 'ID',
				editable: false,
				formatter: numberingFormatter,
			},
			{
				dataField: 'name_of_patient',
				text: 'Name of Patient',
				editor: {
					type: Type.SELECT,
					getOptions: (setOptions, { row, column }) => {
						return patientList;
					},
				},
			},

			{
				dataField: 'file_no',
				text: 'File Number',
				editable: false,
				editor: {
					type: Type.TEXT,
				},
			},

			{
				dataField: 'time',
				text: 'Time of Entry',
				editor: {
					type: Type.TEXT,
				},
			},

			{
				dataField: 'time_of_admin',
				text: 'Time of admin',
				editor: {
					type: Type.TEXT,
				},
			},

			{
				dataField: 'hcg_type',
				text: 'Type of HCG',
				editor: {
					type: Type.TEXT,
				},
			},
			{
				dataField: 'dosage_hcg',
				text: 'Dosage of HCG',
				editor: {
					type: Type.TEXT,
				},
			},
			{
				dataField: 'admin_route',
				text: 'Route of Admin',
				editor: {
					type: Type.TEXT,
				},
			},
			{
				dataField: 'nurse',
				text: 'Nurse',
				editor: {
					type: Type.TEXT,
				},
			},
			{
				dataField: 'remarks',
				text: 'Remarks',
				editor: {
					type: Type.TEXTAREA,
				},
			},
			{
				dataField: 'df2',
				isDummyField: true,
				editable: false,
				text: 'Actions',
				classes: 'text-center row-actions',
				formatter: (cellContent, row) => {
					return (
						<div>
							<Tooltip title="Delete">
								<a
									className="danger"
									onClick={() => this.deleteRow(cellContent, row)}>
									<i className="os-icon os-icon-ui-15" />
								</a>
							</Tooltip>
						</div>
					);
				},
			},
		];

		return (
			<>
				<button
					type="button"
					className="btn btn-primary ml-2"
					onClick={this.addRow}>
					Add
				</button>

				{loading ? (
					<div>
						<img alt="searching" src={searchingGIF} />
					</div>
				) : (
					<>
						<form onSubmit={this.props.handleSubmit(this.onSubmitForm)}>
							<BootstrapTable
								keyField="id"
								bordered={false}
								data={hcgRecord}
								columns={columns}
								cellEdit={cellEditFactory({
									mode: 'click',
									blurToSave: true,
									afterSaveCell,
								})}
							/>

							<div className="row mt-4 pb-2">
								<div className="col-sm-12 text-right">
									<button className="btn btn-secondary" type="button">
										Cancel
									</button>

									<button className="btn btn-primary mr-4" type="submit">
										Proceed
									</button>
								</div>
							</div>
						</form>
					</>
				)}
			</>
		);
	}
}

HcgAdminTable = reduxForm({
	form: 'HcgAdminTable', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(HcgAdminTable);

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
	};
};

export default withRouter(connect(mapStateToProps, null)(HcgAdminTable));
