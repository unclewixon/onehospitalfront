import React from 'react';

const Admitted = ({ room }) => {
	return (
		<div className="text-center">
			<div>Admitted</div>
			{room && <div>{`${room?.category?.name}, Room ${room?.name}`}</div>}
		</div>
	);
};

export default Admitted;
