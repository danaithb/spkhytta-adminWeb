import React, { useState } from "react";
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
import { fetchUsers, fetchCabins } from "../api/admin"; 

const EditBookingForm = () => {
  const [formData, setFormData] = useState({
    name: "James Bond",
    startDate: "2025-04-01",
    endDate: "2025-04-05",
    status: "Confirmed",
    price: 2000,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

      <form>
        <TextField
          fullWidth
          label="Guest Name"
          value={formData.name}
          name="name"
          disabled
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          type="date"
          label="Start Date"
          name="startDate"
          InputLabelProps={{ shrink: true }}
          value={formData.startDate}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          type="date"
          label="End Date"
          name="endDate"
          InputLabelProps={{ shrink: true }}
          value={formData.endDate}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
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
          InputLabelProps={{ shrink: true }}
          value={formData.price}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            LAGRE
          </Button>
          <Button
            variant="outlined"
            sx={{ borderColor: "#C084FC", color: "#C084FC" }}
          >
            AVBRYT
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default EditBookingForm;
