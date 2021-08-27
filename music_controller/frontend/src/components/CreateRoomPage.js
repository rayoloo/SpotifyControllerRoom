import React, {Component} from 'react';
import {
    Button, 
    Grid, 
    Typography, 
    TextField, 
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormHelperText
    } from '@material-ui/core';
import {Link} from 'react-router-dom';


export default class CreateRoomPage extends Component {
    defaultVotes = 2

    constructor(props) {
        super(props)
        this.state = {
            guestCanPause: true,
            votesToSkip: this.defaultVotes
        }

        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this)
        this.handleVotesChange = this.handleVotesChange.bind(this)
        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this)

    }

    handleVotesChange(e) {
        this.setState({votesToSkip: e.target.value})
    }

    handleGuestCanPauseChange(e) {
        this.setState({guestCanPause: e.target.value === "true" ? true : false})
    }

    handleRoomButtonPressed() {
        const requestOptions = {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
            })
        }
        fetch("/api/create-room",requestOptions)
            .then((response)=> response.json()) 
            .then((data) => this.props.history.push('/room/'+data.code))
    }

    render() {
        return (
            <Grid container spacing={1} align="center"> 
                <Grid item xs={12}>
                    {/*To fill the width of the grid make xs=12 since that the maximum size to take up the entire width*/}
                    <Typography component='h4' variant='h4'>
                        Create A Room
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <FormHelperText component="div">
                            <div align="center">
                                Guest Control of Playback State
                            </div>
                        </FormHelperText>
                        <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPauseChange}>
                            <FormControlLabel 
                                value="true" 
                                control={<Radio color="primary"/>} 
                                label="Play/Pause" 
                                labelPlacement="bottom"
                            />
                            <FormControlLabel 
                                value="false" 
                                control={<Radio color="secondary"/>} 
                                label="No Control" 
                                labelPlacement="bottom"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <TextField 
                            required={true} 
                            type="number" 
                            defaultValue={this.defaultVotes} 
                            inputProps={{min:1, style: {textAlign: 'center'}}}
                            onChange={this.handleVotesChange} 
                        />
                        <FormHelperText component="div">
                            <div align="center">Votes Required To Skip Song</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button color="primary" variant="contained" onClick={this.handleRoomButtonPressed}>Create A Room</Button>
                </Grid>
                <Grid item xs={12}>
                    <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
                </Grid>    
            </Grid>
            
        )
    }
}