import axios from 'axios';

const Utils = {
     getAccessTokenFirstTime : ()=>{
          let config = {
               'client_id': '3f7b784f5eeae7151a567c3d974dd6fe',
               'client_secret' : '6454cc0f0f511117408d87ad85717691',
               'api_endpoint': 'https://api.codechef.com/',
               'authorization_code_endpoint': 'https://api.codechef.com/oauth/authorize',
               'access_token_endpoint': 'https://api.codechef.com/oauth/token',
               'redirect_uri': 'https://chefs-arena-rohit.netlify.com/dashboard',
               'website_base_url' : 'https://chefs-arena-rohit.netlify.com/'
          };
          let oauth_config = {
               "grant_type": "authorization_code",
               "code": localStorage.getItem('authorization_code'),
               "client_id":config.client_id ,
               "client_secret": config.client_secret,
               "redirect_uri": config.redirect_uri
          }
          axios.post(config.access_token_endpoint, oauth_config ,  {headers : {"content-Type" : "application/json"}})
          .then((res)=> {
               console.log(res.data.result.data);
               localStorage.setItem('access_token' , res.data.result.data.access_token);
               localStorage.setItem('refresh_token' , res.data.result.data.refresh_token);
               localStorage.setItem('scope' , res.data.result.data.scope);
               
          })
          .catch(err=> {
               console.log(err);    
               alert('some error occurred try to login again')
          }); 
     },
     generateAccessToken : ()=>{
          let config = {
               'client_id': '3f7b784f5eeae7151a567c3d974dd6fe',
               'client_secret' : '6454cc0f0f511117408d87ad85717691',
               'api_endpoint': 'https://api.codechef.com/',
               'authorization_code_endpoint': 'https://api.codechef.com/oauth/authorize',
               'access_token_endpoint': 'https://api.codechef.com/oauth/token',
               'redirect_uri': 'https://chefs-arena-rohit.netlify.com/dashboard',
               'website_base_url' : 'https://chefs-arena-rohit.netlify.com/'
          };
          let oauth_details = {
               'authorization_code' : localStorage.getItem('authorization_code'),
               'access_token' : localStorage.getItem('access_token'),
               'refresh_token' : localStorage.getItem('refresh_token')
          }
          let oauth_config = {
               "grant_type": "refresh_token",
               "refresh_token": localStorage.getItem('refresh_token'),
               "client_id":config.client_id ,
               "client_secret": config.client_secret,
          }
          axios.post(config.access_token_endpoint, oauth_config ,  {headers : {"content-Type" : "application/json"}})
          .then((res)=> {
               console.log(res , 'YEH WE GOT REFRESH TOKEN');
               localStorage.setItem('access_token' , res.data.result.data.access_token);
               localStorage.setItem('refresh_token' , res.data.result.data.refresh_token);
               localStorage.setItem('scope' , res.data.result.data.scope);
          })
          .catch(err=> {     
               console.log(err);    
               alert('some error occurred try to login again')
          }); 
     },
     contestListRequest : (path)=> {
          // // Utils.generateAccessToken();
          // try{
          //      const res = await axios.get( path , {headers : {"content-Type" : "application/json" ,"Authorization" : `Bearer ${localStorage.getItem('access_token')}` }});
          //      return res;
          // }catch(err){
          //      console.log(err);
          //      return null;
          // }
          axios.get( path , {headers : {"content-Type" : "application/json" ,"Authorization" : `Bearer ${localStorage.getItem('access_token')}` }})
          .then(res=>{
               const data = JSON.stringify(res.data.result.data.content.contestList);
               localStorage.setItem('contestList' , data);
          }).catch(err=> {
               try{
                    if(err.response.status===401){
                         Utils.generateAccessToken();
                         alert('Some error occured...please refresh page')
                    }
               }catch(e){
                    
                    alert('Some error occured...please refresh page or login')
                    console.log(err)
               }
          })
     },
     practiceProblemRequest : (path)=>{
          axios.get( path , {headers : {"content-Type" : "application/json" ,"Authorization" : `Bearer ${localStorage.getItem('access_token')}` }})
          .then(res=>{
               console.log(res);
               // const data = JSON.stringify(res.data.result.data.content.contestList);
               // localStorage.setItem('contestList' , data);
          }).catch(err=> {
               try{
                    if(err.response.status===401){
                         Utils.generateAccessToken();
                         alert('Some error occured...please refresh page')
                    }
               }catch(e){
                    
                    alert('Some error occured...please refresh page or login')
                    console.log(err)
               }
          })
     },
     
}
export default Utils;
