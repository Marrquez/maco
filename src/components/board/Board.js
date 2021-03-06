import React, { Component } from 'react';
import './Board.css';
import store from '../../store';
import { accion1 } from '../../actionCreators';
import Entities from '../entities/Entities';
import Trolley from '../trolley/Trolley';

class Board extends Component {
    constructor(props) {
        super();
        this.state = { }

        store.subscribe(() => { });
    }
    componentWillReceiveProps(nextProps){ }
    componentWillUpdate(nextProps, nextState){ }
    componentDidUpdate(prevProps, prevState){ }
    addElement(){
        store.dispatch(accion1(345, 446));
    }
  render() {
      return (
          <div className="container-fluid Board">
              <Entities navigate={this.props.navigate} user={this.props.user}></Entities>
              <Trolley navigate={this.props.navigate} user={this.props.user}></Trolley>
          </div>
      );
  }
}

export default Board;
