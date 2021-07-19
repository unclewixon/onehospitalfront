/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';
import DatePicker from 'antd/lib/date-picker';

import { paginate } from '../../services/constants';
import { itemRender } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';

const customStyle = {
	minHeight: '24px !important',
	height: '2rem',
};

const { RangePicker } = DatePicker;

const Inventory = () => {
	const [items, setItems] = useState([]);
	const [meta, setMeta] = useState({ ...paginate });
	const [dateRange, setDateRange] = useState([]);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [filtering, setFiltering] = useState(false);

	const onNavigatePage = nextPage => {};

	return (
		<>
			<div className="element-box m-0 mb-4 p-3">
				<form className="row">
					<div className="form-group col-md-6">
						<label>Date</label>
						<RangePicker
							onChange={e => {
								const date = e.map(date => {
									return moment(date._d).format('YYYY-MM-DD');
								});
								setDateRange(e);
								setStartDate(date[0]);
								setEndDate(date[1]);
							}}
						/>
					</div>
					<div className="form-group col-md-3">
						<label>Status</label>
						<select className="form-control" style={{ ...customStyle }}>
							<option value="">All</option>
						</select>
					</div>
					<div className="form-group col-md-3 mt-4">
						<a
							className="btn btn-sm btn-primary btn-upper text-white"
							onClick={() => {}}>
							<i className="os-icon os-icon-ui-37" />
							<span>
								{filtering ? <img src={waiting} alt="submitting" /> : 'Filter'}
							</span>
						</a>
					</div>
				</form>
			</div>
			<div className="element-box m-0 mb-4 p-3">
				<div className="table table-responsive">
					<table id="table" className="table table-theme v-middle table-hover">
						<thead>
							<tr>
								<th>Date</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{items.map((request, index) => {
								return (
									<tr key={index}>
										<td>
											<span>
												{moment(request.createdAt).format('DD-MMM-YYYY h:mm A')}
											</span>
										</td>
										<td></td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				{meta && (
					<div className="pagination pagination-center mt-4">
						<Pagination
							current={parseInt(meta.currentPage, 10)}
							pageSize={parseInt(meta.itemsPerPage, 10)}
							total={parseInt(meta.totalPages, 10)}
							showTotal={total => `Total ${total} items`}
							itemRender={itemRender}
							onChange={current => onNavigatePage(current)}
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default Inventory;
