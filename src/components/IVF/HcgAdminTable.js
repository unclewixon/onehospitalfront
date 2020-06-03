import React, { Component, lazy, Suspense } from 'react';
import Splash from '../../components/Splash';
import { API_URI, patientAPI } from '../../services/constants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
	renderSelect,
	renderTextArea,
	renderTextInput,
	request,
} from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import cellEditFactory from 'react-bootstrap-table2-editor';
import BootstrapTable from 'react-bootstrap-table-next';
import { Type } from 'react-bootstrap-table2-editor';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';
import searchingGIF from '../../assets/images/searching.gif';
import inventory from '../../reducers/inventory';

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
			console.log(`${API_URI}${patientAPI}/list`);
			const rs = await request(`${API_URI}${patientAPI}/list`, 'GET', true);

			let patientList = [];
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

	render() {
		let { hcgRecord, loading, patientList, allPatients } = this.state;
		const afterSaveCell = (oldValue, newValue, row, column) => {
			let patientList2 = [];
			const result = allPatients.find(
				c => c.other_names + ' ' + c.surname === row.name_of_patient
			);
			let theFIle = result.fileNumber;
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
				<button type="button" className="btn btn-primary" onClick={this.addRow}>
					Add
				</button>

				{loading ? (
					<div>
						<img alt="searching" src={searchingGIF} />
					</div>
				) : (
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
				)}
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
	};
};

export default withRouter(connect(mapStateToProps, null)(HcgAdminTable));
