import cookie from 'cookie-monster';

const getHeaders = () => {
    let token = cookie.getItem(process.env.TOKEN_KEY);
    if (token) {
        return {'Authorization': `Bearer ${token}`};
    }
    return {};
};

export default getHeaders;