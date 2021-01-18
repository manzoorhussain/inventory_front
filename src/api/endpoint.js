import axios from 'axios';
 
export default axios.create({
baseURL:'http://13.232.254.45:5000/inventory/',
headers:{
    'Authorization':'application/json'
}

 });

