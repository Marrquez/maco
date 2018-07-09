import React, { Component } from 'react';
import './Entity.css';
import store from '../../store';
import { addProduct } from '../../actionCreators';
import { removeProduct } from '../../actionCreators';

class Entity extends Component {
    constructor(props) {
        super();
        this.state = {
            quantity: 0
        }

        store.subscribe(() => {
            console.log(store.getState().products);
            if(store.getState().products.length === 0){
                this.props.data.quantity = 0;
                this.setState({quantity:0});
            }
        }).bind(this);
    }
    componentDidUpdate(){ }
    componentDidMount(){
        this.setState({quantity: this.props.data.quantity});
    }
    componentWillReceiveProps(nextProps){ }
    componentWillUpdate(nextProps, nextState){ }
    componentDidUpdate(prevProps, prevState){ }
    addProduct(){
        this.props.data.quantity += 1;
        this.setState({quantity: this.props.data.quantity});

        store.dispatch(addProduct(this.props.data));
    }
    removeProduct(){
        this.props.data.quantity = this.props.data.quantity > 0 ? this.props.data.quantity - 1 : 0;
        this.setState({quantity: this.props.data.quantity});

        store.dispatch(removeProduct(this.props.data));
    }
  render() {
      let defaultImg = "https://vignette.wikia.nocookie.net/universosteven/images/4/48/Jerez-TV-Incognito.jpg/revision/latest/scale-to-width-down/2000?cb=20160810040810&path-prefix=es";
      return (
          <div className="card col-6 col-sm-3 sol-lg-2">
              {/*<img className="card-img-top" src={ this.props.data.mainPic === "" ? defaultImg : this.props.data.mainPic } />*/}
              <div className="card-body">
                  <h5 className="card-title">{this.props.data.name}</h5>
                  <p>${this.props.data.price}</p>
                  <p className="card-text">{this.props.data.description}</p>
                  <a className="btn btn-primary" onClick={this.addProduct.bind(this)}>Agregar ({this.props.data.quantity})</a>
                  <a className="btn btn-default" onClick={this.removeProduct.bind(this)}><i className="fa fa-minus"></i></a>
              </div>
          </div>
      );
  }
}

export default Entity;
