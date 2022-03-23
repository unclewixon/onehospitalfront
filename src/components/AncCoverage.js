import React from 'react';

const AncCoverage = ({ title, item, selectServices }) => {
	const items = item.coverage[title];
	return (
		<div className="filter-w">
			<div
				className="filter-toggle"
				style={{ fontSize: '20px', top: '12px' }}
				onClick={() => selectServices(title, item)}
			>
				<i className="fa fa-plus-circle" />
			</div>
			<h6 className="filter-header">{`${title} Covered`}</h6>
			{items.length > 0 && (
				<div className="filter-body py-0 px-3">
					<div className="pipelines-w">
						<div className="table-responsive">
							<table className="table table-striped">
								<thead>
									<tr>
										<th>Name</th>
									</tr>
								</thead>
								<tbody>
									{items.map((item, i) => {
										return (
											<tr key={i}>
												<td>{item.name}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AncCoverage;
