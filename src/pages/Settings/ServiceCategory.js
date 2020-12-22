/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ServiceCategoryList from '../../components/ServiceCategoryList';
import ServicesList from '../../components/ServicesList';
import { request } from '../../services/utilities';
import { getAllServiceCategories } from '../../actions/settings';
import { notifyError } from '../../services/notify';
import { uploadServiceModal } from '../../actions/general';

const ServicesCategory = () => {
	const [showServiceCategoryList, setServiceCategoryList] = useState(true);
	const [showServicesList, setServicesList] = useState(false);
	const [loaded, setLoaded] = useState(false);

	const profile = useSelector(state => state.user.profile);
	const role = profile.role ? profile.role.slug : 'admin';

	const dispatch = useDispatch();

	const onServiceCategoryList = () => {
		setServiceCategoryList(true);
		setServicesList(false);
	};

	const onServicesList = () => {
		setServiceCategoryList(false);
		setServicesList(true);
	};

	useEffect(() => {
		const fetchServiceCategories = async () => {
			try {
				const rs = await request(`services/categories`, 'GET', true);
				dispatch(getAllServiceCategories(rs));
			} catch (error) {
				notifyError(error.message || 'could not fetch services categories!');
			}
		};

		if (!loaded) {
			fetchServiceCategories();

			if (
				role === 'lab-attendant' ||
				role === 'lab-officer' ||
				role === 'lab-supervisor' ||
				role === 'lab-hod'
			) {
				setServiceCategoryList(false);
				setServicesList(true);
			}
			setLoaded(true);
		}
	}, [dispatch, loaded, role]);

	const onUploadService = () => {
		dispatch(uploadServiceModal(true));
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
														showServiceCategoryList ? ' active' : ''
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
							{showServiceCategoryList && loaded && <ServiceCategoryList />}
							{showServicesList && loaded && <ServicesList role={role} />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServicesCategory;
