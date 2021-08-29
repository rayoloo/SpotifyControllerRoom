import React, { Component } from 'react'
import { Grid, Button, Typography } from '@material-ui/core'

export default class Room extends Component {
	constructor(props) {
		super(props)
		this.state = {
			votesToSkip: 2,
			guestCanPause: false,
			isHost: false,
		}
		this.roomCode = this.props.match.params.roomCode
		this.getRoomDetails() //get room details after getting the code from the url
	}

	getRoomDetails() {
		fetch(`/api/get-room?code=${this.roomCode}`)
			.then(response => response.json())
			.then(data => {
				this.setState({
					votesToSkip: data.votes_to_skip,
					guestCanPause: data.guest_can_pause,
					isHost: data.is_host,
				})
			})
	}

	leaveButtonPressed = () => {
		const leaveRoomPost = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		}
		fetch('/api/leave-room', leaveRoomPost).then(response => {
			this.props.history.push('/')
		})
	}
	render() {
		return (
			<Grid container spacing={1} align='center'>
				<Grid item xs={12}>
					<Typography variant='h4' component='h4'>
						Code: {this.roomCode}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant='h6' component='h6'>
						Guest Can Pause: {this.state.guestCanPause.toString()}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant='h6' component='h6'>
						Host: {this.state.isHost.toString()}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant='h6' component='h6'>
						Votes to Skip: {this.state.votesToSkip}
					</Typography>
				</Grid>
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
