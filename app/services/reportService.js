export const getReport = (token, from, to) => {
    return fetch(`${process.env.API_URL}${process.env.API_PREFIX}/report?from=${from}&to=${to}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
};
