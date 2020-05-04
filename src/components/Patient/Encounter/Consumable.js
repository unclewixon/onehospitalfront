/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import SunEditor from 'suneditor-react';
import { connect } from 'react-redux';
import { loadEncounterData, loadEncounterForm } from '../../../actions/patient';
import {
	get_all_diagnosis,
	get_all_services,
	getAllServiceCategory,
} from '../../../actions/settings';
import { loadInvCategories, loadInventories } from '../../../actions/inventory';

class Consumable extends Component {
	state = {
		items: [],
	};

	addItem = () => {
		const { items } = this.state;
		this.setState({
			items: [...items, { id: items.length, deleted: 0 }],
		});
	};

	updateItems = (id, type, value) => {
		const { items } = this.state;
		const item = items.find(d => d.id === id);
		if (item) {
			const idx = items.findIndex(d => d.id === id);
			const _items = [
				...items.slice(0, idx),
				{ ...item, [type]: value },
				...items.slice(idx + 1),
			];

			return _items;
		}
		return [];
	};

	removeItem = id => () => {
		const items = this.updateItems(id, 'deleted', 1);
		this.setState({ items: [...items] });
	};

	render() {
		const { items } = this.state;
		const { previous, next } = this.props;
		return (
			<div className="form-block encounter">
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Business Unit/Service Center</label>
							<select
								placeholder="-- Select a service center --"
								className="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>Item Generic Name</label>
							<select
								placeholder="-- Select item generic name --"
								className="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-md-12">
						<a
							className="btn btn-success btn-sm text-white"
							onClick={this.addItem}>
							<i className="os-icon os-icon-plus-circle" />
							<span>add</span>
						</a>
					</div>
				</div>
				{items.map((item, i) => {
					return (
						item.deleted === 0 && (
							<div className="row" key={i}>
								<div className="col-sm-5">
									<div className="form-group">
										<label>Item</label>
										<select
											placeholder="-- Select item --"
											className="form-control">
											<option value=""></option>
										</select>
									</div>
								</div>
								<div className="col-sm-5">
									<div className="form-group">
										<label>Quantity</label>
										<input
											type="number"
											placeholder="Add type quantity"
											className="form-control"
										/>
									</div>
								</div>
								<div className="col-sm-1" style={{ position: 'relative' }}>
									<a
										className="text-danger delete-icon"
										onClick={this.removeItem(item.id)}>
										<i className="os-icon os-icon-cancel-circle" />
									</a>
								</div>
							</div>
						)
					);
				})}
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Note</label>
							<textarea
								placeholder="Request Note"
								cols="3"
								className="form-control"></textarea>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Add patient instructions</label>
							<SunEditor
								width="100%"
								placeholder="Please type here..."
								autoFocus={false}
								enableToolbar={true}
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
						<button className="btn btn-primary" onClick={next}>
							Next
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		encounterData: state.patient.encounterData,
		encounterForm: state.patient.encounterForm,
	};
};

export default connect(mapStateToProps, {
	loadEncounterData,
	loadEncounterForm,
})(Consumable);
