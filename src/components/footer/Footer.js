import React, { Component } from 'react';
import './Footer.css';
import col from '../../assets/col.png';

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
                  <h5>Powered by <a href="http://www.twitter.com/warrdnez" rel="noopener noreferrer" target="_blank">@warrdnez</a></h5><h5>, <img src={col} alt='Hecho en Colombia' /> Colombia</h5>
              </div>
          </div>
      );
  }
}

export default Footer;
