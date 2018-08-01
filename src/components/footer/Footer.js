import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
    constructor(props) {
        super();
        this.state = { }
    }
    componentWillReceiveProps(nextProps){ }
    componentWillUpdate(nextProps, nextState){ }
    componentDidUpdate(prevProps, prevState){ }
  render() {
      return (
          <div className="Footer">
              <div className="sign">
                  <h5>Powered by <a href="http://www.twitter.com/warrdnez" rel="noopener noreferrer" target="_blank">@warrdnez</a></h5><h5>, hecho en Colombia</h5>
              </div>
          </div>
      );
  }
}

export default Footer;
