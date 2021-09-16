import React, { Component } from 'react'
import {
	Grid,
	Typography,
	Card,
	IconButton,
	LinearProgress,
} from '@material-ui/core'
import { PlayArrow, SkipNext, Pause } from '@material-ui/icons'

export default class MusicPlayer extends Component {
	constructor(props) {
		super(props)
	}

	pauseSong = () => {
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
		}
		fetch('/spotify/pause', requestOptions)
	}

	playSong = () => {
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
		}
		fetch('/spotify/play', requestOptions)
	}

	skipSong = () => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		}
		fetch('/spotify/next', requestOptions)
	}

	render() {
		const songProgress = (this.props.time / this.props.duration) * 100

		window.onSpotifyWebPlaybackSDKReady = () => {
			//need to find a way to get this everytime
			const token =
				'BQDtuU0gr3MVPY2h3nXMsZa0QZGTqVzHQnFlVD-Q7rjoeBrVX-KV65oDTBqOiMAE5_BkRbUpsawXPj08aaVBdqeKK26Zl3_u5IeOQORlly1RlaRyGLsho7kwfDo-PUnKyA-4G-NMQFJ8KCuT07058DsPdebQckAiWygxmf134hz0gN1knUvXtsTrZaSbmRv5xknqv8Xor7XO6VjpjA'

			const player = new Spotify.Player({
				name: 'Web Playback SDK Quick Start Player',
				getOAuthToken: cb => {
					cb(token)
				},
				volume: 0.5,
			})

			// Ready
			player.addListener('ready', ({ device_id }) => {
				console.log('Ready with Device ID', device_id)
			})

			// Not Ready
			player.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id)
			})

			player.addListener('initialization_error', ({ message }) => {
				console.error(message)
			})

			player.addListener('authentication_error', ({ message }) => {
				console.error(message)
			})

			player.addListener('account_error', ({ message }) => {
				console.error(message)
			})

			player.connect()
			player.togglePlay()
			this.playSong()
		}

		return (
			<Card>
				<Grid container alignItems='center'>
					<Grid item xs={4}>
						<img src={this.props.image_url} height='100%' width='100%' />
					</Grid>
					<Grid item xs={8}>
						<Typography component='h5' variant='h5'>
							{this.props.title}
						</Typography>
						<Typography color='textSecondary' variant='subtitle1'>
							{this.props.artist}
						</Typography>
						<div>
							<IconButton
								onClick={() => {
									this.props.is_playing ? this.pauseSong() : this.playSong()
								}}>
								{this.props.is_playing ? (
									<Pause fontSize='large' />
								) : (
									<PlayArrow fontSize='large' />
								)}
							</IconButton>
							<IconButton
								onClick={() => {
									this.skipSong()
								}}>
								<SkipNext fontSize='large' />
								{this.props.showSkip ? (
									<div>
										{this.props.votes} / {this.props.votes_required}
									</div>
								) : (
									<div></div>
								)}
							</IconButton>
						</div>
					</Grid>
				</Grid>
				<LinearProgress variant='determinate' value={songProgress} />
			</Card>
		)
	}
}
