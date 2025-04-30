import axios from 'axios';
const base = 'http://localhost:8080/api/admin';

function getAuthHeader() {
    const token = localStorage.getItem('firebaseToken');
    return { Authorization: `Bearer ${token}` };
}

export const fetchBookings = () =>
    axios.get(`${base}/bookings`, { headers: getAuthHeader() })
        .then(res => res.data);

export const updateBooking = (id, payload) =>
    axios.put(`${base}/edit-booking/${id}`, payload, { headers: getAuthHeader() })
        .then(res => res.data);

export const createBookingForUser = payload =>
    axios.post(`${base}/bookings`, payload, { headers: getAuthHeader() })
        .then(res => res.data);

export const deleteBooking = id =>
    axios.delete(`${base}/bookings/${id}`, { headers: getAuthHeader() })
        .then(res => res.data);
