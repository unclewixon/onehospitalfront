import React, { Component } from 'react';

const EncounterButtons = props => {
	const previous = () => {
		props.previous();
	};

	const next = () => {
		props.next();
	};
	return (
		<div className="row mt-5">
			<div className="col-sm-12 d-flex ant-row-flex-space-between">
				<button className="btn btn-primary" onClick={previous}>
					Previous
				</button>
				<button className="btn btn-primary" onClick={next}>
					Next
				</button>
			</div>
		</div>
	);
};

export default EncounterButtons;
