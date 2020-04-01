import React , {Component} from 'react';
import { NavLink ,Route, Link } from 'react-router-dom';
import Logo from '../../assets/cc_logo.png'
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
                     <li><Link to="/user">User</Link></li>
                     <li><Link to="/dashboard">Dashboard</Link></li>
                     <li><Link to="/">Logout</Link></li>
                     <li><a href="https://www.instagram.com/codechef/" rel="noopener noreferrer" target="_blank" className="btn-floating btn-small teal darken-2">
                       <i className="fab fa-instagram"></i>
                     </a></li>
                     <li><a href="https://www.facebook.com/CodeChef/" rel="noopener noreferrer" target="_blank" className="btn-floating btn-small teal darken-2">
                       <i className="fab fa-facebook"></i>
                     </a></li>
                     <li><a href="https://twitter.com/codechef" rel="noopener noreferrer" target="_blank" className="btn-floating btn-small teal darken-2">
                       <i className="fab fa-twitter"></i>
                     </a></li>
                   </ul>
                   <ul className="sidenav teal lighten-2 center-align" id="mobile-menu">
                     <li><Link to="/user" className="white-text">User</Link></li>
                     <li><Link to="/dashboard" className="white-text">Dashboard</Link></li>
                     <li><Link to="/" className="white-text">Logout</Link></li>          
                   </ul>
                 </div>
               </nav>
               <div ref={el => (this.instance = el)}></div>
             </header>

          );
     }
}