import React, { Component } from 'react'
import momenttz from 'moment-timezone'
import moment from 'moment'
import dateFormat from 'dateformat'

import {
    login,
    routes,
    trips,
    tripRequests,
    approveRequest,
    rejectRequest,
    scheduleTrip,
    unscheduleTrip,
    config,
    clientSearch,
    programs,
    placeSearch,
    placesOnDemand,
    purposes
} from 'paraplan-react'

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
            requestEmail: 'timhibbard@engraph.com',
            requestPassword: 'tim',
            requestUTC: momenttz.tz(momenttz.tz.guess()).utcOffset() / 60,
            requestDevice: 'paraplan-react-example',
            requestVersion: '0.0.2',
            requestRouteDate: dateFormat(Date.now(), 'yyyy-mm-dd'),
            // tripStartDate: '1582693200',
            // tripEndDate: '1582779600',
            tripStartDate:
                new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000,
            tripEndDate:
                new Date(new Date().setHours(48, 0, 0, 0)).getTime() / 1000,
            routes: [],
            dispatcherTrips: [],
            tripRequests: [],
            config: {},
            clients: [],
            clientSearchString: '',
            programs: [],
            places: [],
            placesSearchString: '',
            purposes: []
        }

        this.state = this.initialState

        this.handleChange = this.handleChange.bind(this)
    }

    schedule(trip, fleetmanager) {
        const { key, restUrl, requestDevice } = this.state
        var requestObject = {
            key: key,
            restUrl: restUrl,
            device: requestDevice,
            fleetManagerId: fleetmanager.fleetmanagerID,
            trip: trip
        }

        console.log(requestObject)

        scheduleTrip(requestObject)
            .then(response => {
                var tripId = response.entity.tripId
                var fleetmanager = response.entity.fleetmanager

                console.log(response.trip)

                this.setState({
                    success: response.success,
                    dispatcherTrips: this.state.dispatcherTrips.map(el =>
                        el.tripId === tripId
                            ? { ...el, fleetmanager }
                            : el
                    ),
                })
            })
            .catch(reason => {
                this.setState({
                    success: reason.success,
                    errorMessage: reason.errorMessage,
                })
            })
    }

    unschedule(trip) {
        const { key, restUrl, requestDevice } = this.state
        var requestObject = {
            key: key,
            restUrl: restUrl,
            device: requestDevice,
            trip: trip
        }

        console.log(requestObject)

        unscheduleTrip(requestObject)
            .then(response => {
                var tripId = response.entity.tripId
                var fleetmanager = response.entity.fleetmanager

                console.log(response.trip)

                this.setState({
                    success: response.success,
                    dispatcherTrips: this.state.dispatcherTrips.map(el =>
                        el.tripId === tripId
                            ? { ...el, fleetmanager }
                            : el
                    ),
                })
            })
            .catch(reason => {
                this.setState({
                    success: reason.success,
                    errorMessage: reason.errorMessage,
                })
            })
    }

    approveTripRequest(request) {
        const { key, restUrl, requestDevice } = this.state

        var requestObject = {
            key: key,
            restUrl: restUrl,
            device: requestDevice,
            tripRequest: request,
        }

        approveRequest(requestObject)
            .then(response => {
                var tripStatus = response.request.tripStatus
                var importTripID = response.request.importTripID
                console.log(response.stops)
                console.log(response.request)
                this.setState({
                    success: response.success,
                    tripRequests: this.state.tripRequests.map(el =>
                        el.importTripID === importTripID
                            ? { ...el, tripStatus }
                            : el
                    ),
                })
            })
            .catch(reason => {
                this.setState({
                    success: reason.success,
                    errorMessage: reason.errorMessage,
                })
            })
    }

    rejectTripRequest(request) {
        const { key, restUrl, requestDevice } = this.state

        var requestObject = {
            key: key,
            restUrl: restUrl,
            device: requestDevice,
            tripRequest: request,
            rejectReason: 'Overcapacity and something else',
        }

        rejectRequest(requestObject)
            .then(response => {
                var tripStatus = response.entity.tripStatus
                var importTripID = response.entity.importTripID
                this.setState({
                    success: response.success,
                    tripRequests: this.state.tripRequests.map(el =>
                        el.importTripID === importTripID
                            ? { ...el, tripStatus }
                            : el
                    ),
                })
            })
            .catch(reason => {
                this.setState({
                    success: reason.success,
                    errorMessage: reason.errorMessage,
                })
            })
    }

    showRequests() {
        const {
            key,
            restUrl,
            requestDevice,
            tripStartDate,
            tripEndDate,
        } = this.state

        console.log(tripStartDate)
        console.log(tripEndDate)

        var request = {
            key: key,
            restUrl: restUrl,
            device: requestDevice,
            startDateTime: tripStartDate,
            endDateTime: tripEndDate,
        }

        tripRequests(request)
            .then(response => {
                console.log(response)
                this.setState({
                    success: response.success,
                    tripRequests: response.list,
                })
            })
            .catch(reason => {
                this.setState({
                    success: reason.success,
                    errorMessage: reason.errorMessage,
                })
            })
    }

    showTrips() {
        const {
            key,
            restUrl,
            requestDevice,
            tripStartDate,
            tripEndDate,
        } = this.state


        var request = {
            key: key,
            restUrl: restUrl,
            device: requestDevice,
            startTime: tripStartDate,
            endTime: tripEndDate,
        }

        this.collectRoutes()

        trips(request)
            .then(response => {
                this.setState({
                    success: response.success,
                    dispatcherTrips: response.list,
                })
            })
            .catch(reason => {
                this.setState({
                    success: reason.success,
                    errorMessage: reason.errorMessage,
                })
            })
    }

    collectRoutes() {
        const { key, restUrl, requestDevice, requestRouteDate } = this.state

        var request = {
            key: key,
            restUrl: restUrl,
            device: requestDevice,
            tripDate: requestRouteDate,
        }
        routes(request)
            .then(response => {
                this.setState({
                    success: response.success,
                    routes: response.list,
                })
            })
            .catch(reason => {
                this.setState({
                    success: reason.success,
                    errorMessage: reason.errorMessage,
                })
            })
    }

    getConfig(){
        const { key, restUrl, requestDevice } = this.state
        var request = {
            key: key,
            restUrl: restUrl,
            device: requestDevice,
        }
        config(request)
            .then(response => {
                this.setState({
                    success: response.success,
                    config: response.entity,
                })
            })
            .catch(reason => {
                this.setState({
                    success: reason.success,
                    errorMessage: reason.errorMessage,
                })
            })
    }

    getClients(){
        const { key, restUrl, requestDevice, clientSearchString } = this.state
        var request = {
            key: key,
            restUrl: restUrl,
            device: requestDevice,
            search: clientSearchString,
        }
        clientSearch(request)
            .then(response => {
                this.setState({
                    success: response.success,
                    clients: response.list,
                })
            })
            .catch(reason => {
                this.setState({
                    success: reason.success,
                    errorMessage: reason.errorMessage,
                })
            })

    }

    searchPlaces(){
        const { key, restUrl, requestDevice, placesSearchString } = this.state
        var request = {
            key: key,
            restUrl: restUrl,
            device: requestDevice,
            search: placesSearchString,
        }
        placeSearch(request)
            .then(response => {
                this.setState({
                    success: response.success,
                    places: response.list,
                })
            })
            .catch(reason => {
                this.setState({
                    success: reason.success,
                    errorMessage: reason.errorMessage,
                })
            })

    }

    getPrograms() {
        const { key, restUrl, requestDevice } = this.state

        var request = {
            key: key,
            restUrl: restUrl,
            device: requestDevice,
        }
        programs(request)
            .then(response => {
                this.setState({
                    success: response.success,
                    programs: response.list,
                })
            })
            .catch(reason => {
                this.setState({
                    success: reason.success,
                    errorMessage: reason.errorMessage,
                })
            })
    }

    getOnDemandPlaces() {
        const { key, restUrl, requestDevice } = this.state

        var request = {
            key: key,
            restUrl: restUrl,
            device: requestDevice,
        }
        placesOnDemand(request)
            .then(response => {
                this.setState({
                    success: response.success,
                    places: response.list,
                })
            })
            .catch(reason => {
                this.setState({
                    success: reason.success,
                    errorMessage: reason.errorMessage,
                })
            })
    }

    getPurposes() {
        const { key, restUrl, requestDevice } = this.state

        var request = {
            key: key,
            restUrl: restUrl,
            device: requestDevice,
        }
        purposes(request)
            .then(response => {
                this.setState({
                    success: response.success,
                    purposes: response.list,
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
                    clientCanRequestTrips: response.ClientCanRequestTrips,
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
            routes,
            dispatcherTrips,
            tripRequests,
            config,
            clients,
            programs,
            places,
            purposes,
        } = this.state

        const labelStyle = {
            padding: '10px',
            display: 'inline-block',
        }

        const inputStyle = {
            width: '200px',
        }

        const buttonStyle = {
            width: '200px',
            display: 'block',
            padding: '10px',
            margin: '10px',
            backgroundColor: '#2d9eaf',
        }

        return (
            <React.Fragment>
                <label style={labelStyle}>
                    Email:
                    <input
                        style={inputStyle}
                        type="text"
                        name="requestEmail"
                        value={this.state.requestEmail}
                        onChange={this.handleChange}
                    />
                </label>
                <br />
                <label style={labelStyle}>
                    Password:
                    <input
                        style={inputStyle}
                        type="text"
                        name="requestPassword"
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
                <button
                    style={buttonStyle}
                    onClick={() => this.collectRoutes()}
                >
                    Get Routes
                </button>
                <button style={buttonStyle} onClick={() => this.showTrips()}>
                    Get Trips
                </button>
                <button style={buttonStyle} onClick={() => this.showRequests()}>
                    Get Requests
                </button>
                <button style={buttonStyle} onClick={() => this.getConfig()}>
                    Get Config
                </button>
                <input
                        style={inputStyle}
                        type="text"
                        name="clientSearchString"
                        value={this.state.clientSearchString}
                        onChange={this.handleChange}
                    />
                <button style={buttonStyle} onClick={() => this.getClients()}>
                    Search Clients
                </button>
                <button style={buttonStyle} onClick={() => this.getPrograms()}>
                    Show Programs
                </button>
                
                <input
                        style={inputStyle}
                        type="text"
                        name="placesSearchString"
                        value={this.state.placesSearchString}
                        onChange={this.handleChange}
                    />
                <button style={buttonStyle} onClick={() => this.searchPlaces()}>
                    Search Places
                </button>
                <button style={buttonStyle} onClick={() => this.getOnDemandPlaces()}>
                    Show On Demand Spots
                </button>
                <button style={buttonStyle} onClick={() => this.getPurposes()}>
                    Trip Purposes
                </button>
                {config && JSON.stringify(config, null, 2) !== '{}' ? (
                    <div><pre>{ JSON.stringify(config, null, 2) }</pre></div>
                ) : ''}
                <ul>
                    {purposes.map((purpose, i) => {
                        return (
                            <li key={purpose.id}>
                                {purpose.name + ': ' + purpose.duration + ' (' + purpose.id + ')'}
                            </li>
                        )
                    })}
                    {places.map((place, i) => {
                        return (
                            <li key={place.databaseId}>
                                {place.name + ': ' + place.address1 + ' (' + place.databaseId + ')'}
                            </li>
                        )
                    })}
                    {programs.map((program, i) => {
                        return (
                            <li key={program.databaseID}>
                                {program.programName + ': ' + program.programDescription}
                            </li>
                        )
                    })}
                    {clients.map((client, i) => {
                        return (
                            <li key={client.id}>
                                {client.name}{client.email && client.email !== '' ? ' ' + client.email : ''}
                            </li>
                        )
                    })}
                    {routes.map((route, i) => {
                        return (
                            <li key={route.fleetmanagerID}>
                                {route.routeName}{route.gps ? ' GPS: ' + route.gps.lat + ', ' + route.gps.lng : ''}
                            </li>
                        )
                    })}
                    {dispatcherTrips.map((trip, i) => {
                        return (
                            <li key={trip.tripId}>
                                {trip.client.name}:{' '}
                                {trip.fleetmanager.routeName === '' ? 'No Assigned Route' : trip.fleetmanager.routeName}
                                <button style={buttonStyle}
                                onClick={() => this.unschedule(trip)}
                                >Unschedule</button>
                                {routes.map((route, i) => {
                                    return (
                                        <button style={buttonStyle}
                                        key={route.fleetmanagerID}
                                        onClick={() => this.schedule(trip,route)}>
                                            Assign to {route.routeName} (
                                            {route.fleetmanagerID})
                                        </button>
                                    )
                                })}
                            </li>
                        )
                    })}
                    {tripRequests && tripRequests.length
                        ? tripRequests.map((trip, i) => {
                              return (
                                  <li key={trip.importTripID}>
                                      {trip.clientFirstName} {trip.tripStatus}{' '}
                                      {moment
                                          .unix(trip.pickUpTimeEpoch)
                                          .format('ll')}
                                      <button
                                          style={buttonStyle}
                                          onClick={() =>
                                              this.approveTripRequest(trip)
                                          }
                                      >
                                          Approve
                                      </button>
                                      <button
                                          style={buttonStyle}
                                          onClick={() =>
                                              this.rejectTripRequest(trip)
                                          }
                                      >
                                          Reject
                                      </button>
                                  </li>
                              )
                          })
                        : ''}
                </ul>
            </React.Fragment>
        )
    }
}
