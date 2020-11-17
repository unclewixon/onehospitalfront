/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useDispatch } from 'react-redux';

import { request, updateImmutable } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import { patientAPI } from '../../services/constants';
import { startBlock, stopBlock } from '../../actions/redux-block';

const ModalViewLabResult = ({ closeModal, labTest, labs, updateLab }) => {
	const dispatch = useDispatch();

	const approve = async () => {
		try {
			dispatch(startBlock());
			const url = `${patientAPI}/request/${labTest.id}/approve-result?type=lab`;
			const rs = await request(url, 'PATCH', true);
			const newLabs = updateImmutable(labs, rs.data);
			updateLab(newLabs);
			notifySuccess('lab result approved!');
			dispatch(stopBlock());
			closeModal();
		} catch (error) {
			console.log(error);
			notifyError('Error while trying to approve lab result');
			dispatch(stopBlock());
		}
	};

	const reject = async () => {
		try {
			dispatch(startBlock());
			const url = `${patientAPI}/${labTest.id}/reject-result`;
			const rs = await request(url, 'PATCH', true);
			const newLabs = updateImmutable(labs, rs.data);
			updateLab(newLabs);
			notifySuccess('lab result rejected!');
			dispatch(stopBlock());
			closeModal();
		} catch (error) {
			console.log(error);
			notifyError('Error while trying to reject lab result');
			dispatch(stopBlock());
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div className="modal-dialog modal-md modal-centered">
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}>
						<span className="os-icon os-icon-close" />
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Lab Result</h4>
						<div className="onboarding-text alert-custom mb-3">
							<div>{labTest.requestBody.name}</div>
							<div>
								{labTest.requestBody.specimens.map((s, i) => (
									<span key={i} className="badge badge-info text-white mr-2">
										{s.label}
									</span>
								))}
							</div>
						</div>
						<div className="element-box p-2">
							<div className="row">
								<div className="col-sm-12">
									{labTest ? (
										<table className="table table-bordered table-sm table-v2 table-striped">
											{labTest.requestBody.hasParameters && (
												<thead>
													<tr>
														<th>Parameter</th>
														<th>Value</th>
														<th>Inference</th>
													</tr>
												</thead>
											)}
											<tbody>
												{labTest.requestBody.hasParameters ? (
													labTest.requestBody.parameters.map((param, i) => {
														return (
															<tr key={i}>
																<td>{param.name}</td>
																<td>{param.value}</td>
																<td>{param.inference}</td>
															</tr>
														);
													})
												) : (
													<tr>
														<th>Result</th>
														<td>{labTest.requestBody.result}</td>
													</tr>
												)}
												{labTest.requestBody.note && (
													<tr>
														<th>Note</th>
														<td
															colSpan={
																labTest.requestBody.hasParameters ? 1 : 2
															}>
															{labTest.requestBody.note}
														</td>
													</tr>
												)}
											</tbody>
										</table>
									) : (
										<table className="table table-bordered table-sm table-v2 table-striped">
											<tbody>
												<tr>{`Lab Result: ${request.requestBody.result}`}</tr>
											</tbody>
										</table>
									)}
								</div>
								{labTest.status === 0 && (
									<div className="col-md-12 mt-4">
										<button
											onClick={() => approve()}
											className="btn btn-primary">
											Approve
										</button>
										<button
											onClick={() => reject()}
											className="btn btn-danger ml-3">
											Reject
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalViewLabResult;
