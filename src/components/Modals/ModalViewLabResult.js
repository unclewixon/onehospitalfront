/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useDispatch } from 'react-redux';

import { request, updateImmutable } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';

const ModalViewLabResult = ({ closeModal, lab, labs, updateLab }) => {
	const item = lab.item;

	const dispatch = useDispatch();

	const approve = async () => {
		try {
			dispatch(startBlock());
			const url = `requests/${lab.id}/approve-result?type=labs`;
			const rs = await request(url, 'PATCH', true);
			const lab_request = labs.find(l => l.id === lab.id);
			const item = { ...lab.item, ...rs.data };
			const newLabs = updateImmutable(labs, {
				...lab_request,
				status: 1,
				item,
			});
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
			const url = `requests/${lab.id}/reject-result`;
			const rs = await request(url, 'PATCH', true);
			const lab_request = labs.find(l => l.id === lab.id);
			const item = { ...lab.item, ...rs.data };
			const newItem = { ...lab_request, item };
			const newLabs = updateImmutable(labs, newItem);
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
							<div>{item.labTest.name}</div>
							<div>
								{item.labTest.specimens?.map((s, i) => (
									<span key={i} className="badge badge-info text-white mr-2">
										{s.label}
									</span>
								))}
							</div>
						</div>
						<div className="element-box p-2">
							<div className="row">
								<div className="col-sm-12">
									<table className="table table-bordered table-sm table-v2 table-striped">
										{item.labTest.hasParameters && (
											<thead>
												<tr>
													<th>Parameter</th>
													<th>Value</th>
													<th>Inference</th>
												</tr>
											</thead>
										)}
										<tbody>
											{item.labTest.hasParameters ? (
												item.parameters.map((param, i) => {
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
													<td>{item.result}</td>
												</tr>
											)}
											{item.note && (
												<tr>
													<th>Note</th>
													<td colSpan={item.labTest.hasParameters ? 1 : 2}>
														{item.note}
													</td>
												</tr>
											)}
										</tbody>
									</table>
								</div>
								{item.approved === 0 && (
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
