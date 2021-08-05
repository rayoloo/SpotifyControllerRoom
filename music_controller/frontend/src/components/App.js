import React, {Component} from 'react'
import HomePage from './HomePage'
import JoinRoomPage from './JoinRoomPage'
import CreateRoomPage from './CreateRoomPage'
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom"

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Router>
                <Switch>
                    <Route exact path="/join" component={JoinRoomPage}></Route>
                    <Route exact path="/create" component={CreateRoomPage}></Route>
                    <Route path="/" component={HomePage}></Route>
                </Switch>
            </Router>
        )
    }
}

