import React, { lazy, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { addNewObservation } from '../../actions/general';
import ModalCreateObservation from '../../components/Modals/ModalCreateObservation';
import ModalCreateDrugChat from '../../components/Modals/ModalCreateDrugChat';
import ModalCreateFluidChat from '../../components/Modals/ModalCreateFluidChat';

// const Observation = lazy(() => import('../../components/Nicu/Observation'));

const NicuActivity = props => {
	const [showModal, setShowModal] = useState(false);
	const [drugModal, setDrugModal] = useState(false);
	const [fluidModal, setFluidModal] = useState(false);

	const addANewObservation = e => {
		// e.preventDefault();
		props.addNewObservation(true);
	};
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
export default compose(
	withRouter,
	connect(null, {
		addNewObservation,
	})
)(NicuActivity);
