/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import InvCategories from '../components/InvCategories';
import InvSubCategories from '../components/InvSubCategories';

const InventoryCategories = () => {
	const [tab, setTab] = useState('categories');

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
											<a className={tab === 'categories' ? 'nav-link active' : 'nav-link'}  onClick={() => setTab('categories')}>CATEGORIES</a>
										</li>
										<li className="nav-item">
											<a className={tab === 'sub_categories' ? 'nav-link active' : 'nav-link'} onClick={() => setTab('sub_categories')}>SUB CATEGORIES</a>
										</li>
									</ul>
								</div>
							</div>
							{tab === 'categories' && <InvCategories />}
             		 		{tab === 'sub_categories' && <InvSubCategories />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InventoryCategories;
