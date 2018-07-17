import React, { Component } from 'react';
import './Home.css';
import firebase from 'firebase';
import NavBar from '../nav-bar/NavBar';
import Footer from '../footer/Footer';
import Board from '../board/Board';
import CreateEntity from '../create-entity/CreateEntity';
import Bill from '../bill/Bill';
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
            page: "home",
            enterprise: ''
        }
    }
    componentWillMount(){
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                firebase.database().ref('users/' + user.uid).on('value', function(snapshot){
                    user.address = snapshot.val() ? snapshot.val().address : "";
                    user.description = snapshot.val() ? snapshot.val().description : "";
                    user.location = snapshot.val() ? snapshot.val().location : "";
                    user.name = snapshot.val() ? snapshot.val().username : "";
                    let newData ={
                        email:user.email || user.displayName,
                        logged:true,
                        data: user
                    };
                    self.setState({user:newData});
                    if(snapshot.val() && snapshot.val().enterprise) {
                        user.enterprise = snapshot.val().enterprise
                        self.setState({enterprise:user.enterprise});
                    }else if(self.state.user.logged && user.uid) {
                        self.updateUser(user.name, user.address, user.description, user.location, true);
                    }
                });
            } else {
                let newData = {
                    email:'',
                    logged:false,
                    data: {}
                };
                this.setState({user:newData});
                this.setState({page:'home'});
                this.setState({enterprise:''});
            }
        }.bind(this));
    }
    signInUser(params){
        firebase.auth().createUserWithEmailAndPassword(params.email, params.pswd).then(function(){

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
    updateUser(name, address, description, location, doNothowNotification){
        var self = this;
        var database = firebase.database();
        let userId = this.state.user.data.uid;

        database.ref('users/' + userId).set({
            username: name,
            address: address,
            description : description,
            location: location,
            enterprise: self.state.enterprise,
        }).then(function(){
            if(!doNothowNotification){
                self.notify("La información se guardó correctamente");
            }
        });
    }
    navigate(view){
        this.setState({page: view});
    }
    setEnterprise(name){
        this.setState({enterprise: name});
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
              currentPage = <Board navigate={this.navigate.bind(this)} user={this.state.user} />;
              break;
          case "about":
          currentPage = <h4>v1.8102771</h4>;
              break;
          case "addProduct":
              currentPage = <CreateEntity />;
              break;
          case "getBill":
              currentPage = <Bill user={this.state.user} />;
              break;
          default:
              currentPage = <Board navigate={this.navigate.bind(this)} user={this.state.user} />;
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
                  updateUser={this.updateUser.bind(this)}
                  setEnterprise={this.setEnterprise.bind(this)}
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
