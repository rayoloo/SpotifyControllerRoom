import React, {Component} from 'react';
import {Grid, Button, Typography,ButtonGroup} from '@material-ui/core/'
import {Link} from 'react-router-dom'

export default class HomePage extends  Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return(
            <Grid container spacing={3} align="center">
                <Grid item xs={12}>
                    <Typography variant="h3" component="h3">
                        Jam Session
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <ButtonGroup disableElevation variant ="contained" color="primary">
                        <Button color="primary" to="/join" component={Link}>Join a Room</Button>
                        <Button color="secondary" to="/create" component={Link}>Create a Room</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        )
    }

}