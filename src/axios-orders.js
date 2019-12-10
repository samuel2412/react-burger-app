import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-myburger-c854a.firebaseio.com/'
});
export default instance;