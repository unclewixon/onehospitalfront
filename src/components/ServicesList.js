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

const ServicesList = (props) => {
	const [moreDetailConsultation, setMoreDetailConsultation] = useState(false);
	const [ServicesList, getServiceList] = useState([]);
	const [loaded, setLoaded] = useState(false);

	const onMoreDetailConsultation = (category) => {
		setMoreDetailConsultation(category);
		getServiceList(
			props.ServicesList.filter((service) => {
				return service.category.name === category;
			})
		);
	};

	const onDeleteService = (data) => {
		props
			.deleteService(data)
			.then((response) => {
				notifySuccess('Service deleted');
			})
			.catch((error) => {
				notifyError('Error deleting Service');
			});
	};

	const confirmDelete = (data) => {
		confirmAction(onDeleteService, data);
	};

	const onUploadService = (e) => {
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
										// <div className="tasks-list-w">
										// 	<div className="pipelines-w">
										// 		<div className="row">

										<div className="table-responsive">
											<table className="table table-striped">
												<thead>
													<tr>
														<th>Name</th>
														{/* <th>Price</th>
										<th>Discount</th> */}
														<th className="text-right">Action</th>
													</tr>
												</thead>
												<tbody>
													{ServicesList.map((service, index) => {
														return (
															<tr key={index + 1}>
																<td>{service.name}</td>
																{/* <td>{Room.category.price}</td>
												<td>{Room.category.discount}</td>  */}
																<td className="row-actions text-right">
																	<a href="#">
																		<i
																			className="os-icon os-icon-ui-49"
																			onClick={() =>
																				props.editService(true, category)
																			}></i>
																	</a>
																	<a href="#">
																		<i className="os-icon os-icon-grid-10"></i>
																	</a>
																	<a
																		className="danger"
																		onClick={() => confirmDelete(service)}>
																		<i className="os-icon os-icon-ui-15"></i>
																	</a>
																</td>
															</tr>
														);
													})}
												</tbody>
											</table>
										</div>

										// 		</div>
										// 	</div>
										// </div>
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

const mapStateToProps = (state) => {
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
