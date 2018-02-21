import React, { Component } from 'react';
import logo from '../../maco-icon.png';
import './NavBar.css';

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
                <div className="help-block text-right"><a href="">Forget the password ?</a></div>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Sign in</button>
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
        this.dMenu.className = "dropdown open";
    }
    closeStatus(e){
        this.dMenu.className = "dropdown";
    }
    handleLogin(e){
        this.setState({
            regUser: false
        });
        this.dMenu.className = "dropdown open";
    }
    componentDidUpdate(){
        if(this.state.regUser){
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
        this.setState({regUser:false});
    }
  render() {
        var currentForm = null;
        if(this.props.user.logged){
            currentForm = <div className="row">
                <div className="col-md-12">
                    <i className="back-link fa fa-close" onClick={this.closeStatus.bind(this)} />
                    <a onClick={this.signOutUser.bind(this)}>Logout</a>
                </div>
            </div>;
        }else if(this.state.regUser){
            currentForm = <div className="row">
                <div className="col-md-12">
                    Register
                    <a className="back-link" onClick={this.handleLogin.bind(this)}>back</a>
                    <RegisterForm user={this.props.user} signInUser={this.props.signInUser} />
                </div>
            </div>;
        }else{
            currentForm = <div className="row">
                <div className="col-md-12">
                    Login via
                    <i className="back-link fa fa-close" onClick={this.closeStatus.bind(this)} />
                    <div className="social-buttons">
                        <a href="#" className="btn btn-tw"><i className="fa fa-twitter" /> Twitter</a>
                    </div>
                    or
                    <LoginForm logInUser={this.props.logInUser} />
                </div>
                <div className="bottom text-center">
                    New here ? <a onClick={this.handleJoinUs.bind(this)}><b>Join Us</b></a>
                </div>
            </div>;
        }
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
                              <a href="#" className="dropdown-toggle" data-toggle="dropdown">{ this.props.user.logged ? (this.props.user.email) : ("Login") }</a>
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
