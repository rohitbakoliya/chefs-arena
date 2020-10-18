import React, { Component } from 'react';
import * as qs from 'query-string';
import Utils from '../utils/utils';
import Preloader from '../common/Preloader/Preloader';
import { Redirect } from 'react-router-dom';

class Auth extends Component{
     state = {
          loading: true,
     }
     componentDidMount(){
          const parsed = qs.parse(this.props.location.search);
          /**
          @CHECKING FOR LOCAL STORAGE
          **/
          if (typeof(Storage) !== "undefined" ) {
               if(parsed.code)
               localStorage.setItem("authorization_code", parsed.code);
               else
                console.log('code is not present in query');
             } else {
                  alert('Sorry! No Web Storage support..')
               console.log(' Sorry! No Web Storage support..')
          } 
          if(localStorage.getItem('access_token')===null){
               Utils.getAccessTokenFirstTime().then(()=>{
                    this.setState({loading: false});
               })
          }
     }
     render(){
          return(
               this.state.loading ? 
               <div
                    style={{  position: 'absolute',
                         top: '50%',
                         left: '50%',
                         transform: 'translate(-50%, -50%)'
                    }}
               >
               <Preloader/>  
              </div> :
               <Redirect 
                    to={{
                         pathname: "/dashboard",
                    }}
               />
          );
     }
}

export default Auth;