//source: https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/blob/reference/12/client/lib/postJSON.jsx
import { getToken } from "../lib/auth";
const API_BASE = "https://hytteportalen-307333592311.europe-west1.run.app";


export async function fetchBookings() {
    const token = getToken();
    const res = await fetch(`${API_BASE}/api/admin/bookings`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error("Feil ved henting");
    return res.json();
};

export async function processBookings(cabinId, startDate, endDate) {
    const token = getToken();
    const res = await fetch(`${API_BASE}/api/admin/process/${cabinId}`, {
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
    const token = getToken();
    const res = await fetch(`${API_BASE}/api/admin/all-cabins`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error("Kunne ikke hente hytter");
    return await res.json();
    };


export async function fetchUsers() {
    const token = getToken();
    const res = await fetch(`${API_BASE}/api/admin/all-users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error("Kunne ikke hente brukere");
    return await res.json();
};

export async function fetchAvailability(month, cabinId) {
    const token = getToken();
    const res = await fetch(`${API_BASE}/api/calendar/availability`, {
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
    const token = getToken();
    const res = await fetch(`${API_BASE}/api/admin/edit-booking/${bookingId}`, {
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

export async function fetchBookingsByPeriod(startDate, endDate) {
    const token = getToken();
    const res = await fetch(`${API_BASE}/api/admin/bookings-by-period`, {
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
    const token = getToken();
    const res = await fetch(`${API_BASE}/api/admin/bookings`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const errorResponse = await res.text();
        console.log("Backend-feilmelding:", errorResponse);
        throw new Error(errorResponse || "Kunne ikke opprette booking");
    }
    return await res.json();
};

export async function deleteBooking (bookingId) {
    const token = getToken();
    const res = await fetch(`${API_BASE}/api/admin/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error("Kunne ikke slette booking");
    return await res.json();
};
