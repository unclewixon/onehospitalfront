import React from 'react';

import searchingGIF from '../assets/images/searching.gif';

const TableLoading = () => {
	return (
		<div className="loading-block">
			<img alt="searching" src={searchingGIF} />
		</div>
	);
};

export default TableLoading;
