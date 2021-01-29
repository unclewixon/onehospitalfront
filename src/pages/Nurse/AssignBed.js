import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import Modal from 'react-bootstrap/Modal';
import { request, updateImmutable } from '../../services/utilities';
import Select from 'react-select';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';

class AssignBed extends Component {
	state = {
		submitting: false,
		selected: '',
		categories: [],
		categoryLables: [],
		roomLabels: [],
		room_id: '',
	};

	componentDidMount() {
		this.fetchCategories();
	}

	handleCatChange = val => {
		const { categories } = this.state;
		const cat = categories.filter(c => c.id === val);
		const rooms = cat[0]?.rooms.filter(r => r.status === 'Not occupied');
		let rmLabels = [];
		rooms.forEach(room => {
			rmLabels.push({ value: room.id, label: room.name });
		});
		this.setState({ roomLabels: rmLabels });
		this.props.doHide(true);
	};

	handleRoomChange = val => {
		this.setState({ room_id: val });
		this.props.doHide(true);
	};

	fetchCategories = async () => {
		try {
			const rs = await request('rooms/categories', 'GET', true);
			this.setState({ categories: rs });
			this.setCatLabels();
		} catch (e) {}
	};

	setCatLabels = () => {
		const { categories } = this.state;
		let catLabels = [];
		categories.forEach(category => {
			catLabels.push({ value: category.id, label: category.name });
		});
		this.setState({ categoryLables: catLabels });
		this.props.doHide(true);
	};

	asignBed = async () => {
		const { item, admittedPatients, setAdmittedPatients } = this.props;
		const { room_id } = this.state;
		this.setState({ submitting: true });
		try {
			let toSave = {
				room_id,
				admission_id: item.id,
			};
			item.room = room_id;
			const rs = await request(
				'patient/admissions/assign-bed',
				'PATCH',
				true,
				toSave
			);

			if (rs.success) {
				const uptdDepartments = updateImmutable(admittedPatients, rs.admission);
				setAdmittedPatients(uptdDepartments);
				notifySuccess(`patient assigned room ${room_id}`);
				this.setState({ submitting: false });
				this.props.doHide(false);
			} else {
				notifyError(`${rs.message}`);
				this.setState({ submitting: false });
				this.props.doHide(false);
			}
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || `could not assign bed`,
			});
		}
	};

	// set selected value
	handleSelect(val) {
		this.setState({ selected: val });
		this.props.doHide(true);
	}

	render() {
		const { error, handleSubmit } = this.props;
		const { submitting, roomLabels, categoryLables } = this.state;

		return (
			<div className="onboarding-modal fade animated show">
				<div className="modal-centered">
					<div className="modal-content text-center">
						<div className="onboarding-content with-gradient">
							<Modal.Header
								className="center-header"
								closeButton
								onClick={() => this.props.doHide(false)}>
								<h4 className="onboarding-title">{`Assign Bed`}</h4>
							</Modal.Header>
							<div className="form-block">
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
											<span>Category</span>
											<Select
												options={categoryLables}
												onChange={evt => this.handleCatChange(evt.value)}
											/>
										</div>
										<div className="col-sm-12">
											<span>Room</span>
											<Select
												options={roomLabels}
												onChange={evt => this.handleRoomChange(evt.value)}
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
