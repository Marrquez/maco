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
        let defaultImg = "https://vignette.wikia.nocookie.net/universosteven/images/4/48/Jerez-TV-Incognito.jpg/revision/latest/scale-to-width-down/2000?cb=20160810040810&path-prefix=es";
      return (
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 profile single-card-prifile">
              <div className="img-box">
                  <img src={ this.props.data.mainPic === "" ? defaultImg : this.props.data.mainPic } className="img-responsive" />
                  <ul className="text-center">
                      <a href="#"><li><i className="fa fa-plus-circle"></i></li></a>
                  </ul>
              </div>
              <ul className="text-center contact-user">
                  <a href="#"><li><i className="fa fa-twitter"></i></li></a>
                  <a href="#"><li><i className="fa fa-comment"></i></li></a>
              </ul>
              <h2>{this.props.data.name}, {this.props.data.age}</h2>
              <small>
                  <cite title="San Francisco, USA">
                      <i className="glyphicon glyphicon-map-marker"></i> San Francisco, USA
                  </cite>
              </small>
              <p className="short-description">
                  {this.props.data.desc}
              </p>
          </div>
      );
  }
}

export default Profile;
