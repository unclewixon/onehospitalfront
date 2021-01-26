/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ServiceCategoryList from '../../components/ServiceCategoryList';
import ServicesList from '../../components/ServicesList';
import ModalUploadService from '../../components/Modals/ModalUploadService';

const ServicesCategory = () => {
	const [showServiceCategory, setServiceCategory] = useState(true);
	const [showServicesList, setServicesList] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [categoriesLoaded, setCategoriesLoaded] = useState(false);
	const [servicesLoaded, setServicesLoaded] = useState(false);

	const profile = useSelector(state => state.user.profile);
	const role = profile.role ? profile.role.slug : 'admin';

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
			setServiceCategory(true);
			setServicesList(false);
			setLoaded(true);
		}
	}, [loaded]);

	const onUploadService = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);

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
										{role === 'admin' && (
											<li className="nav-item">
												<a
													className={`nav-link${
														showServiceCategory ? ' active' : ''
													}`}
													onClick={onServiceCategoryList}>
													CATEGORIES
												</a>
											</li>
										)}
										<li className="nav-item">
											<a
												className={`nav-link${
													showServicesList ? ' active' : ''
												}`}
												onClick={onServicesList}>
												SERVICES
											</a>
										</li>
										<li className="nav-item nav-actions d-sm-block">
											<a
												className="btn btn-primary btn-sm text-white"
												onClick={() => onUploadService()}>
												<i className="os-icon os-icon-ui-22"></i>
												<span>Upload Services</span>
											</a>
										</li>
									</ul>
								</div>
							</div>
							{showServiceCategory && loaded && (
								<ServiceCategoryList
									loaded={categoriesLoaded}
									setLoaded={status => setCategoriesLoaded(status)}
								/>
							)}
							{showServicesList && loaded && (
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
			{showModal && <ModalUploadService closeModal={() => closeModal()} />}
		</div>
	);
};

export default ServicesCategory;
