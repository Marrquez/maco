import React, { Component } from 'react';
import './CreateEntity.css';
import store from '../../store';
//import { accion1 } from '../../actionCreators';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CreateEntity extends Component {
    constructor(props) {
        super();
        this.state = {
            name: '',
            description: '',
            category: '',
            price: 0
        }

        store.subscribe(() => { });
    }
    componentDidUpdate(){ }
    componentWillReceiveProps(nextProps){ }
    componentWillUpdate(nextProps, nextState){ }
    componentDidUpdate(prevProps, prevState){ }
    setName(e){
        this.setState({name:e.target.value});
    }
    setDescription(e){
        this.setState({description:e.target.value});
    }
    setPrice(e){
        this.setState({price:e.target.value});
    }
    setCategory(e){
        this.setState({category:e.target.value});
    }
    notify(msg){
        toast(msg);
    }
    createEntity(e){
        var self = this;
        e.preventDefault();
        var newItem = {
            "name": this.state.name,
            "shop": store.getState().shop.id,
            "creationDate": Date.now(),
            "category": null,//parseInt(this.state.category),
            "price": parseInt(this.state.price)
        };
        axios.post(store.getState().baseUrl + "Item/saveItem/", newItem).then(function(response){
            self.notify("El elemento se agregó correctamente.");
            self.setState({
                name: '',
                description: '',
                category: '',
                price: 0
            });
        }).catch(error => {
            self.notify("No se pudo agregar el elemento");
        });
    }
  render() {
      var currentForm = null;

      currentForm = <form className="form col-sm-6 create-entity" role="form" onSubmit={this.createEntity.bind(this)}>
          <div className="row">
              <label className="col-sm-4 lbl" htmlFor="inputCity">Nombre</label>
              <input type="text"
                     className="col-sm-8 textbox"
                     id="inputCity"
                     value={this.state.name}
                     onChange={this.setName.bind(this)}/>
          </div>
          {/*<div className="row">
              <label className="col-sm-4 lbl" htmlFor="exampleFormControlTextarea1">Descripción</label>
              <textarea className="col-sm-8 textarea"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={this.state.description}
                        onChange={this.setDescription.bind(this)}
              ></textarea>
          </div>*/}
          <div className="row">
              <label className="col-sm-4 lbl" htmlFor="inputZip">Precio</label>
              <input type="text"
                     className="col-sm-8 textbox"
                     id="inputZip"
                     value={this.state.price}
                     onChange={this.setPrice.bind(this)}/>
          </div>
          <div className="row">
              <label className="col-sm-4 lbl" htmlFor="exampleFormControlSelect2">Categoría</label>
              <select multiple className="col-sm-8 textarea"
                      id="exampleFormControlSelect2"
                      onChange={this.setCategory.bind(this)}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
              </select>
          </div>
          <button type="submit" className="btn btn-primary">Crear</button>
      </form>;

      return (
          <div className="container-fluid">
              <div className="col-sm-3"></div>
              {currentForm}
              <div className="col-sm-3"></div>
          </div>
      );
  }
}

export default CreateEntity;
