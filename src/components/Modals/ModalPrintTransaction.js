import React from 'react';
import T2W from 'numbers2words';

import {
	formatDate,
	patientname,
	staffname,
	formatCurrency,
} from '../../services/utilities';
import { APP_NAME } from '../../services/constants';

const translator = new T2W('EN_US');

const ModalPrintTransaction = ({ transaction, closeModal }) => {
	const printReceipt = () => {
		const content = document.getElementById('divcontents');
		const pri = document.getElementById('ifmcontentstoprint').contentWindow;
		pri.document.open();
		pri.document.write(
			'<style>@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500); body { font-family: Rubik; }</style>' +
				content.innerHTML
		);
		pri.document.close();
		pri.focus();
		pri.print();
		closeModal();
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '480px' }}
			>
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}
					>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div
						className="onboarding-content with-gradient"
						style={{ backgroundImage: 'none' }}
					>
						<div
							className="onboarding-content with-gradient"
							id="divcontents"
							style={{ backgroundImage: 'none' }}
						>
							<div
								style={{
									fontSize: '20px',
									borderBottom: '1px dashed',
									textAlign: 'center',
								}}
							>{`Receipt #: ${transaction.id}`}</div>
							<div
								style={{
									marginTop: '6px',
									fontSize: '22px',
									textAlign: 'center',
								}}
							>
								{APP_NAME}
							</div>
							<div style={{ textAlign: 'center', fontSize: '12px' }}>
								Plot 1847, Cadastal Zone B07, Katampe Behind ABC Cargo, Abuja
								Municipal Area Council, FCT.
							</div>
							<div
								style={{
									textAlign: 'center',
									fontSize: '12px',
									marginTop: '4px',
								}}
							>
								{`Transaction Date: ${formatDate(
									transaction.createdAt,
									'YYYY MMM, DD'
								)}`}
							</div>
							<div
								style={{
									textAlign: 'left',
									fontSize: '12px',
									marginTop: '12px',
									borderBottom: '1px dashed',
								}}
							>
								{`Received from: ${patientname(transaction.patient, true)}`}
							</div>
							<div
								style={{
									marginTop: '8px',
									textAlign: 'left',
									fontSize: '13px',
								}}
							>
								{`The sum of ${translator.toWords(
									transaction.amount
								)} (${formatCurrency(transaction.amount)})`}
							</div>
							<div
								style={{
									textAlign: 'left',
									fontWeight: 'bold',
									marginTop: '2px',
									fontSize: '12px',
								}}
							>
								Outstanding Balance: NGN0.00
							</div>
							<div
								style={{
									textAlign: 'left',
									fontWeight: 'bold',
									paddingBottom: '6px',
									fontSize: '12px',
								}}
							>
								{`Cashier: ${staffname(transaction.cashier)}`}
							</div>
							<div
								style={{
									padding: '8px',
									borderBottom: '1px dashed',
									height: '32px',
								}}
							></div>
						</div>
						<button className="btn" onClick={printReceipt}>
							print
						</button>
					</div>
				</div>
			</div>
			<iframe
				id="ifmcontentstoprint"
				title="print"
				style={{ height: '0px', width: '0px', position: 'absolute' }}
			></iframe>
		</div>
	);
};

export default ModalPrintTransaction;
