import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isNullOrUndefined } from 'util'
import shajs from '../node_modules/sha.js'
import { resolve } from 'dns'

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
        }
        if (isNullOrUndefined(user.password) || user.password === '') {
            rv.errorMessage = 'Please populate .password'
            reject(rv)
        }
        if (isNullOrUndefined(user.device) || user.device === '') {
            rv.errorMessage = 'Please populate .device'
            reject(rv)
        }
        if (isNullOrUndefined(user.version) || user.version === '') {
            rv.errorMessage = 'Please populate .version'
            reject(rv)
        }if (isNullOrUndefined(user.utcOffset) || user.utcOffset === '') {
            rv.errorMessage = 'Please populate .utcOffset'
            reject(rv)
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
                }

                if (json.PPPAccess !== 1) {
                    console.log('portal not available')
                    rv.success = false
                    rv.errorMessage = 'Portal access is not available'
                    reject(rv)
                }

                console.log(json)
                resolve(json)
            })
            .catch(() => {
                console.log('unknown error')
                rv.success = false
                rv.errorMessage = 'Unknown error'
                reject(rv)
            })
    })

    return promise
}
