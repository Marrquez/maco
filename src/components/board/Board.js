import React, { Component } from 'react';
import './Board.css';
import store from '../../store';
import { accion1 } from '../../actionCreators';
import Entities from '../entities/Entities';

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
              <Entities></Entities>
          </div>
      );
  }
}

export default Board;
