import React, { Component } from 'react';
import logo from '../../maco-icon.png';
import './NavBar.css';
import store from '../../store';

class Profile extends Component {
    constructor(props) {
        super();
        this.state = { };
    }
    setAge(){

    }
    setDescription(){

    }
    setLocation(){

    }
    setName(){

    }
    setTwitter(){

    }
    render(){
        return <div className="well-sm">
            <div className="row">
                <div className="col-sm-6 col-md-4">
                    <img src="https://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/d/domestic-dog_thumb.jpg" alt="" className="img-rounded img-responsive" />
                </div>
                <div className="col-sm-6 col-md-8 user-profile-data">
                    <form className="form" role="form" id="login-nav">
                        <div className="form-group">
                            <input type="text"
                                   className="form-control user-name"
                                   id="userName"
                                   placeholder="Anonimous"
                                   value={this.state.name}
                                   onChange={this.setName.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <i className="fa fa-birthday-cake"></i>
                            <input type="text"
                                   className="form-control"
                                   id="userAge"
                                   placeholder="Age"
                                   value={this.state.age}
                                   onChange={this.setAge.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <i className="fa fa-map-marker"></i>
                            <input type="text"
                                   className="form-control"
                                   id="userLocation"
                                   placeholder="Location"
                                   value={this.state.location}
                                   onChange={this.setLocation.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <i className="fa fa-twitter"></i>
                            <input type="text"
                                   className="form-control"
                                   id="userTwitter"
                                   placeholder="Twitter username"
                                   value={this.state.twitter}
                                   onChange={this.setTwitter.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <i className="fa fa-question"></i>
                            <textarea type="text"
                                   className="form-control user-description"
                                   id="userDescription"
                                   placeholder="Describe yourself"
                                   value={this.state.description}
                                   onChange={this.setDescription.bind(this)}
                            />
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
            regUser: false//,
            //username: '33'
        }

        store.subscribe(() => {
            this.setState({username: store.getState().user1});
        });
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
    navigate(view){
        this.props.navigate(view);
    }
  render() {
        var currentForm = null;
        if(this.props.user.logged){
            currentForm = <div className="row profile">
                <div className="col-xs-12 col-sm-12 col-md-12">
                    <i className="back-link fa fa-close" onClick={this.closeStatus.bind(this)} />
                    <Profile user={this.props.user} />
                    <a className="back-link" onClick={this.signOutUser.bind(this)}>Logout</a>
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
          <nav className="navbar navbar-inverse navbar-default" role="navigation">
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
                          <li><a onClick={() => this.navigate("about")}>About</a></li>
                      </ul>
                      <ul className="nav navbar-nav navbar-right">
                          <li className="dropdown" ref={function(el){
                              this.dMenu = el;
                          }.bind(this)}>
                              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                  { this.props.user.logged ? "Welcome " + (this.props.user.email) : ("Login") }
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
