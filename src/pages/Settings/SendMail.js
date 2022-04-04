/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import { useDispatch } from 'react-redux';

import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import { request } from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';

const SendMail = () => {
	const [submitting, setSubmitting] = useState(false);
	const [subject, setSubject] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const dispatch = useDispatch();

	const sendEmail = async e => {
		try {
			e.preventDefault();
			if (email === '' || message === '' || subject === '') {
				notifyError('enter email or type a message');
				return;
			}

			dispatch(startBlock());
			setSubmitting(true);

			const data = { message, email, subject };

			await request('settings/send-mail', 'POST', true, data);
			dispatch(stopBlock());
			notifySuccess('Email sent!');
			setSubmitting(false);
			setSubject('');
			setEmail('');
			setMessage('');
		} catch (e) {
			console.log(e);
			setSubmitting(false);
			dispatch(stopBlock());
			notifyError('Error, could not send email');
		}
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="element-wrapper">
					<div className="os-tabs-w mx-1">
						<div className="os-tabs-controls os-tabs-complex">
							<ul className="nav nav-tabs upper">
								<li className="nav-item">
									<a className="nav-link active">Send Email</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<div className="element-wrapper">
								<div className="element-box">
									<form onSubmit={sendEmail}>
										<div className="form-group">
											<label className="lighter">Subject</label>
											<div className="input-group mb-2 mr-sm-2 mb-sm-0">
												<input
													className="form-control"
													placeholder="Enter subject"
													type="text"
													name="subject"
													value={subject}
													onChange={e => setSubject(e.target.value)}
												/>
											</div>
										</div>
										<div className="form-group">
											<label className="lighter">Email</label>
											<div className="input-group mb-2 mr-sm-2 mb-sm-0">
												<input
													className="form-control"
													placeholder="Enter email"
													type="text"
													name="email"
													value={email}
													onChange={e => setEmail(e.target.value)}
												/>
											</div>
										</div>
										<div className="row">
											<div className="col-sm-12">
												<div className="form-group">
													<label>Message</label>
													<SunEditor
														width="100%"
														placeholder="Please type here..."
														setContents={message}
														name="note"
														autoFocus={true}
														enableToolbar={true}
														setOptions={{
															height: 300,
															buttonList: [
																[
																	'bold',
																	'underline',
																	'italic',
																	'strike',
																	'subscript',
																	'superscript',
																	'list',
																	'align',
																	'font',
																	'fontSize',
																	'image',
																	'codeView',
																],
															],
														}}
														onChange={e => {
															setMessage(String(e));
														}}
													/>
												</div>
											</div>
										</div>
										<div className="form-buttons-w text-right compact">
											<button
												className="btn btn-primary"
												disabled={submitting}
												tyoe="subit"
											>
												{submitting ? (
													<img src={waiting} alt="submitting" />
												) : (
													<span>send</span>
												)}
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SendMail;
