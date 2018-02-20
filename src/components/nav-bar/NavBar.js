import React, { Component } from 'react';
import logo from '../../maco-icon.png';
import './NavBar.css';

class LoginForm extends Component {
    render(){
        return <div className="col-md-12">
            Login via
            <div className="social-buttons">
                <a href="#" className="btn btn-fb"><i className="fa fa-facebook" /> Facebook</a>
                <a href="#" className="btn btn-tw"><i className="fa fa-twitter" /> Twitter</a>
            </div>
            or
            <form className="form" role="form" method="post" action="login" id="login-nav">
                <div className="form-group">
                    <label className="sr-only" htmlFor="exampleInputEmail2">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail2" placeholder="Email address" required />
                </div>
                <div className="form-group">
                    <label className="sr-only" htmlFor="exampleInputPassword2">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" required />
                    <div className="help-block text-right"><a href="">Forget the password ?</a></div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                </div>
            </form>
        </div>;
    }
}

class RegisterForm extends Component {
    render(){
        return <form className="form" role="form" method="post" action="login" id="login-nav">
            <div className="form-group">
                <label className="sr-only" htmlFor="exampleInputEmail2">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail2" placeholder="Email address" required />
            </div>
            <div className="form-group">
                <label className="sr-only" htmlFor="exampleInputUsername">Email address</label>
                <input type="text" className="form-control" id="exampleInputUsername" placeholder="Email address" required />
            </div>
            <div className="form-group">
                <label className="sr-only" htmlFor="exampleInputPassword2">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" required />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Register</button>
            </div>
        </form>;
    }
}

class NavBar extends Component {
    constructor(props) {
        super();
        this.state = {
            regUser: false
        }
    }
    handleJoinUs(e){
        this.setState({
            regUser: true
        });
    }
    handleLogin(e){
        this.setState({
            regUser: false
        });
        this.dMenu.className = "open";
    }
    componentDidUpdate(){
        if(this.state.regUser){
            this.dMenu.className = "open";
        }
    }
  render() {
      return (
          <nav className="navbar navbar-default navbar-default" role="navigation">
              <div className="container-fluid">
                  <div className="navbar-header">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                          <span className="sr-only">Toggle navigation</span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                      </button>
                      <a className="navbar-brand" href=""><img src={logo} className="NavBar-logo" alt="logo" /></a>
                  </div>

                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                      <ul className="nav navbar-nav">
                          <li><a href="">Link</a></li>
                          <li><a href="#">Link</a></li>
                      </ul>
                      <ul className="nav navbar-nav navbar-right">
                          <li className="dropdown" ref={function(el){
                              this.dMenu = el;
                          }.bind(this)}>
                              <a href="#" className="dropdown-toggle" data-toggle="dropdown">Login</a>
                              <ul id="login-dp" className="dropdown-menu">
                                  <li>
                                      { this.state.regUser ? (
                                          <div className="row">
                                              <div className="col-md-12">
                                                  Register
                                                  <a onClick={this.handleLogin.bind(this)}>back</a>
                                                  <RegisterForm />
                                              </div>
                                          </div>
                                      ): (
                                          <div className="row">
                                              <LoginForm />
                                              <div className="bottom text-center">
                                                New here ? <a onClick={this.handleJoinUs.bind(this)}><b>Join Us</b></a>
                                              </div>
                                          </div>
                                      )}
                                  </li>
                              </ul>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>
      );
  }
}

export default NavBar;
