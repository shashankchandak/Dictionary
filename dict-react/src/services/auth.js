import axios from 'axios'
const URL = 'http://localhost:9999/auth'

class AuthService {

    loginUser(username,password) {
        
        let apiUrl = URL + "/login"
        const payload = { "username":username,"password":password};      
        //console.log('Api url ' + apiUrl)        
        return axios.post(apiUrl,payload)       
    }

    registerUser(username,email,password){

 
        //Registering a new user from client is always a normal user,admin user can be added only at server side
        const payload = { "email": email,"password":password,"username":username,"role":["user"] };
        //console.log(payload);
        let apiUrl = URL + "/signup"      
        //console.log('Api url ' + apiUrl)        
        return axios.post(apiUrl,payload)
    }

}


export default new AuthService()