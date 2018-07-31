import React, { Component } from 'react';
import './Trolley.css';
import store from '../../store';
import {clearParams, removeProduct} from '../../actionCreators';
import { addProduct } from '../../actionCreators';

class Trolley extends Component {
    constructor(props) {
        super();
        this.state = {
            totalItems: 0,
            products: []
        }

        store.subscribe(() => {
            this.updateData();
        });
    }
    componentDidUpdate(){ }
    componentDidMount(){
        this.setState({totalItems: store.getState().totalItems, products: store.getState().products});
    }
    componentWillReceiveProps(nextProps){ }
    componentWillUpdate(nextProps, nextState){ }
    componentDidUpdate(prevProps, prevState){ }
    removeProduct(product){
        store.dispatch(removeProduct(product));
    }
    addProduct(product){
        store.dispatch(addProduct(product));
    }
    updateData(){
        this.setState({totalItems: store.getState().totalItems, products: store.getState().products});
    }
    navigate(view){
        this.props.navigate(view);
    }
    resetParams(){
        store.dispatch(clearParams({}));
    }
  render() {
      var userLinks = null;
      if(this.props.user.logged){
          userLinks =
              <div className="entities__actions">
                  <div className="primary r" onClick={() => this.navigate("getBill")}>
                      <i className="fa fa-file-invoice-dollar"></i>
                      <span className="entities__actions-bill">Facturar</span>
                  </div>
                  <div onClick={this.resetParams.bind(this)} className="clear r">
                      <i className="fa fa-redo-alt"></i>
                      <span className="entities__actions-bill">Nueva</span>
                  </div>
              </div>;
      }
      return (
          <div className="Trolley">
              <div className="trolley-header">
                  <span className="trolley-header_counter icon">{this.state.totalItems}</span>
                  <div className="trolley-header_title">
                      <span className="icon subtitle">items en el carrito</span>
                  </div>
                  {userLinks}
              </div>
              <div className="trolley-body">
                  <ul>
                      { this.state.products.map(function(product) {
                          return <li  key={product.id}>
                              <b><span>{product.quantity} </span></b>
                              <span className="name">{product.name}</span>
                              <br />
                              <span className="price"> (${product.price} c/u)</span>
                              <a className="btn btn-add blue" onClick={() => this.addProduct(product)}>
                                  <i className="fa fa-plus-circle"></i></a>
                              <a className="btn btn-remove" onClick={() => this.removeProduct(product)}>
                                  <i className="fa fa-minus"></i></a>
                          </li>;
                      }.bind(this)) }
                  </ul>
              </div>
          </div>
      );
  }
}

export default Trolley;
