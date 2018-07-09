import React, { Component } from 'react';
import './Entities.css';
import store from '../../store';
import { clearParams } from '../../actionCreators';
import Entity from '../entity/Entity';
import axios from 'axios';

var products = [
    {id:1,name:"Hello 1", price: 1000, description: "Desc 1", quantity: 0},
    {id:2,name:"Hello 2", price: 2000, description: "Desc 2", quantity: 0},
    {id:3,name:"Hello 3", price: 3000, description: "Desc 3", quantity: 0},
    {id:4,name:"Hello 4", price: 4000, description: "Desc 4", quantity: 0},
    {id:5,name:"Hello 5", price: 5000, description: "Desc 5", quantity: 0},
    ];

class Entities extends Component {
    constructor(props) {
        super();
        this.state = {
            searchText: '',
            searchResults: []
        }

        store.subscribe(() => {
            //this.setState({username: store.getState().user1});
        });
    }
    componentDidUpdate(){ }
    componentDidMount(){

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
        //if(self.state.searchText){
            results = products.filter(function(ele, index){
                return ele.name.toLocaleLowerCase().indexOf(self.state.searchText.toLocaleLowerCase()) !== -1;
            });
            self.setCurrentData(results);
        /*}else if(self.state.searchText === ""){
            axios.get('http://localhost:8080/Alfilsoft/Api/v1/Item/items').then(function(response){
                results = response.data.filter(function(ele, index){
                    ele.quantity = 0;
                    return ele;
                });
                self.setCurrentData(results);
            });
        }*/
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
  render() {
      var userLinks = null;
      if(this.props.user.logged){
          userLinks =
              <div className="col-sm-4 entities__actions">
                  <div>
                      <i onClick={() => this.navigate("getBill")} className="fa fa-file-invoice-dollar"></i>
                      <span onClick={() => this.navigate("getBill")} className="entities__actions-bill">Facturar</span>
                  </div>
                  <div className="clear">
                      <i onClick={this.resetParams.bind(this)} className="fa fa-redo-alt"></i>
                      <span onClick={this.resetParams.bind(this)} className="entities__actions-bill">Limpiar</span>
                  </div>
              </div>;
      }
      return (
          <div className="container-fluid">
              <div className="entities__search-container col-sm-12">
                  <div className="col-sm-4"></div>
                  <div className="entities__search-bar col-sm-4">
                      <i className="fa fa-search"></i>
                      <input type="text"
                             id="search-text-input"
                             placeholder="Type to search..."
                             value={this.state.searchText}
                             onChange={this.setSearchText.bind(this)}
                             onKeyPress={this.handleKeyPress.bind(this)}
                      />
                      <button type="button"
                        className="btn btn-link"
                        onClick={this.applySearch.bind(this)}><i className="fa fa-search"></i></button>
                  </div>
                  {userLinks}
              </div>
              { this.state.searchResults.map(function(product) {
                  return <Entity  key={product.id} data={product}></Entity>;
              }.bind(this)) }
          </div>);
  }
}

export default Entities;
