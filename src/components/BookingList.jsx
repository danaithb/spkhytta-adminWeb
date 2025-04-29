import React from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import Calendar from "react-calendar";  

const statusMapping = {
  Pending: { label: "Påvente", color: "#FFD700" },
  Confirmed: { label: "Bekreftet", color: "#4CAF50" },
  Cancelled: { label: "Kansellert", color: "#E53935" },
  Blocked: { label: "Blokkert", color: "#4C4C4C" },
  Ukjent: { label: "Ukjent", color: "#4C4C4C" },
};

const BookingList = ({ bookings, search, handleEditClick }) => {
  return (
    <Box sx={{ 
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      //width: "100%",
      //maxWidth: 1400, 
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
        flexGrow: 1, // Allow the Booking List to take more space
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
              booking.guestName.toLowerCase().includes(search.toLowerCase())
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
                  flexWrap: "wrap",  // Allow content to wrap if necessary
                }}
              >
                {/* Left Content */}
                <Box sx={{
                  flex: 1,
                  minWidth: 0,
                  maxWidth: { xs: "100%", sm: "60%" }, // Ensure it's responsive
                  pr: 4,
                  overflow: 'hidden'
                }}>
                  <Typography 
                    fontWeight="bold" 
                    fontSize="14px" 
                    noWrap
                    sx={{ display: 'block' }}
                  >
                    {booking.guestName}
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
                    Fra {booking.startDate} til {booking.endDate}
                  </Typography>
                  <Typography 
                    fontWeight="bold" 
                    fontSize="14px" 
                    mt={0.5}
                    noWrap
                  >
                    Pris: {booking.price} NOK
                  </Typography>
                </Box>

                {/* Right Content */}
                <Box sx={{
                  display: "flex", 
                  alignItems: "center",
                  gap: 1,
                  flexShrink: 0,
                  width: { xs: '100%', sm: 'auto' } // Full width on mobile
                }}>
                  <Chip
                    label={statusMapping[booking.status]?.label || "Ukjent"}
                    sx={{
                      backgroundColor: statusMapping[booking.status]?.color || "#4C4C4C",
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
                    onClick={() => handleEditClick(booking)}
                  >
                    Rediger
                  </Button>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BookingList;
