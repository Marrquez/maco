import React, { Component } from 'react';
import './Board.css';
import store from '../../store';
import { accion1 } from '../../actionCreators';
import Profiles from '../profiles/Profiles';

class Board extends Component {
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
    addElement(){
        store.dispatch(accion1(345, 446));
    }
  render() {
      return (
          <div className="container">
              <Profiles></Profiles>
              <p onClick={this.addElement.bind(this)}>Hello...</p>
          </div>
      );
  }
}

export default Board;
