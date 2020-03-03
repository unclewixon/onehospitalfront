import React from 'react';
import Modal from 'react-modal';

const SlidingPane = ({ isOpen, title, children }) => {
	return (
		<Modal
			ariaHideApp={false}
			className="slide-pane slide-pane_from_right"
			style={{
				content: { width: '96%' },
			}}
			overlayClassName="slide-pane__overlay"
			closeTimeoutMS={500}
			isOpen={isOpen}
			shouldCloseOnEsc={false}
			contentLabel="Title"
			shouldCloseOnOverlayClick={false}
		>
			<div className="slide-pane__content">{children}</div>
		</Modal>
	);
};

export default SlidingPane;
