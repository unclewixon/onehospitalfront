import React, { Component } from 'react';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';

import { notifyError } from '../../services/notify';
import { request, updateImmutable, itemRender } from '../../services/utilities';
import PrescriptionBlock from '../../components/PrescriptionBlock';

class PrescriptionQueue extends Component {
	state = {
		loading: false,
		prescriptions: [],
		meta: null,
	};

	componentDidMount() {
		this.loadPrescriptions();
	}

	loadPrescriptions = async p => {
		try {
			const page = p || 1;
			this.setState({ loading: true });
			const date = moment().format('YYYY-MM-DD');
			const url = `requests/prescriptions?page=${page}&limit=10&today=${date}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			this.setState({ loading: false, prescriptions: result, meta });
		} catch (e) {
			this.setState({ loading: false });
			notifyError('could not fetch prescription queue');
		}
	};

	updatePrescriptions = update => {
		const { prescriptions } = this.state;
		const updatedDrugs = updateImmutable(prescriptions, update);
		this.setState({ prescriptions: updatedDrugs });
	};

	removePrescription = item => {
		const { prescriptions } = this.state;
		const updatedDrugs = prescriptions.filter(p => p.id !== item);
		this.setState({ prescriptions: updatedDrugs });
	};

	onNavigatePage = nextPage => {
		this.loadPrescriptions(nextPage);
	};

	render() {
		const { prescriptions, meta, loading } = this.state;

		return (
			<div className="element-box p-3 m-0 mb-4">
				<div className="table table-responsive">
					<PrescriptionBlock
						loading={loading}
						prescriptions={prescriptions}
						updatePrescriptions={this.updatePrescriptions}
						removePrescription={this.removePrescription}
					/>
				</div>
				{meta && (
					<div className="pagination pagination-center mt-4">
						<Pagination
							current={parseInt(meta.currentPage, 10)}
							pageSize={parseInt(meta.itemsPerPage, 10)}
							total={parseInt(meta.totalPages, 10)}
							showTotal={total => `Total ${total} prescriptions`}
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

export default PrescriptionQueue;
