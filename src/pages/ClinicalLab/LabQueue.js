/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';

import { request, itemRender } from '../../services/utilities';
import LabBlock from '../../components/LabBlock';

class LabQueue extends Component {
	state = {
		loading: false,
		labs: [],
		meta: null,
	};

	componentDidMount() {
		this.fetchRequests();
	}

	fetchRequests = async page => {
		try {
			this.setState({ ...this.state, loading: true });
			const p = page || 1;
			const date = moment().format('YYYY-MM-DD');
			const url = `requests/list/labs?page=${p}&limit=10&today=${date}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			this.setState({ ...this.state, loading: false, labs: result, meta });
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (error) {
			this.setState({ ...this.state, loading: false });
		}
	};

	updateLab = labs => {
		console.log(labs);
		this.setState({ labs });
	};

	onNavigatePage = nextPage => {
		this.fetchRequests(nextPage);
	};

	render() {
		const { loading, labs, meta } = this.state;
		return (
			<div className="element-box p-3 m-0 mt-3">
				<div className="table table-responsive">
					<LabBlock loading={loading} labs={labs} updateLab={this.updateLab} />
				</div>
				{meta && (
					<div className="pagination pagination-center mt-4">
						<Pagination
							current={parseInt(meta.currentPage, 10)}
							pageSize={parseInt(meta.itemsPerPage, 10)}
							total={parseInt(meta.totalPages, 10)}
							showTotal={total => `Total ${total} lab results`}
							itemRender={itemRender}
							onChange={current => this.onNavigatePage(current)}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default LabQueue;
