/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import { connect } from 'react-redux';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';
import { request, itemRender } from '../../services/utilities';
// import { patientAPI } from '../../services/constants';
import { notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import ModalProcedure from '../Modals/ModalProcedure';
import { startBlock, stopBlock } from '../../actions/redux-block';

const Procedure = props => {
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [activeRequest, setActiveRequest] = useState(null);
	const [procedures, setProcedures] = useState([]);
	const [meta, setMeta] = useState(null);

	const location = props.location;

	const init = async page => {
		try {
			const p = page || 1;
			const { patient } = props;
			const url = `patient/${patient.id}/request/procedure?page=${p}&limit=24&startDate=&endDate=`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			setMeta(meta);
			window.scrollTo({ top: 0, behavior: 'smooth' });
			const arr = [...result];
			setProcedures(arr);
			setLoading(false);
			props.stopBlock();
		} catch (e) {
			props.stopBlock();
			notifyError(
				e.message || 'error fetching imaging requests for the patient'
			);
			setLoading(false);
		}
	};

	const onNavigatePage = nextPage => {
		props.startBlock();
		init(nextPage);
	};

	useEffect(() => {
		if (loading) {
			init();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	const getRequests = arr => {
		let rer = [];
		arr.forEach(val => {
			rer = [...rer, val.service_name];
		});
		return rer.join(', ');
	};

	const onModalClick = () => {
		setShowModal(!showModal);
	};

	const calculateAmount = arr => {
		let sum = 0;
		arr.forEach(val => {
			let amt = val.amount;
			if (amt === undefined) {
				amt = 0;
			}
			try {
				sum += parseInt(amt);
			} catch (e) {
				sum += 0;
			}
		});
		return sum;
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions">
					<Link
						className="btn btn-primary"
						to={`${location.pathname}#procedure-request`}>
						<i className="os-icon os-icon-plus"></i>
						New Procedure Request
					</Link>
				</div>
				<h6 className="element-header">Procedure Requests</h6>
				<div className="element-box m-0 p-3">
					<div className="bootstrap-table">
						<div className="fixed-table-toolbar">
							<div className="bs-bars float-left">
								<div id="toolbar"></div>
							</div>
						</div>
						<div className="fixed-table-container pb-0">
							<div className="fixed-table-body">
								<table
									id="table"
									className="table table-theme v-middle table-hover">
									<thead>
										<tr>
											<th>ID</th>
											<th>Request Date</th>
											<th>Requested By</th>
											<th>Request Specimen</th>
											<th>Amount</th>
											<th className="text-right" />
										</tr>
									</thead>

									{loading ? (
										<tbody>
											<tr>
												<td colSpan="5" className="text-center">
													<img alt="searching" src={searchingGIF} />
												</td>
											</tr>
										</tbody>
									) : (
										<tbody>
											{procedures.map((req, i) => {
												return (
													<tr key={i}>
														<td>{i + 1}</td>
														<td>
															{moment(req.createdAt).format('DD-MMM-YYYY')}
														</td>
														<td>{req.created_by}</td>
														<td>{getRequests(req.requestBody)}</td>
														<td>{calculateAmount(req.requestBody)}</td>
														<td className="row-actions text-right">
															<Tooltip title="View Request">
																<a
																	onClick={() => {
																		onModalClick();
																		setActiveRequest(req);
																	}}>
																	<i className="os-icon os-icon-documents-03" />
																</a>
															</Tooltip>
															<Tooltip title="Print Request">
																<a className="ml-2">
																	<i className="icon-feather-printer" />
																</a>
															</Tooltip>
														</td>
													</tr>
												);
											})}
										</tbody>
									)}
								</table>
							</div>
							{meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalPages, 10)}
										showTotal={total => `Total ${total} transactions`}
										itemRender={itemRender}
										onChange={current => onNavigatePage(current)}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			{activeRequest && (
				<ModalProcedure
					showModal={showModal}
					onModalClick={onModalClick}
					activeRequest={activeRequest}
				/>
			)}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
	};
};

export default withRouter(
	connect(mapStateToProps, { startBlock, stopBlock })(Procedure)
);
