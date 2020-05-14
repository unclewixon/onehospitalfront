import React, { Component, useState, useEffect } from 'react';
import JournalItem from '../../components/JournalItem';
import Popover from 'antd/lib/popover';
import waiting from '../../assets/images/waiting.gif';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import _ from 'lodash';
import { notifySuccess, notifyError } from '../../services/notify';
const { RangePicker } = DatePicker;
const initialDate = item => ({
	startDate: item ? item.startDate : '',
	endDate: item ? item.endDate : '',
});
const Entry = ({ uploading, doUpload, hide, clear, item }) => {
	const [value, setValue] = useState(false);
	const [data, setData] = useState({
		description: '',
		glCode: '',
		debit: 0,
		credit: 0,
	});

	// const [date, setDate] = useState(initialDate(item));

	const handleChange = e => {
		if (
			(e.target.name === 'debit' && data.credit > 0) ||
			(e.target.name === 'credit' && data.debit > 0)
		) {
			setData({
				...data,
				[e.target.name]: 0,
			});
			return;
		}
		console.log(data);

		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};

	const dataSet = item => {
		console.log('i got here');
		setData(item);
		setValue(true);
		console.log(data, value);
	};

	useEffect(() => {
		if (Object.keys(item).length > 0) {
			dataSet(item);
		}
	}, [item]);
	return (
		<div
			className="onboarding-modal fade animated show"
			role="dialog"
			style={{ width: '400px' }}>
			<div className="modal-centered">
				<div className="modal-content text-center">
					<button onClick={hide} className="close" type="button">
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">
							{Object.keys(item).length > 0 ? 'Edit' : 'Create'} Journal Entry
						</h4>

						<form
							name="performanceForm"
							className="form-block w-100"
							onSubmit={e => doUpload(e, data)}>
							<div className="row my-3">
								<div className="form-group col-12">
									{/* {label ? <textarea>{label}</textarea> : null} */}
									<label>Description</label>
									<input
										type="text"
										className="form-control"
										name="description"
										onChange={handleChange}
										defaultValue={value ? data.description : ''}
										required
									/>
								</div>
								<div className="form-group col-12">
									{/* {label ? <textarea>{label}</textarea> : null} */}
									<label>GL Code</label>
									<input
										type="text"
										className="form-control"
										name="glCode"
										onChange={handleChange}
										defaultValue={value ? data.glCode : ''}
										required
									/>
								</div>

								<div className="form-group col-12">
									{/* {label ? <textarea>{label}</textarea> : null} */}
									<label>Debit</label>
									<input
										type="number"
										className="form-control"
										name="debit"
										onChange={handleChange}
										defaultValue={value ? item.debit : 0}
										required
										pattern="/^\d+(\.\d{1,2})?$/i"
										min="0"
									/>
								</div>

								<div className="form-group col-12">
									{/* {label ? <textarea>{label}</textarea> : null} */}
									<label>Credit</label>
									<input
										type="number"
										className="form-control"
										name="credit"
										onChange={handleChange}
										defaultValue={value ? item.credit : 0}
										required
										pattern="/^\d+(\.\d{1,2})?$/i"
										min="0"
									/>
								</div>
							</div>

							<div className="row">
								<div className="col-sm-12 text-right pr-0">
									<button
										className="btn btn-primary"
										disabled={uploading}
										type="submit">
										{uploading ? (
											<img src={waiting} alt="submitting" />
										) : item ? (
											'Edit'
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
	);
};

// class Entry extends Component {
// 	state = {
// 		data: {
// 			description: '',
// 			glCode: '',
// 			debit: 0,
// 			credit: 0,
// 		},
// 	};
// 	componentDidMount() {
// 		if (Object.keys(this.props.item).length > 0) {
// 			this.setState({ data: this.props.item });
// 		}
// 	}

// 	handleChange = e => {
// 		const { data } = this.state;
// 		if (
// 			(e.target.name === 'debit' && data.credit > 0) ||
// 			(e.target.name === 'credit' && data.debit > 0)
// 		) {
// 			this.setState({
// 				...data,
// 				[e.target.name]: 0,
// 			});
// 			return;
// 		}

// 		this.setState({
// 			...data,
// 			[e.target.name]: e.target.value,
// 		});
// 		console.log(data);
// 	};

// 	render() {
// 		const { uploading, doUpload, hide, clear, item } = this.props;
// 		const { data } = this.state;
// 		return (
// 			<div
// 				className="onboarding-modal fade animated show"
// 				role="dialog"
// 				style={{ width: '400px' }}>
// 				<div className="modal-centered">
// 					<div className="modal-content text-center">
// 						<button onClick={this.props.hide} className="close" type="button">
// 							<span className="os-icon os-icon-close"></span>
// 						</button>
// 						<div className="onboarding-content with-gradient">
// 							<h4 className="onboarding-title">
// 								{Object.keys(item).length > 0 ? 'Edit' : 'Create'} Journal Entry
// 							</h4>

// 							<form
// 								name="performanceForm"
// 								className="form-block w-100"
// 								onSubmit={e => this.props.doUpload(e, data)}>
// 								<div className="row my-3">
// 									<div className="form-group col-12">
// 										{/* {label ? <textarea>{label}</textarea> : null} */}
// 										<label>Description</label>
// 										<input
// 											type="text"
// 											className="form-control"
// 											name="description"
// 											onChange={this.handleChange}
// 											defaultValue={item ? data.description : ''}
// 											required
// 										/>
// 									</div>
// 									<div className="form-group col-12">
// 										{/* {label ? <textarea>{label}</textarea> : null} */}
// 										<label>GL Code</label>
// 										<input
// 											type="text"
// 											className="form-control"
// 											name="glCode"
// 											onChange={this.handleChange}
// 											defaultValue={item ? data.glCode : ''}
// 											required
// 										/>
// 									</div>

// 									<div className="form-group col-12">
// 										{/* {label ? <textarea>{label}</textarea> : null} */}
// 										<label>Debit</label>
// 										<input
// 											type="number"
// 											className="form-control"
// 											name="debit"
// 											onChange={this.handleChange}
// 											defaultValue={item ? item.debit : 0}
// 											required
// 											pattern="/^\d+(\.\d{1,2})?$/i"
// 											min="0"
// 										/>
// 									</div>

// 									<div className="form-group col-12">
// 										{/* {label ? <textarea>{label}</textarea> : null} */}
// 										<label>Credit</label>
// 										<input
// 											type="number"
// 											className="form-control"
// 											name="credit"
// 											onChange={this.handleChange}
// 											defaultValue={item ? item.credit : 0}
// 											required
// 											pattern="/^\d+(\.\d{1,2})?$/i"
// 											min="0"
// 										/>
// 									</div>
// 								</div>

// 								<div className="row">
// 									<div className="col-sm-12 text-right pr-0">
// 										<button
// 											className="btn btn-primary"
// 											disabled={uploading}
// 											type="submit">
// 											{uploading ? (
// 												<img src={waiting} alt="submitting" />
// 											) : item ? (
// 												'Edit'
// 											) : (
// 												'Save'
// 											)}
// 										</button>
// 									</div>
// 								</div>
// 							</form>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }

export class Journal extends Component {
	state = {
		rev: [
			{
				createdAt: '23-4-20',
				description: 'Bank charges for april 2020',
				glCode: 'Union Bank',
				debit: 0,
				credit: 1655.85,
			},
			{
				createdAt: '23-4-20',
				description: 'Bank charges for april 2020',
				glCode: 'Bank Charges',
				debit: 5000,
				credit: 0,
			},
		],
		form_visible: false,
		uploading: false,
		loading: false,
		editItem: {},
	};
	onUpload = async (e, data) => {
		e.preventDefault();
		console.log(data);
		this.setState({ uploading: true });
		try {
			//load it into database and add it to the store
			// document.getElementById('performanceForm').reset();
			this.setState({ uploading: false });
		} catch (e) {
			console.log(e);
			notifyError('Error creating performance period');
			this.setState({ uploading: false });
		}
	};
	add = () => {
		this.setState({ form_visible: true });
	};

	save = () => {};

	hide = () => {
		this.setState({ form_visible: false, editItem: {} });
	};

	editEntry = item => {
		this.add();
		this.setState({ editItem: item });
	};
	render() {
		const { form_visible, uploading, loading, editItem, rev } = this.state;
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<div className="row">
									<div className="col-sm-12">
										<div className="element-wrapper">
											<div className="element-actions">
												<div
													hidden={!form_visible}
													className="element-actions"
													style={{ position: 'absolute', right: '40px' }}>
													{form_visible ? (
														<Entry
															uploading={uploading}
															doUpload={this.onUpload}
															hide={this.hide}
															onBackClick={this.onBackClick}
															item={editItem}
														/>
													) : null}
												</div>

												<button
													className="btn btn-success btn-sm"
													onClick={this.save}
													download>
													<i className="os-icon os-icon-ui-22"></i>
													<span>Save All</span>
												</button>
												<button
													className="btn btn-primary btn-sm text-white"
													onClick={this.add}>
													<i className="os-icon os-icon-ui-22" />
													<span>Add New</span>
												</button>
											</div>
											<h6 className="element-header">Journal Entry</h6>
										</div>
									</div>
								</div>
								<div className="element-box">
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th>Date</th>
													<th>Description</th>
													<th>GL Code</th>
													<th>Debit</th>
													<th className="text-center">Credit</th>
													<th className="text-center">Actions</th>
												</tr>
											</thead>
											<tbody>
												{rev.map((el, i) => {
													return (
														<JournalItem
															item={el}
															index={i + 1}
															edit={this.editEntry}
														/>
													);
												})}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Journal;
