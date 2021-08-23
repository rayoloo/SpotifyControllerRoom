import React, { Component } from 'react'

export default class Room extends Component {
    constructor(props) {
        super(props)
        this.state = {
            votesToSkip:2, 
            guestCanPause:false,
            isHost:false,
        }
        this.roomCode = this.props.match.params.roomCode
        this.getRoomDetails() //get room details after getting the code from the url
    }

    getRoomDetails(){
        fetch('/api/get-room?code='+this.roomCode)
            .then((response) => response.json())
            .then((data) => {this.setState({
                votesToSkip:data.votes_to_skip,
                guestCanPause:data.guest_can_pause,
                isHost:data.is_host
            })
        })
    }
    render() {
        return (
            <div>
                <p>Room Code: {this.roomCode}</p>
                <p>Votes: {this.state.votesToSkip}</p>
                <p>Host: {this.state.isHost.toString()}</p>
                <p>Guest: {this.state.guestCanPause.toString()}</p>
            </div>
        )
    }
}
