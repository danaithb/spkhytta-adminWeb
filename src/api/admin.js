import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8080/api/admin',
});

export const setToken = (token) => {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const fetchBookings = () =>
    client.get('/bookings').then(res => res.data);

export const updateBooking = (bookingId, payload) =>
    client.put(`/edit-booking/${bookingId}`, payload).then(res => res.data);

export const createBookingForUser = (payload) =>
    client.post('/bookings', payload).then(res => res.data);

export const deleteBooking = (bookingId) =>
    client.delete(`/bookings/${bookingId}`);

export const fetchUsers = () =>
    client.get('/all-users').then(res => res.data);


