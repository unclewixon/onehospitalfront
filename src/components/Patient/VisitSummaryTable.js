/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableLoading from '../TableLoading';

class VisitSummaryTable extends Component {
	state = {
		loading: false,
		role: null,
		showModal: false,
	};

	openPermissionModal = role => () => {
		document.body.classList.add('modal-open');
		this.setState({ role, showModal: true });
	};

	closeModal = () => {
		document.body.classList.remove('modal-open');
		this.setState({ role: null, showModal: false });
	};

	render() {
		const { roles } = this.props;
		const { loading, role, showModal } = this.state;
		return (
			<div className="row">
				<div className="m-0 w-100">
					{loading ? (
						<TableLoading />
					) : (
						<div class="">
							<div class="table-responsive">
								<div
									id="dataTable1_wrapper"
									class="dataTables_wrapper container-fluid dt-bootstrap4">
									<div class="row">
										<div class="col-sm-12 col-md-6">
											<div class="dataTables_length" id="dataTable1_length">
												<label>
													Show{' '}
													<select
														name="dataTable1_length"
														aria-controls="dataTable1"
														class="form-control form-control-sm">
														<option value="10">10</option>
														<option value="25">25</option>
														<option value="50">50</option>
														<option value="100">100</option>
													</select>{' '}
													entries
												</label>
											</div>
										</div>
										<div class="col-sm-12 col-md-6">
											<div id="dataTable1_filter" class="dataTables_filter">
												<label>
													Search:
													<input
														type="search"
														class="form-control form-control-sm"
														placeholder=""
														aria-controls="dataTable1"
													/>
												</label>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-sm-12">
											<table
												id="dataTable1"
												width="100%"
												class="table table-striped table-lightfont dataTable"
												role="grid"
												aria-describedby="dataTable1_info"
												style={{ width: '100%' }}>
												<thead style={{ borderCollapse: 'collapse' }}>
													<tr>
														<th rowspan="1" colspan="1">
															Date
														</th>
														<th rowspan="1" colspan="1">
															Description
														</th>
														<th rowspan="1" colspan="1">
															Responsible
														</th>
													</tr>
												</thead>
												<tfoot>
													<tr>
														<th rowspan="1" colspan="1">
															Date
														</th>
														<th rowspan="1" colspan="1">
															Description
														</th>
														<th rowspan="1" colspan="1">
															By
														</th>
													</tr>
												</tfoot>
												<tbody>
													<tr role="row" class="odd">
														<td class="sorting_1">Airi Satou</td>
														<td>Accountant</td>
														<td>Tokyo</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									<div class="row">
										<div class="col-sm-12 col-md-5">
											<div
												class="dataTables_info"
												id="dataTable1_info"
												role="status"
												aria-live="polite">
												Showing 1 to 10 of 57 entries
											</div>
										</div>
										<div class="col-sm-12 col-md-7">
											<div
												class="dataTables_paginate paging_simple_numbers"
												id="dataTable1_paginate">
												<ul class="pagination">
													<li
														class="paginate_button page-item previous disabled"
														id="dataTable1_previous">
														<a
															href="#"
															aria-controls="dataTable1"
															data-dt-idx="0"
															tabindex="0"
															class="page-link">
															Previous
														</a>
													</li>
													<li class="paginate_button page-item active">
														<a
															href="#"
															aria-controls="dataTable1"
															data-dt-idx="1"
															tabindex="0"
															class="page-link">
															1
														</a>
													</li>
													<li class="paginate_button page-item ">
														<a
															href="#"
															aria-controls="dataTable1"
															data-dt-idx="2"
															tabindex="0"
															class="page-link">
															2
														</a>
													</li>
													<li class="paginate_button page-item ">
														<a
															href="#"
															aria-controls="dataTable1"
															data-dt-idx="3"
															tabindex="0"
															class="page-link">
															3
														</a>
													</li>
													<li class="paginate_button page-item ">
														<a
															href="#"
															aria-controls="dataTable1"
															data-dt-idx="4"
															tabindex="0"
															class="page-link">
															4
														</a>
													</li>
													<li class="paginate_button page-item ">
														<a
															href="#"
															aria-controls="dataTable1"
															data-dt-idx="5"
															tabindex="0"
															class="page-link">
															5
														</a>
													</li>
													<li class="paginate_button page-item ">
														<a
															href="#"
															aria-controls="dataTable1"
															data-dt-idx="6"
															tabindex="0"
															class="page-link">
															6
														</a>
													</li>
													<li
														class="paginate_button page-item next"
														id="dataTable1_next">
														<a
															href="#"
															aria-controls="dataTable1"
															data-dt-idx="7"
															tabindex="0"
															class="page-link">
															Next
														</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		roles: state.role.roles,
	};
};

export default connect(mapStateToProps)(VisitSummaryTable);
