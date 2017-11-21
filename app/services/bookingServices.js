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
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
};

export const putBookings = (token, bookingType, id, body) => {
    return fetch(`${process.env.API_URL}${process.env.API_PREFIX}/bookings/${bookingType}/${id}`, {
        method: 'put',
        body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
};

export const getBooking = (token, bookingType, id) => {
    return fetch(`${process.env.API_URL}${process.env.API_PREFIX}/bookings/${bookingType}/${id}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
};