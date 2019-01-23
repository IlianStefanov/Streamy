import React from 'react';
import { connect } from 'react-redux';
import { logInWithGoogle, logOut } from '../actions/authActions'; 

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                clientId: '844197062254-79necrkblm6vgmmm2e2bld0s3bb03s09.apps.googleusercontent.com',
                scope: 'profile email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
        
    }

    onAuthChange = isSignedIn => {
        if(isSignedIn) {
            this.props.logInWithGoogle(this.auth.currentUser.get().getId());
        } else {
            this.props.logOut();
        }
        console.info("Logged: ", this.auth.isSignedIn.get());
        console.info("Current user id: ", this.auth.currentUser.get().getId());
    };

    handleClickSignIn = () => {
        this.auth.signIn(); 
    };

    handleClickSignOut = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if(this.props.isSignedIn === null) {
            return (
                <button 
                    className="ui red google button" 
                    onClick={this.handleClickSignIn}>
                    <i className="google icon" /> 
                    Sign In
                </button>
            );
        } else if (this.props.isSignedIn) {
            return (
                <button 
                    className="ui red google button"
                    onClick={this.handleClickSignOut}>
                    <i className="google icon" />    
                    Sign Out
                </button>
            );
        } else {
            return (
                <button 
                    className="ui red google button" 
                    onClick={this.handleClickSignIn}>
                    <i className="google icon" /> 
                    Sign In
                </button>
            );
        }
    }

    render() {
        return (
            <div className="item">
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    };
}


export default connect(mapStateToProps, { logInWithGoogle, logOut })(GoogleAuth);