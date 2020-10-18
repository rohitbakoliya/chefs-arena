function isAuthenticated(){
     if(localStorage.getItem('authorization_code')){
          return true;
     }
     return false;
}
export default isAuthenticated;