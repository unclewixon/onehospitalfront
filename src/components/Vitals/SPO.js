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
import moment from 'moment';

const unit = '%';

const SPO = ({ newVital }) => {
	const [visible, setVisible] = useState(false);
	const [currentVitals, setCurrentVitals] = useState(0);
	const [data, setData] = useState([]);
	useEffect(() => {
		try {
			newVital.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
			const data = [];
			newVital
				.filter(c => c.readingType === info.title)
				.slice(0, 5)
				.forEach(function(item, index) {
					let StartDate = moment(item.createdAt).format('DD-MM-YY');
					let res = { name: StartDate, item: item.reading.spo };
					data.push(res);
				});
			setData(data);
			let v = newVital.find(c => c.readingType === info.title);
			setCurrentVitals(v.reading.spo);
		} catch (e) {}
	}, [newVital]);

	const info = {
		title: 'SpO2',
		type: kebabCase('SpO2'),
		inputs: [{ name: 'spo', title: 'SpO2', weight: '%' }],
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
							label={{ value: `SpO2 (${unit})`, angle: -90, position: 'left' }}
						/>
						<Tooltip />
						<Legend />
					</LineChart>
				</div>
			</div>
			<div className="col-4">
				<div className="text-center">
					<div className="last-reading">Last SpO2 Reading:</div>
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
export default connect(mapStateToProps)(SPO);
