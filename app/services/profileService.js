export const getProfile = (token) => {
    return fetch(`${process.env.API_URL}${process.env.API_PREFIX}/users/current`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
};
