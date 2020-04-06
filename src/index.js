import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isNullOrUndefined } from 'util'
import shajs from '../node_modules/sha.js'


export class ExampleComponent extends Component {
    static propTypes = {
        text: PropTypes.string,
    }

    render() {
        const { email, password, utcOffset } = this.props

        function login(user) {
            return user.email
        }

        var user = {
            email: email,
        }

        return 'hello'
    }
}

export function approveRequest(request){
    var promise = new Promise((resolve, reject) => {
        var rv = {
            success: false,
            errorMessage: '',
            request: {},
            stops: [],
        }
        let url =
            request.restUrl +
            'TripService/ApproveTripRequest?Token=' +
            request.key +
            '&Device=' +
            request.device

        console.log(url)

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(request.tripRequest),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                if (json.success === false) {
                    rv.success = false
                    rv.errorMessage = json.errorMessage
                    reject(rv)
                    return
                }

                rv.success = true
                rv.request = json.request
                rv.stops = json.stops
                resolve(rv)
            })
            .catch((error) => {
                rv.success = false
                console.log(error)
                rv.errorMessage = 'Unknown error'
                reject(rv)
            })
    })

    return promise
}

export function scheduleTrip(request){
    var promise = new Promise((resolve, reject) => {
        var rv = {
            success: false,
            errorMessage: '',
            trip: {},
        }
        let url =
            request.restUrl +
            'TripService/ScheduleTrip?Token=' +
            request.key +
            '&Device=' +
            request.device + 
            '&FleetManagerId=' +
            request.fleetManagerId

        console.log(url)

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(request.trip),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                if (json.success === false) {
                    rv.success = false
                    rv.errorMessage = json.errorMessage
                    reject(rv)
                    return
                }

                rv.success = true
                rv.trip = json.entity
                resolve(rv)
            })
            .catch((error) => {
                rv.success = false
                console.log(error)
                rv.errorMessage = 'Unknown error'
                reject(rv)
            })
    })

    return promise
}

export function unscheduleTrip(request){
    var promise = new Promise((resolve, reject) => {
        var rv = {
            success: false,
            errorMessage: '',
            trip: {},
        }
        let url =
            request.restUrl +
            'TripService/UnscheduleTrip?Token=' +
            request.key +
            '&Device=' +
            request.device

        console.log(url)

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(request.trip),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                if (json.success === false) {
                    rv.success = false
                    rv.errorMessage = json.errorMessage
                    reject(rv)
                    return
                }

                rv.success = true
                rv.trip = json.entity
                resolve(rv)
            })
            .catch((error) => {
                rv.success = false
                console.log(error)
                rv.errorMessage = 'Unknown error'
                reject(rv)
            })
    })

    return promise
}

export function rejectRequest(request){
    var promise = new Promise((resolve, reject) => {
        var rv = {
            success: false,
            errorMessage: '',
            request: {},
        }
        let url =
            request.restUrl +
            'TripService/RejectTripRequest?Token=' +
            request.key +
            '&Device=' +
            request.device + 
            '&Reason=' +
            encodeURIComponent(request.rejectReason) +
            '&NotifyRider=true'

        console.log(url)

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(request.tripRequest),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                if (json.success === false) {
                    rv.success = false
                    rv.errorMessage = json.errorMessage
                    reject(rv)
                    return
                }

                rv.success = true
                rv.request = json.entity
                resolve(rv)
            })
            .catch((error) => {
                rv.success = false
                console.log(error)
                rv.errorMessage = 'Unknown error'
                reject(rv)
            })
    })

    return promise
}

export function routes(request){
    var promise = new Promise((resolve, reject) => {
        var rv = {
            success: false,
            errorMessage: '',
            routes: []
        }
        let url =
            request.restUrl +
            'TripService/FleetmanagersInWrapper?Token=' +
            request.key +
            '&Device=' +
            request.device +
            '&Date=' +
            request.tripDate

        console.log(url)

        fetch(url)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.success === false) {
                    rv.success = false
                    rv.errorMessage = json.errorMessage
                    reject(rv)
                    return
                }

                rv.success = true

                if (json.list.length === 0) {
                    resolve(rv)
                    return
                }

                rv.routes = json.list
                resolve(rv)
            })
            .catch(() => {
                rv.success = false
                rv.errorMessage = 'Unknown error'
                reject(rv)
            })
    })

    return promise
}

