import React, { Component } from 'react';

export default class PlayeHome extends Component {
    render() {
        return (
            // <div>Payer Home</div>
            // <div className="ui container comments">
            //     <div>
            //         <a href="/" className="avatar">
            //             <img alt="avatar" className={faker.image.avatar()} />
            //         </a>
            //     </div>
            //    <div></div>
            //     <input style={styles.button} type='submit' value="Login" onClick={this.login} />

            // </div>
            <div>his</div>
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

