import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo-big.png';

class Login extends Component {
	state = {
		role: '',
	};

	componentDidMount() {
		window.document.body.className = 'auth-wrapper';
	}

	componentWillUnmount() {
		window.document.body.className = '';
	}
	
	doLogin = e => {
		e.preventDefault();
		const { role } = this.state;
		if(role && role !== ''){
			this.props.history.push(`/dashboard/${role}`);
		}
		else {
		}
	}

	onChange = e => {
		const role = e.target.value;
		this.setState({ role });
	}

	render() {
		return (
			<div className="all-wrapper menu-side with-pattern">
				<div className="auth-box-w">
					<div className="logo-w">
						<Link to="/">
							<img alt="" src={logo} />
						</Link>
					</div>
					<h4 className="auth-header">Login Form</h4>
					<form>
						<div className="form-group">
							<label htmlFor="">Username</label>
							<input
								className="form-control"
								placeholder="Enter your username"
								type="text"
							/>
							<div className="pre-icon os-icon os-icon-user-male-circle"></div>
						</div>
						<div className="form-group">
							<label htmlFor="">Password</label>
							<input
								className="form-control"
								placeholder="Enter your password"
								type="password"
							/>
							<div className="pre-icon os-icon os-icon-fingerprint"></div>
						</div><div className="form-group">
							<label htmlFor="">Role</label>
							<select className="form-control" name="role" onChange={this.onChange}>
								<option>Select Role</option>
								<option value="front-desk">Front Desk</option>
								<option value="doctor">Doctor</option>
								<option value="in-patient">In Patient</option>
								<option value="lab">Lab</option>
								<option value="patient/1">Patient Profile</option>
								<option value="pharmacy">Pharmacy</option>
								<option value="vitals">Vitals</option>
							</select>
							<div className="pre-icon os-icon os-icon-hierarchy-structure-2"></div>
						</div>
						<div className="buttons-w">
							<button className="btn btn-primary" onClick={this.doLogin}>Log me in</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
