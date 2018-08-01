import React, { Component } from 'react';
import './Bill.css';
import store from '../../store';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Bill extends Component {
    constructor(props) {
        super();
        this.state = {
            products: [],
            quantity: 0,
            amount: 0,
            date: new Date(),
            name: '',
            nit: '',
            phone: '',
            address: '',
            mail: '',
            docType: 'CC',
            billNumber: '',
            isSaved: false
        }

        store.subscribe(() => { });
    }
    componentDidMount(){
        var products = store.getState().products;
        var amount = 0;
        var date = new Date();
        products.filter(function(ele, index){
            amount += ele.quantity * ele.price;
            return [];
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
    setAddress(e){
        this.setState({address:e.target.value});
    }
    setMail(e){
        this.setState({mail:e.target.value});
    }
    setDocType(e){
        this.setState({docType:e.target.value});
    }
    setBillNumber(e){
        this.setState({billNumber:e.target.value});
    }
    handleKeyPress(e){
        if(e.key === 'Enter'){
            e.target.blur()
        }
    }
    notify(msg){
        toast(msg);
    }
    saveBill(){
        var self = this;
        var items = [];

        for(var i = 0; i < self.state.products.length; i++){
            items.push({item: self.state.products[i].id, quantity: self.state.products[i].quantity});
        }

        var newBill = {
            "billNumber": this.state.billNumber,
            "creationDate": this.state.date,
            "client": {
                "idClient": this.state.nit,
                "client": this.state.name,
                "idType": this.state.docType,
                //"phone": this.state.phone,
                //"address": this.state.address,
                //"email" this.state.mail:
            },
            "itemDetailList": items
        };

        axios.post(store.getState().baseUrl + "Bill/saveBill/", newBill).then(function(response){
            self.notify("La factura se guardó correctamente.");
            self.setState({isSaved: true});
        }).catch(error => {
            self.notify("No se pudo guardar la factura.");
        });
    }
  render() {
        var buttons = null;
        if(!this.state.isSaved){
            buttons = <td align="right">
                <button onClick={this.saveBill.bind(this)} className="btn btn-success">Finalizar</button>
                {/*<button className="btn btn-info"><i className="fa fa-print"></i></button>*/}
            </td>
        }
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
                              {buttons}
                          </tr>
                          <tr><td align="left">{this.props.user.data.enterprise.shopName}</td></tr>
                          <tr>
                              <td align="left">NIT. {this.props.user.data.enterprise.nit}</td>
                              <td></td>
                              <td align="right"><b>Fecha: </b></td>
                              <td align="right" colSpan="2">
                                  {this.state.date.getDate()  + "/" + (this.state.date.getMonth()+1) + "/" + this.state.date.getFullYear() + " " + this.state.date.getHours() + ":" + this.state.date.getMinutes()}
                              </td>
                          </tr>
                          <tr>
                              <td align="left">{this.props.user.data.enterprise.representative}</td>
                              <td></td>
                              <td align="right"><b>No.:</b></td>
                              <td align="right" colSpan="2">
                                  <input type="number"
                                         className="form-control client-data bill-number"
                                         id="billNumber"
                                         readOnly={this.state.isSaved}
                                         placeholder="Numero factura"
                                         value={this.state.billNumber}
                                         onKeyPress={this.handleKeyPress.bind(this)}
                                         onChange={this.setBillNumber.bind(this)}
                                  />
                              </td>
                          </tr>
                          <tr>
                              <td colSpan="6"><hr/></td>
                          </tr>
                          <tr>
                              <td align="left"><b>Cliente:</b></td>
                              <td align="left" colSpan="5">
                                  <input type="text"
                                         className="form-control client-data full"
                                         id="clientName"
                                         readOnly={this.state.isSaved}
                                         placeholder="Cliente"
                                         value={this.state.name}
                                         onKeyPress={this.handleKeyPress.bind(this)}
                                         onChange={this.setName.bind(this)}
                                  />
                              </td>
                          </tr>
                          <tr>
                              <td align="left">
                                  <select readOnly={this.state.isSaved} value={this.state.docType} onChange={this.setDocType.bind(this)}>
                                      <option value="CC">CC</option>
                                      <option value="CE">CE</option>
                                      <option value="NIT">NIT</option>
                                  </select>
                              </td>
                              <td align="left">
                                  <input type="number"
                                         className="form-control client-data"
                                         id="clientNit"
                                         readOnly={this.state.isSaved}
                                         placeholder="ID Cliente"
                                         value={this.state.nit}
                                         onKeyPress={this.handleKeyPress.bind(this)}
                                         onChange={this.setNit.bind(this)}
                                  />
                              </td>
                              <td align="left"><b>Dirección: </b></td>
                              <td align="right" colSpan="3">
                                  <input type="text"
                                         className="form-control client-data"
                                         id="clientAddress"
                                         readOnly={this.state.isSaved}
                                         placeholder="Dirección"
                                         value={this.state.address}
                                         onKeyPress={this.handleKeyPress.bind(this)}
                                         onChange={this.setAddress.bind(this)}
                                  />
                              </td>
                          </tr>
                          <tr>
                              <td align="left"><b>Teléfono:</b></td>
                              <td align="left">
                                  <input type="number"
                                         className="form-control client-data"
                                         id="clientPhone"
                                         placeholder="Teléfono"
                                         readOnly={this.state.isSaved}
                                         value={this.state.phone}
                                         onKeyPress={this.handleKeyPress.bind(this)}
                                         onChange={this.setPhone.bind(this)}
                                  />
                              </td>
                              <td align="left"><b>Correo: </b></td>
                              <td align="right" colSpan="3">
                                  <input type="email"
                                         className="form-control client-data"
                                         id="clientMail"
                                         pattern=".+@."
                                         title="Must be a valid email address"
                                         readOnly={this.state.isSaved}
                                         placeholder="Correo electrónico"
                                         value={this.state.mail}
                                         onKeyPress={this.handleKeyPress.bind(this)}
                                         onChange={this.setMail.bind(this)}
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
                          }) }
                          <tr className="total-label" >
                              <td align="right" colSpan="6"><b>Totales</b></td>
                          </tr>
                          <tr className="total-value" >
                              <td>- - - -</td>
                              <td align="left">- - - - - -</td>
                              <td align="left">- - - - - - - - - - - - - - - - - - - - - - -</td>
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
