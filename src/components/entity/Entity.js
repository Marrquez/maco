import React, { Component } from 'react';
import './Entity.css';
import store from '../../store';

class Entity extends Component {
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
        let defaultImg = "";
      return (
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 profile single-card-prifile">
              This is a card
          </div>
      );
  }
}

export default Entity;
