import axios from 'axios';

const instance = axios.create({
    baseURL: "https://69d54d3fd396bd74235ea9f2.mockapi.io/api/events"
});

export default instance;
