import React, { Component } from 'react';
import logo from '../../maco-icon.png';
import './NavBar.css';
import store from '../../store';
import firebase from "firebase/index";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearParams } from '../../actionCreators';


class Profile extends Component {
    constructor(props) {
        super();
        this.state = {
            address: '',
            name: '',
            description: '',
            location: ''
        };
    }
    componentWillMount(){
        this.setState({address: this.props.user.data.address,
            name: this.props.user.data.name,
            description: this.props.user.data.description,
            location: this.props.user.data.location});
    }
    setAddress(e){
        this.setState({address:e.target.value});
    }
    setDescription(e){
        this.setState({description:e.target.value});
    }
    setLocation(e){
        this.setState({location:e.target.value});
    }
    setName(e){
        this.setState({name:e.target.value});
    }
    setTwitter(){

    }
    updateUser(e){
        e.preventDefault();
        this.props.updateUser(this.state.name, this.state.address, this.state.description, this.state.location);
    }
    handleKeyPress(e){
        if(e.key === 'Enter'){
            e.target.blur()
        }
    }
    render(){
        return <div className="NavBar well-sm">
            <div className="row">
                <div className="col-sm-6 col-md-4">
                    <i alt="" className="fa fa-question-circle img-responsive"></i>
                </div>
                <div className="col-sm-6 col-md-8 user-profile-data">
                    <form className="form" onSubmit={this.updateUser.bind(this)} role="form" id="login-nav">
                        <div className="form-group">
                            <input type="text"
                                   className="form-control user-name"
                                   id="userName"
                                   placeholder="Nombre"
                                   value={this.state.name}
                                   onKeyPress={this.handleKeyPress.bind(this)}
                                   onChange={this.setName.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <i className="fa fa-map-marker"></i>
                            <input type="text"
                                   className="form-control"
                                   id="userAddress"
                                   placeholder="Address"
                                   value={this.state.address}
                                   onKeyPress={this.handleKeyPress.bind(this)}
                                   onChange={this.setAddress.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <i className="fa fa-home"></i>
                            <input type="text"
                                   className="form-control"
                                   id="userLocation"
                                   placeholder="City"
                                   value={this.state.location}
                                   onKeyPress={this.handleKeyPress.bind(this)}
                                   onChange={this.setLocation.bind(this)}
                            />
                        </div>
                        {/*<div className="form-group">
                            <i className="fa fa-twitter"></i>
                            <input type="text"
                                   className="form-control"
                                   id="userTwitter"
                                   placeholder="Twitter username"
                                   value={this.state.twitter}
                                   onChange={this.setTwitter.bind(this)}
                            />
                        </div>*/}
                        <div className="form-group">
                            <i className="fa fa-question"></i>
                            <textarea type="text"
                                   className="form-control user-description"
                                   id="userDescription"
                                   placeholder="Describe yourself"
                                   value={this.state.description}
                                   onKeyPress={this.handleKeyPress.bind(this)}
                                   onChange={this.setDescription.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>;
    }
}

class LoginForm extends Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            pswd: ''
        };
    }
    logInUser(e){
        e.preventDefault();
        this.props.logInUser({email:this.state.email, pswd:this.state.pswd});
    }
    recoverPswd(e){
        e.preventDefault();
        this.props.recoverPswd();
    }
    setEmail(e){
        this.setState({email:e.target.value});
    }
    setPswd(e){
        this.setState({pswd:e.target.value});
    }
    render(){
        return <form className="form" role="form" onSubmit={this.logInUser.bind(this)} id="login-nav">
            <div className="form-group">
                <label className="sr-only" htmlFor="exampleInputEmail2">Email address</label>
                <input type="email"
                       className="form-control"
                       id="exampleInputEmail2"
                       placeholder="Email address"
                       required
                       value
                       value={this.state.email}
                       onChange={this.setEmail.bind(this)}
                />
            </div>
            <div className="form-group">
                <label className="sr-only" htmlFor="exampleInputPassword2">Password</label>
                <input type="password"
                       className="form-control"
                       id="exampleInputPassword2"
                       placeholder="Password"
                       required
                       value={this.state.pswd}
                       onChange={this.setPswd.bind(this)}
                />
                <div className="help-block text-right"><a onClick={this.recoverPswd.bind(this)}>Forget the password ?</a></div>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Sign in</button>
            </div>
        </form>;
    }
}

