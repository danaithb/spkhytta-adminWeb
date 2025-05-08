import React, { useState, useEffect } from "react";
import {Box, Typography, Button, Paper, TextField, Alert} from "@mui/material";
import { fetchBookings, processBookings, fetchBookingsByPeriod } from "../api/admin";
import { getToken } from "../firebase";

const formatDate = (dateStr) => {
  if (!dateStr) return "Ukjent dato";
  const [year, month, day] = dateStr.split("-");
  return `${day}.${month}.${year}`;
};

const LotteryPage = ({ bookings, onBookingsChange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [winners, setWinners] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!startDate || !endDate) {
        setFiltered([]);
        return;
      }

      if (startDate > endDate) {
        setError("Sluttdato må være etter startdato");
        setFiltered([]);
        return;
      }

      try {
        setError("");
        const token = await getToken();
        const data = await fetchBookingsByPeriod(startDate, endDate, token);
        setFiltered(data.filter((booking) => booking.status === "pending"));
      } catch (err) {
        setError("Kunne ikke hente bookinger for valgt tidsrom");
        setFiltered([]);
      }
    };
    fetchData();
  }, [startDate, endDate]);
  
  const handleProcess = async () => {
    if (filtered.length === 0) return;
    try {
      const cabinId = filtered[0].cabin.cabinId;
      const result = await processBookings(cabinId, startDate, endDate);
      console.log("Vinnerliste fra backend:", result);


      if (!result || result.length === 0) {
        alert("Ingen vinnere ble valgt");
        setWinners([]);
        return;
      }

      setWinners(result);

      const token = await getToken();
      const all = await fetchBookings(token);
      onBookingsChange(all);

      const data = await fetchBookingsByPeriod(startDate, endDate, token);
      setFiltered(data.filter((booking) => booking.status === "pending"));
    } catch (e) {
        alert(e.response?.data || e.message);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 6, borderRadius: 4, mt: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        🎲 Hytte-Bingo
      </Typography>

      {/* Date Range Selection */}
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 4,
        '& .MuiTextField-root': { flex: 1 }
      }}>
        <TextField
          label="Startdato"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Sluttdato"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Booking List */}
      {filtered.length > 0 ? (
        <Box 
          sx={{ 
            maxHeight: 400, 
            overflowY: 'auto', 
            mb: 2,
            p: 1,
            border: '1px solid #ddd',
            borderRadius: 2
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 2
            }}
          >
            {filtered.map((user) => (
              <Paper key={user.id} sx={{ p: 2, borderRadius: 2 }}>
                <Typography fontWeight="bold">{user.name}</Typography>
                <Typography color="textSecondary" variant="body2">
                  Fra {formatDate(user.startDate)} til {formatDate(user.endDate)}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      ) : (
        <Typography color="textSecondary">
          {startDate && endDate ? 
            "Ingen bookinger funnet i valgt tidsrom" : 
            "Velg start- og sluttdato for å se bookinger"}
        </Typography>
      )}

      {/* Pick Winner Button */}
        <Button
            onClick={handleProcess}
            disabled={!!error || filtered.length === 0}
          variant="contained"
          sx={{
            mt: 4,
            py: 1.5,
            fontSize: "16px",
            borderRadius: 2,
            width: "100%"  
          }}
      >
        Trekk tilfeldig vinner
      </Button>


      {/* Winner Display */}
      {winners.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
              🎉 Vinnere 🎉
            </Typography>

            {winners.map((winner, index) => (
                <Box
                    key={index}
                    sx={{
                      mb: 2,
                      p: 3,
                      border: "1px solid #c8e6c9",
                      borderRadius: 2,
                      backgroundColor: "#e8f5e9",
                    }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {winner.user?.name}
                  </Typography>
                  <Typography color="textSecondary">
                    Fra {formatDate(winner.startDate)} til {formatDate(winner.endDate)}
                  </Typography>
                </Box>
            ))}
          </Box>
      )}

    </Paper>
);
};

export default LotteryPage;


