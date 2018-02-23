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
          <span>Powered by <a href="http://www.twitter.com/warrdnez" target="_blank">@warrdnez</a></span>
      );
  }
}

export default Footer;
