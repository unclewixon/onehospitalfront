/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import size from 'lodash.size';
import template from 'lodash.template';
import split from 'lodash.split';

import searchingGIF from '../assets/images/searching.gif';
import { request } from '../services/utilities';
import { API_URI, searchAPI } from '../services/constants';
import { toggleProfile } from '../actions/user';

const compiled = template('<span><%= emrid %></span>');

class SearchPatient extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			search: '',
			focused: false,
			searching: false,
			users: [],
			hasSearched: false
		};

		this.changed = debounce(this.doSearch, 250);
	}
	
	handleChange = (e) => {
		const search = e.target.value;
		this.setState({ search }, () => {
			this.changed(search);
		});
	};

	doSearch = async searchTerm => {
		if(size(searchTerm) >= 3){
			const users = [{id:1,name:'patient name 1',},{id:2,name:'patient name 2',}];
			try {
				this.setState({ searching: true, error: false, hasSearched: true });
				const rs = await request(`${API_URI}${searchAPI}?q=${searchTerm}`, 'GET', true);
				console.log(rs);
				this.setState({ searching: false, users });
			} catch(e) {
				this.setState({ searching: false, users });
			}
		}
	};

	UNSAFE_componentWillUpdate(nextProps, nextState) {
		if(nextProps.focus && !nextState.focused) {
			this.setFocus();
		}
		if(nextProps.style.display === 'none' && nextState.focused){
			this.setState({ focused: false, search: '', users: [] });
		}
	}

	componentWillUnmount() {
		this.setState({ hasSearched: false });
	}
	
	setFocus = () => {
		this.setState({ focused: true, hasSearched: false });
		setTimeout(() => {
			this.searchInput.click();
			this.searchInput.focus();
		}, 10);
	}

	showProfile = (id) => () => {
		const info = { id, type: 'patient' };
		this.props.toggleProfile(true, info);
	};

	render() {
		const { search, users, searching, hasSearched } = this.state;
		const { style, onExit } = this.props;
		return (
			<div className="search-with-suggestions-w over-search-field" style={style}>
				<div className="search-with-suggestions-modal">
					<div className="element-search" style={{marginBottom: 0}}>
						<input className="search-suggest-input" ref={input => this.searchInput = input} placeholder="Search for a patient..." type="text" value={search} onChange={this.handleChange}/>
						<div className="close-search-suggestions" onClick={onExit}>
							<i className="os-icon os-icon-x"/>
						</div>
					</div>
					{searching && (
						<div className="searching"><img alt="searching" src={searchingGIF} /></div>
					)}
					{!searching && (
						<div className="search-suggestions-group" style={{marginTop: '30px'}}>
							<div className="ssg-header">
								<div className="ssg-icon">
									<div className="os-icon os-icon-users"></div>
								</div>
								<div className="ssg-name">Patients</div>
								<div className="ssg-info">{users.length} Total</div>
							</div>
							<div className="ssg-content">
								<div className="ssg-items ssg-items-list">
									{users.length === 0 && hasSearched && (
										<div className="alert alert-danger">No Patient Record(s) Found!</div>
									)}
									{users.map(u => {
										const p = split(u.id, search);
										return (
											<div style={{display: 'flex'}} key={u.id}>
												<a onClick={this.showProfile(u.id)} className="ssg-item cursor">
													<div className="item-name" dangerouslySetInnerHTML={{__html: `${u.name} - ${p.length === 1 ? u.id : `${p[0]}${compiled({'emrid': search})}${p[1]}`}`}}/>
												</a>
											</div>
										)
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