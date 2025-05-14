import React, { useState, useEffect } from "react";
import {TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Typography, Paper,} from "@mui/material";
import { fetchUsers, fetchCabins } from "../api/admin"; 

// Komponent for å vise og oppdatere en booking
const BookingForm = ({ selectedBooking, handleBookingUpdate, onCancel }) => {
  const [users, setUsers] = useState([]);
  const [emailSearch, setEmailSearch] = useState("");
  const [emailFeedback, setEmailFeedback] = useState("");
  const [cabins, setCabins] = useState([]);
  const [userId, setUserId] = useState(null);


// Skjerma-data, initieres med valgt booking hvis det finnes
  const [formData, setFormData] = useState(() => ({
      name: selectedBooking?.user?.name || "",
      startDate: selectedBooking?.startDate || "",
      endDate: selectedBooking?.endDate || "",
      status: selectedBooking?.status || "Pending",
      price: selectedBooking?.price || 0,
      cabinId: selectedBooking?.cabin?.cabinId || "",
      businessTrip: selectedBooking?.tripType === "BUSINESS" || false,
      numberOfGuests: selectedBooking?.numberOfGuests || 0,
    }));

    // Henter bruker og hytter ved første lasting
  useEffect(() => {
    fetchUsers()
        .then((data) => setUsers(data))
        .catch((err) => console.error("Klarte ikke hente brukere:", err));

    fetchCabins()
        .then((data) => {
          console.log("Hentede hytter fra backend:", data); 
          setCabins(data);
        })
        .catch((err) => console.error("Klarte ikke hente hytter:", err));
  }, []);
  // Oppdateres skjema-data hvis valgte booking endres
  useEffect(() => {
  if (selectedBooking) {
    setFormData({
      name: selectedBooking.user?.name || "",
      startDate: selectedBooking.startDate,
      endDate: selectedBooking.endDate,
      status: selectedBooking.status,
      price: selectedBooking.price,
      cabinId: selectedBooking.cabin?.cabinId || "",
      numberOfGuests: selectedBooking.numberOfGuests || 0,
      businessTrip: selectedBooking.tripType === "BUSINESS",
    });
  }
}, [selectedBooking]);

// Henter endring i input-fletene
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Søker etter bruker basert på e-post
  const handleEmailSearch = () => {
  const user = users.find((u) => u.email.toLowerCase() === emailSearch.toLowerCase());
  if (user) {
    setUserId(user.userId);
    setFormData((prev) => ({ ...prev, name: user.name }));
    setEmailFeedback(`Fant bruker: ${user.name}`);
  } else {
    setUserId(null);
    setEmailFeedback("Fant ikke bruker med den e-posten");
  }
};

  // Håndtere innsending av skjemaet og validere at e-post er valgt ved ny booking 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBooking && !userId) {
      setEmailFeedback("Du må søke opp en gyldig e-post før innsending.");
      return;
    }

    //  Sette opp data for oppdatering eller ny booking 
    const payload = {
      ...formData,
      userId: selectedBooking?.user?.userId || userId,
      tripType: formData.businessTrip ? "BUSINESS" : "PRIVATE",
    };
    handleBookingUpdate(payload);
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
      

      <form onSubmit={handleSubmit}>

        {/* Vis søkerfelt for e-post kun vis det er en ny booking */}
        {!selectedBooking && (
            <>
              <TextField
                  fullWidth
                  label="Søk e-post"
                  value={emailSearch}
                  onChange={(e) => setEmailSearch(e.target.value)}
                  sx={{ mb: 1 }}
              />
              <Button
                  variant="outlined"
                  onClick={handleEmailSearch}
                  sx={{ mb: 2 }}
              >
                Søk etter bruker
              </Button>
              {emailFeedback && (
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {emailFeedback}
                  </Typography>
              )}
            </>
        )}
        {/*Navn og annen booking informasjon */}
        <TextField
          fullWidth
          label="Navn"
          value={formData.name}
          onChange={handleInputChange}
          name="name"
          required
          sx={{ mb: 2 }}
          disabled={!selectedBooking}
        />

        {/* Hyttevalg */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Hytte</InputLabel>
          <Select
              value={formData.cabinId}
              onChange={handleInputChange}
              name="cabinId"
              required
          >
            {cabins.map((cabin) => (
                <MenuItem key={cabin.cabinId} value={cabin.cabinId}>
                  {cabin.cabinName}
                </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Datoer og annen bookinginfo */}
        <TextField
          fullWidth
          type="date"
          label="Startdato"
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
          label="Sluttdato"
          InputLabelProps={{ shrink: true }}
          value={formData.endDate}
          onChange={handleInputChange}
          name="endDate"
          required
          sx={{ mb: 2 }}
        />
        {/* Booking status */}
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
            <MenuItem value="Waitlist">Venteliste</MenuItem>
          </Select>
        </FormControl>

          <TextField
              fullWidth
              type="number"
              label="Antall gjester"
              InputLabelProps={{ shrink: true }}
              value={formData.numberOfGuests}
              onChange={handleInputChange}
              name="numberOfGuests"
              required
              sx={{ mb: 2 }}
          />

          {/* Turtype: Private eller Jobb */}
          <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Turtype</InputLabel>
              <Select
                  value={formData.businessTrip ? "business" : "private"}
                  onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        businessTrip: e.target.value === "business",
                      }))
                  }
                  name="businessTrip"
                  required
              >
                <MenuItem value="private">Privat</MenuItem>
                <MenuItem value="business">Jobbtur</MenuItem>
              </Select>
            </FormControl>
         {/* Pris vises kun hvis status ikke er "blokkert" */}
        {formData.status !== "Blocked" && (
          <TextField
            fullWidth
            type="number"
            label="Pris (NOK)"
            InputLabelProps={{ shrink: true }}
            value={formData.price}
            onChange={handleInputChange}
            name="price"
            required
            sx={{ mb: 2 }}
          />
        )}
        {/* Lagre og avbryt knapp */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
         <Button type="submit" variant="contained" color="primary">
          {selectedBooking ? "Lagre" : "Opprett"} 
          </Button>
        <Button
        variant="outlined"
        onClick={onCancel}
        sx={{ borderColor: "#FF0000", color: "#FF0000" }} 
         >
          Avbryt
       </Button> 
      </Box>

      </form>
    </Paper>
  );
};

export default BookingForm;
