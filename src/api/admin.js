//source: https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/blob/reference/12/client/lib/postJSON.jsx
const API_BASE = "http://localhost:8080/api";


function getAuthHeader() {
    const token = localStorage.getItem('token');
    return {
        Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
    };
}


export async function fetchBookings() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/admin/bookings`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error("Feil ved henting");
    return res.json();
};

export async function processBookings(cabinId, startDate, endDate) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/admin/process/${cabinId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
    },
        body: JSON.stringify({startDate, endDate}),
    });
    if (!res.ok) throw new Error("Feil ved prosessering");
    return res.json();
};

export async function fetchCabins() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/admin/all-cabins`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error("Kunne ikke hente hytter");
    return await res.json();
    };


export async function fetchUsers() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/admin/all-users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error("Kunne ikke hente brukere");
    return await res.json();
};

export async function fetchAvailability(month, cabinId) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/calendar/availability`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ month, cabinId }),
    });
    if (!res.ok) throw new Error("Kunne ikke hente kalenderdata");
    return await res.json();
};


export async function updateBooking (bookingId, payload) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/admin/edit-booking/${bookingId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Kunne ikke oppdatere booking");
    return await res.json();
};

export async function fetchBookingsByPeriod(startDate, endDate, token) {
    const res = await fetch(`${API_BASE}/admin/bookings-by-period`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ startDate, endDate }),
    });

    if (!res.ok) throw new Error("Kunne ikke hente bookinger for valgt tidsrom");
    return await res.json();
};

export async function createBookingForUser(payload) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/admin/bookings`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Kunne ikke opprette booking");
    return await res.json();
};

export async function deleteBooking (bookingId) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/admin/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error("Kunne ikke slette booking");
    return await res.json();
};
