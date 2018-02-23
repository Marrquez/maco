import React, { Component } from 'react';
import './Home.css';
import firebase from 'firebase';
import NavBar from '../nav-bar/NavBar';
import Footer from '../footer/Footer';
import Board from '../board/Board';
import store from '../../store';

// Initialize Firebase
const config = {
    apiKey: 'AIzaSyDw9CnycTe43Rk2k9rqOpbnxbJvHs9PZxQ',
    authDomain: 'maco-18666.firebaseapp.com',
    databaseURL: 'https://maco-18666.firebaseio.com',
    projectId: 'maco-18666',
    storageBucket: '',
    messagingSenderId: '939884733594'
};
firebase.initializeApp(config);

class Home extends Component {
    constructor(){
        super();
        this.state = {
            user: {email:'', logged:false, data: {}}
        }
    }
    componentWillMount(){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                let newData ={
                    email:user.email,
                    logged:true,
                    data: user
                };
                this.setState({user:newData});
            } else {
                let newData = {
                    email:'',
                    logged:false,
                    data: {}
                };
                this.setState({user:newData});
            }
        }.bind(this));
    }
    signInUser(params){
        firebase.auth().createUserWithEmailAndPassword(params.email, params.pswd).then(function(){
            console.warn("The user was sign in!");
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }
    signOutUser(params){
        firebase.auth().signOut().then(function() {
            console.warn("The user was logged out!");
        }).catch(function(error) {
            // An error happened.
        });
    }
    logInUser(params){
        firebase.auth().signInWithEmailAndPassword(params.email, params.pswd).then(function(){
            console.warn("The user was logged in!");
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }
  render() {
    return (
      <div className="Home">
          <NavBar user={this.state.user} logInUser={this.logInUser.bind(this)}  signInUser={this.signInUser.bind(this)} signOutUser={this.signOutUser.bind(this)}></NavBar>
          <Board />
          <Footer />
      </div>
    );
  }
}

export default Home;
