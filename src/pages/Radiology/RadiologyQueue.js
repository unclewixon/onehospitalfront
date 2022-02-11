import React, { Component } from 'react';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';

import { request, itemRender } from '../../services/utilities';
import RadiologyBlock from '../../components/RadiologyBlock';

class RadiologyQueue extends Component {
	state = {
		loading: false,
		scans: [],
		startDate: moment().format('YYYY-MM-DD'),
		endDate: '',
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
			const url = `requests/list/scans?page=${p}&limit=10&today=${date}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			this.setState({
				...this.state,
				loading: false,
				scans: result,
				meta,
			});
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (error) {
			this.setState({ ...this.state, loading: false });
		}
	};

	updateScan = items => {
		this.setState({ scans: items });
	};

	onNavigatePage = nextPage => {
		this.fetchRequests(nextPage);
	};

	render() {
		const { loading, scans, meta } = this.state;
		return (
			<div className="element-box p-3 m-0 mt-3">
				<div className="table table-responsive">
					<RadiologyBlock
						loading={loading}
						scans={scans}
						updateScan={this.updateScan}
					/>
				</div>
				{meta && (
					<div className="pagination pagination-center mt-4">
						<Pagination
							current={parseInt(meta.currentPage, 10)}
							pageSize={parseInt(meta.itemsPerPage, 10)}
							total={parseInt(meta.totalPages, 10)}
							showTotal={total => `Total ${total} scan results`}
							itemRender={itemRender}
							onChange={current => this.onNavigatePage(current)}
							showSizeChanger={false}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default RadiologyQueue;
