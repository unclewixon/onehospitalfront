import React from 'react';
import Tooltip from 'antd/lib/tooltip';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DischargeBlock = ({
	patient,
	startDischarge,
	finishDischarge,
	startNicuDischarge,
	finishNicuDischarge,
	location,
	canAdmit,
	canDischarge,
}) => {
	const user = useSelector(state => state.user.profile);

	return (
		<>
			{(patient?.admission_id &&
				patient?.admission_id === patient?.admission?.id) ||
			(patient?.nicu_id && patient?.nicu_id === patient?.nicu?.id)
				? canDischarge && (
						<>
							{patient?.admission?.id && (
								<>
									{patient?.admission?.start_discharge ? (
										<Tooltip title="Complete Discharge">
											<button
												className="btn btn-warning btn-sm mr-1"
												onClick={() => finishDischarge(patient?.admission?.id)}
											>
												<i className="fa fa-hospital-o"></i>
												<span style={{ marginLeft: '4px' }}>
													Finish Discharge
												</span>
											</button>
										</Tooltip>
									) : (
										<>
											{user.role.slug === 'doctor' ||
											user.role.slug === 'it-admin' ? (
												<Tooltip title="Discharge">
													<button
														className="btn btn-danger btn-sm mr-1"
														onClick={() =>
															startDischarge(patient?.admission?.id)
														}
													>
														<i className="fa fa-hospital-o"></i>
														<span style={{ marginLeft: '4px' }}>Discharge</span>
													</button>
												</Tooltip>
											) : (
												<Tooltip title="A doctor should start the discharge process">
													<button className="btn btn-danger btn-sm mr-1">
														<i className="fa fa-hospital-o"></i>
														<span style={{ marginLeft: '4px' }}>Discharge</span>
													</button>
												</Tooltip>
											)}
										</>
									)}
								</>
							)}
							{patient?.nicu?.id && (
								<>
									{patient?.nicu?.start_discharge ? (
										<Tooltip title="Complete Discharge">
											<button
												className="btn btn-warning btn-sm mr-1"
												onClick={() => finishNicuDischarge(patient?.nicu?.id)}
											>
												<i className="fa fa-hospital-o"></i>
												<span style={{ marginLeft: '4px' }}>
													Finish Discharge
												</span>
											</button>
										</Tooltip>
									) : (
										<>
											{user.role.slug === 'doctor' ||
											user.role.slug === 'it-admin' ? (
												<Tooltip title="Discharge">
													<button
														className="btn btn-danger btn-sm mr-1"
														onClick={() =>
															startNicuDischarge(patient?.nicu?.id)
														}
													>
														<i className="fa fa-hospital-o"></i>
														<span style={{ marginLeft: '4px' }}>
															Nicu Discharge
														</span>
													</button>
												</Tooltip>
											) : (
												<Tooltip title="A doctor should start the discharge process">
													<button className="btn btn-danger btn-sm mr-1">
														<i className="fa fa-hospital-o"></i>
														<span style={{ marginLeft: '4px' }}>
															Nicu Discharge
														</span>
													</button>
												</Tooltip>
											)}
										</>
									)}
								</>
							)}
						</>
				  )
				: canAdmit && (
						<Tooltip title="Admit">
							<Link
								to={`${location.pathname}#start-admission`}
								className="btn btn-primary btn-sm mr-1"
							>
								<i className="os-icon os-icon-ui-22"></i>
								<span>Admit</span>
							</Link>
						</Tooltip>
				  )}
		</>
	);
};

export default DischargeBlock;
