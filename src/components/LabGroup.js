/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import Tooltip from 'antd/lib/tooltip';

import { confirmAction, request, updateImmutable } from '../services/utilities';
import waiting from '../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../services/notify';
import TableLoading from './TableLoading';

const LabGroup = () => {
	const initialState = {
		name: '',
		labs: '',
		description: '',
		edit: false,
		create: true,
	};
	const [{ name, description }, setState] = useState(initialState);
	const [loaded, setLoaded] = useState(false);
	const [{ edit, create }, setSubmitButton] = useState(initialState);
	const [group, setGroup] = useState(null);
	const [groups, setGroups] = useState([]);
	const [labTests, setLabTests] = useState([]);
	const [submitting, setSubmitting] = useState(false);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const fetchGroup = useCallback(async () => {
		try {
			const url = 'lab-tests/groups';
			const rs = await request(url, 'GET', true);
			setGroups([...rs]);
			setLoaded(true);
		} catch (e) {
			setSubmitting(false);
			notifyError(e.message || 'could not fetch test groups');
			setLoaded(true);
		}
	}, []);

	useEffect(() => {
		if (!loaded) {
			fetchGroup();
		}
	}, [loaded, fetchGroup]);

	const onAddGroup = async e => {
		try {
			e.preventDefault();
			setSubmitting(true);
			const data = {
				name,
				description,
				lab_tests: [...labTests],
			};
			const url = 'lab-tests/groups';
			const rs = await request(url, 'POST', true, data);
			setGroups([...groups, rs]);
			setState({ ...initialState });
			setLabTests([]);
			setSubmitting(false);
			notifySuccess('Lab group created!');
		} catch (error) {
			setSubmitting(false);
			notifyError('Error creating test group');
		}
	};

	const onEditGroup = async e => {
		try {
			e.preventDefault();
			setSubmitting(true);
			const data = {
				name,
				description,
				lab_tests: [...labTests],
			};
			const url = `lab-tests/groups/${group.id}`;
			const rs = await request(url, 'PATCH', true, data);
			const newGroups = updateImmutable(groups, rs);
			setGroups([...newGroups]);
			setState({ ...initialState });
			setLabTests([]);
			setSubmitButton({ create: true, edit: false });
			setSubmitting(false);
			notifySuccess('Lab group updated!');
		} catch (error) {
			console.log(error);
			setSubmitting(false);
			notifyError('Error updating test group');
		}
	};

	const onClickEdit = data => {
		setSubmitButton({ edit: true, create: false });
		setState(prevState => ({
			...prevState,
			name: data.name,
			description: data.description || '',
		}));
		setLabTests(data.tests.map(t => ({ ...t.labTest })));
		setGroup(data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ ...initialState });
		setState({ ...initialState });
		setGroup(null);
		setLabTests([]);
	};

	const onDeleteGroup = async item => {
		try {
			const url = `lab-tests/groups/${item.id}`;
			const rs = await request(url, 'DELETE', true);
			const newGroups = groups.filter(s => item.id !== parseInt(rs.id, 10));
			setGroups(newGroups);
			setLoaded(false);
			notifySuccess('Lab group deleted');
		} catch (error) {
			notifyError('Error deleting lab group');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeleteGroup, data);
	};

	const getOptions = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `lab-tests/unpaginated?q=${q}`;
		const res = await request(url, 'GET', true);
		return res.result;
	};

	return (
		<div className="row">
			<div className="col-lg-8">
				<div className="pipelines-w">
					<div className="row">
						{!loaded ? (
							<TableLoading />
						) : (
							<>
								{groups.map((item, i) => {
									return (
										<div className="col-lg-6 mb-2" key={i}>
											<div className="pipeline white p-1 mb-2">
												<div className="pipeline-body">
													<div className="pipeline-item">
														<div className="pi-controls">
															<div className="pi-settings os-dropdown-trigger">
																<Tooltip title="Edit Group">
																	<i
																		className="os-icon os-icon-ui-49 mr-1"
																		onClick={() => onClickEdit(item)}
																	/>
																</Tooltip>
																<Tooltip title="Delete Test">
																	<i
																		className="os-icon os-icon-ui-15 text-danger"
																		onClick={() => confirmDelete(item)}
																	/>
																</Tooltip>
															</div>
														</div>
														<div className="pi-body mt-2">
															<div className="pi-info">
																<div className="h6 pi-name h7">{item.name}</div>
																<div className="pi-sub mt-2">
																	{item.tests.map((s, i) => (
																		<span key={i} className="gp-block">
																			{`• ${s.labTest.name} (${s.labTest.category.name})`}
																		</span>
																	))}
																</div>
															</div>
														</div>
														<div className="pi-foot">
															<div className="tags"></div>
															<a className="extra-info">
																<span>{`${item.tests.length} tests`}</span>
															</a>
														</div>
													</div>
												</div>
											</div>
										</div>
									);
								})}
								{groups.length === 0 && (
									<div
										className="alert alert-info text-center"
										style={{ width: '100%' }}
									>
										No test group found!
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</div>
			<div className="col-lg-4">
				<div className="pipeline white lined-warning">
					<form onSubmit={edit ? onEditGroup : onAddGroup}>
						<h6 className="form-header">{`${
							edit ? 'Edit' : 'Create'
						} Group`}</h6>
						<div className="form-group mt-2">
							<input
								className="form-control"
								placeholder="Name"
								type="text"
								onChange={handleInputChange}
								name="name"
								value={name}
							/>
						</div>
						<div className="row">
							<div className="form-group col-sm-12">
								<label htmlFor="labs">Select Lab Test</label>
								<AsyncSelect
									isMulti
									getOptionValue={option => option.id}
									getOptionLabel={option => option.name}
									defaultOptions
									value={labTests}
									name="labs"
									loadOptions={getOptions}
									onChange={e => {
										setLabTests(e);
									}}
									placeholder="Search lab test"
								/>
							</div>
						</div>
						<div className="form-group">
							<textarea
								className="form-control"
								placeholder="Description"
								type="textarea"
								name="description"
								onChange={handleInputChange}
								value={description}
								rows={4}
							/>
						</div>
						<div className="form-buttons-w">
							{create && (
								<button className="btn btn-primary" disabled={submitting}>
									{submitting ? (
										<img src={waiting} alt="submitting" />
									) : (
										<span>create</span>
									)}
								</button>
							)}
							{edit && (
								<>
									<button
										className="btn btn-secondary ml-3"
										disabled={submitting}
										onClick={cancelEditButton}
									>
										<span>cancel</span>
									</button>
									<button className="btn btn-primary" disabled={submitting}>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											<span>save</span>
										)}
									</button>
								</>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LabGroup;
