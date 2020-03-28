import React from 'react';
import Popover from 'antd/lib/popover';
import moment from 'moment';

import TakeReadings from '../Vitals/TakeReadings';

const Reading = ({ vital, visible, info, setVisible, unit }) => {
	return (
		<div className="col-4">
			<div className="text-center">
				<div className="last-reading">{`Last ${info.title} Reading:`}</div>
				{vital ? (
					<div className="reading">{`${vital._reading} ${unit}`}</div>
				) : (
					<div className="reading">-</div>
				)}
				{vital && (
					<div className="time-captured">{`on ${moment(vital.createdAt).format(
						'DD-MMM-YYYY h:mma'
					)}`}</div>
				)}
				<div className="new-reading">
					<Popover
						title=""
						overlayClassName="vitals"
						content={
							<TakeReadings info={info} doHide={() => setVisible(false)} />
						}
						trigger="click"
						visible={visible}
						onVisibleChange={status => setVisible(status)}>
						<div>Take New Reading</div>
					</Popover>
				</div>
			</div>
		</div>
	);
};

export default Reading;
