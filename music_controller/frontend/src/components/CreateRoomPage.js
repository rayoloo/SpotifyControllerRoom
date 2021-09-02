import React, { Component } from 'react'
import {
	Button,
	Grid,
	Typography,
	TextField,
	FormControl,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormHelperText,
	Collapse,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Link } from 'react-router-dom'

export default class CreateRoomPage extends Component {
	static defaultProps = {
		votesToSkip: 2,
		guestCanPause: true,
		update: false,
		roomCode: null,
		updateCallback: () => {},
	}

	constructor(props) {
		super(props)
		this.state = {
			guestCanPause: this.props.guestCanPause,
			votesToSkip: this.props.votesToSkip,
			errorMSG: '',
			successMSG: '',
		}
	}

	handleVotesChange = e => {
		this.setState({ votesToSkip: e.target.value })
	}

	handleGuestCanPauseChange = e => {
		this.setState({ guestCanPause: e.target.value === 'true' ? true : false })
	}

	handleCreateButtonPressed = () => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				votes_to_skip: this.state.votesToSkip,
				guest_can_pause: this.state.guestCanPause,
			}),
		}
		fetch('/api/create-room', requestOptions)
			.then(response => response.json())
			.then(data => this.props.history.push('/room/' + data.code))
	}

	handleUpdateButtonPressed = () => {
		const requestOptions = {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				votes_to_skip: this.state.votesToSkip,
				guest_can_pause: this.state.guestCanPause,
				code: this.props.roomCode,
			}),
		}
		fetch('/api/update-room', requestOptions).then(response => {
			if (response.ok) {
				this.setState({ successMSG: 'Room Updated' })
			} else {
				this.setState({ errorMSG: 'Room Could Not Be Updated' })
			}
			this.props.updateCallback()
		})
	}

	renderCreateButtons = () => {
		return (
			<>
				<Grid item xs={12}>
					<Button
						color='primary'
						variant='contained'
						onClick={this.handleCreateButtonPressed}>
						Create A Room
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Button color='secondary' variant='contained' to='/' component={Link}>
						Back
					</Button>
				</Grid>
			</>
		)
	}

	renderUpdateButtons = () => {
		return (
			<>
				<Grid item xs={12}>
					<Button
						color='primary'
						variant='contained'
						onClick={this.handleUpdateButtonPressed}>
						Update Room
					</Button>
				</Grid>
			</>
		)
	}

	render() {
		const title = this.props.update ? 'Update Room' : 'Create A Room'
		return (
			<Grid container spacing={1} align='center'>
				<Grid item xs={12}>
					<Collapse
						in={this.state.errorMSG != '' || this.state.successMSG != ''}>
						{this.state.successMSG != '' ? (
							<Alert
								several='success'
								onClose={() => {
									this.setState({ successMSG: '' })
								}}>
								{this.state.successMSG}
							</Alert>
						) : (
							<Alert
								several='error'
								onClose={() => {
									this.setState({ errorMSG: '' })
								}}>
								{this.state.errorMSG}
							</Alert>
						)}
					</Collapse>
				</Grid>
				<Grid item xs={12}>
					{/*To fill the width of the grid make xs=12 since that the maximum size to take up the entire width*/}
					<Typography component='h4' variant='h4'>
						{title}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<FormControl component='fieldset'>
						<FormHelperText component='div'>
							<div align='center'>Guest Control of Playback State</div>
						</FormHelperText>
						<RadioGroup
							row
							value={this.state.guestCanPause.toString()}
							onChange={this.handleGuestCanPauseChange}>
							<FormControlLabel
								value='true'
								control={<Radio color='primary' />}
								label='Play/Pause'
								labelPlacement='bottom'
							/>
							<FormControlLabel
								value='false'
								control={<Radio color='secondary' />}
								label='No Control'
								labelPlacement='bottom'
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<FormControl>
						<TextField
							required={true}
							type='number'
							defaultValue={this.props.votesToSkip}
							inputProps={{ min: 1, style: { textAlign: 'center' } }}
							onChange={this.handleVotesChange}
						/>
						<FormHelperText component='div'>
							<div align='center'>Votes Required To Skip Song</div>
						</FormHelperText>
					</FormControl>
				</Grid>
				{this.props.update
					? this.renderUpdateButtons()
					: this.renderCreateButtons()}
			</Grid>
		)
	}
}
