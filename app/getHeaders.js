import config from '../config';
import cookie from 'cookie-monster';

const getHeaders = () => {
    let currentCookie = cookie.getItem(config.token_key);
    if (!currentCookie) {
        delete config.api_headers['Authorization'];
    } else {
        config.api_headers['Authorization'] = `Bearer ${currentCookie}`;
    }
    return config.api_headers;
}

export default getHeaders;