import React, { Component } from 'react';
import './Bill.css';
import store from '../../store';
//import { accion1 } from '../../actionCreators';

class Bill extends Component {
    constructor(props) {
        super();
        this.state = {
            products: [],
            quantity: 0,
            amount: 0,
            date: '',
            name: '',
            nit: '',
            phone: ''
        }

        store.subscribe(() => { });
    }
    componentDidMount(){
        var products = store.getState().products;
        var amount = 0;
        var date = new Date().getDate()  + "/" + (new Date().getMonth()+1) + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes();
        products.filter(function(ele, index){
            amount += ele.quantity * ele.price;
        });
        this.setState({products: products, quantity: store.getState().totalItems, amount: amount, date:date});
    }
    componentWillReceiveProps(nextProps){ }
    componentWillUpdate(nextProps, nextState){ }
    componentDidUpdate(prevProps, prevState){ }
    setName(e){
        this.setState({name:e.target.value});
    }
    setNit(e){
        this.setState({nit:e.target.value});
    }
    setPhone(e){
        this.setState({phone:e.target.value});
    }
    handleKeyPress(e){
        if(e.key === 'Enter'){
            e.target.blur()
        }
    }
  render() {
      return (
          <div className="container-fluid Bill">
              <div className="col-sm-2"></div>
              <div className="col-sm-8">
                  <table className="col-sm-12 info">
                      <tbody>
                          <tr>
                              <td rowSpan="5">
                                  <i className="fa fa-file-invoice-dollar" style={{fontSize: 36}}></i>
                              </td>
                          </tr>
                          <tr>
                              <td align="left" colSpan="3">
                                  <h1>Factura de venta</h1>
                              </td>
                              <td align="right">
                                  <button className="btn btn-success">Finalizar</button>
                                  <button className="btn btn-info"><i className="fa fa-print"></i></button>
                              </td>
                          </tr>
                          <tr><td align="left">{this.props.user.data.name}</td></tr>
                          <tr>
                              <td align="left">{this.props.user.data.address}</td>
                              <td></td>
                              <td align="right"><b>Fecha:</b></td>
                              <td align="right" colSpan="2">
                                  {this.state.date}
                              </td>
                          </tr>
                          <tr>
                              <td align="left">{this.props.user.data.location}</td>
                              <td></td>
                              <td align="right"><b>No.:</b></td>
                              <td align="right" colSpan="2">
                                  12343534
                              </td>
                          </tr>
                          <tr>
                              <td colSpan="6"><hr/></td>
                          </tr>
                          <tr>
                              <td align="left"><b>Cliente:</b></td>
                              <td align="left" colSpan="5">
                                  <input type="text"
                                         className="form-control client-data"
                                         id="clientName"
                                         placeholder="Cliente"
                                         value={this.state.name}
                                         onKeyPress={this.handleKeyPress.bind(this)}
                                         onChange={this.setName.bind(this)}
                                  />
                              </td>
                          </tr>
                          <tr>
                              <td align="left"><b>NIT:</b></td>
                              <td align="left" colSpan="5">
                                  <input type="text"
                                         className="form-control client-data"
                                         id="clientNit"
                                         placeholder="ID Cliente"
                                         value={this.state.nit}
                                         onKeyPress={this.handleKeyPress.bind(this)}
                                         onChange={this.setNit.bind(this)}
                                  />
                              </td>
                          </tr>
                          <tr>
                              <td align="left"><b>Teléfono:</b></td>
                              <td align="left" colSpan="5">
                                  <input type="text"
                                         className="form-control client-data"
                                         id="clientPhone"
                                         placeholder="Teléfono"
                                         value={this.state.phone}
                                         onKeyPress={this.handleKeyPress.bind(this)}
                                         onChange={this.setPhone.bind(this)}
                                  />
                              </td>
                          </tr>
                          <tr><td><br /></td></tr>
                      </tbody>
                  </table>
                  <table className="table col-sm-12 table-hover detail">
                      <thead>
                          <tr>
                              <th>ID</th>
                              <th>Nombre</th>
                              <th>Descripción</th>
                              <th>Cant.</th>
                              <th>Valor</th>
                              <th>Total</th>
                          </tr>
                      </thead>
                      <tbody>
                          { this.state.products.map(function(product) {
                              return <tr key={product.id}>
                                  <td className="col-sm-1">{product.id}</td>
                                  <td className="col-sm-3" align="left">{product.name}</td>
                                  <td className="col-sm-5" align="left">{product.description}</td>
                                  <td className="col-sm-1">{product.quantity}</td>
                                  <td className="col-sm-1" align="right">${product.price}</td>
                                  <td className="col-sm-1" align="right">${product.quantity * product.price}</td>
                              </tr>;
                          }.bind(this)) }
                          <tr className="total-label" >
                              <td align="right" colSpan="6"><b>Totales</b></td>
                          </tr>
                          <tr className="total-value" >
                              <td>- - - - -</td>
                              <td align="left">- - - - - - -</td>
                              <td align="left">- - - - - - - - - - - - - - - - - - - - - - - -</td>
                              <td>{this.state.quantity}</td>
                              <td></td>
                              <td align="right">${this.state.amount}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <div className="col-sm-2"></div>
          </div>
      );
  }
}

export default Bill;
