import React, { Component } from 'react';
import './Entity.css';
import store from '../../store';
import { addProduct } from '../../actionCreators';

class Entity extends Component {
    constructor(props) {
        super();
        this.state = { }

        store.subscribe(() => {}).bind(this);
    }
    componentDidUpdate(){ }
    componentDidMount(){}
    componentWillReceiveProps(nextProps){ }
    componentWillUpdate(nextProps, nextState){ }
    componentDidUpdate(prevProps, prevState){ }
    addProduct(){
        this.props.data.quantity += 1;
        store.dispatch(addProduct(this.props.data));
    }
    navigate(view, data){
        this.props.navigate(view, data);
    }
  render() {
      let defaultImg = "https://vignette.wikia.nocookie.net/universosteven/images/4/48/Jerez-TV-Incognito.jpg/revision/latest/scale-to-width-down/2000?cb=20160810040810&path-prefix=es";
      return (
          <div className="card col-6 col-sm-3 sol-lg-2 Entity">
              {/*<img className="card-img-top" src={ this.props.data.mainPic === "" ? defaultImg : this.props.data.mainPic } />*/}
              <i className="fa fa-pen" onClick={() => this.navigate("addProduct", this.props.data)} ></i>
              <div className="card-body">
                  <h5 className="card-title">{this.props.data.name}</h5>
                  <p>${this.props.data.price}</p>
                  <p className="card-text">{this.props.data.description}</p>
                  <a className="btn btn-primary" onClick={this.addProduct.bind(this)}>Agregar</a>
              </div>
          </div>
      );
  }
}

export default Entity;
