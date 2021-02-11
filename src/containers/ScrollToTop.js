import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

class ScrollToTop extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		}
	}

	render() {
		return (
			<ToastProvider autoDismiss={false} placement="top-right">
				{this.props.children}
			</ToastProvider>
		);
	}
}

export default withRouter(ScrollToTop);
