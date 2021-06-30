import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';

import { groupBy, request } from '../../services/utilities';
import { notifyError } from '../../services/notify';

const SelectDrug = ({ onHide, setDrug, hmo }) => {
	const [genericName, setGenericName] = useState(null);
	const [drugItem, setDrugItem] = useState(null);
	const [drugs, setDrugs] = useState([]);

	const getServiceUnit = useCallback(async () => {
		try {
			const res = await request('inventory/categories', 'GET', true);
			if (res && res.length > 0) {
				const selectCat = res.find(cat => cat.name === 'Pharmacy');

				const url = `inventory/stocks-by-category/${selectCat.id}/${hmo.id}`;
				const rs = await request(url, 'GET', true);
				setDrugs(rs);
			}
		} catch (error) {
			notifyError('Error fetching Service Unit');
		}
	}, [hmo]);

	useEffect(() => {
		getServiceUnit();
	}, [getServiceUnit]);

	// group drugs by generic name
	const drugValues = groupBy(
		drugs.filter(drug => drug.generic_name !== null),
		'generic_name'
	);

	// list of drugs by generic name
	const drugObj = Object.keys(drugValues).map(name => ({
		generic_name: name,
		drugs: drugValues[name],
	}));

	// list generic names
	const genericNames = Object.keys(drugValues).map(name => ({
		value: name,
		label: name,
	}));

	// list of drugs
	const genericItem = drugObj.find(
		drug => genericName && drug.generic_name === genericName
	);

	const drugList = genericItem
		? genericItem.drugs.map(drug => ({
				value: drug.id,
				label: drug.name,
		  }))
		: [];

	const selectDrug = () => {
		setDrug(drugItem);
		onHide();
	};

	return (
		<div
			className="onboarding-modal fade animated show"
			role="dialog"
			style={{ width: '300px' }}>
			<div className="modal-centered" role="document">
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => onHide()}>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<div className="form-block">
							<div className="row">
								<div className="form-group col-sm-12">
									<label>Drug Generic Name</label>
									<Select
										placeholder="--select generic name--"
										defaultValue=""
										onChange={e => {
											setGenericName(e.value);
											setDrugItem(null);
										}}
										isSearchable={true}
										options={genericNames}
										name="generic_name"
									/>
								</div>
							</div>
							<div className="form-group col-sm-12 relative">
								<label>Drug Name</label>
								{drugItem && (
									<div className="posit-top">
										<div className="row">
											<div className="col-sm-12">
												<span
													className={`badge badge-${
														drugItem.quantity > 0 ? 'info' : 'danger'
													} text-white`}>{`Stock Level: ${drugItem.quantity}; Base Price: ₦${drugItem.sales_price}`}</span>
											</div>
										</div>
									</div>
								)}
								<Select
									placeholder="--select drug name--"
									options={drugList}
									defaultValue=""
									isSearchable={true}
									onChange={e => {
										const drug = drugs.find(drug => drug.id === e.value);
										setDrugItem(drug);
									}}
									name="drug_name"
								/>
							</div>
							<div className="row">
								<div className="col-sm-12 text-right">
									<button
										className="btn btn-primary"
										onClick={() => selectDrug()}>
										save
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SelectDrug;
