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

## Routes (FleetManagers)

```routes
import { routes } from 'paraplan-react'

viewTodaysRoutes() {
  var request = {
      restUrl: '<from login>',
      key: '<from login>',
      tripDate: '03-11-2020'
      device: 'connect-web',
  }
  routes(request).then(response => {
      this.setState({
          success: response.success,
          errorMessage: response.errorMessage,
          routes: response.routes,
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

## Trips

```trips
import { trips } from 'paraplan-react'

viewTodaysTrips() {
  var request = {
    restUrl: '<from login>',
    key: '<from login>',
    device: 'connect-web',
    startTime: '1582693200',
    endTime: '1582779600'
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

## License

MIT © [timhibbard](https://github.com/timhibbard) timhibbard@passiotech.com
