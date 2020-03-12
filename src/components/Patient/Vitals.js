/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
} from 'recharts';

class Vitals extends Component {
	render() {
		const data = [
			{ name: 'Page A', uv: 420 },
			{ name: 'Page B', uv: 400 },
			{ name: 'Page C', uv: 300 },
			{ name: 'Page D', uv: 500 },
		];
		return (
			<div className="col-md-12">
				<div className="element-wrapper">
					<div className="element-box">
						<div className="os-tabs-w">
							<div className="os-tabs-controls">
								<ul className="nav nav-tabs smaller">
									<li className="nav-item">
										<a className="nav-link">BMI</a>
									</li>
									<li className="nav-item">
										<a className="nav-link">Blood Pressure</a>
									</li>
									<li className="nav-item">
										<a className="nav-link">Height</a>
									</li>
									<li className="nav-item">
										<a className="nav-link">Pulse</a>
									</li>
									<li className="nav-item">
										<a className="nav-link">SpO2</a>
									</li>
									<li className="nav-item">
										<a className="nav-link active">Temperature</a>
									</li>
									<li className="nav-item">
										<a className="nav-link">Urine</a>
									</li>
									<li className="nav-item">
										<a className="nav-link">Weight</a>
									</li>
								</ul>
							</div>
							<div className="tab-content">
								<div className="tab-pane active" id="tab_overview">
									<div className="el-chart-w">
										<LineChart
											width={640}
											height={300}
											data={data}
											margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
											<Line type="monotone" dataKey="uv" stroke="#8884d8" />
											<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
											<XAxis dataKey="name" />
											<YAxis />
											<Tooltip />
										</LineChart>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Vitals;
