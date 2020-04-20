import React from 'react';

const LabParameterPicker = ({
	parameters,
	parameterArray,
	handleParamInputChange,
	index,
	removeParams,
}) => {
	return (
	<div className="pt-3">
		<div className="pipeline-item">
			<div className="pi-controls">
				<div className="pi-settings os-dropdown-trigger">
					<i
						className="os-icon os-icon-ui-15"
						onClick={() => removeParams(index)}></i>
				</div>
			</div>
			<div className="pi-body mt-3">
				<div className="row">
					<div className="col-5">
						<select
							className="form-control"
							name="parameter"
							onChange={e => handleParamInputChange(e, index)}
							value={
								parameters &&
								parameters[index] &&
								parameters[index].parameter_id
									? parameters[index].parameter_id
									: ''
							}>
							<option value={''}>Select Parameter</option>
							{parameterArray && parameterArray.length
								? parameterArray.map((parameter, i) => {
										return (
											<option key={i} value={parameter.id}>
												{parameter.name}
											</option>
										);
								  })
								: null}
						</select>
					</div>
					<div className="col-7">
						<input
							className="form-control"
							placeholder="Enter Range"
							type="text"
							name="referenceRange"
							onChange={e => handleParamInputChange(e, index)}
							value={
								parameters &&
								parameters[index] &&
								parameters[index].referenceRange
									? parameters[index].referenceRange
									: ''
							}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
);
}
export default LabParameterPicker;
