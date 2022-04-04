/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, forwardRef, useCallback, useEffect } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import { formatDate, getGestationAge } from '../services/utilities';

const ExtraBlock = ({ module, item, onSelectLmpDate }) => {
	const [isset, setIsset] = useState(false);
	const [startDate, setStartDate] = useState(new Date());

	const init = useCallback(() => {
		const lmp = item && item.lmp ? new Date(moment(item.lmp)) : new Date();
		setStartDate(lmp);
	}, [item]);

	useEffect(() => {
		if (!isset) {
			init();
			setIsset(true);
		}
	}, [init, isset]);

	let pregnancy_history = null;
	try {
		pregnancy_history = JSON.parse(item.pregnancy_history);
	} catch (e) {
		pregnancy_history = item.pregnancy_history;
	}

	const CustomInput = forwardRef(({ value, onClick }, ref) => (
		<a className="text-bold ml-3" onClick={onClick} ref={ref}>
			<i className="os-icon os-icon-edit-32" />
		</a>
	));

	return (
		<div className="element-box m-0 p-0 mb-4">
			{module === 'ivf' && (
				<ul className="breadcrumb px-3">
					<>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Pregnancy Test Date: ${moment(
								item.pregnancyTestDate
							).format('DD-MMM-YYYY')}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Pregnancy Result: ${
								item?.result || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Indication: ${
								item?.indication || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Treatment Plan: ${
								item?.treatmentPlan || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Prognosis: ${
								item?.prognosis || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`No. of Embryo Transfer: ${
								item?.noOfEmbryoTransfer || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`No Of Oocyte Retrieved: ${
								item?.noOfOocyteRetrieved || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Assessment Comments: ${
								item?.assessmentComments || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Endometric Thickness: ${
								item?.endometricThickness || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Treatment Date: ${
								item.pregnancyTestDate
									? moment(item.pregnancyTestDate).format('DD-MMM-YYYY')
									: '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Transfer Date: ${
								item.embryoTransferDate
									? moment(item.embryoTransferDate).format('DD-MMM-YYYY')
									: '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Commencement Date: ${
								item.dateOfCommencement
									? moment(item.dateOfCommencement).format('DD-MMM-YYYY')
									: '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Stimulation Date: ${
								item.dateOfStimulation
									? moment(item.dateOfStimulation).format('DD-MMM-YYYY')
									: '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Wife Blood Group: ${
								item?.wifeLabDetails?.bloodGroup || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Wife Chlamyda: ${
								item?.wifeLabDetails?.chlamyda || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Wife Genotype: ${
								item?.wifeLabDetails?.genotype || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Wife Hormonals (LH): ${
								item?.wifeLabDetails?.hormonals?.lh || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Wife Hormonals (AMH): ${
								item?.wifeLabDetails?.hormonals?.amh || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Wife Hormonals (FSH): ${
								item?.wifeLabDetails?.hormonals?.fsh || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Wife Hormonals (PROL): ${
								item?.wifeLabDetails?.hormonals?.prol || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Wife Serology (HIV): ${
								item?.wifeLabDetails?.serology?.hiv || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Wife Serology (HEPB): ${
								item?.wifeLabDetails?.serology?.hepb || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Wife Serology (HEPC): ${
								item?.wifeLabDetails?.serology?.hepc || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Wife Serology (VDRL): ${
								item?.wifeLabDetails?.serology?.vdrl || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Husband Blood Group: ${
								item?.husbandLabDetails?.bloodGroup || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Husband Fasting Blood Sugar: ${
								item?.husbandLabDetails?.fastingBloodSugar || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Husband Genotype: ${
								item?.husbandLabDetails?.genotype || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Husband Random Blood Sugar: ${
								item?.husbandLabDetails?.randomBloodSugar || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Husband Hormonals (LH): ${
								item?.husbandLabDetails?.hormonals?.lh || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Husband Hormonals (PROL): ${
								item?.husbandLabDetails?.hormonals?.prol || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Husband Hormonals (FSH): ${
								item?.husbandLabDetails?.hormonals?.fsh || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Husband Hormonals (Testosterone): ${
								item?.husbandLabDetails?.hormonals?.testosterone || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Husband Serology (HIV): ${
								item?.husbandLabDetails?.serology?.hiv || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Husband Serology (HEPB): ${
								item?.husbandLabDetails?.serology?.hepb || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Husband Serology (HEPC): ${
								item?.husbandLabDetails?.serology?.hepc || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Husband Serology (VDRL): ${
								item?.husbandLabDetails?.serology?.vdrl || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`SFA Andrology Count: ${
								item?.husbandLabDetails?.sfaAndrology?.count || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`SFA Andrology Morphility: ${
								item?.husbandLabDetails?.sfaAndrology?.morphility || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`SFA Andrology Mortility: ${
								item?.husbandLabDetails?.sfaAndrology?.mortility || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`SFA Andrology Summary: ${
								item?.husbandLabDetails?.sfaAndrology?.summary || '--'
							}`}</a>
						</li>
					</>
				</ul>
			)}
			{module === 'antenatal' && (
				<ul className="breadcrumb px-3">
					<>
						<li className="breadcrumb-item">
							<a className="no-pointer text-bold">{`ANC #: ${item.serial_code}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">Husband</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Enrolled: ${formatDate(
								item.createdAt,
								'DD MMM, YYYY'
							)}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Package: ${
								item.ancpackage?.name || 'Nil'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Reason: ${item.booking_period}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">
								LMP:{' '}
								<span className="text-dotted-underline text-primary">{`${formatDate(
									item.lmp,
									'MMM Do, YYYY'
								)}`}</span>
							</a>
							<DatePicker
								selected={startDate}
								onChange={date => {
									setStartDate(date);
									onSelectLmpDate(date);
								}}
								customInput={<CustomInput />}
								dateFormat="dd-MMM-yyyy"
								maxDate={new Date()}
							/>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`EDD: ${formatDate(
								item.edd,
								'DD MMM, YYYY'
							)}`}</a>
						</li>
					</>
				</ul>
			)}
			{module === 'antenatal' && (
				<ul className="breadcrumb px-3">
					<>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Gravida: ${
								pregnancy_history?.gravida
									? pregnancy_history?.gravida.replace(/[^0-9]/g, '')
									: '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Para: ${
								pregnancy_history?.para || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Alive: ${
								pregnancy_history?.alive || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Miscarriages: ${
								pregnancy_history?.miscarriage || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Abortions: ${
								pregnancy_history?.abortion || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Gestation Age: ${getGestationAge(
								item.lmp
							)}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`No. of days to delivery: ${moment(
								item.edd
							).diff(moment(), 'days')} day(s)`}</a>
						</li>
					</>
				</ul>
			)}
		</div>
	);
};

export default ExtraBlock;
