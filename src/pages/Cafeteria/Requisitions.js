import React from 'react';

import StoreRequisitions from '../Store/Requisitions';

const Requisitions = () => {
	return (
		<div className="element-wrapper">
			<h6 className="element-header">Requisitions</h6>
			<div className="row">
				<div className="col-sm-12">
					<StoreRequisitions category="cafeteria" />
				</div>
			</div>
		</div>
	);
};

export default Requisitions;
