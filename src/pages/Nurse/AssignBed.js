import React, { Component } from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import Select from 'react-select';

import { request, updateImmutable } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';

class AssignBed extends Component {
	state = {
		submitting: false,
		selected: '',
		categories: [],
		rooms: [],
		room_id: '',
	};

	componentDidMount() {
		this.fetchCategories();
	}

	fetchCategories = async () => {
		try {
			const rs = await request('rooms/categories', 'GET', true);
			const categories = rs.map(category => ({
				...category,
				value: category.id,
				label: category.name,
			}));
			this.setState({ categories });
		} catch (e) {
			console.log(e);
		}
	};

	handleCatChange = val => {
		const { categories } = this.state;
		const category = categories.find(c => c.id === val);
		if (category) {
			const rooms = category.rooms.filter(r => r.status === 'Not occupied');
			const allRooms = rooms.map(room => ({
				value: room.id,
				label: room.name,
			}));
			this.setState({ rooms: allRooms });
		}
	};

	handleRoomChange = val => {
		this.setState({ room_id: val });
	};

	asignBed = async () => {
		try {
			const { item, patients, updatePatient } = this.props;
			const { room_id } = this.state;

			this.setState({ submitting: true });

			const data = {
				room_id,
				admission_id: item.id,
			};
			item.room = room_id;
			const url = 'patient/admissions/assign-bed';
			const rs = await request(url, 'PATCH', true, data);
			if (rs.success) {
				const update = updateImmutable(patients, rs.admission);
				updatePatient(update);
				notifySuccess(`patient assigned ${room_id}`);
				this.setState({ submitting: false });
				this.props.closeModal();
			} else {
				notifyError(rs.message);
				this.setState({ submitting: false });
				this.props.closeModal();
			}
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || `could not assign bed`,
			});
		}
	};

	render() {
		const { error, handleSubmit, closeModal } = this.props;
		const { submitting, rooms, categories } = this.state;

		return (
			<div
				className="onboarding-modal modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}>
				<div
					className="modal-dialog modal-centered"
					style={{ maxWidth: '320px' }}>
					<div className="modal-content text-center">
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={closeModal}>
							<span className="os-icon os-icon-close" />
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">{`Assign Bed`}</h4>
							<div className="element-box">
								<form onSubmit={handleSubmit(this.asignBed)}>
									{error && (
										<div
											className="alert alert-danger"
											dangerouslySetInnerHTML={{
												__html: `<strong>Error!</strong> ${error}`,
											}}
										/>
									)}
									<div className="row form-group">
										<div className="col-sm-12">
											<label>Category</label>
											<Select
												options={categories}
												onChange={e => this.handleCatChange(e.value)}
											/>
										</div>
										<div className="col-sm-12">
											<label>Room</label>
											<Select
												options={rooms}
												onChange={e => this.handleRoomChange(e.value)}
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12 text-right">
											<button
												className="btn btn-primary"
												disabled={submitting}
												type="submit">
												{submitting ? (
													<img src={waiting} alt="submitting" />
												) : (
													'save'
												)}
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AssignBed = reduxForm({
	form: 'take-reading',
})(AssignBed);

export default AssignBed;
