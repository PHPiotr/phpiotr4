import cookie from 'cookie-monster';

const getHeaders = () => {
    let token = cookie.getItem(process.env.TOKEN_KEY);
    if (token) {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }
    return {
        'Content-Type': 'application/json'
    };
};

export default getHeaders;