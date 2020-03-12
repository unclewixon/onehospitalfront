/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import RoleBlock from '../../components/RoleBlock';
import Permission from '../../components/Permission';

const Roles = () => {
	const [tab, setTab] = useState('roles');

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
											<a className={tab === 'roles' ? 'nav-link active' : 'nav-link'}  onClick={() => setTab('roles')}>ROLES</a>
										</li>
										<li className="nav-item">
											<a className={tab === 'permissions' ? 'nav-link active' : 'nav-link'} onClick={() => setTab('permissions')}>PERMISSIONS</a>
										</li>
									</ul>
								</div>
							</div>
							{tab === 'roles' && <RoleBlock />}
             		 		{tab === 'permissions' && <Permission />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Roles;
