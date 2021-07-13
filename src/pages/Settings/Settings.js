/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect } from 'react';

import TableLoading from '../../components/TableLoading';
import { notifyError } from '../../services/notify';
import { request } from '../../services/utilities';

const Settings = () => {
	const [loading, setLoading] = useState(true);
	const [settingsList, setSettingsList] = useState(true);

	const fetchSettings = useCallback(async () => {
		try {
			const rs = await request('settings', 'GET', true);
			setSettingsList(rs);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			notifyError(error.message || 'could not fetch settings!');
		}
	}, []);

	useEffect(() => {
		if (loading) {
			fetchSettings();
		}
	}, [fetchSettings, loading]);

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="element-wrapper">
					<div className="os-tabs-w mx-1">
						<div className="os-tabs-controls os-tabs-complex">
							<ul className="nav nav-tabs upper">
								<li className="nav-item">
									<a aria-expanded="true" className="nav-link active">
										Global Settings
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-7">
							<div className="element-wrapper">
								<div className="element-box-tp">
									{loading ? (
										<TableLoading />
									) : (
										<div className="table-responsive">
											<table className="table table-striped">
												<thead>
													<tr>
														<th>ID</th>
														<th>Name</th>
														<th>Value</th>
														<th></th>
													</tr>
												</thead>
												<tbody>
													{settingsList.map((item, i) => {
														return (
															<tr key={i}>
																<td>{item.id}</td>
																<td className="nowrap">{item.name}</td>
																<td>{item.value}</td>
																<td className="row-actions"></td>
															</tr>
														);
													})}
													{settingsList.length === 0 && (
														<tr>
															<td colSpan="4" className="text-center">
																No settings found!
															</td>
														</tr>
													)}
												</tbody>
											</table>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
