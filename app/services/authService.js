export const getAuthLogin = (basic) => {
    return fetch(`${process.env.API_URL}${process.env.API_PREFIX}/auth/login`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + basic,
        },
    });
};

export const recoverAccount = (body) => {
    return fetch(`${process.env.API_URL}${process.env.API_PREFIX}/auth/account-recovery`, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const resetPassword = (userId, token, body) => {
    return fetch(`${process.env.API_URL}${process.env.API_PREFIX}/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
};

export const changePassword = (userId, token, body) => {
    return fetch(`${process.env.API_URL}${process.env.API_PREFIX}/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
};

// Registration
export const postUsers = (body) => {
    return fetch(`${process.env.API_URL}${process.env.API_PREFIX}/users`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
};
export const activateUser = (userId, token) => {
    return fetch(`${process.env.API_URL}${process.env.API_PREFIX}/users/${userId}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            active: true,
        }),
    });
};
