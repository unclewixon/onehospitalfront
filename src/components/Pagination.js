/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const Pagination = ({ currentPage, lastPage, gotoPage, delta = 4 }) => {
	const next = (currentPage || 0) + 1;
	const previous = (currentPage || 0) - 1;
	const left = (currentPage || 0) - delta;
	const right = (currentPage || 0) + delta + 1;
	let l;

	return (
		<div className="controls-below-table">
			<div className="table-records-info">{`Showing records ${
				currentPage || 0
			} - ${lastPage || 0}`}</div>
			<div className="table-records-pages">
				<ul>
					<li>
						<a disabled={previous <= 0} onClick={gotoPage(previous)}>
							Previous
						</a>
					</li>
					{[...Array(lastPage || 0).keys()]
						.map(x => ++x)
						.map(i =>
							i === 1 || i === lastPage || (i >= left && i < right) ? i : null
						)
						.map(i => {
							if (i) {
								console.log(i);
								if (l) {
									if (i - l === 2) {
										return (
											<a key={i} onClick={gotoPage(l + 1)}>
												{l + 1}
											</a>
										);
									} else if (i - l !== 1) {
										return (
											<a key={i} className="no-cursor">
												...
											</a>
										);
									}
								}

								l = i;

								return (
									<a key={i} onClick={gotoPage(i)}>
										{i}
									</a>
								);
							}
							return '';
						})}
					<li>
						<a disabled={next >= (lastPage || 0)} onClick={gotoPage(next)}>
							Next
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Pagination;