class RecoverForm extends Component {
    constructor(props) {
        super();
        this.state = {
            email: ''
        };
    }
    recoverPswd(e){
        e.preventDefault();
        this.props.recoverByEmail(this.state.email);
    }
    setEmail(e){
        this.setState({email:e.target.value});
    }
    render(){
        return <form className="form" role="form" onSubmit={this.recoverPswd.bind(this)} id="login-nav">
            <div className="form-group">
                <label className="sr-only" htmlFor="exampleInputEmail2">Email address</label>
                <input type="email"
                       className="form-control"
                       id="exampleInputEmail2"
                       placeholder="Email address"
                       required
                       value
                       value={this.state.email}
                       onChange={this.setEmail.bind(this)}
                />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Recover password</button>
            </div>
        </form>;
    }
}

class RegisterForm extends Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            pswd: ''
        };
    }
    signInUser(e){
        e.preventDefault();
        this.props.signInUser({email:this.state.email, pswd:this.state.pswd});
    }
    setEmail(e){
        this.setState({email:e.target.value});
    }
    setPswd(e){
        this.setState({pswd:e.target.value});
    }
    render(){
        return <form className="form" role="form" onSubmit={this.signInUser.bind(this)} id="login-nav">
            <div className="form-group">
                <label className="sr-only" htmlFor="exampleInputEmail2">Email address</label>
                <input type="email"
                       className="form-control"
                       id="exampleInputEmail2"
                       placeholder="Email address"
                       required
                       value
                       value={this.state.email}
                       onChange={this.setEmail.bind(this)}
                />
            </div>
            <div className="form-group">
                <label className="sr-only" htmlFor="exampleInputPassword2">Password</label>
                <input type="password"
                       className="form-control"
                       id="exampleInputPassword2"
                       placeholder="Password"
                       required
                       value={this.state.pswd}
                       onChange={this.setPswd.bind(this)}
                />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Register</button>
            </div>
        </form>;
    }
}

class SearchEnterprise extends Component {
    constructor(props) {
        super();
        this.state = {
            name: ''
        };
    }
    notify(msg){
        toast(msg);
    }
    getEnterprise(e){
        var self = this;
        e.preventDefault();

        axios.get(store.getState().baseUrl + 'Shop/searchName/' + this.state.name).then(function(response){
            if(response.data.length > 0){
                self.props.setEnterprise(response.data[0]);
            }else{
                self.notify("La empresa que buscas no se encuentra disponible.");
            }
        });
    }
    setName(e){
        this.setState({name:e.target.value});
    }
    render(){
        return <form className="form col-sm-8 col-md-8" role="form" onSubmit={this.getEnterprise.bind(this)} id="connect-nav">
            <div className="form-group">
                <label className="sr-only" htmlFor="exampleInputEmail2">Nombre</label>
                <input type="text"
                       className="form-control"
                       id="exampleInputEmail2"
                       placeholder="Nombre"
                       required
                       value
                       value={this.state.name}
                       onChange={this.setName.bind(this)}
                />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Siguiente</button>
            </div>
        </form>;
    }
}

