/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect } from 'react';
import Pagination from 'antd/lib/pagination';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';

import { paginate } from '../../services/constants';
import { itemRender, updateImmutable } from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import TableLoading from '../../components/TableLoading';
import ModalNewDrug from '../../components/Modals/ModalNewDrug';
import ModalEditDrug from '../../components/Modals/ModalEditDrug';
import ModalViewBatches from '../../components/Modals/ModalViewBatches';
import ModalNewGeneric from '../../components/Modals/ModalNewGeneric';
import { createNewDrug, createNewGeneric } from '../../actions/general';

const Inventory = () => {
	const [drugs, setDrugs] = useState([]);
	const [meta, setMeta] = useState({ ...paginate });
	const [loaded, setLoaded] = useState(false);
	const [search, setSearch] = useState('');
	const [drug, setDrug] = useState(null);
	const [showDrugModal, setShowDrugModal] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [hasSearched, setHasSearched] = useState(false);
	const [showNewDrug, setShowNewDrug] = useState(false);
	const [showNewGeneric, setShowNewGeneric] = useState(false);

	const dispatch = useDispatch();

	const newDrug = useSelector(state => state.general.create_new_drug);
	const newGeneric = useSelector(state => state.general.create_new_generic);

	const loadDrugs = useCallback(
		async (page, q) => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `inventory/drugs?page=${p}&q=${q || ''}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setDrugs(result);
				setMeta(meta);
				window.scrollTo({ top: 0, behavior: 'smooth' });
				setLoaded(true);
				dispatch(stopBlock());
			} catch (e) {
				dispatch(stopBlock());
				notifyError('Error while fetching drugs');
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (!loaded) {
			loadDrugs();
		}
	}, [loadDrugs, loaded]);

	useEffect(() => {
		if (newDrug && !showNewDrug) {
			document.body.classList.add('modal-open');
			setShowNewDrug(true);
		}
	}, [newDrug, showNewDrug]);

	useEffect(() => {
		if (newGeneric && !showNewGeneric) {
			document.body.classList.add('modal-open');
			setShowNewGeneric(true);
		}
	}, [newGeneric, showNewGeneric]);

	const onNavigatePage = async nextPage => {
		await loadDrugs(nextPage);
	};

	const filterEntries = async () => {
		await loadDrugs(1, search);
	};

	const editDrug = item => {
		document.body.classList.add('modal-open');
		setDrug(item);
		setShowDrugModal(true);
	};

	const openBatches = item => {
		document.body.classList.add('modal-open');
		setDrug(item);
		setShowModal(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		dispatch(createNewDrug(false));
		dispatch(createNewGeneric(false));
		setShowModal(false);
		setShowNewDrug(false);
		setShowNewGeneric(false);
		setShowDrugModal(false);
		setDrug(null);
	};

	const addDrug = item => {
		setDrugs([item, ...drugs]);
		setMeta({ ...meta, totalPages: meta.totalPages + 1 });
	};

	const updateDrug = item => {
		const items = updateImmutable(drugs, item);
		setDrugs(items);
	};

	return (
		<>
			<div className="element-box m-0 mb-4 p-3">
				<form className="row">
					<div className="form-group col-md-4">
						<label className="mr-2">Search</label>
						<input
							style={{ height: '32px' }}
							id="search"
							className="form-control"
							name="search"
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
					</div>
					<div className="form-group col-md-4 mt-4">
						<a
							className="btn btn-sm btn-primary btn-upper text-white"
							onClick={() => {
								setHasSearched(true);
								filterEntries();
							}}
						>
							<i className="os-icon os-icon-ui-37" />
							<span>Filter</span>
						</a>
						{hasSearched && (
							<a
								className="btn btn-sm btn-secondary btn-upper text-white"
								onClick={async () => {
									setHasSearched(false);
									setSearch('');
									await loadDrugs(1, '');
								}}
							>
								<i className="os-icon os-icon-close" />
							</a>
						)}
					</div>
				</form>
			</div>
			<div className="element-box m-0 mb-4 p-3">
				<div className="table table-responsive">
					{!loaded ? (
						<TableLoading />
					) : (
						<>
							<table className="table table-striped">
								<thead>
									<tr>
										<th>Drug Name</th>
										<th>Generic Name</th>
										<th>Unit of Measure</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{drugs.map((item, index) => {
										return (
											<tr key={index}>
												<td>{item.name}</td>
												<td>{item.generic.name}</td>
												<td>{item.unitOfMeasure}</td>
												<td className="row-actions">
													<Tooltip title="Edit Drug">
														<a className="info" onClick={() => editDrug(item)}>
															<i className="os-icon os-icon-ui-49" />
														</a>
													</Tooltip>
													<Tooltip title="Manage Batches">
														<a
															className="secondary"
															onClick={() => openBatches(item)}
														>
															<i className="os-icon os-icon-ui-46 ml-1" />
														</a>
													</Tooltip>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							{meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalPages, 10)}
										showTotal={total => `Total ${total} items`}
										itemRender={itemRender}
										onChange={current => onNavigatePage(current)}
										showSizeChanger={false}
									/>
								</div>
							)}
						</>
					)}
				</div>
			</div>
			{showNewDrug && (
				<ModalNewDrug closeModal={closeModal} addDrug={addDrug} />
			)}
			{showNewGeneric && <ModalNewGeneric closeModal={closeModal} />}
			{showDrugModal && drug && (
				<ModalEditDrug
					drug={drug}
					closeModal={closeModal}
					updateDrug={updateDrug}
				/>
			)}
			{showModal && drug && (
				<ModalViewBatches drug={drug} closeModal={closeModal} />
			)}
		</>
	);
};

export default Inventory;
