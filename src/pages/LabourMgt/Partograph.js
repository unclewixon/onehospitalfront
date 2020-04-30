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
							<Label
								value="Labour Time"
								offset={-10}
								position="insideBottom"
								margin={{ top: 30 }}
							/>
						</XAxis>
						<YAxis
							dataKey="Fetal Heart Rate"
							label={{
								value: 'Fetal Heart Rate',
								angle: -90,
								position: 'insideLeft',
							}}
						/>
						<Tooltip />
						<Legend
							wrapperStyle={{
								bottom: '-10px',
							}}
						/>
						<Line
							type="monotone"
							dataKey="Fetal Heart Rate
						"
							stroke="#8884d8"
							activeDot={{ r: 8 }}
							margin={{ top: 20 }}
						/>
					</LineChart>
				</div>

				<div className="col-md-12 mt-4">
					<h6 className="text-center">CervicoGraph</h6>
					<LineChart width={900} height={300} data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name">
							<Label value="Labour Time" offset={-10} position="insideBottom" />
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
						<Legend
							wrapperStyle={{
								bottom: '-10px',
							}}
							payload={[
								{
									id: 'alert',
									value: 'Alert',
									type: 'triangle',
									color: '#8884d8',
								},
								{
									id: 'action',
									value: 'Action',
									type: 'line',
									color: '#82ca9d',
								},
								{
									id: 'cervical dilation',
									value: 'Cervical Dilation',
									type: 'star',
									color: '#8884d8',
								},
								{
									id: 'fetal head station',
									value: 'Fetal Head Station',
									type: 'circle',
									color: 'black',
								},
							]}
						/>
					</LineChart>
				</div>

				<div className="col-md-12 mt-4">
					<h6 className="text-center">Contractions</h6>
					<LineChart width={900} height={300} data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name">
							<Label value="Labour Time" offset={-10} position="insideBottom" />
						</XAxis>
						<YAxis
							dataKey="Contractions"
							label={{
								value: 'Contractions',
								angle: -90,
								position: 'insideLeft',
							}}
						/>
						<Tooltip />
						<Legend
							wrapperStyle={{
								bottom: '-10px',
							}}
							payload={[
								{
									id: 'rateOfContraction',
									value: 'Rate of Contractions',
									type: 'triange',
									color: 'purple',
								},
								{
									id: 'durationOfContraction',
									value: 'Duration of Contractions',
									type: 'circle',
									color: 'red',
								},
							]}
						/>
					</LineChart>
				</div>

				<div className="col-md-12 mt-4">
					<h6 className="text-center">Blood Pressure</h6>
					<LineChart width={900} height={300} data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name">
							<Label value="Labour Time" offset={-10} position="insideBottom" />
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
						<Legend
							wrapperStyle={{
								bottom: '-10px',
							}}
							payload={[
								{
									id: 'systolic',
									value: 'Systolic',
									type: 'triangle',
									color: 'purple',
								},
								{
									id: 'diastolic',
									value: 'Diastolic',
									type: 'circle',
									color: 'red',
								},
							]}
						/>
					</LineChart>
				</div>
				<div className="col-md-12 mt-4">
					<h6 className="text-center">Pulse</h6>
					<LineChart width={900} height={300} data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name">
							<Label value="Labour Time" offset={-10} position="insideBottom" />
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
						<Legend
							wrapperStyle={{
								bottom: '-10px',
							}}
						/>
						<Line
							type="monotone"
							dataKey="Pulse"
							stroke="#8884d8"
							activeDot={{ r: 8 }}
						/>
					</LineChart>
				</div>

				<div className="col-md-12 mt-4">
					<h6 className="text-center">Temperature</h6>
					<LineChart width={900} height={300} data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name">
							<Label value="Labour Time" offset={-10} position="insideBottom" />
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
						<Legend
							wrapperStyle={{
								bottom: '-10px',
							}}
						/>
						<Line
							type="monotone"
							dataKey="Temperature"
							stroke="#8884d8"
							activeDot={{ r: 8 }}
						/>
					</LineChart>
				</div>

				<div className="col-md-12 mt-4">
					<h6 className="text-center">Respiration Rate</h6>
					<LineChart width={900} height={300} data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name">
							<Label value="Labour Time" offset={-10} position="insideBottom" />
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
						<Legend
							wrapperStyle={{
								bottom: '-10px',
							}}
						/>
						<Line
							type="monotone"
							dataKey="Respiration rate"
							stroke="#8884d8"
							margin={{ top: 20 }}
							activeDot={{ r: 8 }}
						/>
					</LineChart>
				</div>

				<div className="col-md-12 mt-4">
					<h6 className="text-center">Blood Glucose</h6>
					<LineChart width={900} height={300} data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name">
							<Label value="Labour Time" offset={-10} position="insideBottom" />
						</XAxis>
						<YAxis
							dataKey="Glucose (mg/dL)"
							label={{
								value: 'Glucose (mg/dL)',
								angle: -90,
								position: 'insideLeft',
							}}
						/>
						<Tooltip />
						<Legend
							wrapperStyle={{
								bottom: '-10px',
							}}
						/>
						<Line
							type="monotone"
							dataKey="Glucose (mg/dL)"
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
