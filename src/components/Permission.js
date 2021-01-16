import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import searchingGIF from '../assets/images/searching.gif';
import { itemRender, getPageList } from '../services/utilities';

class Permission extends Component {
	state = {
		loading: false,
		permissions: [],
		meta: {
			currentPage: 1,
			itemsPerPage: 10,
			totalPages: 0,
		},
	};

	componentDidMount() {
		const { permissions } = this.props;
		const { meta } = this.state;
		this.setState({
			permissions: getPageList(permissions, meta.itemsPerPage, 1),
			meta: { ...meta, totalPages: permissions.length },
		});
	}

	onNavigatePage = page => {
		const { permissions } = this.props;
		const { meta } = this.state;
		this.setState({
			loading: false,
			permissions: getPageList(
				permissions,
				meta.itemsPerPage,
				parseInt(page, 10)
			),
			meta: { ...meta, currentPage: page },
		});
	};

	render() {
		const { meta, permissions, loading } = this.state;
		return (
			<div className="row">
				<div className="col-lg-12">
					<div className="element-wrapper">
						<div className="element-box p-3 m-0">
							<div className="table-responsive">
								{loading ? (
									<div className="loading-block">
										<img alt="searching" src={searchingGIF} />
									</div>
								) : (
									<table className="table table-striped">
										<thead>
											<tr>
												<th>S/N</th>
												<th>Name</th>
											</tr>
										</thead>
										<tbody>
											{permissions.map((item, i) => {
												return (
													<tr key={i}>
														<td>{item.id}</td>
														<td>
															<div className="value">{item.name}</div>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								)}
							</div>
							{meta && !loading && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalPages, 10)}
										showTotal={total => `Total ${total} permissions`}
										itemRender={itemRender}
										onChange={current => this.onNavigatePage(current)}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		permissions: state.permission,
	};
};

export default connect(mapStateToProps)(Permission);
