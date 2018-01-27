export const getProfile = (token, id) => {
    return fetch(`${process.env.API_URL}${process.env.API_PREFIX}/users/${id}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
};
