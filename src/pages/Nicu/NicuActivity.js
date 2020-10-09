import React, { lazy, useState } from 'react';
import { Link } from 'react-router-dom';

const Observation = lazy(() => import('../../components/Nicu/Observation'));

const NicuActivity = props => {
	const AddNewObservation = e => {
		e.preventDefault();
		props.addNewObservation(true);
	};
	return (
		<div className="nicuactivity">
			<div>
				<Link to="" onClick={AddNewObservation}>
					Observation Chat
				</Link>
			</div>
			<div>Fluid Balance Chat</div>
			<div>Drug Chat</div>
		</div>
	);
};

export default NicuActivity;
