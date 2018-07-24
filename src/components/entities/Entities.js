import React, { Component } from 'react';
import './Entities.css';
import store from '../../store';
import { clearParams } from '../../actionCreators';
import { removeProduct } from '../../actionCreators';
import { addProduct } from '../../actionCreators';
import Entity from '../entity/Entity';
import axios from 'axios';

var products = [];
/*var products = [
    {id:1,name:"Hello 1", price: 1000, description: "Desc 1", quantity: 0},
    {id:2,name:"Hello 2", price: 2000, description: "Desc 2", quantity: 0},
    {id:3,name:"Hello 3", price: 3000, description: "Desc 3", quantity: 0},
    {id:4,name:"Hello 4", price: 4000, description: "Desc 4", quantity: 0},
    {id:5,name:"Hello 5", price: 5000, description: "Desc 5", quantity: 0},
    ];*/

class Entities extends Component {
    constructor(props) {
        super();
        this.state = {
            searchText: '',
            searchResults: [],
            totalItems: 0,
            products: []
        }

        store.subscribe(() => {
            this.setState({totalItems: store.getState().totalItems, products: store.getState().products});
            if(store.getState().products.length === 0){
                this.setState({searchResults: []});
            }
        });
    }
    componentDidUpdate(){ }
    componentDidMount(){
        this.setState({totalItems: store.getState().totalItems, products: store.getState().products});
    }
    componentWillReceiveProps(nextProps){ }
    componentWillUpdate(nextProps, nextState){ }
    componentDidUpdate(prevProps, prevState){ }
    setSearchText(e){
        this.setState({searchText:e.target.value});
    }
    handleKeyPress(e){
        if(e.key === 'Enter'){
            this.applySearch();
        }
    }
    applySearch(){
        var self = this;
        var results = [];
        if(this.props.user.logged){
            axios.get(store.getState().baseUrl + 'Item/search/', {
                params: {
                    name: self.state.searchText, id: store.getState().shop.id
                }
            }).then(function(response){
                results = response.data.filter(function(ele, index){
                    ele.quantity = 0;
                    return ele;
                });
                self.setCurrentData(results);
            });
        }
    }
    setCurrentData(data){
        this.setState({searchResults: data});
    }
    navigate(view){
        this.props.navigate(view);
    }
    resetParams(){
        store.dispatch(clearParams({}));
    }
    removeProduct(product){
        store.dispatch(removeProduct(product));
    }
    addProduct(product){
        product.quantity += 1;
        store.dispatch(addProduct(product));
    }
  render() {
      var userRLinks = <div className="col-sm-4 entities__actions"></div>;
      var userLLinks = <div className="col-sm-4 entities__actions l"></div>;
      var userLinks = null;
      var modalContent = null;
      if(this.props.user.logged){
          userLinks =
              <div className="col-sm-12 entities__actions">
                  <div className="primary r">
                      <i onClick={() => this.navigate("getBill")} className="fa fa-file-invoice-dollar"></i>
                      <span onClick={() => this.navigate("getBill")} className="entities__actions-bill">Facturar</span>
                  </div>
                  <div className="clear r">
                      <i onClick={this.resetParams.bind(this)} className="fa fa-redo-alt"></i>
                      <span onClick={this.resetParams.bind(this)} className="entities__actions-bill">Nueva</span>
                  </div>
                  <div className="primary l">
                      <i data-toggle="modal" data-target="#trolley" className="fa fa-shopping-cart"></i>
                      <span data-toggle="modal" data-target="#trolley" className="entities__actions-bill">{this.state.totalItems} items</span>
                  </div>
              </div>;
      }

      if(this.state.totalItems === 0){
          modalContent = <span>No hay productos en el carrito</span>;
      }else{
          modalContent = <table className="table">
              <thead>
                <tr>
                    <th className="col-sm-6 col-md-6">Nombre</th>
                    <th className="col-sm-3 col-md-2">Precio</th>
                    <th className="col-sm-3 col-md-2">Cantidad</th>
                    <th className="col-sm-3 col-md-2">Agregar|Quitar</th>
                </tr>
              </thead>
              <tbody>
                  { this.state.products.map(function(product) {
                      return <tr  key={product.id}>
                          <td align="left">{product.name}</td>
                          <td>${product.price}</td>
                          <td align="center">{product.quantity}</td>
                          <td>
                              <a className="btn btn-default blue" onClick={() => this.addProduct(product)}><i className="fa fa-plus"></i></a>
                              <a className="btn btn-default" onClick={() => this.removeProduct(product)}><i className="fa fa-minus"></i></a>
                          </td>
                      </tr>;
                  }.bind(this)) }
              </tbody>
          </table>;
      }
      return (
          <div className="container-fluid">
              <div className="entities__search-container col-sm-12">
                  {userLLinks}
                  <div className="entities__search-bar col-sm-4">
                      {userLinks}
                      <div className="search-bar-container">
                          <i className="fa fa-search"></i>
                          <input type="text"
                                 id="search-text-input"
                                 placeholder="Escribe algo para buscar..."
                                 value={this.state.searchText}
                                 onChange={this.setSearchText.bind(this)}
                                 onKeyPress={this.handleKeyPress.bind(this)}
                          />
                          <button type="button"
                                  className="btn btn-link"
                                  onClick={this.applySearch.bind(this)}><i className="fa fa-search"></i></button>
                      </div>
                  </div>
                  {userRLinks}
              </div>
              { this.state.searchResults.map(function(product) {
                  return <Entity  key={product.id} data={product} navigate={this.props.navigate}></Entity>;
              }.bind(this)) }
              <div className="modal fade" id="trolley" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLongTitle">Mi carrito</h5>
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                              </button>
                          </div>
                          <div className="modal-body">
                              {modalContent}
                          </div>
                          <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>);
  }
}

export default Entities;
