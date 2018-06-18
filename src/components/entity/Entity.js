import React, { Component } from 'react';
import './Entity.css';
import store from '../../store';
import { addProduct } from '../../actionCreators';

class Entity extends Component {
    constructor(props) {
        super();
        this.state = {
            quantity: 0
        }

        store.subscribe(() => {
            //this.setState({username: store.getState().user1});
            console.log(store.getState().products);
        });
    }
    componentDidUpdate(){ }
    componentWillReceiveProps(nextProps){ }
    componentWillUpdate(nextProps, nextState){ }
    componentDidUpdate(prevProps, prevState){ }
    addProduct(){
        store.dispatch(addProduct(this.props.data));
        this.setState({quantity: this.state.quantity + 1});
    }
  render() {
      let defaultImg = "https://vignette.wikia.nocookie.net/universosteven/images/4/48/Jerez-TV-Incognito.jpg/revision/latest/scale-to-width-down/2000?cb=20160810040810&path-prefix=es";
      return (
          <div className="card col-6 col-sm-3 sol-lg-2">
              <img className="card-img-top" src={ this.props.data.mainPic === "" ? defaultImg : this.props.data.mainPic } />
              <div className="card-body">
                  <h5 className="card-title">{this.props.data.name}</h5>
                  <p className="card-text">{this.props.data.desc}</p>
                  <a className="btn btn-primary" onClick={this.addProduct.bind(this)}>Agregar ({this.state.quantity})</a>
              </div>
          </div>
      );
  }
}

export default Entity;
