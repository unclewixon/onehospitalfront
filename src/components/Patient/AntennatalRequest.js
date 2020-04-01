import React, { Component, lazy, Suspense } from 'react';
import Splash from '../Splash';

const General = lazy(() => import('../Enrollment/General'));
const FathersInfo = lazy(() => import('../Enrollment/FathersInfo'));
const ObstericsHistory = lazy(() => import('../Enrollment/ObstericsHistory'));
const PreviousPregnancies = lazy(() =>
	import('../Enrollment/PreviousPregnancies')
);
const EnrollmentPackages = lazy(() =>
	import('../Enrollment/EnrollmentPackages')
);

class AntennatalRequest extends Component {
	state = {
		page: 1,
		submitting: false,
	};

	nextPage = () => {
		if (this.state.page === 5) {
			this.setState(prevState => {
				return {
					...prevState,
					submitting: !prevState.submitting,
				};
			});

			return;
		}
		this.setState(prevState => {
			return {
				...prevState,
				page: prevState.page + 1,
			};
		});
	};
	previousPage = () => {
		this.setState(prevState => {
			return {
				...prevState,
				page: prevState.page - 1,
			};
		});
	};
	render() {
		const { page, submitting } = this.state;

		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">Antennal Request</h6>
					<div className="element-box">
						<Suspense fallback={<Splash />}>
							{page === 1 && <General onSubmit={this.nextPage} page={page} />}
							{page === 2 && (
								<FathersInfo
									previousPage={this.previousPage}
									onSubmit={this.nextPage}
									page={page}
								/>
							)}

							{page === 3 && (
								<ObstericsHistory
									previousPage={this.previousPage}
									onSubmit={this.nextPage}
									page={page}
								/>
							)}
							{page === 4 && (
								<PreviousPregnancies
									previousPage={this.previousPage}
									onSubmit={this.nextPage}
									page={page}
								/>
							)}

							{page === 5 && (
								<EnrollmentPackages
									submitting={submitting}
									previousPage={this.previousPage}
									page={page}
									onSubmit={this.nextPage}
								/>
							)}
						</Suspense>
					</div>
				</div>
			</div>
		);
	}
}

// AntennatalRequest.propTypes = {
// 	onSubmit: PropTypes.func.isRequired,
// };

export default AntennatalRequest;
