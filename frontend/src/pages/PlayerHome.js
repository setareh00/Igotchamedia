import React, { Component } from 'react';

export default class PlayeHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sessionId: null,
            gameId: null,
            hasComment: false,
            comment: null,
            rate: null,
            errMessage: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    async componentDidMount() {
        const res = await fetch('/api/userLastSession', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: this.props.userId
            })
        })
        console.log('res', res);
        let feedbackRes = await res.json();
        if (feedbackRes.hasOwnProperty('COMMENT')) {
            this.setState({ hasComment: true })
            console.log('COMMENT');
        }
        else
            this.setState({ gameId: feedbackRes.GAMEID, sessionId: feedbackRes.SESSIONID, hasComment: false })
    }

    handleChange(event) {
        event.persist();
        const { value } = event.target;
        const { name } = event.target
        this.setState({ [event.target.name]: value })
    }

    async submit() {
        const numberRegExp = /^[0-5]*$/
        const rate = this.state.rate;
        const comment = this.state.comment
        console.log('rate', rate);
        if (!rate || !comment) {
            this.setState({ errMessage: 'Fill out the fields.' });
            return
        } else if (!numberRegExp.test(rate)) {
            this.setState({ errMessage: 'Rate should be between 1 to 5' });
            return;
        }
        const res = await fetch('/api/insertcomment', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                gameId: this.state.gameId,
                sessionId: this.state.sessionId,
                userId: this.props.userId,
                comment: comment,
                rate: rate
            })
        })
        if (res.status === 200)
            this.setState({ errMessage: 'Thanks for Left a comment!' })
    }
    render() {
        console.log('playerHome props:', this.props);
        if (this.state.hasComment) {
            return (<div style={styles.container}>
                <div>This User Left comment for their last session</div>
            </div>)
        }
        else {
            return (
                <div style={styles.container}>
                    <div style={styles.errMessage}>{this.state.errMessage}</div>

                    {/* <div>Hi {this.props.userName}</div> */}
                    <input
                        type='number'
                        pattern='[1-5]'
                        name='rate'
                        style={styles.rateInput}
                        placeholder={'Rate(1-5)'}
                        onChange={this.handleChange}
                    />
                    <textarea
                        name='comment'
                        style={styles.input}
                        placeholder={'Your comment'}
                        onChange={this.handleChange}
                    />
                    {/* <div className="ui rating" data-rating="3" data-max-rating="5"></div> */}
                    <input style={styles.button} type='Submit' value="Submit" onClick={this.submit} />

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
        height: '90%',
        width: '20%',
        justifyContent: 'center',
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: `translate(${-50}%, ${-50}%)`
    },
    rateInput: {
        width: '100%',
        // marginTop: 20
        marginBottom: 15
    },
    input: {
        height: '20%',
        width: '100%',
        // marginTop: 20
        marginBottom: 15
    },
    button: {
        width: '100%',
        backgroundColor: '#C70039 ',
        padding: 5,
        color: '#FFF'
    },
    errMessage: {
        padding: '5%',
        color: '#C70039'
    }
}

