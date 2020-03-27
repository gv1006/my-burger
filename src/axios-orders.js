import axios from 'axios';

const instance = axios.create({baseURL: 'https://react-my-burger-a78ed.firebaseio.com/'});

export default instance;