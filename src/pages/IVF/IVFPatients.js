import React from 'react';

const IVFPatients = () => {
	return (
		<>
			<div className="element-box m-0 mb-4 p-3">
				<form className="row">
					<div className="form-group col-md-3">
						<label>From - To</label>
						{/* <RangePicker onChange={e => dateChange(e)} /> */}
					</div>
					<div className="form-group col-md-3">
						<label className="mr-2 " htmlFor="id">
							Search
						</label>
						<input
							style={{ height: '32px' }}
							id="search"
							className="form-control"
							name="search"
							// onChange={e => setSearchValue(e.target.value)}
						/>
					</div>
					<div className="form-group col-md-3">
						<label className="mr-2" htmlFor="id">
							Status
						</label>
						<select
							style={{ height: '32px' }}
							id="status"
							className="form-control"
							name="status"
							// onChange={e => setStatus(e.target.value)}
						>
							{/* {statuses.map((status, i) => {
								return (
									<option key={i} value={status.value}>
										{status.label}
									</option>
								);
							})} */}
						</select>
					</div>
					<div className="form-group col-md-3 mt-4">
						<div
							className="btn btn-sm btn-primary btn-upper text-white filter-btn"
							// onClick={doFilter}
						>
							<i className="os-icon os-icon-ui-37" />
							<span>
								{/* {filtering ? <img src={waiting} alt="submitting" /> : 'Filter'} */}
							</span>
						</div>
					</div>
				</form>
			</div>
			<div className="element-box p-3 m-0">
				<div className="table-responsive">
					{/* {!loaded ? (
						<TableLoading />
					) : ( */}
					<>
						<table className="table table-striped">
							<thead>
								<tr>
									<th>Patient Name</th>
									<th>Patient ID</th>
									<th>Phone Number</th>
									<th>Date of Birth</th>
									<th>HMO</th>
									<th>Balance</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{/* {props.patients.map((data, i) => {
										return (
											<tr key={i}>
												<td>
													{`${data?.other_names} ${data?.surname}`}{' '}
													{data.isAdmitted && (
														<Tooltip title="Admitted">
															<i className="fa fa-hospital-o text-danger" />
														</Tooltip>
													)}
												</td>
												<td>{`${formatPatientId(
													data?.id
												)} [${data.folderNumber || '-'}]`}</td>
												<td>{data?.phoneNumber}</td>
												<td>
													{moment(data?.date_of_birth).format('DD-MMM-YYYY')}
												</td>
												<td>{data?.hmo?.name}</td>
												<td>{formatCurrency(data.wallet || 0)}</td>
												<td className="row-actions text-right">
													<Tooltip title="View Patient">
														<a onClick={() => showProfile(data)}>
															<i className="os-icon os-icon-user-male-circle2" />
														</a>
													</Tooltip>
												</td>
											</tr>
										);
									})} */}
							</tbody>
						</table>

						{/* {meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalPages, 10)}
										showTotal={total => `Total ${total} patients`}
										itemRender={itemRender}
										onChange={current => onNavigatePage(current)}
									/>
								</div>
							)} */}
					</>
					{/* )} */}
				</div>
			</div>
		</>
	);
};

export default IVFPatients;
