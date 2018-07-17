import React, { Component } from 'react';
import './Footer.css';
import store from '../../store';

class Footer extends Component {
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
          <div className="Footer">
              <div className="col-sm-6 col-md-6 l">
                  <h5>Powered by <a href="http://www.twitter.com/warrdnez" target="_blank">@warrdnez</a></h5>
              </div>
              <div className="col-sm-6 col-md-6 r">
                  <h5>made in Colombia</h5>
              </div>
          </div>
      );
  }
}

export default Footer;
