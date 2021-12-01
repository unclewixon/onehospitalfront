import React, { useState, useCallback, useEffect } from 'react';
import Pagination from 'antd/lib/pagination';
import { useDispatch } from 'react-redux';

import { notifyError } from '../services/notify';
import HmoData from './Services/HmoData';
import { hmoAPI } from '../services/constants';
import { request, itemRender } from '../services/utilities';
import { startBlock, stopBlock } from '../actions/redux-block';
import { resetService } from '../actions/settings';

const ServicesList = ({ loaded, setLoaded }) => {
	const [toggled, setToggled] = useState([]);
	const [categories, setCategories] = useState([]);
	const [schemes, setSchemes] = useState([]);
	const [meta, setMeta] = useState(null);

	const dispatch = useDispatch();

	const doToggle = index => {
		const found = toggled.find(t => t.id === index);
		if (found) {
			setToggled([...toggled.filter(t => t.id !== index)]);
		} else {
			setToggled([...toggled, { id: index }]);
		}
	};

	const fetchCategories = useCallback(async () => {
		try {
			const rs = await request('service-categories', 'GET', true);
			setCategories([...rs]);
		} catch (error) {
			notifyError(error.message || 'could not fetch categories!');
		}
	}, []);

	const fetchHmos = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `${hmoAPI}/schemes?page=${p}&limit=10`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setSchemes([...result]);
				setToggled([]);
				setMeta(meta);
				dispatch(stopBlock());
				setLoaded(true);
			} catch (e) {
				console.log(e);
				dispatch(stopBlock());
				notifyError('could not fetch hmo schemes');
				setLoaded(true);
			}
		},
		[dispatch, setLoaded]
	);

	useEffect(() => {
		if (!loaded) {
			dispatch(resetService());
			fetchCategories();
			fetchHmos();
		}
	}, [dispatch, fetchCategories, fetchHmos, loaded]);

	const onNavigatePage = nextPage => {
		fetchHmos(nextPage);
	};

	return (
		<div className="row">
			<div className="col-lg-12">
				<div className="rentals-list-w" style={{ flexDirection: 'column' }}>
					{schemes.map((hmo, i) => {
						const toggle = toggled.find(t => t.id === hmo.id);
						return (
							<HmoData
								key={i}
								hmo={hmo}
								toggle={toggle}
								doToggle={() => doToggle(hmo.id)}
								categories={categories}
							/>
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
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default ServicesList;
