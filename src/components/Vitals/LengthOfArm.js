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

const unit = 'cm';

const info = {
	title: 'Length of Arm',
	type: kebabCase('Length of Arm'),
	inputs: [{ name: 'length_of_arm', title: 'Length of Arm', weight: 'cm' }],
};

const LengthOfArm = ({ vitals }) => {
	const [visible, setVisible] = useState(false);
	const [currentVitals, setCurrentVitals] = useState(null);
	const [data, setData] = useState([]);

	useEffect(() => {
		try {
			let data = [];
			const cloneVitals = [...vitals];
			cloneVitals
				.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
				.forEach((item, index) => {
					const date = moment(item.createdAt).format('DD-MM-YY');
					const res = { name: date, item: item.reading.length_of_arm };
					data = [...data, res];
				});

			if (vitals.length > 0) {
				let lastReading = vitals[0];
				setCurrentVitals({
					...lastReading,
					_reading: lastReading.reading.length_of_arm,
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
						<Line
							type="monotone"
							dataKey="item"
							unit={unit}
							name={info.title}
							stroke="#8884d8"
						/>
						<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
						<XAxis dataKey="name" />
						<YAxis
							label={{
								value: `Length of Arm (${unit})`,
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
		patient: state.user.patient,
		vitals: state.patient.vitals.filter(c => c.readingType === info.title),
	};
};

export default connect(mapStateToProps)(LengthOfArm);
