import React, { Component, PureComponent } from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	Label,
	Scatter,
	ResponsiveContainer,
} from 'recharts';

const data = [
	{
		name: '0',

		pv: 2400,
		amt: 2400,
	},
	{
		name: '2',

		pv: 1398,
		amt: 2210,
	},
	{
		name: '4',

		pv: 9800,
		amt: 2290,
	},
	{
		name: '6',

		pv: 3908,
		amt: 2000,
	},
	{
		name: '8',

		pv: 4800,
		amt: 2181,
	},
	{
		name: '10',

		pv: 3800,
		amt: 2500,
	},
	{
		name: '12',

		pv: 4300,
		amt: 2100,
	},
	{
		name: '14',

		pv: 4300,
		amt: 2100,
	},
	{
		name: '16',

		pv: 4300,
		amt: 2100,
	},
];

export class Partograph extends PureComponent {
	render() {
		return (
			<>
				<div className="col-md-12 mt-3">
					<h6 className="text-center">Fetal Heart Rate</h6>
					<LineChart width={900} height={300} data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name">
							<Label value="Labour Time" offset={0} position="insideBottom" />
						</XAxis>
						<YAxis
							dataKey="Fetal heart rate"
							label={{
								value: 'Fetal heart rate',
								angle: -90,
								position: 'insideLeft',
							}}
						/>
						<Tooltip />
						<Legend margin={{ bottom: 20 }} />
						<Line
							type="monotone"
							dataKey="Fetal heart rate
						"
							stroke="#8884d8"
							activeDot={{ r: 8 }}
							margin={{ top: 20 }}
						/>
					</LineChart>
				</div>

				<div className="col-md-12 mt-3">
					<h6 className="text-center">Cervic dilation</h6>
					<LineChart width={900} height={300} data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name">
							<Label value="Labour Time" offset={0} position="insideBottom" />
						</XAxis>
						<YAxis
							dataKey="Cervic dilation"
							label={{
								value: 'Cervic dilation',
								angle: -90,
								position: 'insideLeft',
							}}
						/>
						<Tooltip />
						<Legend margin={{ bottom: 20 }} />
						<Line
							type="monotone"
							dataKey="systolic"
							stroke="red"
							activeDot={{ r: 8 }}
							name="systolic"
						/>
						<Line
							name="Diastolic"
							type="monotone"
							dataKey="Diastolic"
							stroke="teal"
						/>
						<Line
							name="tristylic"
							type="monotone"
							dataKey="tristylic"
							stroke="blue"
						/>

						<Scatter name="red" dataKey="red" fill="red" />
					</LineChart>
				</div>

				<div className="col-md-12 mt-3">
					<h6 className="text-center">Contraction</h6>
					<LineChart width={900} height={300} data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name">
							<Label value="Labour Time" offset={0} position="insideBottom" />
						</XAxis>
						<YAxis
							dataKey="Contraction"
							label={{
								value: 'Contraction',
								angle: -90,
								position: 'insideLeft',
							}}
						/>
						<Tooltip />
						<Legend margin={{ bottom: 20 }} />
						<Line
							type="monotone"
							dataKey="systolic"
							stroke="#8884d8"
							activeDot={{ r: 8 }}
							name="systolic"
						/>
						<Line
							name="Diastolic"
							type="monotone"
							dataKey="Diastolic"
							stroke="#ff7300"
						/>
					</LineChart>
				</div>

				<div className="col-md-12 mt-3">
					<h6 className="text-center">Blood Pressure</h6>
					<LineChart width={900} height={300} data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name">
							<Label value="Labour Time" offset={0} position="insideBottom" />
						</XAxis>
						<YAxis
							dataKey="Blood Pressure"
							label={{
								value: 'Blood Pressure',
								angle: -90,
								position: 'insideLeft',
							}}
						/>
						<Tooltip />
						<Legend margin={{ bottom: 20 }} />
						<Line
							type="monotone"
							dataKey="systolic"
							stroke="#8884d8"
							activeDot={{ r: 8 }}
							name="systolic"
						/>
						<Line
							name="Diastolic"
							type="monotone"
							dataKey="Diastolic"
							stroke="#82ca9d"
						/>
					</LineChart>
				</div>
				<div className="col-md-12 mt-3">
					<h6 className="text-center">Pulse</h6>
					<LineChart width={900} height={300} data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name">
							<Label value="Labour Time" offset={0} position="insideBottom" />
						</XAxis>
						<YAxis
							dataKey="Pulse"
							label={{
								value: 'Pulse',
								angle: -90,
								position: 'insideLeft',
							}}
						/>
						<Tooltip />
						<Legend margin={{ bottom: 20 }} />
						<Line
							type="monotone"
							dataKey="Pulse"
							stroke="#8884d8"
							activeDot={{ r: 8 }}
						/>
					</LineChart>
				</div>

				<div className="col-md-12 mt-3">
					<h6 className="text-center">Temperature</h6>
					<LineChart width={900} height={300} data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name">
							<Label value="Labour Time" offset={0} position="insideBottom" />
						</XAxis>
						<YAxis
							dataKey="Temperature"
							label={{
								value: 'Temperature',
								angle: -90,
								position: 'insideLeft',
							}}
						/>
						<Tooltip />
						<Legend margin={{ bottom: 20 }} />
						<Line
							type="monotone"
							dataKey="Temperature"
							stroke="#8884d8"
							activeDot={{ r: 8 }}
						/>
					</LineChart>
				</div>

				<div className="col-md-12 mt-3">
					<h6 className="text-center">Respiration Rate</h6>
					<LineChart width={900} height={300} data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name">
							<Label value="Labour Time" offset={0} position="insideBottom" />
						</XAxis>
						<YAxis
							dataKey="Respiration rate"
							label={{
								value: 'Respiration rate',
								angle: -90,
								position: 'insideLeft',
							}}
						/>
						<Tooltip />
						<Legend margin={{ bottom: 20 }} />
						<Line
							type="monotone"
							dataKey="respiration rate"
							stroke="#8884d8"
							margin={{ top: 20 }}
							activeDot={{ r: 8 }}
						/>
					</LineChart>
				</div>

				<div className="col-md-12 mt-3">
					<h6 className="text-center">Blood Glucose</h6>
					<LineChart width={900} height={300} data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name">
							<Label value="Labour Time" offset={0} position="insideBottom" />
						</XAxis>
						<YAxis
							dataKey="Blood Glucose"
							label={{
								value: 'Blood Glucose',
								angle: -90,
								position: 'insideLeft',
							}}
						/>
						<Tooltip />
						<Legend margin={{ bottom: 20 }} />
						<Line
							type="monotone"
							dataKey="Blood glucose"
							stroke="#8884d8"
							margin={{ top: 20 }}
							activeDot={{ r: 8 }}
						/>
					</LineChart>
				</div>
			</>
		);
	}
}

export default Partograph;
