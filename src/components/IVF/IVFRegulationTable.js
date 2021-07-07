/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import cellEditFactory from 'react-bootstrap-table2-editor';
import BootstrapTable from 'react-bootstrap-table-next';
import { Type } from 'react-bootstrap-table2-editor';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';

import { loadPatientRegulationTable } from '../../actions/patient';

class IVFRegulationTable extends Component {
	state = {
		products: [],
		patientList: [],
		regulationTable: [],
		allPatients: [],
		loading: false,
	};

	deleteRow = (cellContent, row) => {
		console.log(row);
		const { products } = this.state;
		// eslint-disable-next-line array-callback-return
		products.map((value, i) => {
			if (value.id === row.id) {
				products.splice(i, 1);
			}
		});
		this.setState({ products });
	};

	addRow = () => {
		console.log('d');
		const { products } = this.state;
		let row = {
			id: uuidv4(),
			//date: moment().format('DD/MM/YYYY'),
			date: moment().toDate(),
			day: '',
			dose: '',
			other_treatment: '',
			comment: '',
		};
		products.push(row);
		console.log(products);
		this.setState({ products });
	};

	render() {
		let { products } = this.state;
		// let { regulationTable } = this.props;
		const afterSaveCell = (oldValue, newValue, row, column) => {
			this.props.loadPatientRegulationTable(products);
		};

		const columns = [
			{
				dataField: 'date',
				text: 'Date',
				formatter: cell => {
					let dateObj = cell;
					if (typeof cell !== 'object') {
						dateObj = new Date(cell);
					}
					return `${('0' + dateObj.getUTCDate()).slice(-2)}/${(
						'0' +
						(dateObj.getUTCMonth() + 1)
					).slice(-2)}/${dateObj.getUTCFullYear()}`;
				},
				editor: {
					type: Type.DATE,
				},
			},

			{
				dataField: 'day',
				text: 'Day',
				editor: {
					type: Type.TEXT,
				},
			},

			{
				dataField: 'dose',
				text: 'Dose',
				editor: {
					type: Type.TEXT,
				},
			},

			{
				dataField: 'other_treatment',
				text: 'Other Treatment',
				editor: {
					type: Type.TEXTAREA,
				},
			},

			{
				dataField: 'comment',
				text: 'Comment',
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

				<BootstrapTable
					keyField="id"
					bordered={false}
					data={products}
					columns={columns}
					cellEdit={cellEditFactory({
						mode: 'click',
						blurToSave: true,
						afterSaveCell,
					})}
				/>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
		regulationTable: state.patient.regulationTable,
	};
};

export default withRouter(
	connect(mapStateToProps, { loadPatientRegulationTable })(IVFRegulationTable)
);
