import React from 'react';
import { Button as Btn } from 'react-bootstrap';

import Spinner from './Spinner';

const Button = ({
	isValid = true,
	isSubmitting = false,
	loadingColor,
	children,
	value,
	...props
}) => {
	return (
		<Btn
			{...props}
			variant="default"
			className={`btn ${props.className}`}
			{...(!isValid && { disabled: true })}
			{...(isSubmitting && { disabled: true })}>
			{isSubmitting ? (
				<Spinner contained size={25} color={loadingColor || '#fff'} />
			) : (
				value || children
			)}
		</Btn>
	);
};

export default Button;
