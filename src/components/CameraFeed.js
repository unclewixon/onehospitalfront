import React, { Component } from 'react';

export class CameraFeed extends Component {
	videoPlayer = null;
	stream = null;

	state = {
		pictureTaken: false,
	};

	processDevices(devices) {
		devices.forEach(device => {
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
	}

	takePhoto = e => {
		e.preventDefault();
		const { sendFile } = this.props;
		const context = this.canvas.getContext('2d');
		context.drawImage(this.videoPlayer, 0, 0, 200, 150);
		this.canvas.toBlob(sendFile);
		this.setState({ pictureTaken: true });
	};

	render() {
		const { pictureTaken } = this.state;
		return (
			<div className="c-camera-feed">
				<div
					className={`c-camera-feed__viewer ${pictureTaken ? 'hidden' : ''}`}
				>
					<video
						ref={ref => (this.videoPlayer = ref)}
						width="200"
						heigh="150"
					/>
				</div>
				<div
					className={`c-camera-feed__stage ${!pictureTaken ? 'hidden' : ''}`}
				>
					<canvas width="200" height="150" ref={ref => (this.canvas = ref)} />
				</div>
				{pictureTaken ? (
					<button
						onClick={e => this.setState({ pictureTaken: false })}
						className="btn btn-secondary mr-2"
					>
						Cancel
					</button>
				) : (
					<button onClick={e => this.takePhoto(e)} className="btn btn-primary">
						Take photo!
					</button>
				)}
			</div>
		);
	}
}
