import axios from 'axios';
const base = 'http://localhost:8080/api/admin';

function getAuthHeader() {
    const token = localStorage.getItem('token'); 
    console.log("Token som sendes:", token);
    return { Authorization: `Bearer ${token}` };
}


export const fetchBookings = async () => {
    const token = localStorage.getItem("token");
    console.log("Token som sendes:", token);
    const res = await fetch("http://localhost:8080/api/admin/bookings", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Feil ved henting");
    }

    return res.json();
};

export const processBookings = async (cabinId, startDate, endDate) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/api/admin/process/${cabinId}`, {        
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ startDate, endDate }),
    });
    if (!res.ok) throw new Error("Feil ved trekking");
    return res.json();
};

export const fetchCabins = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/api/admin/all-cabins", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Kunne ikke hente hytter");
    }

    return res.json();
};


export const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/api/admin/all-users", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Kunne ikke hente brukere");
    }

    return res.json();
};



export const updateBooking = (bookingId, payload) =>
    axios.put(`${base}/edit-booking/${bookingId}`, payload, {
        headers: getAuthHeader(),
    }).then(res => res.data);

export const createBookingForUser = (payload) =>
    axios.post(`${base}/bookings`, payload, {
        headers: getAuthHeader(),
    }).then(res => res.data);

export const deleteBooking = (bookingId) =>
    axios.delete(`${base}/bookings/${bookingId}`, {
        headers: getAuthHeader(),
    }).then(res => res.data);
