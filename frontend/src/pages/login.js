import React, { Component } from 'react';
import commentPage from './playeComments';
import statistics from './statistics';
// import { strict } from 'assert';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errMessage: null,
            opsTeam: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange(event) {
        event.persist();
        console.log('event', event);
        const { value } = event.target;
        const { name } = event.target
        console.log('target.name', name);
        console.log('value', value)
        this.setState({ [event.target.name]: value })
    }


    async login() {
        // let { email, password } = this.state;
        let email = this.state.email;
        let password = this.state.password;
        if (!email || !password)
            this.setState({ errMessage: 'Cant Be empty' })

        const res = await fetch('/api/login', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        // let res = await user.json();
        console.log('res', res);
        if (res.status == 200) {
            let user = res.json();
            user.OPS_TEAM ? this.setState({ opsTeam: true }) : this.setState({ opsTeam: false })
        }
        console.log('user', await res.json());

    }

    render() {
        console.log('email state:', this.state.email);
        const opsTeam = this.state.opsTeam;
        return (

            <div style={styles.container}>
                <input
                    name='email'
                    style={styles.input}
                    placeholder={'Email'}
                    onChange={this.handleChange}
                />
                <input
                    name='password'
                    style={styles.input}
                    placeholder={'Password'}
                    onChange={this.handleChange}
                />
                <input style={styles.button} type='submit' value="Login" onClick={this.login} />

            </div>
        )
    }
}
const styles = {
    container: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '80%',
        width: '20%',
        justifyContent: 'center',
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: `translate(${-50}%, ${-50}%)`
    },
    input: {
        height: 30,
        width: '100%',
        // marginTop: 20
        marginBottom: 15
    },
    button: {
        width: '100%',
        backgroundColor: '#C70039 ',
        padding: 5,
        color: '#FFF'
    }
}