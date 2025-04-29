import React, { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  TextField, 
  Alert
} from "@mui/material";
import {fetchBookings} from "../api/admin";

const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-");
  return `${day}.${month}.${year}`;
};

const LotteryPage = ({ bookings }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [winner, setWinner] = useState(null);
  const [error, setError] = useState("");

  // Hent alle bookinger fra backend ved mount
  useEffect(() => {
    fetchBookings()
        .then(setAllBookings)
        .catch(console.error);
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) {
      setFiltered([]);
      return;
    }
    if (startDate > endDate) {
      setError("Sluttdato må være etter startdato");
      setFiltered([]);
      return;
    }
    setError("");
    setFiltered(
        allBookings.filter(b =>
            b.startDate >= startDate && b.endDate <= endDate
        )
    );
  }, [startDate, endDate, allBookings]);

  const handleProcess = async () => {
    if (filtered.length === 0) return;
    try {
      // Bruk cabinId fra første booking i perioden
      const cabinId = filtered[0].cabin.cabinId;
      // Kall backend-loddtrekning
      const result = await processBookings(cabinId, startDate, endDate);
      setWinner(result);
      // Oppdater lokal liste
      fetchBookings().then(setAllBookings).catch(console.error);
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
      {filteredUsers.length > 0 ? (
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
            {filteredUsers.map((user) => (
              <Paper key={user.id} sx={{ p: 2, borderRadius: 2 }}>
                <Typography fontWeight="bold">{user.guestName}</Typography>
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
        onClick={pickWinner}
        disabled={!!error || filteredUsers.length === 0}
        variant="contained"
        fullWidth
        sx={{ mt: 4, py: 1.5, fontSize: "16px", borderRadius: 2 }}
      >
        Trekk tilfeldig vinner
      </Button>

      {/* Winner Display */}
      {winner && (
        <Box sx={{ 
          mt: 6, 
          p: 4, 
          border: "1px solid #c8e6c9", 
          borderRadius: 2, 
          backgroundColor: "#e8f5e9" 
        }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            🎉 Vinner: {winner.guestName} 🎉
          </Typography>
          <Typography color="textSecondary">
            Fra {formatDate(winner.startDate)} til {formatDate(winner.endDate)}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default LotteryPage;
