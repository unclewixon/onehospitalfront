/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

import { editService } from '../actions/general';
import {
	getAllService,
	updateService,
	deleteService,
} from '../actions/settings';
// import { confirmAction, formatNumber } from '../services/utilities';
// import { notifySuccess, notifyError } from '../services/notify';
import searchingGIF from '../assets/images/searching.gif';

const ServicesList = ({
	serviceList,
	getAllService,
	serviceCategories,
	editService,
	deleteService,
}) => {
	// const [moreDetailConsultation, setMoreDetailConsultation] = useState('');
	// const [services, setServices] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [toggle, setToggle] = useState(false);

	const hmos = useSelector(state => state.settings.hmos);

	// const onMoreDetailConsultation = category => {
	// 	setMoreDetailConsultation(category);
	// 	if (category) {
	// 		setServices(
	// 			serviceList.filter(service => {
	// 				return service.category.name === category;
	// 			})
	// 		);
	// 	}
	// };

	// const onDeleteService = data => {
	// 	deleteService(data)
	// 		.then(response => {
	// 			notifySuccess('Service deleted');
	// 		})
	// 		.catch(error => {
	// 			notifyError('Error deleting Service');
	// 		});
	// };

	// const confirmDelete = data => {
	// 	confirmAction(onDeleteService, data);
	// };

	useEffect(() => {
		if (!dataLoaded) {
			getAllService()
				.then(response => {
					setDataLoaded(true);
				})
				.catch(e => {
					setDataLoaded(true);
					// notifyError(e.message || 'could not fetch services list');
				});
		}
	}, [dataLoaded, getAllService, serviceList]);

	const doToggle = i => {
		setToggle(!toggle);
	};

	return (
		<div className="rentals-list-w">
			{!dataLoaded ? (
				<div className="text-center">
					<img alt="searching" src={searchingGIF} />
				</div>
			) : (
				hmos.map((hmo, i) => {
					return (
						<div className="filter-side" style={{ flex: '0 0 100%' }} key={i}>
							<div className={`filter-w ${toggle ? '' : 'collapsed'}`}>
								<div className="filter-toggle" onClick={() => doToggle()}>
									<i className="os-icon-minus os-icon" />
								</div>
								<h6 className="filter-header">{hmo.name}</h6>
								<div
									className="filter-body"
									style={{ display: toggle ? 'block' : 'none' }}>
									<div className="toggled-buttons">
										<a className="btn btn-toggled on" href="#">
											Show All
										</a>
										<a className="btn btn-toggled off" href="#">
											For Rent
										</a>
										<a className="btn btn-toggled off" href="#">
											For Sale
										</a>
									</div>
								</div>
							</div>
						</div>
					);
				})
			)}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		serviceList: state.settings.services,
		serviceCategories: state.settings.service_categories,
	};
};

export default connect(mapStateToProps, {
	editService,
	getAllService,
	updateService,
	deleteService,
})(ServicesList);
