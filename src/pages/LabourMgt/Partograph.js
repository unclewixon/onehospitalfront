import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	Label,
} from 'recharts';
import { loadPartograph } from '../../actions/patient';

import { request } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';
import moment from 'moment';

// const data = [
// 	{
// 		name: '0',

// 		pv: 2400,
// 	},
// 	{
// 		name: '2',

// 		pv: 1398,
// 	},
// 	{
// 		name: '4',

// 		pv: 9800,
// 	},
// 	{
// 		name: '6',

// 		pv: 3908,
// 	},
// 	{
// 		name: '8',

// 		pv: 4800,
// 	},
// 	{
// 		name: '10',

// 		pv: 3800,
// 	},
// 	{
// 		name: '12',

// 		pv: 4300,
// 	},
// 	{
// 		name: '14',

// 		pv: 4300,
// 	},
// 	{
// 		name: '16',

// 		pv: 4300,
// 	},
// ];

// const partographParameter = [
// 	'fetalHeartRate',
// 	'cervicalDialation',
// 	'fetalHeadDescent',
// 	'numberOfContractions',
// 	'durationOfContractions',
// 	'bloodPressure',
// 	'currentPulse',
// 	'currentTemperature',
// 	'bloodSugarLevel',
// 	'respirationRate',
// ];

export class Partograph extends PureComponent {
	state = {
		fetalHeartRate: [],
		cervicalDialation: [],
		fetalHeadDescent: [],
		numberOfContractions: [],
		durationOfContractions: [],
		rateOfContractions: [],
		bloodPressure: [],
		currentPulse: [],
		currentTemperature: [],
		bloodSugarLevel: [],
		respirationRate: [],
		loading: false,
	};

	componentDidMount() {
		this.fetchPartograph();
	}

	fetchPartograph = async () => {
		const { labourDetail } = this.props;

		try {
			this.setState({ loading: true });
			const rs = await request(
				`labour-management/${labourDetail.id}/vitals`,
				'GET',
				true
			);
			loadPartograph(rs);

			console.log(rs);
			var {
				fetalHeartRate,
				cervicalDialation,
				fetalHeadDescent,
				numberOfContractions,
				durationOfContractions,
				rateOfContractions,
				bloodPressure,
				currentPulse,
				currentTemperature,
				bloodSugarLevel,
				respirationRate,
			} = this.state;

			//get lmp to calculate number of days
			let lmp = moment(labourDetail.lmp);

			//split each into it graph
			rs.forEach(el => {
				let measurementDate = moment(el.createdAt);

				let wks = measurementDate.diff(lmp, 'week');
				fetalHeartRate.push({
					name: wks.toString(),
					'Fetal Heart Rate': +el['fetalHeartRate'],
				});
				cervicalDialation.push({
					name: wks,
					'Cervical Dilation': +el['cervicalDialation'],
					'Fetal Head Station':
						+el['fetalHeadDescent'] < 0 ? 0 : +el['fetalHeadDescent'],
				});

				durationOfContractions.push({
					name: wks,
					'Duration of Contractions': +el['durationOfContractions'],
					'Rate of Contractions':
						Number(el['numberOfContractions']) /
						Number(+el['durationOfContractions']).toFixed(2),
				});
				currentPulse.push({ name: wks, Pulse: +el['currentPulse'] });
				let pressure = el['bloodPressure'].split('/');
				bloodPressure.push({
					name: wks,
					Systolic: pressure.length === 1 ? 110 : +pressure[0],
					Diastolic: pressure.length === 1 ? 70 : +pressure[1],
				});
				currentTemperature.push({
					name: wks,
					Temperature: +el['currentTemperature'],
				});

				bloodSugarLevel.push({
					name: wks,
					'Glucose (mg/dL)': +el['bloodSugarLevel'],
				});
				respirationRate.push({
					name: wks,
					'Respiration rate': +el['respirationRate'],
				});
			});

			this.setState(prevProps => {
				return {
					fetalHeartRate,
					cervicalDialation,
					fetalHeadDescent,
					numberOfContractions,
					durationOfContractions,
					rateOfContractions,
					bloodPressure,
					currentPulse,
					currentTemperature,
					bloodSugarLevel,
					respirationRate,
					loading: false,
				};
			});
		} catch (e) {
			console.log(e);
			this.setState({ loading: false });
		}
	};

