import React, { Component } from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import CreateRoomPage from './CreateRoomPage'
import MusicPlayer from './MusicPlayer'

export default class Room extends Component {
	constructor(props) {
		super(props)
		this.state = {
			votesToSkip: 2,
			guestCanPause: false,
			isHost: false,
			showSettings: false,
			spotifyAuthenticated: false,
			song: {},
		}
		this.roomCode = this.props.match.params.roomCode
		this.getRoomDetails() //get room details after getting the code from the url
	}

	componentDidMount() {
		this.interval = setInterval(this.getCurrentSong, 1000)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	getRoomDetails = () => {
		fetch(`/api/get-room?code=${this.roomCode}`)
			.then(response => {
				if (!response.ok) {
					this.props.leaveRoomCallback()
					this.props.history.push('/')
				}
				return response.json()
			})
			.then(data => {
				this.setState({
					votesToSkip: data.votes_to_skip,
					guestCanPause: data.guest_can_pause,
					isHost: data.is_host,
				})
				if (this.state.isHost) {
					this.authenticateSpotify()
				}
			})
	}

	authenticateSpotify = () => {
		fetch('/spotify/is-authenticated')
			.then(response => response.json())
			.then(data => {
				this.setState({ spotifyAuthenticated: data.status })
				console.log('authentication:', data.status)
				if (!data.status) {
					fetch('/spotify/get-auth-url')
						.then(response => response.json())
						.then(data => {
							window.location.replace(data.url)
						})
				}
			})
	}

	getCurrentSong = () => {
		fetch('/spotify/current-song')
			.then(response => {
				if (response.ok) {
					return response.json()
				} else {
					return {}
				}
			})
			.then(data => this.setState({ song: data }))
	}

	leaveButtonPressed = () => {
		const leaveRoomPost = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		}
		fetch('/api/leave-room', leaveRoomPost).then(response => {
			this.props.leaveRoomCallback()
			this.props.history.push('/')
		})
	}

	updateSettings = () => {
		this.setState({ showSettings: !this.state.showSettings })
	}

	renderSettingsButton = () => {
		return (
			<Grid item xs={12}>
				<Button
					variant='contained'
					color='primary'
					onClick={this.updateSettings}>
					Settings
				</Button>
			</Grid>
		)
	}

	renderSettings = () => {
		return (
			<Grid container spacing={1} align='center'>
				<CreateRoomPage
					update={true}
					votesToSkip={this.state.votesToSkip}
					guestCanPause={this.state.guestCanPause}
					roomCode={this.roomCode}
					updateCallback={this.getRoomDetails}
				/>
				<Grid item xs={12}>
					<Button
						variant='contained'
						color='secondary'
						onClick={this.updateSettings}>
						Close
					</Button>
				</Grid>
			</Grid>
		)
	}

	render() {
		if (this.state.showSettings) {
			return this.renderSettings()
		}
		return (
			<Grid container spacing={1} align='center'>
				<Grid item xs={12}>
					<Typography variant='h4' component='h4'>
						Room Code: {this.roomCode}
					</Typography>
					<br />
				</Grid>
				<Grid item xs={12}>
					<MusicPlayer
						{...this.state.song}
						showSkip={this.state.guestCanPause}
					/>
				</Grid>
				{this.state.isHost ? this.renderSettingsButton() : null}
				<Grid item xs={12}>
					<Button
						color='secondary'
						variant='contained'
						onClick={this.leaveButtonPressed}>
						Leave Room
					</Button>
				</Grid>
			</Grid>
		)
	}
}
