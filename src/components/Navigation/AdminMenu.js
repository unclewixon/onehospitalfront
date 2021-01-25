import React from 'react';

import ClinicalLabMenu from './ClinicalLabMenu';
import PayPointMenu from './PayPointMenu';
import PharmacyMenu from './PharmacyMenu';
import RadiologyMenu from './RadiologyMenu';
import PhysiotherapyMenu from './PhysiotherapyMenu';
import NurseMenu from './NurseMenu';
import DoctorMenu from './DoctorMenu';
import HrMenu from './HrMenu';
import InventoryMenu from './InventoryMenu';
import CafeteriaMenu from './CafeteriaMenu';
import HMOMenu from './HMOMenu';
import Account from './Account';
import SettingsMenu from './SettingsMenu';
import FrontDeskMenu from './FrontDeskMenu';

const AdminMenu = ({ role }) => {
	return (
		<>
			<li className="sub-header">
				<span>FRONTDESK</span>
			</li>
			<FrontDeskMenu />
			<li className="sub-header">
				<span>CLINICAL LAB</span>
			</li>
			<ClinicalLabMenu />
			<li className="sub-header">
				<span>PAYPOINT</span>
			</li>
			<PayPointMenu />
			<li className="sub-header">
				<span>PHARMACY</span>
			</li>
			<PharmacyMenu />
			<li className="sub-header">
				<span>RADIOLOGY</span>
			</li>
			<RadiologyMenu />

			<li className="sub-header">
				<span>PHYSIOTHERAPY</span>
			</li>
			<PhysiotherapyMenu />
			<li className="sub-header">
				<span>NURSES</span>
			</li>
			<NurseMenu />
			<li className="sub-header">
				<span>DOCTOR</span>
			</li>
			<DoctorMenu />
			<li className="sub-header">
				<span>HR & PAYROLL</span>
			</li>
			<HrMenu />
			<li className="sub-header">
				<span>INVENTORY</span>
			</li>
			<InventoryMenu />
			<li className="sub-header">
				<span>CAFETERIA</span>
			</li>
			<CafeteriaMenu />
			<li className="sub-header">
				<span>HMO MGT</span>
			</li>
			<HMOMenu />
			<li className="sub-header">
				<span>ACCOUNTING & REPORT</span>
			</li>
			<Account />
			<SettingsMenu role={role} />
		</>
	);
};

export default AdminMenu;
