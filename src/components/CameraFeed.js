import React, { Component } from 'react';

export class CameraFeed extends Component {
	videoPlayer = null;
	stream = null;

	processDevices(devices) {
		devices.forEach(device => {
			console.log(device.label);
			this.setDevice(device);
		});
	}

	async setDevice(device) {
		const { deviceId } = device;
		this.stream = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: { deviceId },
		});
		if (this.videoPlayer) {
			this.videoPlayer.srcObject = this.stream;
			this.videoPlayer.play();
		}
	}

	async componentDidMount() {
		const cameras = await navigator.mediaDevices.enumerateDevices();
		this.processDevices(cameras);
	}

	componentWillUnmount() {
		if (!this.videoPlayer) return;
		this.videoPlayer.pause();
		this.videoPlayer.src = '';
		this.videoPlayer.srcObject = null;

		// if (!window.streamReference) return;

		// window.streamReference.getAudioTracks().forEach(function(track) {
		// 	track.stop();
		// });

		// window.streamReference.getVideoTracks().forEach(function(track) {
		// 	track.stop();
		// });

		// window.streamReference = null;
	}

	takePhoto = e => {
		e.preventDefault();
		const { sendFile } = this.props;
		const context = this.canvas.getContext('2d');
		context.drawImage(this.videoPlayer, 0, 0, 200, 150);
		this.canvas.toBlob(sendFile);
	};

	render() {
		return (
			<div className="c-camera-feed">
				<div className="c-camera-feed__viewer">
					<video
						ref={ref => (this.videoPlayer = ref)}
						width="200"
						heigh="150"
					/>
				</div>
				<button onClick={e => this.takePhoto(e)} className="btn btn-primary">
					Take photo!
				</button>
				<div className="c-camera-feed__stage">
					<canvas width="200" height="150" ref={ref => (this.canvas = ref)} />
				</div>
			</div>
		);
	}
}
