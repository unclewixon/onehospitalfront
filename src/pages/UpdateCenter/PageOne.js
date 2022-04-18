import React, { useRef, useState } from 'react';

const PageOne = () => {
	const [toggle, setToggle] = useState(false);
	const visibility = useRef();

	const showHidden = () => {
		if (!toggle) {
			console.log('hi');
			visibility.current.style.display = 'block';
			setToggle(true);
		} else {
			console.log('no');
			visibility.current.style.display = 'none';
			setToggle(false);
		}
	};
	return (
		<>
			<div className="todo-app-w">
				<div className="todo-sidebar">
					<div className="">
						<div className="element-wrapper compact pt-4">
							<div className="element-actions"></div>
							<h6 className="element-header">Transactions</h6>
							<div className="">
								<table className="table table-clean">
									<tbody>
										<tr>
											<td>
												<span className="sub-value">HMO NAME</span>
												<div className="value">Axa Mansard</div>
											</td>
											<td className="text-right">
												<span className="sub-value">UNCLAIMED</span>
												<div className="value">₦1,274,000.34</div>
											</td>
										</tr>
										<tr>
											<td>
												<span className="sub-value">HMO NAME</span>
												<div className="value">Zenith Insurance</div>
											</td>
											<td className="text-right">
												<span className="sub-value">UNCLAIMED</span>
												<div className="value">₦1,274,000.34</div>
											</td>
										</tr>
										<tr>
											<td>
												<span className="sub-value">Health &amp; Beauty</span>
												<div className="value">Refund from Sephora</div>
											</td>
											<td className="text-right">
												<span className="sub-value">10 Feb 2018</span>
												<div className="value text-success">$128.11</div>
											</td>
										</tr>
										<tr>
											<td>
												<span className="sub-value">HMO NAME</span>
												<div className="value">Zenith Insurance</div>
											</td>
											<td className="text-right">
												<span className="sub-value">UNCLAIMED</span>
												<div className="value">₦1,274,000.34</div>
											</td>
										</tr>
										<tr>
											<td>
												<span className="sub-value">HMO NAME</span>
												<div className="value">Zenith Insurance</div>
											</td>
											<td className="text-right">
												<span className="sub-value">UNCLAIMED</span>
												<div className="value">₦1,274,000.34</div>
											</td>
										</tr>
										<tr>
											<td>
												<span className="sub-value">Health &amp; Beauty</span>
												<div className="value">Refund from Google Store</div>
											</td>
											<td className="text-right">
												<span className="sub-value">9 Feb 2018</span>
												<div className="value text-success">$15.23</div>
											</td>
										</tr>
										<tr>
											<td>
												<span className="sub-value">HMO NAME</span>
												<div className="value">Zenith Insurance</div>
											</td>
											<td className="text-right">
												<span className="sub-value">UNCLAIMED</span>
												<div className="value">₦1,274,000.34</div>
											</td>
										</tr>
										<tr>
											<td>
												<span className="sub-value">HMO NAME</span>
												<div className="value">Zenith Insurance</div>
											</td>
											<td className="text-right">
												<span className="sub-value">UNCLAIMED</span>
												<div className="value">₦1,274,000.34</div>
											</td>
										</tr>
									</tbody>
								</table>
								<a className="centered-load-more-link" href="#">
									<span>Load More Messages</span>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="todo-content">
					<div className="all-tasks-w">
						<div className="tasks-section">
							<div className="tasks-header-w">
								<a className="tasks-header-toggler" href="#">
									<i
										className="os-icon os-icon-ui-23"
										onClick={() => showHidden()}
									></i>
								</a>
								<h6 className="tasks-header">Jane Nnenna Choche</h6>
								<span className="tasks-sub-header">10457</span>
								<a
									className="add-task-btn"
									data-target="#taskModal"
									data-toggle="modal"
									href="#"
								>
									<i className="os-icon os-icon-ui-22"></i>
									<span>Add Task</span>
								</a>
							</div>

							<div
								className="tasks-list-w"
								ref={visibility}
								style={{ display: 'none' }}
							>
								<ul className="tasks-list">
									<div className="table-responsive">
										<table
											className="table table-striped table-bordered"
											style={{ fontSize: ' 13px;' }}
										>
											<thead>
												<tr>
													<th>Date</th>
													<th>Enrollee</th>
													<th>Code</th>
													<th className="text-center">Status</th>
													<th className="text-right">Amount</th>
													<th className="text-right">...</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td className="text-left">
														<span>Today </span>
														<span className="smaller lighter">1:52pm</span>
													</td>
													<td>10987</td>
													<td>117898</td>
													<td>
														<div className="value">Diagnosis</div>
														<span className="smaller lighter">
															ICD10 (I10): Essential (primary) hypertension
														</span>
													</td>
													<td className="text-right">₦600,000.00</td>
													<td className="row-actions">
														<a href="#">
															<i className="os-icon os-icon-grid-10"></i>
														</a>
														<a href="#">
															<i className="os-icon os-icon-ui-44"></i>
														</a>
														<a className="danger" href="#">
															<i className="os-icon os-icon-ui-15"></i>
														</a>
													</td>
												</tr>
												<tr>
													<td className="text-left">
														<span>Today </span>
														<span className="smaller lighter">1:52pm</span>
													</td>
													<td>10987</td>
													<td>117898</td>
													<td>
														<div className="value">Lab</div>
														<span className="smaller lighter">
															Electrolyte, Urea &amp; Creatinine (EU&amp;Cr)
														</span>
													</td>
													<td className="text-right">₦1,700,000.00</td>
													<td className="row-actions">
														<a href="#">
															<i className="os-icon os-icon-grid-10"></i>
														</a>
														<a href="#">
															<i className="os-icon os-icon-ui-44"></i>
														</a>
														<a className="danger" href="#">
															<i className="os-icon os-icon-ui-15"></i>
														</a>
													</td>
												</tr>
												<tr>
													<td className="text-left">
														<span>Today </span>
														<span className="smaller lighter">1:52pm</span>
													</td>
													<td>10987</td>
													<td>117898</td>
													<td>
														<div className="value">Drugs</div>
														<span className="smaller lighter">
															500mg of ciprofloxacin 500mg (pack)
														</span>
													</td>
													<td className="text-right">₦6000,000.00</td>
													<td className="row-actions">
														<a href="#">
															<i className="os-icon os-icon-grid-10"></i>
														</a>
														<a href="#">
															<i className="os-icon os-icon-ui-44"></i>
														</a>
														<a className="danger" href="#">
															<i className="os-icon os-icon-ui-15"></i>
														</a>
													</td>
												</tr>
												<tr>
													<td className="text-left">
														<span>Today </span>
														<span className="smaller lighter">1:52pm</span>
													</td>
													<td>10987</td>
													<td>117898</td>
													<td>
														<div className="value">Diagnosis</div>
														<span className="smaller lighter">
															Caesarean section with two previous abdominal
															surgery{' '}
														</span>
													</td>
													<td className="text-right">₦500,000.00</td>
													<td className="row-actions">
														<a href="#">
															<i className="os-icon os-icon-grid-10"></i>
														</a>
														<a href="#">
															<i className="os-icon os-icon-ui-44"></i>
														</a>
														<a className="danger" href="#">
															<i className="os-icon os-icon-ui-15"></i>
														</a>
													</td>
												</tr>
												<tr>
													<td className="text-left">
														<span>Today </span>
														<span className="smaller lighter">1:52pm</span>
													</td>
													<td>10987</td>
													<td>117898</td>
													<td>
														<div className="value">Diagnosis</div>
														<span className="smaller lighter">
															ICD10 (I10): Essential (primary) hypertension
														</span>
													</td>
													<td className="text-right">₦1,600,000.00</td>
													<td className="row-actions">
														<a href="#">
															<i className="os-icon os-icon-grid-10"></i>
														</a>
														<a href="#">
															<i className="os-icon os-icon-ui-44"></i>
														</a>
														<a className="danger" href="#">
															<i className="os-icon os-icon-ui-15"></i>
														</a>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</ul>
							</div>
						</div>
					</div>

					<div
						aria-hidden="true"
						className="modal fade"
						id="taskModal"
						role="dialog"
						tabIndex="-1"
					>
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header faded smaller">
									<div className="modal-title">
										<span>Assigned to:</span>
										<img alt="" className="avatar" src="img/avatar1.jpg" />
										<span>Due Date: </span>
										<strong>Sep 12th, 2017</strong>
									</div>
									<button
										aria-label="Close"
										className="close"
										data-dismiss="modal"
										type="button"
									>
										<span aria-hidden="true"> &times;</span>
									</button>
								</div>
								<div className="modal-body">
									<form>
										<div className="form-group">
											<label for="">Name</label>
											<input
												className="form-control"
												placeholder="Enter task name"
												type="text"
												value="Visit Home Depot to find out what is needed to rebuild backyard patio"
											/>
										</div>
										<div className="form-group">
											<label for="">Description</label>
											<textarea className="form-control" name="" rows="3">
												The similar diesel only tell deference and likewise,
												thought, nonetheless, for ahead school. The were
												organization.
											</textarea>
										</div>
										<div className="form-group">
											<label for="">Media Attached</label>
											<div className="attached-media-w">
												<img src="img/portfolio9.jpg" />
												<img src="img/portfolio2.jpg" />
												<img src="img/portfolio12.jpg" />
												<a className="attach-media-btn" href="#">
													<i className="os-icon os-icon-ui-22"></i>
													<span>Add Photos</span>
												</a>
											</div>
										</div>
										<div className="row">
											<div className="col-sm-6">
												<div className="form-group">
													<label for=""> Due Date</label>
													<div className="date-input">
														<input
															className="single-daterange form-control"
															placeholder="Date of birth"
															type="text"
															value="04/12/1978"
														/>
													</div>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label for="">Priority</label>
													<select className="form-control">
														<option>High Priority</option>
														<option>Normal Priority</option>
														<option>Low Priority</option>
													</select>
												</div>
											</div>
										</div>
									</form>
								</div>
								<div className="modal-footer buttons-on-left">
									<button className="btn btn-teal" type="button">
										{' '}
										Save changes
									</button>
									<button
										className="btn btn-link"
										data-dismiss="modal"
										type="button"
									>
										{' '}
										Cancel
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageOne;
