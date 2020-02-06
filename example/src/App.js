import React, { Component } from 'react'

import { ExampleComponent } from 'paraplan-react'
import { login } from 'paraplan-react'

export default class App extends Component {
    constructor(props) {
        super(props)

        this.initialState = {
            key: '',
            restUrl: '',
            success: false,
            errorMessage: '',
        }

        this.state = this.initialState
    }

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


    componentDidMount() {
        this.loginToAPI()
    }

    render() {
        const { success, errorMessage, key, restUrl } = this.state

        return (
            <form>
                <button onClick={() => this.loginToAPI()}>Login</button>
                <br />
                Success = {success}
                <br />
                ErrorMessage = {errorMessage}
                <br />
                Key = {key}
                <br />
                URL = {restUrl}
            </form>
        )
    }
}
