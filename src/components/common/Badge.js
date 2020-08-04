import React, { Fragment } from 'react';

export default function Badge({ variant, children, tailed = false }) {
	let styles = {};

	switch (variant) {
		case 'pending':
			styles = { backgroundColor: '#F0AF09', color: '#F0AF09' };
			break;
		case 'success':
			styles = { backgroundColor: '#30A905', color: '#30A905' };
			break;
		case 'processing':
			styles = { backgroundColor: '#29ABE2', color: '#29ABE2' };
			break;
		case 'error':
			styles = { backgroundColor: '#da3d2a', color: '#da3d2a' };
			break;
		default:
			styles = { backgroundColor: '#BDBDBD', color: '#BDBDBD' };
			break;
	}

	return (
		<Fragment>
			<span className="ch-badge rounded d-block" style={styles}>
				<span
					className="d-block px-3 pt-2 pb-1 text-center"
					style={{ backgroundColor: 'rgba(255,255,255,0.75)' }}>
					{children}
				</span>
			</span>
			{tailed && (
				<span
					style={{
						width: 1,
						height: 18,
						backgroundColor: styles.backgroundColor,
					}}
					className="mx-auto d-block my-1"></span>
			)}
		</Fragment>
	);
}
