import React, { useState, useEffect } from "react";
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

const BookingForm = ({ selectedBooking, handleBookingUpdate, onCancel }) => {
  // Initialize formData with default values if selectedBooking is null
  const [formData, setFormData] = useState(
    selectedBooking || {
      guestName: "",
      startDate: "",
      endDate: "",
      status: "Pending", // Default to "Pending" status
      price: 0,
    }
  );

  // Sync the local form state with the selectedBooking prop when it changes
  useEffect(() => {
    if (selectedBooking) {
      setFormData(selectedBooking);
    } else {
      // If no selectedBooking, ensure the formData is reset to defaults for creating a new booking
      setFormData({
        guestName: "",
        startDate: "",
        endDate: "",
        status: "Pending",
        price: 0,
      });
    }
  }, [selectedBooking]);

  // Handle changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    handleBookingUpdate(formData); // Pass form data to the parent component for processing
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
        {selectedBooking ? "Rediger Booking" : "Opprett Booking"} {/* Change form title */}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Guest Name"
          value={formData.guestName}
          onChange={handleInputChange}
          name="guestName"
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="date"
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          value={formData.startDate}
          onChange={handleInputChange}
          name="startDate"
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="date"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          value={formData.endDate}
          onChange={handleInputChange}
          name="endDate"
          required
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={formData.status}
            onChange={handleInputChange}
            name="status"
            required
          >
            <MenuItem value="Pending">Påvente</MenuItem>
            <MenuItem value="Confirmed">Bekreftet</MenuItem>
            <MenuItem value="Cancelled">Kansellert</MenuItem>
            <MenuItem value="Blocked">Blokkert</MenuItem>
            <MenuItem value="Jobb">Jobb</MenuItem>
            <MenuItem value="Private">Private</MenuItem>
          </Select>
        </FormControl>

        {/* Price field, shown only if status is not "Blokkert" */}
        {formData.status !== "Blocked" && (
          <TextField
            fullWidth
            type="number"
            label="Price (NOK)"
            InputLabelProps={{ shrink: true }}
            value={formData.price}
            onChange={handleInputChange}
            name="price"
            required
            sx={{ mb: 2 }}
          />
        )}
        
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
         <Button type="submit" variant="contained" color="primary">
          {selectedBooking ? "Lagre" : "Opprett"} {/* Change button text */}
          </Button>
        <Button
        variant="outlined"
        onClick={onCancel}
        sx={{ borderColor: "#FF0000", color: "#FF0000" }} // Set border and text color to red
         >
          Avbryt
       </Button> 
      </Box>

      </form>
    </Paper>
  );
};

export default BookingForm;
