import React from 'react';
import { ReactComponent as CurveBg } from '../../../assets/svg-icons/curve.svg';
import bgImage from '../../../assets/images/a6.jpeg';

const AccountDetails = () => {
	return (
		<div className="col-sm-5">
			<div className="user-profile compact">
				<div
					className="up-head-w"
					style={{ backgroundImage: `url(${bgImage})` }}>
					<div className="up-social">
						<a href="#">
							<i className="os-icon os-icon-twitter"></i>
						</a>
						<a href="#">
							<i className="os-icon os-icon-facebook"></i>
						</a>
					</div>
					<div className="up-main-info">
						<h2 className="up-header">John Mayers</h2>
						<h6 className="up-sub-header">Product Designer at Facebook</h6>
					</div>
					<CurveBg />
				</div>
				<div className="up-controls">
					<div className="row">
						<div className="col-sm-6">
							<div className="value-pair">
								<div className="label">Status:</div>
								<div className="value badge badge-pill badge-success">
									Online
								</div>
							</div>
						</div>
						<div className="col-sm-6 text-right">
							<a className="btn btn-primary btn-sm" href="#">
								<i className="os-icon os-icon-link-3"></i>
								<span>Add to Friends</span>
							</a>
						</div>
					</div>
				</div>
				<div className="up-contents">
					<div className="m-b">
						<div className="row m-b">
							<div className="col-sm-6 b-r b-b">
								<div className="el-tablo centered padded-v">
									<div className="value">25</div>
									<div className="label">Products Sold</div>
								</div>
							</div>
							<div className="col-sm-6 b-b">
								<div className="el-tablo centered padded-v">
									<div className="value">315</div>
									<div className="label">Friends</div>
								</div>
							</div>
						</div>
						<div className="padded">
							<div className="os-progress-bar primary">
								<div className="bar-labels">
									<div className="bar-label-left">
										<span>Profile Completion</span>
										<span className="positive">+10</span>
									</div>
									<div className="bar-label-right">
										<span className="info">72/100</span>
									</div>
								</div>
								<div className="bar-level-1" style={{ width: '100%' }}>
									<div className="bar-level-2" style={{ width: '80%' }}>
										<div className="bar-level-3" style={{ width: '30%' }}></div>
									</div>
								</div>
							</div>
							<div className="os-progress-bar primary">
								<div className="bar-labels">
									<div className="bar-label-left">
										<span>Status Unlocked</span>
										<span className="positive">+5</span>
									</div>
									<div className="bar-label-right">
										<span className="info">45/100</span>
									</div>
								</div>
								<div className="bar-level-1" style={{ width: '100%' }}>
									<div className="bar-level-2" style={{ width: '30%' }}>
										<div className="bar-level-3" style={{ width: '10%' }}></div>
									</div>
								</div>
							</div>
							<div className="os-progress-bar primary">
								<div className="bar-labels">
									<div className="bar-label-left">
										<span>Followers</span>
										<span className="negative">-12</span>
									</div>
									<div className="bar-label-right">
										<span className="info">74/100</span>
									</div>
								</div>
								<div className="bar-level-1" style={{ width: '100%' }}>
									<div className="bar-level-2" style={{ width: '80%' }}>
										<div className="bar-level-3" style={{ width: '60%' }}></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="element-wrapper">
				<div className="element-box">
					<h6 className="element-header">User Activity</h6>
					<div className="timed-activities compact">
						<div className="timed-activity">
							<div className="ta-date">
								<span>21st Jan, 2017</span>
							</div>
							<div className="ta-record-w">
								<div className="ta-record">
									<div className="ta-timestamp">
										<strong>11:55</strong> am
									</div>
									<div className="ta-activity">
										Created a post called <a href="#">Register new symbol</a> in
										Rogue
									</div>
								</div>
								<div className="ta-record">
									<div className="ta-timestamp">
										<strong>2:34</strong> pm
									</div>
									<div className="ta-activity">
										Commented on story <a href="#">How to be a leader</a> in{' '}
										<a href="#">Financial</a> category
									</div>
								</div>
								<div className="ta-record">
									<div className="ta-timestamp">
										<strong>7:12</strong> pm
									</div>
									<div className="ta-activity">
										Added <a href="#">John Silver</a> as a friend
									</div>
								</div>
							</div>
						</div>
						<div className="timed-activity">
							<div className="ta-date">
								<span>3rd Feb, 2017</span>
							</div>
							<div className="ta-record-w">
								<div className="ta-record">
									<div className="ta-timestamp">
										<strong>9:32</strong> pm
									</div>
									<div className="ta-activity">
										Added <a href="#">John Silver</a> as a friend
									</div>
								</div>
								<div className="ta-record">
									<div className="ta-timestamp">
										<strong>5:14</strong> pm
									</div>
									<div className="ta-activity">
										Commented on story <a href="#">How to be a leader</a> in{' '}
										<a href="#">Financial</a> category
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountDetails;
