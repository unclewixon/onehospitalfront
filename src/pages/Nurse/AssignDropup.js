import React from 'react';
import Popover from 'antd/lib/popover';
import AssignBed from './AssignBed';

const AssignDropup = ({ onModalClick, visible, setVisible }) => {
	return (
		<div className="col-4">
			<div className="text-right">
				<div className="new-reading">
					{/* <AssignBed doHide={() => setVisible(true)} /> */}
					<Popover
						title=""
						overlayClassName="vital"
						content={
							<AssignBed
								onModalClick={onModalClick}
								doHide={() => setVisible(false)}
							/>
						}
						trigger="click"
						visible={visible}></Popover>
				</div>
			</div>
		</div>
	);
};

export default AssignDropup;
