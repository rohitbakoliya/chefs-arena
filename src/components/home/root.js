import React , {Component} from 'react';
import Logo from '../../assets/cc_logo.png';
import './root.css';
import config from '../utils/config';

export default class Root extends Component{
     
     state = {
          res : []          
     }
     
     // componentDidMount(){
     //      if(localStorage.getItem("access_token")!==null){
     //           localStorage.removeItem("access_token");
     //           localStorage.removeItem("authorization_code");
     //           localStorage.removeItem("refresh_token");
     //           localStorage.removeItem("scope");
     //      }
     // }
    
     render(){
          return(
               <div className="wrapper">
                    <div className="root-container">
                         <div className="center">
                              <h1 className="center-align" style={{fontWeight: 'normal', margin: 10}}>Chef's Arena</h1>
                              <img src={Logo} alt="Codechef logo" className="responsive-img codechef-logo"/>
                              <div className="center input-field">
                                   <a href={'https://api.codechef.com/oauth/authorize?response_type=code&client_id=' + config.client_id+ '&state=xyz&redirect_uri=' + config.redirect_uri}  className="btn waves-effect waves-light">Enter</a>
                              </div>
                         </div>
                    </div>     
                    <div className="footer-copyright footer  grey darken-4">
                         <div className="container center-align white-text">
                             Copyright &copy; &nbsp;Chef's Arena 2020
                         </div>
                    </div>
               </div>
          );
     }
}