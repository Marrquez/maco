import React, { Component } from 'react';
import './Home.css';
import firebase from 'firebase';
import NavBar from '../nav-bar/NavBar';

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
            name: 'user1'
        }
    }
    componentWillMount(){
        const nameRef = firebase.database().ref().child('object').child('name');
        nameRef.on('value', (snapshot) => {
            this.setState({
                name: snapshot.val()
            });
        });
    }
  render() {
    return (
      <div className="Home">
          <NavBar></NavBar>
        <p className="Home-intro">
          To get started, edit <code>src/Home.js</code> and save to reload...
            <i className="fa fa-book" />
        </p>
          <p>{this.state.name}</p>
      </div>
    );
  }
}

export default Home;
