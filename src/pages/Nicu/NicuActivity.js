/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import ModalCreateObservation from '../../components/Modals/ModalCreateObservation';
import ModalCreateDrugChat from '../../components/Modals/ModalCreateDrugChat';
import ModalCreateFluidChat from '../../components/Modals/ModalCreateFluidChat';

const NicuActivity = () => {
	const [showModal, setShowModal] = useState(false);
	const [drugModal, setDrugModal] = useState(false);
	const [fluidModal, setFluidModal] = useState(false);

	const onModalClick = () => {
		setShowModal(!showModal);
	};
	const onModalFluidClick = () => {
		setFluidModal(!fluidModal);
	};
	const onModalDrugClick = () => {
		setDrugModal(!drugModal);
	};
	return (
		<div className="nicuactivity">
			{showModal ? (
				<ModalCreateObservation
					showModal={showModal}
					onModalClick={onModalClick}
					// addANewObservation={addANewObservation}
				/>
			) : drugModal ? (
				<ModalCreateDrugChat
					drugModal={drugModal}
					onModalDrugClick={onModalDrugClick}
				/>
			) : fluidModal ? (
				<ModalCreateFluidChat
					fluidModal={fluidModal}
					onModalFluidClick={onModalFluidClick}
				/>
			) : null}
			<div onClick={onModalClick}>Observation Chat</div>
			<div onClick={onModalFluidClick}>Fluid Balance Chat</div>
			<div onClick={onModalDrugClick}>Drug Chat</div>
		</div>
	);
};

// export default NicuActivity;
export default compose(withRouter, connect(null, {}))(NicuActivity);
