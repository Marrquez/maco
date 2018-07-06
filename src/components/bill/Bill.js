import React, { Component } from 'react';
import './Bill.css';
import store from '../../store';
//import { accion1 } from '../../actionCreators';

class Bill extends Component {
    constructor(props) {
        super();
        this.state = {
        }

        store.subscribe(() => { });
    }
    componentDidUpdate(){ }
    componentWillReceiveProps(nextProps){ }
    componentWillUpdate(nextProps, nextState){ }
    componentDidUpdate(prevProps, prevState){ }
  render() {
      return (
          <div className="container-fluid">
              <div className="col-sm-2"></div>
              <div className="col-sm-8">
                  <table className="col-sm-12">
                      <tbody>
                          <tr>
                              <td rowSpan="5">
                                  <i className="fa fa-file-invoice-dollar" style={{fontSize: 36}}></i>
                              </td>
                          </tr>
                          <tr><td align="left" colSpan="3"><h1>Factura de venta</h1></td></tr>
                          <tr><td align="left">Warrdnez Inc. SAS</td></tr>
                          <tr>
                              <td align="left">Avenida siempre viva # 123</td>
                              <td></td>
                              <td align="right"><b>Fecha:</b></td>
                              <td align="right" colSpan="2">
                                  2018 / Jul / 06
                              </td>
                          </tr>
                          <tr>
                              <td align="left">Bogotá, Colombia</td>
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
                                  Cristian Olaya
                              </td>
                          </tr>
                          <tr>
                              <td align="left"><b>NIT:</b></td>
                              <td align="left" colSpan="5">
                                  4938509843
                              </td>
                          </tr>
                          <tr>
                              <td align="left"><b>Teléfono:</b></td>
                              <td align="left" colSpan="5">
                                  3003499388
                              </td>
                          </tr>
                          <tr><td><br /></td></tr>
                      </tbody>
                  </table>
                  <table className="table col-sm-12 table-hover">
                      <thead>
                          <tr>
                              <th>ID</th>
                              <th>Nombre</th>
                              <th>Descripción</th>
                              <th>Cant.</th>
                              <th>Precio u</th>
                              <th>Total</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>9827344658</td>
                              <td align="left">Aretes</td>
                              <td align="left">Aretes de madera</td>
                              <td>1</td>
                              <td align="right">15000</td>
                              <td align="right">15000</td>
                          </tr>
                          <tr>
                              <td>9827344658</td>
                              <td align="left">Collar</td>
                              <td align="left">Collar de oro blanco con acabados en fantasía</td>
                              <td>6</td>
                              <td align="right">12500</td>
                              <td align="right">75000</td>
                          </tr>
                          <tr>
                              <td>557645</td>
                              <td align="left">Aretes Artic</td>
                              <td align="left">Aretes de madera</td>
                              <td>1</td>
                              <td align="right">16000</td>
                              <td align="right">16000</td>
                          </tr>
                          <tr>
                              <td>456345</td>
                              <td align="left">Brazalete</td>
                              <td align="left">Brazalete de madera</td>
                              <td>1</td>
                              <td align="right">11000</td>
                              <td align="right">11000</td>
                          </tr>
                          <tr>
                              <td align="right" colSpan="6"><b>Totales</b></td>
                          </tr>
                          <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>8</td>
                              <td></td>
                              <td align="right">117000</td>
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
