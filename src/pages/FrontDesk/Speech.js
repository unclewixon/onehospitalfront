/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import DatePicker from 'antd/lib/date-picker';
import { connect } from 'react-redux';
import { socket } from '../../services/constants';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { toggleProfile } from '../../actions/user';
import axios from 'axios';

const { RangePicker } = DatePicker;
const apiKey = '22c03acdd54643c2b2d050d7c343c194'; //process.env.REACT_APP_VOICE_RSS_API;

class Speech extends Component {
	state = {
		speech: null,
		text: '',
	};

	getSpeech = async text => {
		console.log(apiKey);
		let audioSrc = null;
		await axios
			.get(
				`https://api.voicerss.org/?key=${apiKey}&hl=en-us&src=${text}&r=0&v=Linda&c=mp3&f=44khz_16bit_stereo&ssml=false&b64=false`,
				{ headers: { 'Access-Control-Allow-Origin': '*' } }
			)
			.then(response => {
				if (response.status === 200) {
					audioSrc = response.data;
				}
			});
		return audioSrc;
	};

	componentDidMount() {
		const text =
			'Testing 0 0 2 3 4, please proceed to consultation room Optics';
		console.log(text);
		const audioSrc = this.getSpeech(text);
		console.log(JSON.stringify(audioSrc));
		this.setState({
			speech: audioSrc,
			text,
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		socket.on('speech-over', data => {
			console.log(data);
			if (data.speechText) {
				const audioSrc = this.getSpeech(data.speechText);
				this.setState({
					speech: audioSrc,
					text: data.speechText,
				});
			}
		});

		if (this.state.text !== prevState.text) {
			console.log(this.state.text);
			let count = 0;
			let loops = 3;
			document
				.getElementById('speech-player')
				.addEventListener('timeupdate', function() {
					if (count <= loops) {
						count++;
						this.play();
					}
				});
		}
	}

	render() {
		const { speech } = this.state;

		return (
			<>
				<div className="element-box m-0 mb-4 p-3"></div>
				<div className="element-box p-3 m-0 mt-3">
					<h1>
						This page synchronizes speech to all audio devices connected to this
						PC.
						<br />
						<br /> For quality assurrance, Please ensure this page stays open.
					</h1>
					{speech && <audio id="speech-player" autoPlay src={speech}></audio>}
				</div>
			</>
		);
	}
}

export default connect(null, {
	startBlock,
	stopBlock,
	toggleProfile,
})(Speech);
