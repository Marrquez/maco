import React, { Component } from 'react';
import './Home.css';
import firebase from 'firebase';
import NavBar from '../nav-bar/NavBar';
import Footer from '../footer/Footer';
import Board from '../board/Board';
import store from '../../store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            user: {email:'', logged:false, data: {}},
            page: "home"
        }
    }
    componentWillMount(){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                let newData ={
                    email:user.email || user.displayName,
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
    updateUser(){
        console.log("update user");
        var database = firebase.database();
        let userId = this.state.user.data.uid;
        let name = "Hello 122222";
        let email = this.state.user.data.email;
        let imageUrl = "data:image/jpeg;base64,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";
        database.ref('users/' + userId).set({
            username: name,
            email: email,
            profile_picture : imageUrl,
            alea: "jejeje"
        }).then(function(){
            console.log("El usuario se actualizó correctamente");
        });
    }
    /*followUser(){
        firebase.database().ref('users/' + this.state.user.data.uid).on('value', function(snapshot){
            console.log(snapshot);
        });
    }
    <span onClick={this.followUser.bind(this)}>follow user activity</span>
    */
    navigate(view){
        this.setState({page: view});
    }
    notify(msg){
        toast(msg);
    }
    logUser(provider, providerType){
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.
            var token = result.credential.accessToken;
            //var secret = result.credential.secret;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }
    logInUserWithProvider(providerType){
        var provider = null;
        firebase.auth().useDeviceLanguage();

        switch(providerType) {
            case "google":
                provider = new firebase.auth.GoogleAuthProvider();
                break;
            case "twitter":
                provider = new firebase.auth.TwitterAuthProvider();
                break;
            default:
                console.log("Any provider");
                break;
        }

        this.logUser(provider, providerType);
    }
    recoverByEmail(email){
        var self = this;
        var auth = firebase.auth();

        auth.sendPasswordResetEmail(email).then(function() {
            self.notify("Ha sido enviado un email a: " + email + " con instrucciones para la recuperación de tu contraseña");
        }).catch(function(error) {
            self.notify("Ha ocurrido un error al tratar de recuperar tu contraseña");
            // An error happened.
        });
    }
  render() {
      var currentPage = null;
      switch(this.state.page) {
          case "home":
              currentPage = <Board updateUser={this.updateUser.bind(this)} />;
              break;
          case "about":
              currentPage = <h1>This is the about page</h1>;
              break;
          default:
              currentPage = <Board updateUser={this.updateUser.bind(this)} />;
              break;
      }
    return (
      <div className="Home">
          <NavBar user={this.state.user}
                  logInUserWithProvider={this.logInUserWithProvider.bind(this)}
                  navigate={this.navigate.bind(this)}
                  logInUser={this.logInUser.bind(this)}
                  signInUser={this.signInUser.bind(this)}
                  signOutUser={this.signOutUser.bind(this)}
                  recoverByEmail={this.recoverByEmail.bind(this)}>
          </NavBar>
          {currentPage}
          <Footer />
          <ToastContainer autoClose={5000} />
      </div>
    );
  }
}

export default Home;
