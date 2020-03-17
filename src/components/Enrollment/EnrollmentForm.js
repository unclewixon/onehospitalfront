import React, { Component, lazy, Suspense } from 'react';
import Splash from '../../components/Splash';

const General = lazy(() => import('./General'));
const FathersInfo = lazy(() => import('./FathersInfo'));
const ObstericsHistory = lazy(() => import('./ObstericsHistory'));
const PreviousPregnancies = lazy(() => import('./PreviousPregnancies'));
const EnrollmentPackages = lazy(() => import('./EnrollmentPackages'));
class EnrollmentForm extends Component {
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
		);
	}
}

export default EnrollmentForm;
