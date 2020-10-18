import React , {Component} from 'react';
import { NavLink ,Redirect,Route } from 'react-router-dom';
import Logo from '../../../assets/cc_logo.png'
import './nav.css';
export default class NavBar extends Component{

  componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.innerHTML = `$(document).ready(function(){
      $('.sidenav').sidenav();
      });`;
    this.instance.appendChild(script);
  }
  state={logout: false};

  handleLogout = (e)=>{
    if(window.confirm("Do you want to logout?")){
      this.setState({logout: true});
      localStorage.clear();
    }
  }

     render(){ 
       return(
              <header>
               <nav className="nav-wrapper teal">
                 <div className="container">
                 <Route>
                    <NavLink to="/dashboard" className="brand-logo">
                      <div className="valign-wrapper">
                          <img src={Logo} alt="logo" className="responsive-img codechef-logo hide-on-small-only" />
                          <h5>Chef's Arena</h5>
                      </div>
                    </NavLink>
                   </Route>
                   <a className="sidenav-trigger" data-target="mobile-menu">
                     <i className="material-icons">menu</i>
                   </a>
                   <ul className="right hide-on-med-and-down">
                     <li><NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink></li>
                     <li><NavLink to="/user" activeClassName="active">User</NavLink></li>
                     <li><NavLink to="/IDE" activeClassName="active">IDE</NavLink></li>
                     {
                      this.state.logout ? <Redirect to='/' /> : 
                      <li onClick={this.handleLogout} style={{cursor: 'pointer'}} >Logout</li>          
                    } 
                     <li><a href="https://github.com/rohitbakoliya" rel="noopener noreferrer" target="_blank" className="btn-floating btn-small teal darken-2">
                       <i className="fab fa-github"></i>
                     </a></li>

                     <li><a href="https://www.facebook.com/rohit.bakoliya.75/" rel="noopener noreferrer" target="_blank" className="btn-floating btn-small teal darken-2">
                       <i className="fab fa-facebook"></i>
                     </a></li>
                     <li><a href="mailto:bakoliyarohit00@gmail.com" target="_blank" className="btn-floating btn-small teal darken-2">
                      <i className="material-icons">mail</i>
                     </a></li>
                   </ul>
                   <ul className="sidenav teal lighten-2 center-align" id="mobile-menu">
                     <li><NavLink to="/dashboard" className="white-text" activeClassName="activeMob">Dashboard</NavLink></li>
                     <li><NavLink to="/user" className="white-text" activeClassName="activeMob">User</NavLink></li>
                     <li><NavLink to="/IDE" className="white-text" activeClassName="activeMob">IDE</NavLink></li>
                   
                    {
                      this.state.logout ? <Redirect to='/' /> : 
                      <li onClick={this.handleLogout} className="white-text" style={{cursor: 'pointer'}}>Logout</li>          
                    } 
                    </ul>
                 </div>
               </nav>
               <div ref={el => (this.instance = el)}></div>
             </header>

          );
     }
}