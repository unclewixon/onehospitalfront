/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';
import { useDispatch } from 'react-redux';

import TableLoading from './TableLoading';
import ProfilePopup from './Patient/ProfilePopup';
import { patientname } from '../services/utilities';
import ViewPrescription from './Pharmacy/ViewPrescription';
import { toggleProfile } from '../actions/user';

const PrescriptionBlock = ({
	loading,
	patient,
	prescriptions,
	updatePrescriptions,
}) => {
	const [showModal, setShowModal] = useState(false);
	const [prescription, setPrescription] = useState(null);

	const dispatch = useDispatch();

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setPrescription(null);
		setShowModal(false);
	};

	const showProfile = patient => {
		const info = { patient, type: 'patient' };
		dispatch(toggleProfile(true, info));
	};

	return loading ? (
		<TableLoading />
	) : (
		<>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Request Date</th>
						<th>ID</th>
						{!patient && <th>Patient</th>}
						{!patient && <th>Insurance</th>}
						<th>Requested By</th>
						<th className="text-center">Request Status</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{prescriptions.map((request, i) => {
						return (
							<tr key={i}>
								<td>
									{moment(request.createdAt).format('DD-MMM-YYYY : h:mmA')}
								</td>
								<td>{request.code || ''}</td>
								{!patient && (
									<td>
										<p className="item-title text-color m-0">
											<Tooltip
												title={<ProfilePopup patient={request.patient} />}>
												<a
													className="cursor"
													onClick={() => showProfile(request.patient)}>
													{patientname(request.patient, true)}
												</a>
											</Tooltip>
											{request.patient.isAdmitted && (
												<Tooltip title="Admitted">
													<i className="fa fa-hospital-o text-danger ml-1" />
												</Tooltip>
											)}
										</p>
									</td>
								)}
								{!patient && <td>{request.patient.hmo.name}</td>}
								<td>{request.created_by ? request.created_by : ''}</td>
								<td className="text-center">
									{request.status === 0 && request.item.filled === 0 && (
										<span className="badge badge-warning">Pending</span>
									)}
									{request.transaction &&
										request.transaction.status === 0 &&
										request.status === 0 &&
										request.item.filled === 1 && (
											<span className="badge badge-info text-white">
												Awaiting Payment
											</span>
										)}
									{request.transaction &&
										request.transaction.status === 1 &&
										request.status === 0 && (
											<span className="badge badge-secondary">
												Awaiting Dispense
											</span>
										)}
									{request.status === 1 && (
										<span className="badge badge-success">Completed</span>
									)}
								</td>
								<td className="row-actions text-right">
									<Tooltip title="View Prescription">
										<a
											className="info"
											onClick={() => {
												document.body.classList.add('modal-open');
												setPrescription(request);
												setShowModal(true);
											}}>
											<i className="os-icon os-icon-eye" />
										</a>
									</Tooltip>
									{request.status === 1 && (
										<Tooltip title="Print Prescription">
											<a className="ml-2">
												<i className="icon-feather-printer" />
											</a>
										</Tooltip>
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{showModal && (
				<ViewPrescription
					prescriptions={prescriptions}
					prescription={prescription}
					closeModal={closeModal}
					updatePrescriptions={updatePrescriptions}
				/>
			)}
		</>
	);
};

export default PrescriptionBlock;
