import React from 'react';
import { Modal as Mdl } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * prop definition
 */
const propTypes = {
	component: PropTypes.object,
	onHide: PropTypes.any,
	show: PropTypes.bool.isRequired,
	body: PropTypes.string,
};

export default function Modal({ body, onHide, show, ...props }) {
	return (
		<Mdl onHide={() => {}} centered show={show} {...props}>
			<Mdl.Body className={body + ' p-32'}>
				{onHide && (
					<div className="d-flex justify-content-end mb-32">
						<span className="cursor-pointer d-block" onClick={onHide}>
							<i className="material-icons font-size-16">close</i>
						</span>
					</div>
				)}
				{props.component || props.children}
			</Mdl.Body>
		</Mdl>
	);
}

/**
 * assignment
 */
Modal.propTypes = propTypes;
