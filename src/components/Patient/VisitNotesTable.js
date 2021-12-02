import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import startCase from 'lodash.startcase';

import {
	formatDate,
	itemRender,
	request,
	staffname,
	parseNote,
} from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';

import TableLoading from '../TableLoading';
import { messageService } from '../../services/message';

class VisitNotesTable extends Component {
	state = {
		loading: false,
		meta: null,
		notes: [],
	};

	async componentDidMount() {
		this.setState({ loading: true });
		await this.fetchNotes();

		messageService.getMessage().subscribe(async message => {
			if (message !== '') {
				if (message.text === 'patient-note') {
					await this.fetchNotes();
				}
			}
		});
	}

	fetchNotes = async page => {
		try {
			const { patient } = this.props;
			this.props.startBlock();
			const p = page || 1;
			const url = `patient-notes?patient_id=${patient.id}&page=${p}&visit=encounter`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			this.setState({ loading: false, notes: result, meta });
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.setState({ loading: false, filtering: false });
			this.props.stopBlock();
			notifyError(error.message || 'could not fetch visit notes');
		}
	};

	onNavigatePage = nextPage => {
		this.fetchNotes(nextPage);
	};

	render() {
		const { loading, meta, notes } = this.state;
		return (
			<div className="m-0 w-100">
				{loading ? (
					<TableLoading />
				) : (
					<div className="table-responsive">
						<div className="dataTables_wrapper container-fluid dt-bootstrap4">
							<div className="row">
								<div className="col-sm-12">
									<table
										className="table table-striped table-lightfont dataTable"
										style={{ width: '100%' }}>
										<thead style={{ borderCollapse: 'collapse' }}>
											<tr>
												<th>Date</th>
												<th>Notes</th>
												<th nowrap="nowrap">Noted By</th>
											</tr>
										</thead>
										<tbody>
											{notes.map((note, i) => {
												return (
													<tr key={i} className={i % 2 === 1 ? 'odd' : 'even'}>
														<td nowrap="nowrap">
															{formatDate(note.createdAt, 'DD-MMM-YYYY h:mm A')}
														</td>
														<td>
															<div
																dangerouslySetInnerHTML={{
																	__html: `<strong class="float-left mr-2"><em>${startCase(
																		note.type
																	)}:</em></strong> ${parseNote(note)}`,
																}}
															/>
														</td>
														<td nowrap="nowrap">{staffname(note.staff)}</td>
													</tr>
												);
											})}

											{notes && notes.length === 0 && (
												<tr>
													<td colSpan="3" className="text-center">
														No Visit Notes
													</td>
												</tr>
											)}
										</tbody>
									</table>
								</div>
							</div>
							{meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalPages, 10)}
										showTotal={total => `Total ${total} visit notes`}
										itemRender={itemRender}
										onChange={current => this.onNavigatePage(current)}
									/>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
	};
};

export default connect(mapStateToProps, {
	startBlock,
	stopBlock,
})(VisitNotesTable);
