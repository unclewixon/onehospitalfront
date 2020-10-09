/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useState } from 'react';
import Select from 'react-select';
import searchingGIF from '../../assets/images/searching.gif';
// import Tooltip from 'antd/lib/tooltip';
import { Link } from 'react-router-dom';
import ModalSelectBed from './../../components/Modals/ModalSelectBed';
import AssignBed from './AssignBed';
import Popover from 'antd/lib/popover';
import AssignDropup from './AssignDropup';

{
	/* <Popover
	title=""
	overlayClassName="vitals"
	content={<AssignBed showModal={showModal} onModalClick={onModalClick} />}
	trigger="click"
	onVisibleChange={status => onModalClick(status)}
/>; */
}

const InPatientCare = () => {
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [visible, setVisible] = useState(true);

	const customStyle = {
		control: (provided, state) => ({
			...provided,
			minHeight: '24px !important',
			height: '2rem',
			width: '12rem',
		}),
	};

	const filteredOptions = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' },
	];

	useEffect(() => {
		if (loading) {
			setLoading(false);
		}
	}, [loading]);

	const onModalClick = () => {
		setShowModal(!showModal);
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="element-actions">
								<Select
									styles={customStyle}
									id="patientId"
									isSearchable={true}
									name="patientId"
									options={filteredOptions}
									placeholder="Filler by..."
									// onChange={e => setPatientName(e.target.value)}
								/>
							</div>
							<h6 className="element-header">List of Patients in care</h6>
							{showModal ? (
								<div className="text-right">
									<AssignDropup
										visible={visible}
										onModalClick={onModalClick}
										setVisible={setVisible}
									/>
								</div>
							) : // <AssignBed showModal={showModal} onModalClick={onModalClick} />
							null}
							<div className="element-content">
								<div className="table-responsive">
									{
										<table className="table table-striped">
											<thead>
												<tr>
													<th>
														<div className="th-inner sortable both">
															Patient Name
														</div>
													</th>
													<th>
														<div className="th-inner sortable both">
															File Number
														</div>
													</th>
													<th>
														<div className="th-inner sortable both">
															Gender/Age
														</div>
													</th>
													<th>
														<div className="th-inner sortable both">
															Admitted By
														</div>
													</th>
													<th>
														<div className="th-inner sortable both">Action</div>
													</th>
												</tr>
											</thead>
											<tbody>
												{loading ? (
													<tr>
														<td colSpan="7" className="text-center">
															<img alt="searching" src={searchingGIF} />
														</td>
													</tr>
												) : (
													<Fragment>
														<tr>
															<td>My name</td>
															<td>DEDA-000111222</td>
															<td>Male</td>
															<td>Doctor's Name</td>
															<td>
																<div style={{ color: '#fff' }}>
																	<a
																		onClick={onModalClick}
																		className="btn btn-success btn-sm">
																		<i className="os-icon os-icon-user"></i>
																		<span>Assign Bed</span>
																	</a>
																</div>
															</td>
														</tr>
													</Fragment>
												)}
											</tbody>
										</table>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InPatientCare;
