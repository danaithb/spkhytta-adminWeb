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
        body: JSON.stringify({startDate, endDate}),
    });
    const contentType = res.headers.get("Content-Type");
    const isJson = contentType && contentType.includes("application/json");

    if (!res.ok) {
        const errorMsg = isJson ? await res.json() : await res.text();
        throw new Error(errorMsg);
    }

    return isJson ? await res.json() : {};
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

export const fetchAvailability = async (month, cabinId) => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8080/api/calendar/availability", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            month,
            cabinId,
        }),
    });

    if (!res.ok) {
        throw new Error("Kunne ikke hente kalenderdata");
    }
    return await res.json();
};

/*
export const updateBooking = async (bookingId, payload) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:8080/api/admin/edit-booking/${bookingId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return await response.json();
};
*/

export const fetchBookingsByPeriod = async (startDate, endDate, token) => {
    const response = await fetch("http://localhost:8080/api/admin/bookings-by-period", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ startDate, endDate }),
    });

    if (!response.ok) {
        throw new Error("Kunne ikke hente bookinger for valgt tidsrom");
    }

    return await response.json();
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