export function tripRequests(request) {
    var promise = new Promise((resolve, reject) => {
        var rv = {
            success: false,
            errorMessage: '',
            requests: [],
        }

        var url =
            request.restUrl +  
            'TripService/RequestedTrips?Token=' +
            request.key +
            '&Device=' +
            request.device + 
            '&TripSource=any&TripStatus=all' +
            '&DateRangeStart=' +
            request.startDateTime +
            '&DateRangeEnd=' +
            request.endDateTime
        console.log(url)

        fetch(url)
            .then(res => res.json())
            .then(json => {
                if (json.success === false) {
                    rv.success = false
                    rv.errorMessage = json.errorMessage
                    reject(rv)
                    return
                }

                console.log(json)

                rv.success = true
                rv.requests = json.list

                resolve(rv)
            })
            .catch(() => {
                rv.success = false
                rv.errorMessage = 'Unknown error'
                reject(rv)
        })

    })

    return promise
}

export function trips(request){
    var promise = new Promise((resolve, reject) => {
        var rv = {
            success: false,
            errorMessage: '',
            trips: [],
        }

        //request
        // .restUrl
        // .key
        // .device
        // .startTime
        // .endTime

        var url =
            request.restUrl +  
            'TripService/TripsForDispatchers?Token=' +
            request.key +
            '&Device=' +
            request.device + 
            '&StartTime=' +
            request.startTime +
            '&EndTime=' +
            request.endTime
        console.log(url)

        fetch(url)
            .then(res => res.json())
            .then(json => {
                if (json.success === false) {
                    rv.success = false
                    rv.errorMessage = json.errorMessage
                    reject(rv)
                    return
                }
                rv.success = true
                rv.trips = json.list

                resolve(rv)
            })
            .catch(() => {
                rv.success = false
                rv.errorMessage = 'Unknown error'
                reject(rv)
        })


    })

    return promise
}

export function login(user) {
    var promise = new Promise((resolve, reject) => {
        var rv = {
            success: false,
            errorMessage: '',
            restUrl: '',
            key: '',
        }
        if (isNullOrUndefined(user.email) || user.email === '') {
            rv.errorMessage = 'Please populate .email'
            reject(rv)
            return
        }
        if (isNullOrUndefined(user.password) || user.password === '') {
            rv.errorMessage = 'Please populate .password'
            reject(rv)
            return
        }
        if (isNullOrUndefined(user.device) || user.device === '') {
            rv.errorMessage = 'Please populate .device'
            reject(rv)
            return
        }
        if (isNullOrUndefined(user.version) || user.version === '') {
            rv.errorMessage = 'Please populate .version'
            reject(rv)
            return
        }
        if (isNullOrUndefined(user.utcOffset) || user.utcOffset === '') {
            rv.errorMessage = 'Please populate .utcOffset'
            reject(rv)
            return
        }

        var url =
            'https://aws.engraph.com/ParaPlanREST/UserService/Login?UserName=' +
            encodeURIComponent(user.email) +
            '&Password=' +
            shajs('sha512')
                .update(user.password)
                .digest('hex')
                .toUpperCase() +
            '&Device=' +
            user.device +
            '&Version' +
            user.version +
            '&UTCOffset=' +
            user.utcOffset
        console.log(url)

        fetch(url)
            .then(res => res.json())
            .then(json => {
                if (json.success === false) {
                    console.log('success === false')
                    rv.success = false
                    rv.errorMessage = json.errorMessage
                    reject(rv)
                    return
                }

                if (json.PPPAccess !== 1) {
                    console.log('portal not available')
                    rv.success = false
                    rv.errorMessage = 'Portal access is not available'
                    reject(rv)
                    return
                }

                resolve(json)
            })
            .catch(() => {
                rv.success = false
                rv.errorMessage = 'Unknown error'
                reject(rv)
        })
    })

    return promise
}
