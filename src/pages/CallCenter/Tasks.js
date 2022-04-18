import React from 'react';

function Tasks() {
	return (
		<>
			<div className="support-index">
				<div className="support-tickets">
					<div className="support-tickets-header">
						<div className="tickets-control">
							<h5>Tickets</h5>
							<div className="element-search">
								<input placeholder="Type to filter tickets..." type="text" />
							</div>
						</div>
						<div className="tickets-filter">
							<div className="form-group mr-3">
								<label className="d-none d-md-inline-block mr-2">Status</label>
								<select className="form-control-sm">
									<option>Closed</option>
									<option>Open</option>
									<option>Pending</option>
								</select>
							</div>
							<div className="form-group mr-1">
								<label className="d-none d-md-inline-block mr-2">Agent</label>
								<select className="form-control-sm">
									<option>John Mayers</option>
									<option>Phil Collins</option>
									<option>Ray Donovan</option>
								</select>
							</div>
							<div className="form-check stick-right">
								<label className="form-check-label">
									<span>Private</span>
									<input type="checkbox" />
								</label>
							</div>
						</div>
					</div>
					<div className="support-ticket ">
						<div className="st-meta">
							<div className="badge badge-success-inverted">Shopping</div>
							<i className="os-icon os-icon-ui-09"></i>
							<div className="status-pill green"></div>
						</div>
						<div className="st-body">
							<div className="avatar">
								<img alt="" src="img/avatar1.jpg" />
							</div>
							<div className="ticket-content">
								<h6 className="ticket-title">School Orders</h6>
								<div className="ticket-description">
									I have enabled the software for you, you can try now...
								</div>
							</div>
						</div>
						<div className="st-foot">
							<span className="label">Agent:</span>
							<a className="value with-avatar" href="#">
								<img alt="" src="img/avatar1.jpg" />
								<span>John Mayers</span>
							</a>
							<span className="label">Updated:</span>
							<span className="value">Today 10:00am</span>
						</div>
					</div>
					<div className="support-ticket ">
						<div className="st-meta">
							<div className="badge badge-danger-inverted">Cafe</div>
							<i className="os-icon os-icon-ui-09"></i>
							<div className="status-pill red"></div>
						</div>
						<div className="st-body">
							<div className="avatar">
								<img alt="" src="img/avatar2.jpg" />
							</div>
							<div className="ticket-content">
								<h6 className="ticket-title">Bug on package opening</h6>
								<div className="ticket-description">
									I have enabled the software for you, you can try now...
								</div>
							</div>
						</div>
						<div className="st-foot">
							<span className="label">Agent:</span>
							<a className="value with-avatar" href="#">
								<img alt="" src="img/avatar1.jpg" />
								<span>John Mayers</span>
							</a>
							<span className="label">Updated:</span>
							<span className="value">Jan 24th 8:14am</span>
						</div>
					</div>
					<div className="support-ticket active">
						<div className="st-meta">
							<div className="badge badge-warning-inverted">Restaurants</div>
							<i className="os-icon os-icon-ui-09"></i>
							<div className="status-pill yellow"></div>
						</div>
						<div className="st-body">
							<div className="avatar">
								<img alt="" src="img/avatar3.jpg" />
							</div>
							<div className="ticket-content">
								<h6 className="ticket-title">Settings page is not working</h6>
								<div className="ticket-description">
									I have enabled the software for you, you can try now...
								</div>
							</div>
						</div>
						<div className="st-foot">
							<span className="label">Agent:</span>
							<a className="value with-avatar" href="#">
								<img alt="" src="img/avatar1.jpg" />
								<span>John Mayers</span>
							</a>
							<span className="label">Updated:</span>
							<span className="value">Jan 12th 7:32am</span>
						</div>
					</div>
					<div className="support-ticket ">
						<div className="st-meta">
							<div className="badge badge-primary-inverted">Shopping</div>
							<i className="os-icon os-icon-ui-09"></i>
							<div className="status-pill yellow"></div>
						</div>
						<div className="st-body">
							<div className="avatar">
								<img alt="" src="img/avatar1.jpg" />
							</div>
							<div className="ticket-content">
								<h6 className="ticket-title">Portfolio layout broken, help!</h6>
								<div className="ticket-description">
									I have enabled the software for you, you can try now...
								</div>
							</div>
						</div>
						<div className="st-foot">
							<span className="label">Agent:</span>
							<a className="value with-avatar" href="#">
								<img alt="" src="img/avatar1.jpg" />
								<span>John Mayers</span>
							</a>
							<span className="label">Updated:</span>
							<span className="value">Yesterday 9:42am</span>
						</div>
					</div>
					<div className="support-ticket ">
						<div className="st-meta">
							<div className="badge badge-danger-inverted">Groceries</div>
							<i className="os-icon os-icon-ui-09"></i>
							<div className="status-pill green"></div>
						</div>
						<div className="st-body">
							<div className="avatar">
								<img alt="" src="img/avatar4.jpg" />
							</div>
							<div className="ticket-content">
								<h6 className="ticket-title">Change payment information</h6>
								<div className="ticket-description">
									I have enabled the software for you, you can try now...
								</div>
							</div>
						</div>
						<div className="st-foot">
							<span className="label">Agent:</span>
							<a className="value with-avatar" href="#">
								<img alt="" src="img/avatar1.jpg" />
								<span>John Mayers</span>
							</a>
							<span className="label">Updated:</span>
							<span className="value">Feb 17th 11:42am</span>
						</div>
					</div>
					<div className="support-ticket ">
						<div className="st-meta">
							<div className="badge badge-primary-inverted">Business</div>
							<i className="os-icon os-icon-ui-09"></i>
							<div className="status-pill yellow"></div>
						</div>
						<div className="st-body">
							<div className="avatar">
								<img alt="" src="img/avatar2.jpg" />
							</div>
							<div className="ticket-content">
								<h6 className="ticket-title">School Orders</h6>
								<div className="ticket-description">
									I have enabled the software for you, you can try now...
								</div>
							</div>
						</div>
						<div className="st-foot">
							<span className="label">Agent:</span>
							<a className="value with-avatar" href="#">
								<img alt="" src="img/avatar1.jpg" />
								<span>John Mayers</span>
							</a>
							<span className="label">Updated:</span>
							<span className="value">Mar 10th 3:12pm</span>
						</div>
					</div>
					<div className="load-more-tickets">
						<a href="#">
							<span>Load More Tickets...</span>
						</a>
					</div>
				</div>
				<div className="support-ticket-content-w">
					<div className="support-ticket-content">
						<div className="support-ticket-content-header">
							<h3 className="ticket-header">School Orders</h3>
							<a className="back-to-index" href="#">
								<i className="os-icon os-icon-arrow-left5"></i>
								<span>Back</span>
							</a>
							<a className="show-ticket-info" href="#">
								<span>Show Details</span>
								<i className="os-icon os-icon-documents-03"></i>
							</a>
						</div>
						<div className="ticket-thread">
							<div className="ticket-reply">
								<div className="ticket-reply-info">
									<a className="author with-avatar" href="#">
										<img alt="" src="img/avatar1.jpg" />
										<span>John Mayers</span>
									</a>
									<span className="info-data">
										<span className="label">replied on</span>
										<span className="value">May 27th, 2017 at 7:42am</span>
									</span>
									<div className="actions" href="#">
										<i className="os-icon os-icon-ui-46"></i>
										<div className="actions-list">
											<a href="#">
												<i className="os-icon os-icon-ui-49"></i>
												<span>Edit</span>
											</a>
											<a href="#">
												<i className="os-icon os-icon-ui-09"></i>
												<span>Mark Private</span>
											</a>
											<a href="#">
												<i className="os-icon os-icon-ui-03"></i>
												<span>Favorite</span>
											</a>
											<a className="danger" href="#">
												<i className="os-icon os-icon-ui-15"></i>
												<span>Delete</span>
											</a>
										</div>
									</div>
								</div>
								<div className="ticket-reply-content">
									<p>
										Hi. For the featured recipe banner feature, I'm able to
										enable it to show selected recipe and post on the feature
										recipe banner.
									</p>
									<p>
										Is there any way the enable the feature banner to show
										recent recipe and post instead?
									</p>
									<p>Thank you.</p>
								</div>
								<div className="ticket-attachments">
									<a className="attachment" href="#">
										<i className="os-icon os-icon-ui-51"></i>
										<span>Bug Report.xml</span>
									</a>
									<a className="attachment" href="#">
										<i className="os-icon os-icon-documents-07"></i>
										<span>Sytem Information.txt</span>
									</a>
								</div>
							</div>
							<div className="ticket-reply highlight">
								<div className="ticket-reply-info">
									<a className="author with-avatar" href="#">
										<img alt="" src="img/avatar3.jpg" />
										<span>Phil Collins</span>
									</a>
									<span className="info-data">
										<span className="label">replied on</span>
										<span className="value">May 12th, 2017 at 11:23am</span>
									</span>
									<span className="badge badge-success">support agent</span>
									<div className="actions" href="#">
										<i className="os-icon os-icon-ui-46"></i>
										<div className="actions-list">
											<a href="#">
												<i className="os-icon os-icon-ui-49"></i>
												<span>Edit</span>
											</a>
											<a href="#">
												<i className="os-icon os-icon-ui-09"></i>
												<span>Mark Private</span>
											</a>
											<a href="#">
												<i className="os-icon os-icon-ui-03"></i>
												<span>Favorite</span>
											</a>
											<a className="danger" href="#">
												<i className="os-icon os-icon-ui-15"></i>
												<span>Delete</span>
											</a>
										</div>
									</div>
								</div>
								<div className="ticket-reply-content">
									<p>
										Hi. For the featured recipe banner feature, I'm able to
										enable it to show selected recipe and post on the feature
										recipe banner.
									</p>
									<p>
										Is there any way the enable the feature banner to show
										recent recipe and post instead?
									</p>
									<p>Thank you.</p>
								</div>
							</div>
							<div className="ticket-reply">
								<div className="ticket-reply-info">
									<a className="author with-avatar" href="#">
										<img alt="" src="img/avatar1.jpg" />
										<span>John Mayers</span>
									</a>
									<span className="info-data">
										<span className="label">replied on</span>
										<span className="value">April 9th, 2017 at 7:41am</span>
									</span>
									<div className="actions" href="#">
										<i className="os-icon os-icon-ui-46"></i>
										<div className="actions-list">
											<a href="#">
												<i className="os-icon os-icon-ui-49"></i>
												<span>Edit</span>
											</a>
											<a href="#">
												<i className="os-icon os-icon-ui-09"></i>
												<span>Mark Private</span>
											</a>
											<a href="#">
												<i className="os-icon os-icon-ui-03"></i>
												<span>Favorite</span>
											</a>
											<a className="danger" href="#">
												<i className="os-icon os-icon-ui-15"></i>
												<span>Delete</span>
											</a>
										</div>
									</div>
								</div>
								<div className="ticket-reply-content">
									<p>
										Hi. For the featured recipe banner feature, I'm able to
										enable it to show selected recipe and post on the feature
										recipe banner.
									</p>
									<p>
										Is there any way the enable the feature banner to show
										recent recipe and post instead?
									</p>
									<p>Thank you.</p>
								</div>
							</div>
						</div>
					</div>
					<div className="support-ticket-info">
						<a className="close-ticket-info" href="#">
							<i className="os-icon os-icon-ui-23"></i>
						</a>
						<div className="customer">
							<div className="avatar">
								<img alt="" src="img/avatar1.jpg" />
							</div>
							<h4 className="customer-name">John Mayers</h4>
							<div className="customer-tickets">12 Tickets</div>
						</div>
						<h5 className="info-header">Ticket Details</h5>
						<div className="info-section text-center">
							<div className="label">Created:</div>
							<div className="value">Jan 24th, 8:15am</div>
							<div className="label">Category</div>
							<div className="value">
								<div className="badge badge-primary">Photobook</div>
							</div>
						</div>
						<h5 className="info-header">Agents Assigned</h5>
						<div className="info-section">
							<ul className="users-list as-tiles">
								<li>
									<a className="author with-avatar" href="#">
										<div
											className="avatar"
											style={{
												backgroundImage: 'url(&#39;img/avatar1.jpg&#39;)',
											}}
										></div>
										<span>John Mayers</span>
									</a>
								</li>
								<li>
									<a className="author with-avatar" href="#">
										<div
											className="avatar"
											style={{
												backgroundImage: 'url(&#39;img/avatar3.jpg&#39;)',
											}}
										></div>
										<span>Phil Collins</span>
									</a>
								</li>
								<li>
									<a className="author with-avatar" href="#">
										<div
											className="avatar"
											style={{
												backgroundImage: 'url(&#39;img/avatar4.jpg&#39;)',
											}}
										></div>
										<span>Carl Lewis</span>
									</a>
								</li>
								<li>
									<a className="author with-avatar" href="#">
										<div
											className="avatar"
											style={{
												backgroundImage: 'url(&#39;img/avatar5.jpg&#39;)',
											}}
										></div>
										<span>Joshua Kim</span>
									</a>
								</li>
								<li>
									<a className="add-agent-btn" href="#">
										<i className="os-icon os-icon-ui-22"></i>
										<span>Add Agent</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Tasks;
