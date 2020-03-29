/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import LabTest from '../../components/LabTest';
import LabParameter from '../../components/LabParameter';
import LabCategory from '../../components/LabCategory';
import LabGroup from '../../components/LabGroup';

const Laboratory = () => {
	const [ShowLabTest, setLabTest] = useState(true);
	const [ShowLabParameter, SetLabParameter] = useState(false);
	const [ShowLabCategory, SetLabCategory] = useState(false);
	const [ShowLabGroup, SetLabGroup] = useState(false);

	const onLabTest = () => {
		setLabTest(true);
		SetLabParameter(false);
		SetLabCategory(false);
		SetLabGroup(false);
	};

	const onLabParameter = () => {
		setLabTest(false);
		SetLabParameter(true);
		SetLabCategory(false);
		SetLabGroup(false);
	};

	const onLabCategory = () => {
		setLabTest(false);
		SetLabParameter(false);
		SetLabCategory(true);
		SetLabGroup(false);
	};

	const onLabGroup = () => {
		setLabTest(false);
		SetLabParameter(false);
		SetLabCategory(false);
		SetLabGroup(true);
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="os-tabs-w mx-1">
								<div className="os-tabs-controls">
									<ul className="nav nav-tabs upper">
										<li className="nav-item">
											<a
												aria-expanded="false"
												className={
													ShowLabCategory ? 'nav-link active' : 'nav-link'
												}
												data-toggle="tab"
												onClick={onLabCategory}>
												Categories
											</a>
										</li>
										<li className="nav-item">
											<a
												aria-expanded="false"
												className={
													ShowLabParameter ? 'nav-link active' : 'nav-link'
												}
												data-toggle="tab"
												onClick={onLabParameter}>
												Parameters
											</a>
										</li>
										<li className="nav-item">
											<a
												aria-expanded="true"
												className={ShowLabTest ? 'nav-link active' : 'nav-link'}
												data-toggle="tab"
												onClick={onLabTest}>
												Tests
											</a>
										</li>
										<li className="nav-item">
											<a
												aria-expanded="false"
												className={
													ShowLabGroup ? 'nav-link active' : 'nav-link'
												}
												data-toggle="tab"
												onClick={onLabGroup}>
												Groups
											</a>
										</li>
									</ul>
								</div>
							</div>
							{ShowLabTest === true && <LabTest />}
							{ShowLabParameter === true && <LabParameter />}
							{ShowLabCategory === true && <LabCategory />}
							{ShowLabGroup === true && <LabGroup />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Laboratory;
