import { Box, Typography, Button, Chip } from "@mui/material";
import Calendar from "react-calendar";
import React, { useEffect, useState } from 'react';
import { deleteBooking, updateBooking, createBookingForUser, fetchBookings, fetchAvailability } from "../api/admin";
import BookingForm from "./BookingForm";

const statusMapping = {
  pending: { label: "Påventer", color: "#FFD700" },
  confirmed: { label: "Bekreftet", color: "#4CAF50" },
  cancelled: { label: "Kansellert", color: "#E53935" },
  blocked: { label: "Blokkert", color: "#4C4C4C" },
  waitlist: { label: "Venteliste", color: "#FF9800" },

};

const BookingList = ({ search = "", statusFilter = "", handleEditClick = () => {} }) => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [activeStartDate, setActiveStartDate] = useState(new Date());

    useEffect(() => {
        const loadBookings = async () => {
            const data = await fetchBookings();
            setBookings(data);
        };
        loadBookings();
    }, []);

    useEffect(() => {
        const fetchAvailabilityForNext3Months = async () => {
            if (bookings.length === 0) return;

            const cabinId = selectedBooking?.cabin?.cabinId || bookings.find(b => b.cabin)?.cabin?.cabinId;
            if (!cabinId) return;

            const allBookedDates = [];

            for (let i = 0; i < 3; i++) {
                const date = new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() + i, 1);
                const month = date.toISOString().slice(0, 7);

                try {
                    const availability = await fetchAvailability(month, cabinId);
                    const bookedDates = availability
                        .filter(day => day.status !== "available")
                        .map(day => new Date(day.date));

                    allBookedDates.push(...bookedDates);
                } catch (error) {
                    console.error(`Klarte ikke hente availability for ${month}:`, error);
                }
            }

            console.log("Samlede utilgjengelige datoer:", allBookedDates);
            setUnavailableDates(allBookedDates);
        };

        fetchAvailabilityForNext3Months();
    }, [activeStartDate, bookings, selectedBooking]);

    
    const handleBookingUpdate = async (formData) => {
        try {
            if (selectedBooking) {
                await updateBooking(selectedBooking.bookingId, formData);
                alert("Booking oppdatert!");

                const updatedBookings = await fetchBookings();
                setBookings(updatedBookings);

                const currentMonth = activeStartDate.toISOString().slice(0, 7);
                const selectedCabinId = formData.cabinId || selectedBooking?.cabin?.cabinId;

                if (selectedCabinId) {
                    const availability = await fetchAvailability(currentMonth, selectedCabinId);
                    const bookedDates = availability
                        .filter(day => day.status === "booked")
                        .map(day => new Date(day.date));
                    console.log("Oppdaterer unavailableDates:", bookedDates);
                    setUnavailableDates(bookedDates);
                }
                setSelectedBooking(null);
            }
        } catch (error) {
            console.error("Feil ved oppdatering:", error);
            alert("Det oppstod en feil ved oppdatering av booking.");
        }
    };
    

    return (
        <>
    <Box sx={{ 
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      mx: "auto",
      mt: 3,
      px: { xs: 2, md: 6 },
      gap: 3
    }}>
      {/* Calendar - Hidden on mobile */}
      <Box sx={{
        width: { md: "30%" },
        display: { xs: "none", md: "block" }
      }}>
          <Calendar
              activeStartDate={activeStartDate}
              onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
              tileDisabled={({ date }) =>
                  unavailableDates.some(d => d.toDateString() === date.toDateString())
              }


          />

      </Box>

      {/* Booking List */}
      <Box sx={{ 
        width: { xs: "100%", md: "80%" },
        flexGrow: 1, 
        maxWidth: "100%",
        boxSizing: 'border-box'
      }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Booking Liste
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxHeight: "600px",
            width: "100%",
            maxWidth: "100%",
            overflowY: "auto",
            pr: 1
          }}
        >
          {bookings
              .filter((booking) =>
                  booking.user?.name?.toLowerCase().includes(search.toLowerCase()) &&
                  (statusFilter === "" || booking.status?.toLowerCase() === statusFilter.toLowerCase())
              )
              .map((booking) => (
              <Box
                key={booking.id}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  p: 2,
                  backgroundColor: "#F5F3F2",
                  borderRadius: 2,
                  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                  gap: 1.5,
                  width: "100%",
                  boxSizing: 'border-box',
                  flexWrap: "wrap",
                }}
              >
                {/* Left Content */}
                <Box sx={{
                  flex: 1,
                  minWidth: 0,
                  maxWidth: { xs: "100%", sm: "60%" }, 
                  pr: 4,
                  overflow: 'hidden'
                }}>
                  <Typography 
                    fontWeight="bold" 
                    fontSize="14px" 
                    noWrap

                    sx={{ display: 'block' }}
                  >
                      Navn: {booking.user?.name || "Ukjent"}
                  </Typography>

                    <Typography
                        fontSize="14px"
                        fontWeight="bold"
                        mt={0.5}
                        noWrap
                    >
                        Fra {booking.startDate} til {booking.endDate}
                    </Typography>

                  <Typography 
                    color="textSecondary" 
                    fontSize="12px" 
                    noWrap
                    sx={{ 
                      display: 'block',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden'
                    }}
                  >
                      E-post: {booking.user?.email || "Ukjent"}
                  </Typography>

                    <Typography fontSize="12px" color="textSecondary" mt={0.5}>
                        Bookingkode: {booking.bookingCode}
                    </Typography>

                  <Typography
                      fontSize="12px"
                      color="textSecondary"
                      mt={0.5}
                  >
                      Pris: {booking.price} NOK
                  </Typography>

                    <Typography
                        fontSize="12px"
                        color="textSecondary" mt={0.5}>
                        Type: {booking.tripType === 'BUSINESS' ? 'Jobbreise' : 'Privat'}
                    </Typography>
                    <Typography fontSize="12px" color="textSecondary" mt={0.5}>
                        Gjester: {booking.numberOfGuests}
                    </Typography>

                </Box>

                  {/* Right Content */}
                <Box sx={{
                  display: "flex", 
                  alignItems: "center",
                  gap: 1,
                  flexShrink: 0,
                  width: { xs: '100%', sm: 'auto' } 
                }}>
                  <Chip
                    label={statusMapping[booking.status?.toLowerCase()]?.label || booking.status || "Ukjent"}
                    sx={{
                      backgroundColor: statusMapping[booking.status?.toLowerCase()]?.color || "#4C4C4C",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "12px",
                      borderRadius: "8px",
                      minWidth: 80,
                      height: 28,
                      px: 1
                    }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#1976d2",
                      textTransform: "none",
                      borderRadius: "8px",
                      fontSize: "12px",
                      height: 28,
                      minWidth: 80,
                      px: 1.5,
                      whiteSpace: 'nowrap'
                    }}
                    onClick={() => handleEditClick(booking)}>Rediger</Button>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>

          {/* Redigeringsskjema */}
          {selectedBooking && (
              <Box mt={4}>
                  <BookingForm
                      selectedBooking={selectedBooking}
                      handleBookingUpdate={handleBookingUpdate}
                      onCancel={() => setSelectedBooking(null)}
                  />
              </Box>
          )}
        </>
    );
};

export default BookingList;
