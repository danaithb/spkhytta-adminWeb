import { Box, Typography, Button, Chip } from "@mui/material";
import Calendar from "react-calendar";
import React, { useEffect, useState } from 'react';
import { deleteBooking, updateBooking, createBookingForUser, fetchBookings } from "../api/admin";
import BookingForm from "./BookingForm";

const statusMapping = {
  pending: { label: "Påvente", color: "#FFD700" },
  confirmed: { label: "Bekreftet", color: "#4CAF50" },
  cancelled: { label: "Kansellert", color: "#E53935" },
  blocked: { label: "Blokkert", color: "#4C4C4C" },
  waitlist: { label: "Venteliste", color: "#FF9800" },

};

const BookingList = ({ search = "", statusFilter = "", handleEditClick = () => {} }) => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);


    useEffect(() => {
        const fetchAll = async () => {
            const data = await fetchBookings();
            setBookings(data);
        };
        fetchAll();
    }, []);


    const handleBookingUpdate = async (formData) => {
        try {
            if (selectedBooking) {
                await updateBooking(selectedBooking.bookingId, formData);
                alert("Booking oppdatert!");
            } else {
                await createBookingForUser(formData);
                alert("Booking opprettet!");
            }

            const updated = await fetchBookings();
            setBookings(updated);
            setSelectedBooking(null); 
        } catch (error) {
            console.error("Feil ved lagring:", error);
            alert("Kunne ikke lagre booking");
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
        <Calendar />
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
                    onClick={() => setSelectedBooking(booking)}
                  >
                    Rediger
                  </Button>
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
