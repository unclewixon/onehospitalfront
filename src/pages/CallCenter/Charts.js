import React from 'react';
import { Row, Col } from 'react-bootstrap';
function Charts() {
	return (
		<>
			<div className="full-chat-w row">
				<div className="full-chat-i col-lg-10">
					<div className="full-chat-left col-lg-3 ">
						<div className="os-tabs-w">
							<ul className="nav nav-tabs upper centered">
								<li className="nav-item">
									<a
										className="nav-link active"
										data-toggle="tab"
										href="#tab_overview"
									>
										<i className="os-icon os-icon-mail-14"></i>
										<span>Chats</span>
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" data-toggle="tab" href="#tab_sales">
										<i className="os-icon os-icon-ui-93"></i>
										<span>Contacts</span>
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" data-toggle="tab" href="#tab_sales">
										<i className="os-icon os-icon-ui-02"></i>
										<span>Favorites</span>
									</a>
								</li>
							</ul>
						</div>
						<div className="chat-search">
							<div className="element-search">
								<input placeholder="Search users by name..." type="text" />
							</div>
						</div>
						<div className="user-list">
							<div className="user-w">
								<div className="avatar with-status status-green">
									<img alt="" src="img/avatar1.jpg" />
								</div>
								<div className="user-info">
									<div className="user-date">12 min</div>
									<div className="user-name">John Mayers</div>
									<div className="last-message">
										What is going on, are we...
									</div>
								</div>
							</div>
							<div className="user-w">
								<div className="avatar with-status status-green">
									<img alt="" src="img/avatar2.jpg" />
								</div>
								<div className="user-info">
									<div className="user-date">2 hours</div>
									<div className="user-name">Bill Railey</div>
									<div className="last-message">
										Yes, I&#39;ve sent you details...
									</div>
								</div>
							</div>
							<div className="user-w">
								<div className="avatar with-status status-green">
									<img alt="" src="img/avatar3.jpg" />
								</div>
								<div className="user-info">
									<div className="user-date">24 min</div>
									<div className="user-name">Simon Backs</div>
									<div className="last-message">
										What is going on, are we...
									</div>
								</div>
							</div>
							<div className="user-w">
								<div className="avatar with-status status-green">
									<img alt="" src="img/avatar1.jpg" />
								</div>
								<div className="user-info">
									<div className="user-date">7 min</div>
									<div className="user-name">Kelley Brooks</div>
									<div className="last-message">Can you send me this...</div>
								</div>
							</div>
							<div className="user-w">
								<div className="avatar with-status status-green">
									<img alt="" src="img/avatar7.jpg" />
								</div>
								<div className="user-info">
									<div className="user-date">4 hours</div>
									<div className="user-name">Vinie Jones</div>
									<div className="last-message">
										What is going on, are we...
									</div>
								</div>
							</div>
							<div className="user-w">
								<div className="avatar with-status status-green">
									<img alt="" src="img/avatar1.jpg" />
								</div>
								<div className="user-info">
									<div className="user-date">2 days</div>
									<div className="user-name">Brad Pitt</div>
									<div className="last-message">
										They have submitted users...
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="full-chat-middle col-lg-12">
						<div className="chat-head">
							<div className="user-info">
								<span>To:</span>
								<a href="#">John Mayers</a>
							</div>
							<div className="user-actions">
								<a href="#">
									<i className="os-icon os-icon-mail-07"></i>
								</a>
								<a href="#">
									<i className="os-icon os-icon-phone-18"></i>
								</a>
								<a href="#">
									<i className="os-icon os-icon-phone-15"></i>
								</a>
							</div>
						</div>
						<div className="chat-content-w">
							<div className="chat-content">
								<div className="chat-message">
									<div className="chat-message-content-w">
										<div className="chat-message-content">
											Hi, my name is Mike, I will be happy to assist you
										</div>
									</div>
									<div className="chat-message-avatar">
										<img alt="" src="img/avatar3.jpg" />
									</div>
									<div className="chat-message-date">9:12am</div>
								</div>
								<div className="chat-date-separator">
									<span>Yesterday</span>
								</div>
								<div className="chat-message self">
									<div className="chat-message-content-w">
										<div className="chat-message-content">
											That walls over which the drawers. Gone studies to titles
											have audiences of and concepts was motivator
										</div>
									</div>
									<div className="chat-message-date">1:23pm</div>
									<div className="chat-message-avatar">
										<img alt="" src="img/avatar1.jpg" />
									</div>
								</div>
								<div className="chat-message">
									<div className="chat-message-content-w">
										<div className="chat-message-content">
											Slept train nearby a its is design size agreeable. And
											check cons, but countries the was to such any founding
											company
										</div>
									</div>
									<div className="chat-message-avatar">
										<img alt="" src="img/avatar3.jpg" />
									</div>
									<div className="chat-message-date">3:45am</div>
								</div>
							</div>
						</div>
						<div className="chat-controls">
							<div className="chat-input" />
							<input placeholder="Type your message here..." type="text" />
						</div>
						<div className="chat-input-extra">
							<div className="chat-extra-actions">
								<a href="#">
									<i className="os-icon os-icon-mail-07"></i>
								</a>
								<a href="#">
									<i className="os-icon os-icon-phone-18"></i>
								</a>
								<a href="#">
									<i className="os-icon os-icon-phone-15"></i>
								</a>
							</div>
							<div className="chat-btn">
								<a className="btn btn-primary btn-sm" href="#">
									Reply
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="full-chat-right col-lg-2">
					<div className="user-intro">
						<div className="avatar">
							<img alt="" src="img/avatar1.jpg" />
						</div>
						<div className="user-intro-info">
							<h5 className="user-name">John Mayers</h5>
							<div className="user-sub">San Francisco, CA</div>
							<div className="user-social">
								<a href="#">
									<i className="os-icon os-icon-twitter"></i>
								</a>
								<a href="#">
									<i className="os-icon os-icon-facebook"></i>
								</a>
							</div>
						</div>
					</div>
					<div className="chat-info-section">
						<div className="ci-header">
							<i className="os-icon os-icon-documents-03"></i>
							<span>Shared Files</span>
						</div>
						<div className="ci-content">
							<div className="ci-file-list">
								<ul>
									<li>
										<a href="#">Annual Revenue.pdf</a>
									</li>
									<li>
										<a href="#">Expenses.xls</a>
									</li>
									<li>
										<a href="#">Business Plan.doc</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="chat-info-section">
						<div className="ci-header">
							<i className="os-icon os-icon-documents-07"></i>
							<span>Shared Photos</span>
						</div>
						<div className="ci-content">
							<div className="ci-photos-list">
								<img alt="" src="img/portfolio9.jpg" />
								<img alt="" src="img/portfolio2.jpg" />
								<img alt="" src="img/portfolio12.jpg" />
								<img alt="" src="img/portfolio14.jpg" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default Charts;
