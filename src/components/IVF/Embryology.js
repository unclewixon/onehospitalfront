/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import EmbryoTransfer from './EmbryoTransfer';
import EmbryoAssessment from './EmbryoAssessment';
import IcsiRecord from './IcsiRecord';
import SpermPreparation from './SpermPreparation';
import TreatmentChart from './TreatmentChart';

const Embryology = () => {
	const [tab, setTab] = useState('chart');

	return (
		<div className="col-sm-12">
			<div className="element-wrapper embryology">
				<div className="os-tabs-w">
					<div className="os-tabs-controls os-tabs-complex">
						<ul className="nav nav-tabs">
							<li className="nav-item">
								<a
									className={`nav-link ${tab === 'chart' ? 'active' : ''}`}
									onClick={() => setTab('chart')}
								>
									<span className="tab-label">TREATMENT CHART</span>
								</a>
							</li>
							<li className="nav-item">
								<a
									className={`nav-link ${
										tab === 'sperm-preparation' ? 'active' : ''
									}`}
									onClick={() => setTab('sperm-preparation')}
								>
									<span className="tab-label">SPERM PREPARATION</span>
								</a>
							</li>
							<li className="nav-item">
								<a
									className={`nav-link ${tab === 'icsi' ? 'active' : ''}`}
									onClick={() => setTab('icsi')}
								>
									<span className="tab-label">ICSI</span>
								</a>
							</li>
							<li className="nav-item">
								<a
									className={`nav-link ${tab === 'assessment' ? 'active' : ''}`}
									onClick={() => setTab('assessment')}
								>
									<span className="tab-label">EMBRYO ASSESSMENT</span>
								</a>
							</li>
							<li className="nav-item">
								<a
									className={`nav-link ${tab === 'transfer' ? 'active' : ''}`}
									onClick={() => setTab('transfer')}
								>
									<span className="tab-label">EMBRYO TRANSFER</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="element-box-tp p-3">
					<div className="row">
						<div className="col-md-12">
							{tab === 'assessment' && <EmbryoAssessment />}
							{tab === 'transfer' && <EmbryoTransfer />}
							{tab === 'icsi' && <IcsiRecord />}
							{tab === 'sperm-preparation' && <SpermPreparation />}
							{tab === 'chart' && <TreatmentChart />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Embryology;
