import React, { Component } from 'react';
import './Profiles.css';
import store from '../../store';
import Profile from '../profile/Profile';

var itinerario = [
    {id:0, ciudad: 'Popayán', dias: 8},
    {id:1,ciudad: 'Cali', dias: 5},
    {id:2,ciudad: 'Medellín', dias: 6},
    {id:3,ciudad: 'Popayán', dias: 8},
    {id:4,ciudad: 'Bogotá', dias: 10}
];

class Profiles extends Component {
    constructor(props) {
        super();
        this.state = { }

        store.subscribe(() => {
            //this.setState({username: store.getState().user1});
        });
    }
    componentDidUpdate(){ }
    componentWillReceiveProps(nextProps){ }
    componentWillUpdate(nextProps, nextState){ }
    componentDidUpdate(prevProps, prevState){ }
  render() {
      return (
          <div>
              { itinerario.map(function(resultado) {
                  return <Profile  key={resultado.id}></Profile>;
              }.bind(this)) }
          </div>);
  }
}

export default Profiles;
