/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import cellEditFactory from 'react-bootstrap-table2-editor';
import BootstrapTable from 'react-bootstrap-table-next';
import { Type } from 'react-bootstrap-table2-editor';
import { reduxForm } from 'redux-form';
import Tooltip from 'antd/lib/tooltip';

import { request } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import TableLoading from '../TableLoading';

class HcgAdminTable extends Component {
	state = {
		hcgRecord: [],
		allPatients: [],
		patientList: [],
		loading: false,
	};

	componentDidMount() {}

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
		let { hcgRecord } = this.state;

		const hcgAdmin = hcgRecord.map(value => {
			return {
				ivf_enrollment_id: value.id,
				timeOfEntry: value.time,
				timeOfAdmin: value.time_of_admin,
				typeOfDosage: value.dosage_hcg,
				typeOfHcg: value.dosage_hcg,
				routeOfAdmin: value.admin_route,
				nurse_id: value.nurse,
				remarks: value.remarks,
				id: value.id,
			};
		});

		try {
			const url = 'ivf/save/hcg-administration';
			const rs = await request(url, 'POST', true, hcgAdmin);
			if (rs.success) {
				notifySuccess('HCG Administration created successfully');
				this.setState({ loading: false });
			} else {
				notifyError('HCG Administration creation failed');
				this.setState({ loading: false });
			}
		} catch (error) {
			console.log(error);
			notifyError('HCG Administration creation failed');
			this.setState({ loading: false });
		}
	};

	render() {
		let { hcgRecord, loading } = this.state;
		const afterSaveCell = (oldValue, newValue, row, column) => {
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
			<div className="col-sm-12">
				<div className="element-wrapper">
					<div className="element-actions flex-action">
						<a
							type="btn btn-sm btn-secondary text-white ml-3"
							className="btn btn-primary ml-2"
							onClick={this.addRow}>
							Add
						</a>
					</div>
					<h6 className="element-header">HCG Administration Chart</h6>
					<div className="form-box p-3 m-0">
						<div className="table table-responsive">
							{loading ? (
								<TableLoading />
							) : (
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
											<button className="btn btn-primary mr-4" type="submit">
												Save
											</button>
										</div>
									</div>
								</form>
							)}
						</div>
					</div>
				</div>
			</div>
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
