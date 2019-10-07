import React, { Component } from 'react';
import PlayerHome from './PlayerHome';
import OpsHome from './OpsHome';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errMessage: null,
            opsTeam: null,
            loggedin: false,
            userId: null,
            userName: null
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
        this.setState({ errMessage: null })
        let email = this.state.email;
        let password = this.state.password;
        console.log('emial', email);
        if (!email || !password) {
            this.setState({
                errMessage: 'Fill out the fields.'
            })
            return
        }
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
        if (res.status === 200) {
            let user = await res.json();
            console.log('User', user);
            user.OPS_TEAM
                ? this.setState({ loggedin: true, opsTeam: true, userId: user.ID, userName: user.NAME })
                : this.setState({ loggedin: true, opsTeam: false, userId: user.ID, userName: user.NAME })
        } else if (res.status === 400) {
            this.setState({ errMessage: 'Email or Password not valid' })
        } else this.setState({ errMessage: 'Sth went wrong try again!' })

    }

    render() {
        console.log('email state:', this.state.email);
        const opsTeam = this.state.opsTeam;
        const loggedin = this.state.loggedin;
        console.log('loggedIn:', loggedin);
        console.log('opsTeam:', opsTeam);
        if (loggedin) {
            return (
                opsTeam
                    ? <OpsHome userId={this.state.userId} userName={this.state.userName} />
                    : <PlayerHome userId={this.state.userId} userName={this.state.userName} />)
        }
        else {
            return (
                <div style={styles.container}>
                    <div style={styles.errMessage}>{this.state.errMessage}</div>
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
        backgroundColor: '#C70039',
        padding: 5,
        color: '#FFF'
    },
    errMessage: {
        padding: '5%',
        color: '#C70039'
    }
}