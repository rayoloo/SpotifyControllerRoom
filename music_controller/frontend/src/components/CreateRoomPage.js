import React, {Component} from 'react';
import {
    Button, 
    Grid, 
    Typography, 
    Textfield, 
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormHelperText
    } from '@material-ui/core';
import {Link} from 'react-router-dom';


export default class CreateRoomPage extends Component {
    defaultVote = 2

    constructor(props) {
        super(props)
    }

    render() {
        return (
            // 1 x 8 px spacing between the grid
            //grid container
            <Grid container spacing={1}> 
                <Grid item xs={12} align="center">
                    {/* if you want to fill the width of the grid make it xs=12 since that the maximum size*/}
                    <Typography component='h4' variant='h4'>
                        Create A Room
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">
                                Guest Control of Playback State
                            </div>
                        </FormHelperText>
                        <RadioGroup row defaultValue="true">
                            <FormControlLabel value="true" control={<Radio color="primary"/>} label="Play/Pause" labelPlacement="bottom"/>
                            <FormControlLabel value="false" control={<Radio color="secondary"/>} label="Play/Pause" labelPlacement="bottom"/>
                        </RadioGroup>
                    </FormControl>
                </Grid>  
            </Grid>
        )
    }
}