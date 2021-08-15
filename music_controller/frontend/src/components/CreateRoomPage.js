import React, {Component} from 'react';
import {
    Button, 
    Grid, 
    Typography, 
    Textfield, 
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel
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
                <Grid item xs={12} align="center"></Grid>
                {/* if you want to fill the width of the grid make it xs=12 since that the maximum number for this value*/}
                    <Typography component='h4' variant='h4'>
                        Create a room
                    </Typography>
            </Grid>
        )
    }
}