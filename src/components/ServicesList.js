import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import HmoData from './Services/HmoData';

const ServicesList = ({ loaded, setLoaded }) => {
	const [toggled, setToggled] = useState([]);

	const hmos = useSelector(state => state.hmo.hmo_list);

	const doToggle = index => {
		const found = toggled.find(t => t.id === index);
		if (found) {
			setToggled([...toggled.filter(t => t.id !== index)]);
		} else {
			setToggled([...toggled, { id: index }]);
		}
	};

	return (
		<div className="row">
			<div className="col-lg-12">
				<div className="rentals-list-w" style={{ flexDirection: 'column' }}>
					{hmos.map((hmo, i) => {
						const toggle = toggled.find(t => t.id === i);
						return (
							<HmoData
								key={i}
								index={i}
								hmo={hmo}
								toggle={toggle}
								doToggle={doToggle}
								loaded={loaded}
								setLoaded={setLoaded}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ServicesList;
