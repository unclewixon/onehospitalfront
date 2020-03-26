/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

class Allergies extends Component {
	state = {
		allergies: [],
	};

	addAllergy = () => {
		const { allergies } = this.state;
		this.setState({
			allergies: [...allergies, { id: allergies.length, deleted: 0 }],
		});
	};

	updateAllergies = (id, type, value) => {
		const { allergies } = this.state;
		const allergy = allergies.find(d => d.id === id);
		if (allergy) {
			const idx = allergies.findIndex(d => d.id === id);
			const _allergies = [
				...allergies.slice(0, idx),
				{ ...allergy, [type]: value },
				...allergies.slice(idx + 1),
			];

			return _allergies;
		}
		return [];
	};

	removeAllergy = id => () => {
		const allergies = this.updateAllergies(id, 'deleted', 1);
		this.setState({ allergies: [...allergies] });
	};

	render() {
		const { allergies } = this.state;
		return (
			<div className="form-block encounter">
				<div className="row">
					<div className="col-md-12">
						<a
							className="btn btn-success btn-sm text-white"
							onClick={this.addAllergy}>
							<i className="os-icon os-icon-plus-circle" />
							<span>add allergen</span>
						</a>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						{allergies.map((allergy, i) => {
							return (
								allergy.deleted === 0 && (
									<div className="mt-4" key={i}>
										<div className="row">
											<div className="col-md-12">
												<a
													className="text-danger"
													onClick={this.removeAllergy(allergy.id)}
													style={{ lineHeight: '78px' }}>
													<i className="os-icon os-icon-cancel-circle" /> remove
													allergen
												</a>
											</div>
										</div>
										<div className="row">
											<div className="col-md-12">
												<div className="form-group">
													<label>Category</label>
													<select
														placeholder="-- Select allergen category --"
														className="form-control">
														<option value=""></option>
													</select>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-12">
												<div className="form-group">
													<label>Allergen</label>
													<input
														type="text"
														placeholder="Allergen"
														className="form-control"
													/>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-12">
												<div className="form-group">
													<label>Reaction</label>
													<input
														type="text"
														placeholder="Reaction"
														className="form-control"
													/>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-12">
												<div className="form-group">
													<label>Severity</label>
													<select
														placeholder="-- Select severity --"
														className="form-control">
														<option value="mild">MILD</option>
													</select>
												</div>
											</div>
										</div>
									</div>
								)
							);
						})}
					</div>
					{allergies.length > 0 && (
						<div className="col-sm-6">
							<div className="form-group">
								<label>
									Existing Allergies{' '}
									<input type="checkbox" className="form-control" />
								</label>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Allergies;