	render() {
		let {
			fetalHeartRate,
			cervicalDialation,
			// fetalHeadDescent,
			durationOfContractions,
			bloodPressure,
			currentPulse,
			currentTemperature,
			bloodSugarLevel,
			respirationRate,
			loading,
		} = this.state;
		console.log(fetalHeartRate);

		return loading ? (
			<div className="text-center">
				{' '}
				<img alt="searching" src={searchingGIF} />
			</div>
		) : (
			<div>
				<div className="col-md-12 mt-3">
					<h6 className="text-center">Fetal Heart Rate</h6>
					<LineChart width={900} height={300} data={fetalHeartRate}>
						<CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
						<XAxis dataKey="name">
							<Label
								value="Labour Time"
								offset={-10}
								position="insideBottom"
								margin={{ top: 30 }}
							/>
						</XAxis>
						<YAxis />
						<Tooltip />
						<Legend
							wrapperStyle={{
								bottom: '-10px',
							}}
						/>
						<Line type="monotone" dataKey="Fetal Heart Rate" stroke="#8884d8" />
					</LineChart>
				</div>

				<div className="col-md-12 mt-4">
					<h6 className="text-center">CervicoGraph</h6>
					<LineChart width={900} height={300} data={cervicalDialation}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name">
							<Label value="Labour Time" offset={-10} position="insideBottom" />
						</XAxis>
						<YAxis
							dataKey="Cervical Dilation"
							label={{
								value: 'Cervical dilation',
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
									id: 'Cervical Dilation',
									value: 'Cervical Dilation',
									type: 'star',
									color: '#8884d8',
								},
								{
									id: 'Fetal Head Station',
									value: 'Fetal Head Station',
									type: 'circle',
									color: 'black',
								},
							]}
						/>

						<Line
							type="monotone"
							dataKey="Cervical Dilation"
							stroke="#8884d8"
						/>
						<Line
							type="monotone"
							dataKey="Fetal Head Station"
							stroke="#8884d8"
						/>
					</LineChart>
				</div>

				<div className="col-md-12 mt-4">
					<h6 className="text-center">Contractions</h6>
					<LineChart width={900} height={600} data={durationOfContractions}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name">
							<Label value="Labour Time" offset={-10} position="insideBottom" />
						</XAxis>
						<YAxis
							dataKey="Duration of Contractions"
							label={{
								value: 'Duration of Contractions',
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
									id: 'Rate of Contractions',
									value: 'Rate of Contractions',
									type: 'triange',
									color: 'purple',
								},
								{
									id: 'Duration of Contractions',
									value: 'Duration of Contractions',
									type: 'circle',
									color: 'red',
								},
							]}
						/>
						<Line
							type="monotone"
							dataKey="Rate of Contractions"
							stroke="#8884d8"
						/>
						<Line
							type="monotone"
							dataKey="Duration of Contractions"
							stroke="#8884d8"
						/>
					</LineChart>
				</div>

				<div className="col-md-12 mt-4">
					<h6 className="text-center">Blood Pressure</h6>
					<LineChart width={900} height={600} data={bloodPressure}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name">
							<Label value="Labour Time" offset={-10} position="insideBottom" />
						</XAxis>
						<YAxis
							dataKey="Systolic"
							label={{
								value: 'Systolic',
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
									id: 'Systolic',
									value: 'Systolic',
									type: 'triangle',
									color: 'purple',
								},
								{
									id: 'Diastolic',
									value: 'Diastolic',
									type: 'circle',
									color: 'red',
								},
							]}
						/>
						<Line type="triangle" dataKey="Systolic" stroke="#8884d8" />
						<Line type="circle'" dataKey="Diastolic" stroke="#8884d8" />
					</LineChart>
				</div>
				<div className="col-md-12 mt-4">
					<h6 className="text-center">Pulse</h6>
					<LineChart width={900} height={300} data={currentPulse}>
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
					<LineChart width={900} height={300} data={currentTemperature}>
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
					<LineChart width={900} height={300} data={respirationRate}>
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
					<LineChart width={900} height={300} data={bloodSugarLevel}>
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
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		partographies: state.patient.partographies,
		labourDetail: state.patient.labourDetail,
	};
};
export default connect(mapStateToProps, { loadPartograph })(Partograph);
