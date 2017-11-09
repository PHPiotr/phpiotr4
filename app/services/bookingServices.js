export const getBookings = (token, bookingType, type, page) => {
    return fetch(`${process.env.API_URL}${process.env.API_PREFIX}/bookings/${bookingType}?type=${type}&page=${page}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
};

export const postBookings = (token, bookingType, body) => {
    return fetch(`${process.env.API_URL}${process.env.API_PREFIX}/bookings/${bookingType}`, {
        method: 'post',
        body,
    });
};