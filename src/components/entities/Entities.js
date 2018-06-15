import React, { Component } from 'react';
import './Entities.css';
import store from '../../store';
import Profile from '../profile/Profile';

var products = [
    {id:0, name: 'Juan', age: 28, desc: 'Persona tranquila', mainPic: "http://nabeel.co.in/files/bootsnipp/team/5.jpg" },
    {id:1, name: 'Ana', age: 23, desc: 'Trabajando día a día para ser mejor', mainPic: "http://nabeel.co.in/files/bootsnipp/team/1.jpg" },
    {id:2, name: 'Paula', age: 34, desc: 'Feliz por todo lo que me está pasando', mainPic: "http://nabeel.co.in/files/bootsnipp/team/2.jpg" },
    {id:3, name: 'Juan Pablo', age: 18, desc: 'Escribiendo estupideces desde tiempos inmemorables', mainPic: "" },
    {id:4, name: 'Jairo Andres', age: 38, desc: 'Descomplicado, Caucano.', mainPic: "http://nabeel.co.in/files/bootsnipp/team/7.jpg" },
];

class Entities extends Component {
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
          <div className="container-fluid">
              { products.map(function(product) {
                  return <Entity  key={user.id} data={product}></Entity>;
              }.bind(this)) }
          </div>);
  }
}

export default Entities;
