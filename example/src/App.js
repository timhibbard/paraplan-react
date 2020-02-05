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
        var user = {
            email: 'timhibbard@gmail.com',
            password: 'tim',
            utcOffset: -5,
        }
        login(user).then(loginResult => {
            this.setState({
                success: loginResult.success,
                errorMessage: loginResult.errorMessage,
                key: loginResult.Key,
                restUrl: loginResult.RESTUrl,
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
                <button onClick={this.loginToAPI}>Login</button>
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
