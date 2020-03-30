import React , {Component} from 'react';
import Contest from './contest'
import NavBar from '../navbar/nav';
import * as qs from 'query-string';
import Utils from '../Utils/utils';

//  "proxy" : "https://api.codechef.com/",
  
export default class Dashboard extends Component{

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
          if(localStorage.getItem('access_token')===null)
               Utils.getAccessTokenFirstTime();
     }
     render(){
          return(
               <div className="dashboard">
                    <NavBar/>
                    <Contest/>
               </div>
          );
     }
}