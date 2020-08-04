import React from 'react';
import { Alert } from 'react-bootstrap';

export default function Index({
	type = '',
	icon,
	content,
	className,
	contentClassName,
	...props
}) {
	return (
		<Alert
			variant="light"
			style={{ maxWidth: 480 }}
			className={`alert--${type} ${className}`}
			{...props}>
			{icon}
			{content && (
				<p className={`alert__content ${contentClassName}`}>{content}</p>
			)}
		</Alert>
	);
}
