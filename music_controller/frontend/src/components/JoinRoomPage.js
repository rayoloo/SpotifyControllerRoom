import React, { Component } from "react"
import { TextField, Button, Grid, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"

export default class JoinRoomPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			roomCode: "",
			error: false,
			errorMSG: "",
		}
	}

	handleTextFieldChange = e => {
		this.setState({ roomCode: e.target.value })
	}

	roomButtonPressed = () => {
		const roomCheck = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				code: this.state.roomCode,
			}),
		}
		fetch("/api/join-room", roomCheck)
			.then(response => {
				if (response.ok) {
					this.props.history.push(`/room/${this.state.roomCode}`)
				} else {
					this.setState({ error: true, errorMSG: "Room Not Found" })
				}
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		return (
			<Grid container spacing={1} align='center'>
				<Grid item xs={12}>
					<Typography variant='h4' component='h4'>
						Join A Room
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<TextField
						error={this.state.error}
						label='Code'
						placeholder='Enter a Room Code'
						value={this.state.roomCode}
						helperText={this.state.errorMSG}
						variant='outlined'
						onChange={this.handleTextFieldChange}
					/>
				</Grid>
				<Grid item xs={12} align='center'>
					<Button
						variant='contained'
						color='primary'
						onClick={this.roomButtonPressed}>
						Enter Room
					</Button>
				</Grid>
				<Grid item xs={12} align='center'>
					<Button color='secondary' variant='contained' to='/' component={Link}>
						Back
					</Button>
				</Grid>
			</Grid>
		)
	}
}
