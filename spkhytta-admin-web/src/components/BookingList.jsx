import React from "react";
import { Paper, Typography, Button, Chip, Box } from "@mui/material";

const statusMapping = {
  Pending: { label: "Påvente", color: "#FFD700" }, 
  Confirmed: { label: "Bekreftet", color: "#4CAF50" }, 
  Cancelled: { label: "Kansellert", color: "#E53935" }, 
  Blocked: { label: "Blokkert", color: "#4C4C4C" }, 
};

const BookingList = ({ bookings, search, handleEditClick }) => {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        flexGrow: 1, // Makes it take full height
        display: "flex",
        flexDirection: "column",
        maxHeight: "800px", // Ensures it matches the height dynamically
        overflowY: "auto", // Scrollable if needed
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
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              marginBottom: "12px",
              backgroundColor: "#FAFAFA",
              boxShadow: "1px 1px 5px rgba(0,0,0,0.1)",
            }}
          >
            <Chip
              label={statusMapping[booking.status]?.label || "Ukjent"}
              sx={{
                backgroundColor: statusMapping[booking.status]?.color || "#000",
                color: "white",
                fontWeight: "bold",
                fontSize: "14px",
                borderRadius: "20px",
                padding: "8px 16px",
              }}
            />
            <Box sx={{ textAlign: "center", flexGrow: 1 }}>
              <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
                {booking.guestName}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#555" }}>
                Dato: {booking.startDate} - {booking.endDate}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#000", fontWeight: "bold" }}>
                Pris: {booking.price} NOK
              </Typography>
            </Box>
            <Button variant="contained" color="primary" onClick={() => handleEditClick(booking)}>
              REDIGER BOOKING
            </Button>
          </Box>
        ))}
    </Paper>
  );
};

export default BookingList;