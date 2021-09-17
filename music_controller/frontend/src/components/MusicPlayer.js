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
