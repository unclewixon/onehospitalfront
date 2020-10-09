import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Popover from 'antd/lib/popover';

import { useSelector } from 'react-redux';
import { notifyError } from '../../services/notify';
import { request, groupBy, checkVaccine } from '../../services/utilities';
import { patientAPI } from '../../services/constants';
import ViewVaccine from './Modals/ViewVaccine';

const dates = [
	'Birth',
	'6 wks',
	'10 wks',
	'14 wks',
	'16 wks',
	'18 wks',
	'6 months',
	'9 months',
	'12 months',
	'13 months',
	'18 months',
	'2 years',
	'5 years',
	'9 years',
	'9 years + 1',
	'9 years + 6',
	'10 years',
];

const ImmunizationChart = () => {
	const [loading, setLoading] = useState(false);
	const [records, setRecords] = useState([]);
	const [visible, setVisible] = useState(null);

	const patient = useSelector(state => state.user.patient);

	useEffect(() => {
		const fetchImmunization = async () => {
			try {
				setLoading(true);
				const url = `${patientAPI}/immunization/${patient.id}`;
				const rs = await request(url, 'GET', true);
				const list = groupBy(rs, 'slug');
				setRecords(Object.values(list));
				setLoading(false);
			} catch (error) {
				setLoading(false);
				notifyError(error.message || 'Could not load chart');
			}
		};

		fetchImmunization();
	}, [patient.id]);

	const onHover = data => setVisible(data);

	return loading ? (
		<div />
	) : (
		<div className="col-md-12">
			<div className="element-wrapper">
				<h6>Immunization Chart</h6>
				<div className="element-box">
					<div className="table-responsive" style={{ overflowX: 'scroll' }}>
						<table className="table table-bordered table-md table-v2 table-striped">
							<thead>
								<tr>
									<th>Vaccine</th>
									{dates.map((title, i) => {
										return <th key={i}>{title}</th>;
									})}
								</tr>
							</thead>
							<tbody>
								{records.map((items, i) => {
									const item = items[0];
									return (
										<tr key={i}>
											<td>
												<small>{`${item.name_of_vaccine.toUpperCase()} (${
													item.description
												})`}</small>
											</td>
											{dates.map((date, i) => {
												const data = items.find(i => i.period === date);
												return data ? (
													<td key={i}>
														<Popover
															content={
																<ViewVaccine
																	data={{ ...data, patient }}
																	setRecords={setRecords}
																/>
															}
															overlayClassName="view-vaccine"
															trigger="hover"
															visible={
																visible &&
																visible.id === data.id &&
																visible.show
															}
															onVisibleChange={e =>
																onHover({ show: e, id: data.id })
															}>
															<div className={`ibox ${checkVaccine(data)}`} />
														</Popover>
													</td>
												) : (
													<td className="text-center" key={i}>
														x
													</td>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(ImmunizationChart);
