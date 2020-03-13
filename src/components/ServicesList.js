/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { uploadServiceModal, editService } from '../actions/general';
import {
	getAllService,
	updateService,
	deleteService,
} from '../actions/settings';
import { confirmAction } from '../services/utilities';
import { notifySuccess, notifyError } from '../services/notify';
import waiting from '../assets/images/waiting.gif';

const ServicesList = props => {
	const [moreDetailConsultation, setMoreDetailConsultation] = useState(false);
	const [ServicesList, getServiceList] = useState([]);
	const [loaded, setLoaded] = useState(false);

	const onMoreDetailConsultation = category => {
		setMoreDetailConsultation(category);
		getServiceList(
			props.ServicesList.filter(service => {
				return service.category.name === category;
			})
		);
	};

	const onDeleteService = data => {
		props
			.deleteService(data)
			.then(response => {
				notifySuccess('Service deleted');
			})
			.catch(error => {
				notifyError('Error deleting Service');
			});
	};

	const confirmDelete = data => {
		confirmAction(onDeleteService, data);
	};

	const onUploadService = e => {
		e.preventDefault();
		props.uploadServiceModal(true);
	};

	useEffect(() => {
		if (!loaded) {
			props.getAllService();
		}
		setLoaded(true);
	}, [props, loaded]);
	return (
		<div className="pipelines-w">
			<div className="todo-app-w">
				<div className="todo-content">
					<div className="all-tasks-w">
						{props.ServiceCategories.map((category, index) => {
							return (
								<div className="task-section" key={index + 1}>
									<div className="tasks-header-w">
										<a
											className="tasks-header-toggler"
											onClick={() => onMoreDetailConsultation(category.name)}>
											<i className="os-icon os-icon-ui-23"></i>
										</a>
										{moreDetailConsultation === category.name && (
											<a
												className="tasks-header-toggler"
												onClick={() => onMoreDetailConsultation()}>
												<i className="os-icon os-icon-ui-23"></i>
											</a>
										)}
										<h5 className="tasks-header">{category.name}</h5>
										{/* <span className="tasks-sub-header">Mon, Sep 23th</span> */}
										<a
											className="add-task-btn"
											data-target="#taskModal"
											data-toggle="modal"
											onClick={onUploadService}>
											<i className="os-icon os-icon-ui-22"></i>
											<span>Add service</span>
										</a>
									</div>
									{moreDetailConsultation === category.name && (
										<div className="tasks-list-w">
											<div className="pipelines-w">
												<div className="row">
													<div className="col-lg-4 col-xxl-3">
														<div className="pipeline-body">
															{ServicesList.map((service, index) => {
																return (
																	<div
																		className="pipeline-item"
																		key={index + 1}>
																		<div className="pi-controls">
																			<div className="pi-settings os-dropdown-trigger">
																				<i
																					className="os-icon os-icon-ui-49"
																					onClick={() =>
																						props.editService(true, service)
																					}></i>
																			</div>
																			<div className="pi-settings os-dropdown-trigger">
																				<i
																					className="os-icon os-icon-ui-15"
																					onClick={() =>
																						confirmDelete(service)
																					}></i>
																			</div>
																		</div>
																		<div className="pi-body">
																			<div className="pi-info">
																				<div className="h6 pi-name">
																					{service.name}
																				</div>
																				<div className="pi-sub">
																					{service.traffic}
																				</div>
																			</div>
																		</div>
																	</div>
																);
															})}
														</div>
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		ServicesList: state.settings.services,
		ServiceCategories: state.settings.service_categories,
	};
};
export default connect(mapStateToProps, {
	uploadServiceModal,
	editService,
	getAllService,
	updateService,
	deleteService,
})(ServicesList);
