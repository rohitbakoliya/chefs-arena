import React , {Component} from 'react';
import Logo from '../../assets/cc_logo.png';
import './root.css';

export default class Root extends Component{
     
     state = {
          res : []          
     }
     componentDidMount(){
          if(localStorage.getItem("access_token")!==null){
               localStorage.removeItem("access_token");
               localStorage.removeItem("authorization_code");
               localStorage.removeItem("refresh_token");
               localStorage.removeItem("scope");
          }
     }
    
     render(){
          return(
               <div className="wrapper">
                    <div className="root-container">
                         <div className="center">
                              <h4 className="center-align">Chef's Arena</h4>
                              <img src={Logo} alt="Codechef logo" className="responsive-img codechef-logo"/>
                              <div className="center input-field">
                                   <a href="https://api.codechef.com/oauth/authorize?response_type=code&client_id=3f7b784f5eeae7151a567c3d974dd6fe&state=xyz&redirect_uri=https://chefs-arena-rohit.netlify.com/dashboard"  className="btn waves-effect waves-light">Enter</a>
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