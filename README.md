# paraplan-react

> Library for ParaPlan API On-Demand and Demand Response public transit

[![NPM](https://img.shields.io/npm/v/paraplan-react.svg)](https://www.npmjs.com/package/paraplan-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save paraplan-react
```

## Usage

```login
import { login } from 'paraplan-react'

loginToAPI() {
  var request = {
      email: 'timhibbard@gmail.com',
      password: 'tim',
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

## License

MIT © [timhibbard](https://github.com/timhibbard) timhibbard@passiotech.com
