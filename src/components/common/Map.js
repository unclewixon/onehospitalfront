import React from 'react';

export default function Map({ items, className, component, ...props }) {
	const Render = component ? component : 'div';

	return (
		<Render {...(className && { className: className })} {...props}>
			{items?.map((item, key) => props.children(item, key))}
		</Render>
	);
}
