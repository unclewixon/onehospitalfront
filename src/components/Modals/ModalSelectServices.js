import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import waiting from '../../assets/images/waiting.gif';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { request, itemRender } from '../../services/utilities';
import { notifyError, notifySuccess } from '../../services/notify';

const ModalSelectServices = ({ slug, updatePackage, closeModal, item }) => {
	const [submitting, setSubmitting] = useState(false);
	const [services, setServices] = useState([]);
	const [selectedServices, setSelectedServices] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [meta, setMeta] = useState(null);

	const dispatch = useDispatch();

	const fetchServices = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `services/${slug}?nsc=1&limit=18&page=${p}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setServices([...result]);
				setMeta(meta);
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				notifyError('Error fetching categories');
				dispatch(stopBlock());
			}
		},
		[dispatch, slug]
	);

	useEffect(() => {
		if (!loaded) {
			setSelectedServices(item.coverage[slug]);
			fetchServices();
			setLoaded(true);
		}
	}, [fetchServices, item, loaded, slug]);

	const onNavigatePage = nextPage => {
		fetchServices(nextPage);
	};

	const save = async () => {
		try {
			if (selectedServices.length === 0) {
				notifyError('Please select a service');
				return;
			}

			setSubmitting(true);
			const coverage = {
				...item.coverage,
				[slug]: selectedServices.map(s => ({
					id: s.id,
					code: s.code,
					name: s.name,
				})),
			};
			const info = { ...item, coverage };
			const url = `antenatal-packages/${item.id}`;
			const rs = await request(url, 'PATCH', true, info);
			updatePackage(rs);
			setSubmitting(false);
			notifySuccess('Service saved!');
			closeModal();
		} catch (error) {
			console.log(error);
			setSubmitting(false);
			notifyError('could not save service');
		}
	};

	const onSelect = (e, service) => {
		const selected = selectedServices.find(s => s.id === service.id);
		if (selected) {
			const filtered = selectedServices.filter(o => o.id !== service.id);
			setSelectedServices(filtered);
		} else {
			const items = [...selectedServices, service];
			setSelectedServices(items);
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '1024px' }}
			>
				<div className="modal-content">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}
					>
						<span className="os-icon os-icon-close" />
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title text-center">{`Select ${slug.toUpperCase()} Services Covered by ${
							item.name
						} Package`}</h4>
						<div className="element-box m-0 p-3">
							<div className="row">
								{services.map((item, i) => {
									const value = selectedServices.find(s => s.id === item.id);
									return (
										<div className="col-lg-4" key={i}>
											<div className="pt-3">
												<div className="pipeline-item">
													<div className="pi-body">
														<div className="pi-info">
															<div className="pi-sub">
																<label className="pi-label">
																	<input
																		className="form-control mr-2"
																		type="checkbox"
																		checked={!!value}
																		onChange={e => onSelect(e, item)}
																		value={item}
																	/>{' '}
																	{item.name}
																</label>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
							{meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalPages, 10)}
										showTotal={total => `Total ${total} HMOs`}
										itemRender={itemRender}
										onChange={current => onNavigatePage(current)}
										showSizeChanger={false}
									/>
								</div>
							)}
							<div className="row mt-4">
								<div className="col-sm-12 text-right">
									<button
										className="btn btn-primary"
										disabled={submitting}
										onClick={save}
									>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Save'
										)}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalSelectServices;
