/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

class SearchFrame extends Component {
	render() {
		return (
			<div className="search-with-suggestions-w">
				<div className="search-with-suggestions-modal">
					<div className="element-search">
						<input
							className="search-suggest-input"
							placeholder="Start typing to search..."
							type="text"
						>
							<div className="close-search-suggestions">
								<i className="os-icon os-icon-x"></i>
							</div>
						</input>
					</div>
					<div className="search-suggestions-group">
						<div className="ssg-header">
							<div className="ssg-icon">
								<div className="os-icon os-icon-box"></div>
							</div>
							<div className="ssg-name">Projects</div>
							<div className="ssg-info">24 Total</div>
						</div>
						<div className="ssg-content">
							<div className="ssg-items ssg-items-boxed">
								<a className="ssg-item" href="users_profile_big.html">
									<div
										className="item-media"
										style={{
											backgroundImage: `url(${require('images/company6.png')})`,
										}}
									></div>
									<div className="item-name">
										Integ<span>ration</span> with API
									</div>
								</a>
								<a className="ssg-item" href="users_profile_big.html">
									<div
										className="item-media"
										style={{
											backgroundImage: `url(${require('images/company7.png')})`,
										}}
									></div>
									<div className="item-name">
										Deve<span>lopm</span>ent Project
									</div>
								</a>
							</div>
						</div>
					</div>
					<div className="search-suggestions-group">
						<div className="ssg-header">
							<div className="ssg-icon">
								<div className="os-icon os-icon-users"></div>
							</div>
							<div className="ssg-name">Customers</div>
							<div className="ssg-info">12 Total</div>
						</div>
						<div className="ssg-content">
							<div className="ssg-items ssg-items-list">
								<a className="ssg-item" href="users_profile_big.html">
									<div
										className="item-media"
										style={{
											backgroundImage: `url(${require('images/avatar1.jpg')})`,
										}}
									></div>
									<div className="item-name">
										John Ma<span>yer</span>s
									</div>
								</a>
								<a className="ssg-item" href="users_profile_big.html">
									<div
										className="item-media"
										style={{
											backgroundImage: `url(${require('images/avatar2.jpg')})`,
										}}
									></div>
									<div className="item-name">
										Th<span>omas</span> Mullier
									</div>
								</a>
								<a className="ssg-item" href="users_profile_big.html">
									<div
										className="item-media"
										style={{
											backgroundImage: `url(${require('images/avatar3.jpg')})`,
										}}
									></div>
									<div className="item-name">
										Kim C<span>olli</span>ns
									</div>
								</a>
							</div>
						</div>
					</div>
					<div className="search-suggestions-group">
						<div className="ssg-header">
							<div className="ssg-icon">
								<div className="os-icon os-icon-folder"></div>
							</div>
							<div className="ssg-name">Files</div>
							<div className="ssg-info">17 Total</div>
						</div>
						<div className="ssg-content">
							<div className="ssg-items ssg-items-blocks">
								<a className="ssg-item" href="#">
									<div className="item-icon">
										<i className="os-icon os-icon-file-text"></i>
									</div>
									<div className="item-name">
										Work<span>Not</span>e.txt
									</div>
								</a>
								<a className="ssg-item" href="#">
									<div className="item-icon">
										<i className="os-icon os-icon-film"></i>
									</div>
									<div className="item-name">
										V<span>ideo</span>.avi
									</div>
								</a>
								<a className="ssg-item" href="#">
									<div className="item-icon">
										<i className="os-icon os-icon-database"></i>
									</div>
									<div className="item-name">
										User<span>Tabl</span>e.sql
									</div>
								</a>
								<a className="ssg-item" href="#">
									<div className="item-icon">
										<i className="os-icon os-icon-image"></i>
									</div>
									<div className="item-name">
										wed<span>din</span>g.jpg
									</div>
								</a>
							</div>
							<div className="ssg-nothing-found">
								<div className="icon-w">
									<i className="os-icon os-icon-eye-off"></i>
								</div>
								<span>No files were found. Try changing your query...</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SearchFrame;
