var config = {};
if(process.env.NODE_ENV==="development"){
     config = {
          'client_id': process.env.REACT_APP_CLIENT_ID_LOCAL,
          'client_secret' : process.env.REACT_APP_CLIENT_SECRET_LOCAL,
          'api_endpoint': 'https://api.codechef.com/',
          'authorization_code_endpoint': 'https://api.codechef.com/oauth/authorize',
          'access_token_endpoint': 'https://api.codechef.com/oauth/token',
          'redirect_uri': 'http://localhost:3000/auth',
          'website_base_url' : 'http://localhost:3000/'
     }
}else{
     config = {
          'client_id': process.env.REACT_APP_CLIENT_ID,
          'client_secret' : process.env.REACT_APP_CLIENT_SECRET,
          'api_endpoint': 'https://api.codechef.com/',
          'authorization_code_endpoint': 'https://api.codechef.com/oauth/authorize',
          'access_token_endpoint': 'https://api.codechef.com/oauth/token',
          'redirect_uri': 'https://chefs-arena-rohit.netlify.com/dashboard',
          'website_base_url' : 'https://chefs-arena-rohit.netlify.com/'
     }
}
export default config;