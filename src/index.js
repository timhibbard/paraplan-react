import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isNullOrUndefined } from 'util'
import shajs from '../node_modules/sha.js'

//This is written based on guidelines from:
//https://github.com/transitive-bullshit/create-react-library#readme

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
// - [x] Standerize return object
// - [x] Update documentation
// - [ ] Remove proper return type after August 1
export function config(request){
    var promise = new Promise((resolve, reject) => {
        var rv = {
            success: false,
            errorMessage: '',
            config: {},
            entity: {},
        }
        let url =
            request.restUrl +
            'UserService/Config?Token=' +
            request.key +
            '&Device=' +
            request.device

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
                rv.config = json.entity
                rv.entity = json.entity
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
// - [x] Standerize return object
// - [x] Update documentation
// - [ ] Remove proper return type after August 1
export function scheduleTrip(request){
    var promise = new Promise((resolve, reject) => {
        var rv = {
            success: false,
            errorMessage: '',
            trip: {},
            entity: {},
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
                rv.entity = json.entity
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

// - [x] Standerize return object
// - [x] Update documentation
// - [ ] Remove proper return type after August 1
export function unscheduleTrip(request){
    var promise = new Promise((resolve, reject) => {
        var rv = {
            success: false,
            errorMessage: '',
            trip: {},
            entity: {},
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

// - [x] Standerize return object
// - [x] Update documentation
// - [ ] Remove proper return type after August 1
export function rejectRequest(request){
    var promise = new Promise((resolve, reject) => {
        var rv = {
            success: false,
            errorMessage: '',
            request: {},
            entity: {},
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
                rv.entity = json.entity
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

// - [x] Standerize return object
// - [x] Update documentation
// - [ ] Remove proper return type after August 1
export function routes(request){
    var promise = new Promise((resolve, reject) => {
        var rv = {
            success: false,
            errorMessage: '',
            routes: [],
            list: [],
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
                rv.list = json.list
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

// - [x] Standerize return object
// - [x] Update documentation
// - [ ] Remove proper return type after August 1
export function tripRequests(request) {
    var promise = new Promise((resolve, reject) => {
        var rv = {
            success: false,
            errorMessage: '',
            requests: [],
            list: [],
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
                rv.list = json.list

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

// - [x] Standerize return object
// - [x] Update documentation
// - [ ] Remove proper return type after August 1
export function trips(request){
    var promise = new Promise((resolve, reject) => {
        var rv = {
            success: false,
            errorMessage: '',
            trips: [],
            list: [],
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
                rv.list = json.list

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

// - [x] Need to document
export function clientSearch(request){
    var promise = new Promise((resolve, reject) => {
        var rv = {
            success: false,
            errorMessage: '',
            list: [],
        }
        var url =
            request.restUrl +  
            'ClientService/Search/?Token=' +
            request.key +
            '&Device=' +
            request.device + 
            '&Value=' +
            request.search
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
                rv.list = json.list

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

// - [x] Need to document
export function programs(request){
    var promise = new Promise((resolve, reject) => {
        var rv = {
            success: false,
            errorMessage: '',
            list: [],
        }
        var url =
            request.restUrl +  
            'ProgramService/Programs/?Token=' +
            request.key +
            '&Device=' +
            request.device 
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
                rv.list = json.list

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

// - [x] Need to document
export function placeSearch(request){
    var promise = new Promise((resolve, reject) => {
        var rv = {
            success: false,
            errorMessage: '',
            list: [],
        }
        var url =
            request.restUrl +  
            'PlaceService/Search/?Token=' +
            request.key +
            '&Device=' +
            request.device + 
            '&Value=' +
            request.search
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
                rv.list = json.list

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

// - [x] Need to document
export function placesOnDemand(request){
    var promise = new Promise((resolve, reject) => {
        var rv = {
            success: false,
            errorMessage: '',
            list: [],
        }
        var url =
            request.restUrl +  
            'PlaceService/OnDemand?Token=' +
            request.key +
            '&Device=' +
            request.device
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
                rv.list = json.list

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

// - [x] Need to document
export function purposes(request){
    var promise = new Promise((resolve, reject) => {
        var rv = {
            success: false,
            errorMessage: '',
            list: [],
        }
        var url =
            request.restUrl +  
            'TripPurposeService/Purposes/?Token=' +
            request.key +
            '&Device=' +
            request.device
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
                rv.list = json.list

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

// - [ ] Need to document
export function statusTypes(request){
    var promise = new Promise((resolve, reject) => {
        var rv = {
            success: false,
            errorMessage: '',
            list: [],
        }
        var url =
            request.restUrl +  
            'ClientService/StatusTypes/?Token=' +
            request.key +
            '&Device=' +
            request.device
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
                rv.list = json.list

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
