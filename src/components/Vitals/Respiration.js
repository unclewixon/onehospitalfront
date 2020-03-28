import React, { useEffect, useState } from 'react';
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
import moment from 'moment';
import { connect } from 'react-redux';

import Reading from '../Patient/Reading';

const unit = 'breaths/min';

const info = {
	title: 'Respiration',
	type: kebabCase('Respiration'),
	inputs: [
		{ name: 'respiration', title: 'Respiration', weight: 'breaths/min' },
	],
};

const Respiration = ({ vitals }) => {
	const [visible, setVisible] = useState(false);
	const [currentVitals, setCurrentVitals] = useState(null);
	const [data, setData] = useState([]);

	useEffect(() => {
		try {
			let data = [];
			vitals.forEach((item, index) => {
				const date = moment(item.createdAt).format('DD-MM-YY');
				const res = { name: date, item: item.reading.respiration };
				data = [...data, res];
			});

			if (vitals.length > 0) {
				let lastReading = vitals[0];
				setCurrentVitals({
					...lastReading,
					_reading: lastReading.reading.respiration,
				});
			}
			setData(data);
		} catch (e) {}
	}, [vitals]);

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
								value: `Respiration (${unit})`,
								angle: -90,
								position: 'left',
							}}
						/>
						<Tooltip />
						<Legend />
					</LineChart>
				</div>
			</div>
			<Reading
				visible={visible}
				vital={currentVitals}
				info={info}
				setVisible={setVisible}
				unit={unit}
			/>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient.filter(c => c.readingType === info.title),
		vitals: state.patient.vitals,
	};
};
export default connect(mapStateToProps)(Respiration);
