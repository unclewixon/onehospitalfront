/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ServiceCategoryList from '../../components/ServiceCategoryList';
import ServicesList from '../../components/ServicesList';
import ModalCreateService from '../../components/Modals/ModalCreateService';

const Services = () => {
	const [showServiceCategory, setServiceCategory] = useState(true);
	const [showServicesList, setServicesList] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [categoriesLoaded, setCategoriesLoaded] = useState(false);
	const [servicesLoaded, setServicesLoaded] = useState(false);
	const [newModal, setNewModal] = useState(false);

	const profile = useSelector(state => state.user.profile);
	const role = profile.role ? profile.role.slug : 'it-admin';

	const onServiceCategoryList = () => {
		setServiceCategory(true);
		setServicesList(false);
		if (categoriesLoaded) {
			setCategoriesLoaded(false);
		}
	};

	const onServicesList = () => {
		setServiceCategory(false);
		setServicesList(true);
		if (servicesLoaded) {
			setServicesLoaded(false);
		}
	};

	useEffect(() => {
		if (!loaded) {
			setServiceCategory(showServiceCategory);
			setServicesList(showServicesList);
			setLoaded(true);
		}
	}, [loaded, showServiceCategory, showServicesList]);

	const addService = () => {
		document.body.classList.add('modal-open');
		setNewModal(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setLoaded(false);
		setNewModal(false);

		if (showServiceCategory) {
			setCategoriesLoaded(false);
		}

		if (servicesLoaded) {
			setServicesLoaded(false);
		}
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="os-tabs-w mx-1">
								<div className="os-tabs-controls os-tabs-complex">
									<ul className="nav nav-tabs upper">
										<li className="nav-item">
											<a
												className={`nav-link${
													showServiceCategory ? ' active' : ''
												}`}
												onClick={onServiceCategoryList}
											>
												CATEGORIES
											</a>
										</li>
										<li className="nav-item">
											<a
												className={`nav-link${
													showServicesList ? ' active' : ''
												}`}
												onClick={onServicesList}
											>
												SERVICES
											</a>
										</li>
										{showServicesList && (
											<li className="nav-item nav-actions d-sm-block">
												<a
													className="btn btn-primary btn-sm text-white"
													onClick={() => addService()}
												>
													<i className="os-icon os-icon-ui-22"></i>
													<span>New Service</span>
												</a>
											</li>
										)}
									</ul>
								</div>
							</div>
							{showServiceCategory && (
								<ServiceCategoryList
									loaded={categoriesLoaded}
									setLoaded={status => setCategoriesLoaded(status)}
								/>
							)}
							{showServicesList && (
								<ServicesList
									role={role}
									loaded={servicesLoaded}
									setLoaded={status => setServicesLoaded(status)}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
			{newModal && <ModalCreateService closeModal={() => closeModal()} />}
		</div>
	);
};

export default Services;
