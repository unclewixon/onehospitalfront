import React, { Component } from 'react';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';

import { request, itemRender } from '../../services/utilities';
import ProcedureBlock from '../../components/ProcedureBlock';

class ProcedureQueue extends Component {
	state = {
		loading: false,
		procedures: [],
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
			const url = `requests/list/procedure?page=${p}&limit=10&today=${date}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			this.setState({
				...this.state,
				loading: false,
				procedures: result,
				meta,
			});
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (error) {
			this.setState({ ...this.state, loading: false });
		}
	};

	updateProcedure = items => {
		this.setState({ procedures: items });
	};

	onNavigatePage = nextPage => {
		this.fetchRequests(nextPage);
	};

	render() {
		const { loading, procedures, meta } = this.state;
		return (
			<div className="element-box p-3 m-0 mt-3">
				<div className="table table-responsive">
					<ProcedureBlock
						loading={loading}
						procedures={procedures}
						updateProcedure={this.updateProcedure}
					/>
				</div>
				{meta && (
					<div className="pagination pagination-center mt-4">
						<Pagination
							current={parseInt(meta.currentPage, 10)}
							pageSize={parseInt(meta.itemsPerPage, 10)}
							total={parseInt(meta.totalPages, 10)}
							showTotal={total => `Total ${total} procedure requests`}
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

export default ProcedureQueue;
