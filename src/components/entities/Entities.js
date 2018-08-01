import React, { Component } from 'react';
import './Entities.css';
import store from '../../store';
import Entity from '../entity/Entity';
import axios from 'axios';

class Entities extends Component {
    constructor(props) {
        super();
        this.state = {
            searchText: '',
            searchResults: []
        }
    }
    componentDidMount(){
        this.unsubscribe = store.subscribe(() => {
            if(store.getState().products.length === 0){
                this.setState({searchResults: []});
            }
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
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
  render() {
      return (
          <div className="container-fluid Entities">
              <div className="col-sm-12">
                  <div className="entities__search-bar">
                      <div className="search-bar-container">
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
              </div>
              { this.state.searchResults.map(function(product) {
                  return <Entity  key={product.id} data={product} navigate={this.props.navigate}></Entity>;
              }.bind(this)) }
          </div>);
  }
}

export default Entities;
