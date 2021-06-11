import React from 'react';
import { Link } from 'react-router-dom';

const PayPointMenu = () => {
	return (
		<>
			<li>
				<Link to="/paypoint">
					<div className="icon-w">
						<div className="icon-feather-home" />
					</div>
					<span>Home</span>
				</Link>
			</li>
			<li>
				<Link to="/paypoint/new-transaction">
					<div className="icon-w">
						<div className="icon-feather-plus-square" />
					</div>
					<span>New Transaction</span>
				</Link>
			</li>

			<li>
				<Link to="/paypoint/pending-bills">
					<div className="icon-w">
						<div className="icon-feather-file-text" />
					</div>
					<span>Pending Bills</span>
				</Link>
			</li>
			<li>
				<Link to="/paypoint/transaction-history">
					<div className="icon-w">
						<div className="os-icon os-icon-agenda-1" />
					</div>
					<span>Transaction History</span>
				</Link>
			</li>
			<li>
				<Link to="/paypoint/insurance-bills">
					<div className="icon-w">
						<div className="os-icon os-icon-ui-55" />
					</div>
					<span>Insurance Bills</span>
				</Link>
			</li>
			<li>
				<Link to="/paypoint/vouchers">
					<div className="icon-w">
						<div className="os-icon os-icon-newspaper" />
					</div>
					<span>Vouchers</span>
				</Link>
			</li>
			<li>
				<Link to="/paypoint/proforma-invoice">
					<div className="icon-w">
						<div className="os-icon os-icon-newspaper" />
					</div>
					<span>Proforma Invoice</span>
				</Link>
			</li>
		</>
	);
};

export default PayPointMenu;
