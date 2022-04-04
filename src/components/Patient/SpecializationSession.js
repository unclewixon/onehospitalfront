import React from 'react';

const SpeciliazationSession = ({
	parameters,
	parameterArray,
	handleParamInputChange,
	index,
	removeParams,
}) => {
	// const [specialization, setSpecialization] = useState('');
	// const [count, setCount] = useState(0);

	// const handleChange = e => {
	// 	if (e.target.name === 'specialization') {
	// 		setSpecialization(e.target.value);
	// 	} else {
	// 		setCount(e.target.value);
	// 	}
	// };

	return (
		<div className="w-100 my-2 px-2">
			<div className="pipeline-item">
				<div className="pi-controls">
					<div className="pi-settings os-dropdown-trigger">
						<i
							className="os-icon os-icon-ui-15"
							style={{ fontSize: '1rem' }}
							onClick={() => removeParams(index)}
						></i>
					</div>
				</div>
				<div className="pi-body">
					<div className="col-6">
						<select
							className="form-control"
							name="specialization"
							defaultValue={
								parameters &&
								parameters[index] &&
								parameters[index].specialization
									? parameters[index].specialization
									: ''
							}
							onChange={e => handleParamInputChange(e, index)}
						>
							<option value={''}>Select service to request</option>
							{parameterArray && parameterArray.length
								? parameterArray.map((parameter, i) => {
										return (
											<option key={i} value={parameter.label}>
												{parameter.label}
											</option>
										);
								  })
								: null}
						</select>
					</div>
					<div className="col-6">
						<input
							className="form-control"
							placeholder="Enter Range"
							type="number"
							name="sessionCount"
							defaultValue={
								parameters &&
								parameters[index] &&
								parameters[index].sessionCount
									? parameters[index].sessionCount
									: 0
							}
							min="0"
							onChange={e => handleParamInputChange(e, index)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SpeciliazationSession;
