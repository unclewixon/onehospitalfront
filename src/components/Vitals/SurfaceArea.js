import React, { useEffect, useState } from 'react';
import Popover from 'antd/lib/popover';
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
} from 'recharts';
import kebabCase from 'lodash.kebabcase';

import TakeReadings from './TakeReadings';
import { getData } from '../../services/utilities';
import { connect } from 'react-redux';

const unit = 'cm²';

const SurfaceArea = ({ newVital }) => {
	const [visible, setVisible] = useState(false);
	const [currentVitals, setCurrentVitals] = useState(0);
	useEffect(() => {
		try {
			newVital.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
			let v = newVital.find(c => c.readingType === info.title);
			setCurrentVitals(v.reading.surface_area);
		} catch (e) {}
	}, [newVital]);
	const data = [
		{ name: '20-Oct-20', item: 420 },
		{ name: '21-Oct-20', item: 400 },
		{ name: '22-Oct-20', item: 300 },
		{ name: '23-Oct-20', item: 500 },
	];
	const info = {
		title: 'Surface Area',
		type: kebabCase('Surface Area'),
		inputs: [{ name: 'surface_area', title: 'Surface Area', weight: 'kg' }],
	};

	return (
		<div className="row vital">
			<div className="col-8">
				<div className="el-chart-w">
					<LineChart
						width={640}
						height={300}
						data={data}
						margin={{ top: 5, right: 20, bottom: 5, left: 30 }}>
						<Line type="monotone" dataKey="item" stroke="#8884d8" />
						<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
						<XAxis dataKey="name" />
						<YAxis
							label={{
								value: `Surface Area (${unit})`,
								angle: -90,
								position: 'left',
							}}
						/>
						<Tooltip />
						<Legend />
					</LineChart>
				</div>
			</div>
			<div className="col-4">
				<div className="text-center">
					<div className="last-reading">Last Surface Area Reading:</div>
					<div className="reading">
						{currentVitals}
						{`${unit}`}
					</div>
					<div className="time-captured">on 29-Oct-2020 4:20pm</div>
					<div className="new-reading">
						<Popover
							title=""
							overlayClassName="vitals"
							content={
								<TakeReadings info={info} doHide={() => setVisible(false)} />
							}
							trigger="click"
							visible={visible}
							onVisibleChange={status => setVisible(status)}>
							<div>Take New Reading</div>
						</Popover>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
		newVital: state.vitals ? state.vitals.vitals : [],
	};
};
export default connect(mapStateToProps)(SurfaceArea);
