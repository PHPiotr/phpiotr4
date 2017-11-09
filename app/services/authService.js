export const getAuthLogin = (username, password) => {
    return fetch(`${process.env.API_URL}${process.env.API_PREFIX}/auth/login`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(username + ':' + password),
        },
    });
};

// Registration
export const postUsers = body => fetch(`${process.env.API_URL}${process.env.API_PREFIX}/users`, {method: 'post', body});
export const postActivationLink = body => fetch('send_activation_link', {method: 'post', body});
