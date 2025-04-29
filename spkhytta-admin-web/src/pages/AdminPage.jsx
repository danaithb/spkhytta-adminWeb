import React from "react";
import { Box, Grid, TextField, Button, Paper, Typography, Tabs, Tab, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import BookingList from "../components/BookingList"; 
import BookingForm from "../components/BookingForm"; 
import useAdminPageState from "../hooks/useStateAdminPage";

const AdminPage = () => {
  const {
    bookings,
    setBookings,
    selectedBooking,
    setSelectedBooking,
    search,
    setSearch,
    currentTab,
    setCurrentTab,
    statusFilter,
    setStatusFilter
  } = useAdminPageState();

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleEditClick = (booking) => {
    setSelectedBooking(booking);
    setCurrentTab(1);
  };

  const handleCancelEdit = () => {
    setSelectedBooking(null);
    setCurrentTab(0);
  };

  const handleBookingUpdate = (updatedBooking) => {
    setBookings(bookings.map((b) => (b.id === updatedBooking.id ? updatedBooking : b)));
    setSelectedBooking(null);
    setCurrentTab(0);
  };

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: 3 }}>
      {/* Search Bar */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <TextField
          label="Søk etter navn..."
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained">Søk</Button>
      </Box>

      {/* Status filter dropdown */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <FormControl variant="outlined" sx={{ mr: 2, width: "200px" }}>
          <InputLabel>Status</InputLabel>
          <Select value={statusFilter} onChange={handleStatusChange} label="Status">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Confirmed">Bekreftet</MenuItem>
            <MenuItem value="Pending">Påvente</MenuItem>
            <MenuItem value="Cancelled">Kansellert</MenuItem>
            <MenuItem value="Blocked">Blokket</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={() => setStatusFilter("")}>Clear Filter</Button>
      </Box>

      {/* Tabs */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <Tabs value={currentTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
          <Tab label="Booking Liste" />
          <Tab label="Redigere Booking" />
        </Tabs>
      </Box>

      {/* Booking List */}
      {currentTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 4 }}></Typography>
              <BookingList
                bookings={bookings.filter((booking) => statusFilter ? booking.status === statusFilter : true)}
                search={search}
                handleEditClick={handleEditClick}
              />
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Edit Booking Form */}
      {currentTab === 1 && selectedBooking && (
        <BookingForm
          selectedBooking={selectedBooking}
          handleBookingUpdate={handleBookingUpdate}
          onCancel={handleCancelEdit}
        />
      )}
    </Box>
  );
};

export default AdminPage;
