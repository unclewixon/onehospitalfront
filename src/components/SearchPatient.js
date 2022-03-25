/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import debounce from 'lodash.debounce';
import size from 'lodash.size';
// import template from 'lodash.template';
// import split from 'lodash.split';

import searchingGIF from '../assets/images/searching.gif';
import { request, formatPatientId, patientname } from '../services/utilities';
import { searchAPI } from '../services/constants';
import { toggleProfile } from '../actions/user';

// const compiled = template('<span><%= emrid %></span>');

class SearchPatient extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			search: '',
			focused: false,
			searching: false,
			patients: [],
			hasSearched: false,
		};

		// this.changed = debounce(this.doSearch, 250);
	}

	listener = e => {
		const { search } = this.state;
		if ((e.code === 'Enter' || e.code === 'NumpadEnter') && search !== '') {
			e.preventDefault();
			this.doSearch();
		}
	};

	componentDidMount() {
		this.searchInput.addEventListener('keydown', this.listener);
		if (this.props.focus && !this.state.focused) {
			setTimeout(() => {
				this.setFocus();
			}, 100);
		}
	}

	handleChange = e => {
		const search = e.target.value;
		// this.setState({ search }, () => {
		// 	this.changed(search);
		// });
		this.setState({ search });
		// this.changed();
	};

	doSearch = async () => {
		const { search } = this.state;
		if (size(search) >= 1) {
			try {
				this.setState({ searching: true, error: false, hasSearched: true });
				const url = `${searchAPI}?q=${search}&limit=10`;
				const patients = await request(url, 'GET', true);
				this.setState({ searching: false, patients });
			} catch (e) {
				this.setState({ searching: false });
			}
		} else {
			this.setState({ searching: false, patients: [], hasSearched: false });
		}
	};

	UNSAFE_componentWillUpdate(nextProps, nextState) {
		if (nextProps.focus && !nextState.focused) {
			this.setFocus();
		}
		if (nextProps.style.display === 'none' && nextState.focused) {
			this.setState({ focused: false, search: '', patients: [] });
		}
	}

	componentWillUnmount() {
		this.setState({ hasSearched: false });
		this.searchInput.removeEventListener('keydown', this.listener);
	}

	setFocus = () => {
		this.setState({ focused: true, hasSearched: false });
		setTimeout(() => {
			this.searchInput.click();
			this.searchInput.focus();
		}, 10);
	};

	showProfile = patient => () => {
		if (patient.is_active) {
			const info = { patient, type: 'patient' };
			this.props.toggleProfile(true, info);
		}
	};

	render() {
		const { search, patients, searching, hasSearched } = this.state;
		const { style, onExit } = this.props;
		return (
			<div
				className="search-with-suggestions-w over-search-field"
				style={style}
			>
				<div className="search-with-suggestions-modal">
					<div className="element-search" style={{ marginBottom: 0 }}>
						<input
							className="search-suggest-input"
							ref={input => (this.searchInput = input)}
							placeholder="Search for a patient..."
							type="text"
							value={search}
							onChange={this.handleChange}
						/>
						<div className="btn-search-suggestions" onClick={this.doSearch}>
							<i className="os-icon os-icon-ui-37" />
						</div>
						<div className="close-search-suggestions" onClick={onExit}>
							<i className="os-icon os-icon-x" />
						</div>
					</div>
					{searching && (
						<div className="searching">
							<img alt="searching" src={searchingGIF} />
						</div>
					)}
					{!searching && (
						<div
							className="search-suggestions-group"
							style={{ marginTop: '30px' }}
						>
							<div className="ssg-header">
								<div className="ssg-icon">
									<div className="os-icon os-icon-users"></div>
								</div>
								<div className="ssg-name">Patients</div>
								<div className="ssg-info">{patients.length} Total</div>
							</div>
							<div className="ssg-content">
								<div className="ssg-items ssg-items-list">
									{patients.length === 0 && hasSearched && (
										<div className="alert alert-danger">
											No Patient Record(s) Found!
										</div>
									)}
									{patients.map(p => {
										//const ps = split(p.id, search);
										return (
											<div style={{ display: 'flex' }} key={p.id}>
												<a
													onClick={this.showProfile(p)}
													className="ssg-item cursor"
												>
													{/* <div className="item-name" dangerouslySetInnerHTML={{__html: `${p.folderNumber} - ${ps.length === 1 ? p.id : `${p[0]}${compiled({'emrid': search})}${p[1]}`}`}}/> */}
													<div
														className="item-name"
														dangerouslySetInnerHTML={{
															__html: `${formatPatientId(p)} - ${patientname(
																p
															)}`,
														}}
													/>
												</a>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default connect(null, { toggleProfile })(SearchPatient);
