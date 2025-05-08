import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Paper,
} from "@mui/material";

import { updateBooking } from "../api/admin";

const EditBookingForm = ({ bookings, booking, onCancel, onSave, setSuccess, setError }) => {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "",
    price: 0,
  });

  const [conflict, setConflict] = useState(false);

  useEffect(() => {
    if (booking) {
      setFormData({
        name:      booking.user?.name  || "",
        startDate: booking.startDate,
        endDate:   booking.endDate,
        status:    booking.status,
        price:     booking.price,
      });
    }
  }, [booking]);

  useEffect(() => {
    const conflictExists = bookings?.some((b) =>
        b.bookingId !== booking.bookingId &&
        b.status === "Confirmed" &&
        !(new Date(b.endDate) < new Date(formData.startDate) ||
            new Date(b.startDate) > new Date(formData.endDate))
    );

    setConflict(conflictExists);
  }, [formData.startDate, formData.endDate, bookings, booking.bookingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (conflict) {
      setError("Datoene overlapper en allerede bekreftet booking!");
      return;
    }
    const isSame =
        formData.startDate === booking.startDate &&
        formData.endDate === booking.endDate &&
        formData.status === booking.status &&
        formData.price === booking.price;
    if (isSame) {
      setError("Ingen endringer oppdaget.");
      return;
    }
    try {
      const updated = await updateBooking(booking.bookingId, {
        startDate: formData.startDate,
        endDate:   formData.endDate,
        status:    formData.status,
        price:     formData.price,
      });
      onSave && onSave(updated);
      setSuccess("Booking oppdatert!");
      setError("");
    } catch (error) {
      console.error("Oppdateringsfeil:", error);
      setError("Feil ved oppdatering: " + error.message);
    }
  };


  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Rediger Booking
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
            fullWidth
            label="Guest Name"
            value={formData.name}
            name="name"
            disabled
            sx={{mb: 2}}
        />

        <TextField
            fullWidth
            type="date"
            label="Start Date"
            name="startDate"
            InputLabelProps={{shrink: true}}
            value={formData.startDate}
            onChange={handleChange}
            required
            sx={{mb: 2}}
        />

        <TextField
            fullWidth
            type="date"
            label="End Date"
            name="endDate"
            InputLabelProps={{shrink: true}}
            value={formData.endDate}
            onChange={handleChange}
            required
            sx={{mb: 2}}
        />
        
        {conflict && (
            <Typography color="error" sx={{ mb:2 }}>
              Datoene overlapper en annen bekreftet booking!
            </Typography>
        )}

        <FormControl fullWidth sx={{mb: 2}}>
          <InputLabel>Status</InputLabel>
          <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
          >
            <MenuItem value="Pending">Påvente</MenuItem>
            <MenuItem value="Confirmed">Bekreftet</MenuItem>
            <MenuItem value="Cancelled">Kansellert</MenuItem>
            <MenuItem value="Blocked">Blokkert</MenuItem>
            <MenuItem value="Waitlist">Venteliste</MenuItem>
          </Select>
        </FormControl>

        <TextField
            fullWidth
            type="number"
            label="Price (NOK)"
            name="price"
            InputLabelProps={{shrink: true}}
            value={formData.price}
            onChange={handleChange}
            required
            sx={{mb: 2}}
        />

        <Box sx={{display: "flex", justifyContent: "space-between", mt: 2}}>
          <Button type="submit" variant="contained" color="primary">
            LAGRE
          </Button>
          <Button
              variant="outlined"
              sx={{borderColor: "#C084FC", color: "#C084FC"}}
              onClick={onCancel}
          >
            AVBRYT
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default EditBookingForm;
