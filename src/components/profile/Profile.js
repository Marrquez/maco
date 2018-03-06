import React, { Component } from 'react';
import './Profile.css';
import store from '../../store';

class Profile extends Component {
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
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 profile single-card-prifile">
              <div className="img-box">
                  <img src="http://nabeel.co.in/files/bootsnipp/team/5.jpg" className="img-responsive" />
                  <ul className="text-center">
                      <a href="#"><li><i className="fa fa-plus-circle"></i></li></a>
                  </ul>
              </div>
              <ul className="text-center contact-user">
                  <a href="#"><li><i className="fa fa-twitter"></i></li></a>
                  <a href="#"><li><i className="fa fa-comment"></i></li></a>
              </ul>
              <h1>Celulapadre, 28</h1>
              <small>
                  <cite title="San Francisco, USA">
                      <i className="glyphicon glyphicon-map-marker"></i> San Francisco, USA
                  </cite>
              </small>
              <p className="short-description">
                  Hombre sencillo y trabajador, esta es una descripcion corta para un texto de 140 caracteres. Aqui hay 100. Aquí hay 106 y un poquito más, como 140....
              </p>
          </div>
      );
  }
}

export default Profile;
