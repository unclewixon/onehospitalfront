/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

// const Observation = lazy(() => import('../../components/Nicu/Observation'));

const NicuActivity = ({ addNewObservation }) => {
	return (
		<div className="nicuactivity">
			<div>
				<a onClick={() => addNewObservation(true)}>Observation Chat</a>
			</div>
			<div>Fluid Balance Chat</div>
			<div>Drug Chat</div>
		</div>
	);
};

export default NicuActivity;
