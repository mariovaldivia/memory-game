import axios from 'axios';

export default axios.create({
    baseURL: 'https://fed-team.modyo.cloud/api/content/spaces',
    // headers: authHeader()
  
  });