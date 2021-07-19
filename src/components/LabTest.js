import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import HmoTests from './Lab/HmoTests';

const LabTest = ({ doToggleForm }) => {
	const [toggled, setToggled] = useState([]);

	const hmos = [];

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
							<HmoTests
								key={i}
								index={i}
								hmo={hmo}
								toggle={toggle}
								doToggle={doToggle}
								doToggleForm={doToggleForm}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default LabTest;
