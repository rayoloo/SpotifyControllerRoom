import React, {Component} from 'react'
import HomePage from './HomePage'
import JoinRoomPage from './JoinRoomPage'
import CreateRoomPage from './CreateRoomPage'
import Room from './Room'
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom"

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="center">
                <Router >
                    <Switch>
                        <Route exact path="/join" component={JoinRoomPage}/>
                        <Route exact path="/create" component={CreateRoomPage}/>
                        <Route exact path="/room/:roomCode" component={Room}/>
                        {/* colon denotes that we have a parameter in the url */}
                        <Route path="/" component={HomePage}></Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