class NavBar extends Component {
    constructor(props) {
        super();
        this.state = {
            regUser: "connect",
            enterprise: ''
        }

        store.subscribe(() => {
            this.setState({username: store.getState().user1});
        });
    }
    handleJoinUs(e){
        this.setState({
            regUser: "signin"
        });
        this.dMenu.className = "dropdown open";
    }
    closeStatus(e){
        this.dMenu.className = "dropdown";
    }
    handleLogin(e){
        this.setState({
            regUser: "login"
        });
        this.dMenu.className = "dropdown open";
    }
    componentDidUpdate(){
        if(this.state.regUser === "signin"){
            this.dMenu.className = "dropdown open";
        }
    }
    componentWillReceiveProps(nextProps){ }
    componentWillUpdate(nextProps, nextState){
        //console.log("B");
    }
    componentDidUpdate(prevProps, prevState){
        //console.log("C");
    }
    signOutUser(e){
        this.props.signOutUser({});
        this.setState({regUser:"connect"});
        store.dispatch(clearParams({}));
    }
    navigate(view){
        this.props.navigate(view);
    }
    goBack(view){
        this.setState({regUser:view});
        this.dMenu.className = "dropdown open";
    }
    logInUserWithProvider(providerType){
        this.props.logInUserWithProvider(providerType);
        this.dMenu.className = "dropdown open";
    }
    recoverPswd(){
        this.setState({regUser:"recover"});
    }
    recoverByEmail(email){
        this.props.recoverByEmail(email);
        this.handleLogin();
    }
    setEnterprise(name){
        this.props.setEnterprise(name);
        this.setState({regUser:"login"});
    }
  render() {
        var currentForm = null;
        var userLinks = null;
        if(this.props.user.logged){
            currentForm = <div className="row profile">
                <div className="col-xs-12 col-sm-12 col-md-12">
                    <i className="back-link fa fa-close" onClick={this.closeStatus.bind(this)} />
                    <Profile user={this.props.user} updateUser={this.props.updateUser} />
                    <a className="back-link" onClick={this.signOutUser.bind(this)}>Salir</a>
                </div>
            </div>;
        }else if(this.state.regUser === "connect"){
            currentForm = <div className="row">
                <div className="col-md-12">
                    <center>
                        <h4>Conecta con tu empresa</h4>
                    </center>
                    <br />
                    <br />
                    <div className="col-sm-2 col-md-2"></div>
                    <SearchEnterprise setEnterprise={this.setEnterprise.bind(this)} />
                    <div className="col-sm-2 col-md-2"></div>
                    <div className="col-sm-12 col-md-12">
                        <br />
                        <br />
                    </div>
                </div>
            </div>;
        }else if(this.state.regUser === "signin"){
            currentForm = <div className="row">
                <div className="col-md-12">
                    Register
                    <a className="back-link" onClick={this.handleLogin.bind(this)}>back</a>
                    <RegisterForm user={this.props.user} signInUser={this.props.signInUser} />
                </div>
            </div>;
        }else if(this.state.regUser === "login"){
            currentForm = <div className="row">
                <div className="col-md-12">
                    Login via
                    <i className="back-link fa fa-close" onClick={this.closeStatus.bind(this)} />
                    <a className="back-link" onClick={() => this.goBack("connect")}>back</a>
                    <div className="social-buttons">
                        <a onClick={() => this.logInUserWithProvider("twitter")} className="btn btn-tw"><i className="fa fa-twitter" /> Twitter</a>
                        <a onClick={() => this.logInUserWithProvider("google")} className="btn btn-gg"><i className="fa fa-google" /> Google</a>
                    </div>
                    or
                    <LoginForm logInUser={this.props.logInUser} recoverPswd={this.recoverPswd.bind(this)} />
                </div>
                <div className="bottom text-center">
                    New here ? <a onClick={this.handleJoinUs.bind(this)}><b>Join Us</b></a>
                </div>
            </div>;
        }else if(this.state.regUser === "recover"){
            currentForm = <div className="row">
                <div className="col-md-12">
                    Recover password
                    <a className="back-link" onClick={this.handleLogin.bind(this)}>back</a>
                    <RecoverForm user={this.props.user} recoverByEmail={this.recoverByEmail.bind(this)} />
                </div>
            </div>;
        }
        if(this.props.user.logged){
            userLinks = <li><a onClick={() => this.navigate("addProduct")}>Nuevo</a></li>;
        }
      return (
          <nav className="navbar navbar-default" role="navigation">
              <div className="container-fluid">
                  <div className="navbar-header">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                          <span className="sr-only">Toggle navigation</span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                      </button>
                      <a className="navbar-brand" onClick={() => this.navigate("home")}><img src={logo} className="NavBar-logo" alt="logo" /></a>
                  </div>

                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                      <ul className="nav navbar-nav">
                          {userLinks}
                          <li><a onClick={() => this.navigate("about")}>Nosotros</a></li>
                      </ul>
                      <ul className="nav navbar-nav navbar-right">
                          <li className="dropdown" ref={function(el){
                              this.dMenu = el;
                          }.bind(this)}>
                              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                  { this.props.user.logged ? "Bienvenid@ " + (this.props.user.email) : ("Login") }
                                  <i className="fa fa-angle-down" />
                              </a>
                              <ul id="login-dp" className="dropdown-menu">
                                  <li>
                                      {currentForm}
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
