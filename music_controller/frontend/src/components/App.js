import React, { Component } from "react"
import HomePage from "./HomePage"
import JoinRoomPage from "./JoinRoomPage"
import CreateRoomPage from "./CreateRoomPage"
import Room from "./Room"
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link,
	Redirect,
} from "react-router-dom"

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			roomCode: null,
		}
	}

	//async since it is a asynchronous operation since we call a endpoint on the server that could take some time to load
	async componentDidMount() {
		fetch("/api/user-in-room")
			.then(response => response.json())
			.then(data => {
				this.setState({ roomCode: data.code })
			})
	}

	render() {
		return (
			<div className='center'>
				<Router>
					<Switch>
						<Route exact path='/join' component={JoinRoomPage} />
						<Route exact path='/create' component={CreateRoomPage} />
						<Route exact path='/room/:roomCode' component={Room} />
						{/* colon denotes that we have a parameter in the url */}
						<Route
							path='/'
							render={() => {
								return this.state.roomCode ? (
									<Redirect to={`/room/${this.state.roomCode}`} />
								) : (
									<HomePage />
								)
							}}
						/>
					</Switch>
				</Router>
			</div>
		)
	}
}
