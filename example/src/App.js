import React, { Component } from 'react'
import momenttz from 'moment-timezone'
import dateFormat from 'dateformat'

import { login, routes } from 'paraplan-react'

export default class App extends Component {
    constructor(props) {
        super(props)

        this.initialState = {
            key: '',
            restUrl: '',
            success: false,
            errorMessage: '',
            clientId: '',
            clientCanRequestTrips: false,
            requestEmail: '',
            requestPassword: '',
            requestUTC: momenttz.tz(momenttz.tz.guess()).utcOffset() / 60,
            requestDevice: 'paraplan-react-example',
            requestVersion: '0.0.2',
            requestRouteDate: dateFormat(Date.now(), 'yyyy-mm-dd'),
            routes: []
        }

        this.state = this.initialState

        this.handleChange = this.handleChange.bind(this)
    }

    collectRoutes() {
        const {
            key,
            restUrl,
            requestDevice,
            requestRouteDate,
        } = this.state

        var request = {
            key: key,
            restUrl: restUrl,
            device: requestDevice,
            tripDate: requestRouteDate
        }
        routes(request)
            .then(response => {
                this.setState({
                    success: response.success,
                    routes: response.routes
                })
            })
            .catch(reason => {
                this.setState({
                    success: reason.success,
                    errorMessage: reason.errorMessage,
                })
            })
    }

    loginToAPI() {
        const {
            requestEmail,
            requestPassword,
            requestUTC,
            requestDevice,
            requestVersion,
        } = this.state

        var request = {
            email: requestEmail,
            password: requestPassword,
            utcOffset: requestUTC,
            device: requestDevice,
            version: requestVersion,
        }
        login(request)
            .then(response => {
                this.setState({
                    success: response.success,
                    errorMessage: response.errorMessage,
                    key: response.Key,
                    restUrl: response.RESTUrl,
                    clientId: response.ClientID,
                    clientCanRequestTrips: response.ClientCanRequestTrips

                })
            })
            .catch(reason => {
                this.setState({
                    success: reason.success,
                    errorMessage: reason.errorMessage,
                })
            })
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }


    componentDidMount() {
        //this.loginToAPI()
    }

    render() {
        const { 
            success, 
            errorMessage, 
            key, 
            restUrl, 
            clientId, 
            clientCanRequestTrips,
            routes
        } = this.state

        const labelStyle = {
            padding: '10px',
            display: 'inline-block'
        }

        const inputStyle = {
            width: '200px',
        }

        const buttonStyle = {
            width: '200px',
            display: 'block',
            padding: '10px',
            margin: '10px',
            backgroundColor: '#2d9eaf'
        }

        return (
            <React.Fragment>
                <label style={labelStyle}>
                    Email:
                    <input
                        style={inputStyle}
                        type='text'
                        name='requestEmail'
                        value={this.state.requestEmail}
                        onChange={this.handleChange}
                    />
                </label>
                <br />
                <label style={labelStyle}>
                    Password:
                    <input
                    style={inputStyle}
                        type='text'
                        name='requestPassword'
                        value={this.state.requestPassword}
                        onChange={this.handleChange}
                    />
                </label>
                <br />
                <button style={buttonStyle} onClick={() => this.loginToAPI()}>
                    Login
                </button>
                <br />
                Success = {String(success)}
                <br />
                ErrorMessage = {errorMessage}
                <br />
                Key = {key}
                <br />
                URL = {restUrl}
                <br />
                ClientID = {clientId}
                <br />
                Can Request Trips = {String(clientCanRequestTrips)}
                <br />
                <br />
                <br />
                <button style={buttonStyle} onClick={() => this.collectRoutes()}>
                    Get Routes
                </button>
                <ul>
                {routes.map((route, i) => {
                    return (
                    <li key={route.fleetmanagerID}>{route.routeName}</li>
                    )
                          
                })}
                </ul>

            </React.Fragment>
        )
    }
}
