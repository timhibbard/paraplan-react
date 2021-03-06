# paraplan-react

> Library for ParaPlan API On Demand and Demand Response Transportation

[![NPM](https://img.shields.io/npm/v/paraplan-react.svg)](https://www.npmjs.com/package/paraplan-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save paraplan-react
```

## Example

There is an example project available [here](https://timhibbard.github.io/paraplan-react/).

## Login

```login
import { login } from 'paraplan-react'

loginToAPI() {
  var request = {
      email: 'xxx@xxx.com',
      password: 'xxx',
      utcOffset: -5,
      device: 'connect-web',
      version: '0.1'
  }
  login(request).then(response => {
      this.setState({
          success: response.success,
          errorMessage: response.errorMessage,
          key: response.Key,
          restUrl: response.RESTUrl,
      })
  })
  .catch((reason) => {
      this.setState({
          success: reason.success,
          errorMessage: reason.errorMessage,
      })
  })
}
```

## Configuration Options (Filespecs)
```config
import { config } from 'paraplan-react'
getConfig(){
        var request = {
            restUrl: '<from login>',
            key: '<from login>',
            device: 'connect-web',
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

```

## Drivers
```drivers
import { allDrivers } from 'paraplan-react'

getDrivers() {
    var request = {
        restUrl: '<from login>',
        key: '<from login>',
        device: 'connect-web',
    }
    allDrivers(request)
        .then(response => {
            this.setState({
                success: response.success,
                allDrivers: response.list,
            })
        })
        .catch(reason => {
            this.setState({
                success: reason.success,
                errorMessage: reason.errorMessage,
            })
        })
}

```

## Save Fleetmanager
```saveFleetmanager
import { saveFleetmanager } from 'paraplan-react'
saveFleetmanager(){

    var fm = {
        driverID: 157,
        routeId: 102,
        endTime: "/Date(-2209093200000+0000)/",
        startTime: "/Date(-2209141800000+0000)/",
        vehicleID: 311,
        fleetmanagerID: 10463
    }

    var request = {
        restUrl: '<from login>',
        key: '<from login>',
        device: 'connect-web',
        fleetmanager: fm,
    }


    saveFleetmanager(request)
        .then(response => {
            console.log(response);
            this.setState({fleetManagerId: response.fleetmanagerId})

        })
        .catch(reason => {
            console.log(reason.errorMessage)
            this.setState({
                success: reason.success,
                errorMessage: reason.errorMessage,
            })
        })

}


```

## Vehicles
```vehicles
import { allVehicles } from 'paraplan-react'

getVehicles() {

    var request = {
        restUrl: '<from login>',
        key: '<from login>',
        device: 'connect-web',
    }
    allVehicles(request)
        .then(response => {
            this.setState({
                success: response.success,
                allVehicles: response.list,
            })
        })
        .catch(reason => {
            this.setState({
                success: reason.success,
                errorMessage: reason.errorMessage,
            })
        })
}

```

## Routes (FleetManagers)

```routes
import { routes } from 'paraplan-react'

viewTodaysRoutes() {
  var request = {
      restUrl: '<from login>',
      key: '<from login>',
      tripDate: '06-15-2020'
      device: 'connect-web',
  }
  routes(request).then(response => {
      this.setState({
          success: response.success,
          errorMessage: response.errorMessage,
          routes: response.list,
      })
  })
  .catch((reason) => {
      this.setState({
          success: reason.success,
          errorMessage: reason.errorMessage,
      })
  })
}
```

```allRoutes
import { allRoutes } from 'paraplan-react'
getRoutes() {
    const { key, restUrl, requestDevice } = this.state

    var request = {
        restUrl: '<from login>',
        key: '<from login>',
        device: 'connect-web',
    }
    allRoutes(request)
        .then(response => {
            this.setState({
                success: response.success,
                allRoutes: response.list,
            })
        })
        .catch(reason => {
            this.setState({
                success: reason.success,
                errorMessage: reason.errorMessage,
            })
        })
}
```


## Trips

```trips
import { trips } from 'paraplan-react'

viewTodaysTrips() {
  var request = {
    restUrl: '<from login>',
    key: '<from login>',
    device: 'connect-web',
    startTime: new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000,
    endTime: new Date(new Date().setHours(24, 0, 0, 0)).getTime() / 1000,
  }
  trips(request).then(response => {
      this.setState({
          success: response.success,
          errorMessage: response.errorMessage,
          trips: response.list,
      })
  })
  .catch((reason) => {
      this.setState({
          success: reason.success,
          errorMessage: reason.errorMessage,
      })
  })
}
```

## Trip Requests

```trip requests
import { tripRequests } from 'paraplan-react'

viewTodaysTripRequests() {
  var request = {
    restUrl: '<from login>',
    key: '<from login>',
    device: 'connect-web',
    startDateTime: new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000,
    endDateTime: new Date(new Date().setHours(24, 0, 0, 0)).getTime() / 1000,
  }
  tripRequests(request).then(response => {
      this.setState({
          success: response.success,
          errorMessage: response.errorMessage,
          requests: response.list,
      })
  })
  .catch((reason) => {
      this.setState({
          success: reason.success,
          errorMessage: reason.errorMessage,
      })
  })
}
```

## Managing Trips Requests

```approve request
import { approveRequest } from 'paraplan-react'

approveTripRequest() {

    var request = {
        restUrl: '<from login>',
        key: '<from login>',
        device: 'connect-web',
        tripRequest: <trip request to approve>
    }

    approveRequest(request)
        .then(response => {
            var tripStatus = response.request.tripStatus
            var importTripID = response.request.importTripID
            this.setState({
                success: response.success,
                tripRequests: this.state.tripRequests.map(el =>
                    el.importTripID === importTripID
                        ? { ...el,  tripStatus}
                        : el
                )
            })
            //response also includes `.stops` which are the legs of the approved trip
        })
        .catch(reason => {
            this.setState({
                success: reason.success,
                errorMessage: reason.errorMessage,
            })
        })
}
```

```reject request
import { rejectRequest } from 'paraplan-react'

rejectTripRequest() {

    var request = {
        restUrl: '<from login>',
        key: '<from login>',
        device: 'connect-web',
        tripRequest: <trip request to reject>,
        rejectReason: <reason trip is being rejected>
    }

    rejectRequest(request)
        .then(response => {
            var tripStatus = response.entity.tripStatus
            var importTripID = response.entity.importTripID
            this.setState({
                success: response.success,
                tripRequests: this.state.tripRequests.map(el =>
                    el.importTripID === importTripID
                        ? { ...el,  tripStatus}
                        : el
                )
            })
        })
        .catch(reason => {
            this.setState({
                success: reason.success,
                errorMessage: reason.errorMessage,
            })
        })
}
```

## Add a new trip (not request)
```adimport { addTrip } from 'paraplan-react'

addTripFromDispatch() {
    var request = {
        key: <from login>,
        restUrl: <from login>,
        device: 'connect-web',
        trip: {
                client: {
                    id: 19282
                },
                pickUpPlace: {
                    databaseId: 35604
                },
                dropOffPlace: {
                    databaseId: 34409
                },
                scheduledPickUpTime : moment().add(5,'minutes').unix(),
                scheduledDropOffTime : moment().add(30,'minutes').unix(),
                appointmentTime : moment().add(5,'minutes').unix(),
                program : {
                    databaseID : 53
                },
            }
    }

    addTrip(request)
            .then(response => {
                this.setState({
                    success: response.success,
                    successMessage: 'new tripid is ' + response.entity.tripId
                })
            })
            .catch(reason => {
                this.setState({
                    success: reason.success,
                    errorMessage: reason.errorMessage,
                })
            })
}


```

- While `request.tripRequest` will take the entire trip request. It only needs to have `.importTripID` populated. It will ignore all other fields and build the object on the server fresh from the database.
- In the return object, `request` will have the most up to date version of the trip request.
- Also, the return object of approve will contain `stops`, which is an array of `Stop`. Appending existing stop arrays with this data will save a round trip to the server.
- Since we are dealing with trip requests and http requests, you might want to rename your variables to avoid confusion. 


## Scheduling trips to routes

```assign to route
import { scheduleTrip } from 'paraplan-react'

scheduleTripToRoute(trip, fleetmanager) {

    var request = {
        key: <from login>,
        restUrl: <from login>,
        device: 'connect-web',
        fleetManagerId: <fleetmanager ID to assign to>,
        trip: <trip to assign. Only .tripId needed>
    }

    scheduleTrip(request)
        .then(response => {
            var tripId = response.entity.tripId
            var fleetmanager = response.entity.fleetmanager

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
```

```unschedule
import { unscheduleTrip } from 'paraplan-react'
unscheduleTrip() {
    var request = {
        key: <from login>,
        restUrl: <from login>,
        device: 'connect-web',
        trip: <trip to assign. Only .tripId needed>
    }

    unscheduleTrip(request)
        .then(response => {
            var tripId = response.trip.tripId
            var fleetmanager = response.trip.fleetmanager

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

```


## Searching for clients

```clientSearch
import { clientSearch } from 'paraplan-react'

searchClients(){
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
}

```

## Places
```placeSearch
import { placeSearch } from 'paraplan-react'

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

```

```placesOnDemand 
//Places specificallly designated as on demand spots
import { placesOnDemand } from 'paraplan-react'

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
```


## Programs (Trip funding source)

```programs
import { programs } from 'paraplan-react'

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

```

## Trip Purposes (Appointment Types)
```purposes
import { purposes } from 'paraplan-react'
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
```

## Client Status Types
```
import { statusTypes } from 'paraplan-react'
getStatusTypes() {
    const { key, restUrl, requestDevice } = this.state

    var request = {
        key: key,
        restUrl: restUrl,
        device: requestDevice,
    }
    statusTypes(request)
        .then(response => {
            this.setState({
                success: response.success,
                statusTypes: response.list,
            })
        })
        .catch(reason => {
            this.setState({
                success: reason.success,
                errorMessage: reason.errorMessage,
            })
        })
}
```

## Wheelchair Types
```
import { wheelchairTypes } from 'paraplan-react'
getWheelchairTypes() {
    const { key, restUrl, requestDevice } = this.state

    var request = {
        key: key,
        restUrl: restUrl,
        device: requestDevice,
    }
    wheelChairTypes(request)
        .then(response => {
            this.setState({
                success: response.success,
                wheelchairTypes: response.list,
            })
        })
        .catch(reason => {
            this.setState({
                success: reason.success,
                errorMessage: reason.errorMessage,
            })
        })
}
```

## License

MIT © [timhibbard](https://github.com/timhibbard) timhibbard@passiotech.com
