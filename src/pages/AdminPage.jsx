import React from "react";
import EditBookingForm from "../components/EditBookingForm";
import {
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

import {
  updateBooking,
  createBookingForUser, deleteBooking
} from '../api/admin';
import useAdminPageState from "../hooks/useAdminPageState";
import BookingList from '../components/BookingList';
import BookingForm from '../components/BookingForm';
import LotteryPage from "../components/LotteryPage";
import LogoutButton from "../components/LogoutButton";


const AdminPage = ({ onLogout }) => {
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
    setStatusFilter,
  } = useAdminPageState();

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleEditClick = (booking) => {
    setSelectedBooking(booking);
    setCurrentTab(1);
  };

  const handleCancelEdit = () => {
    setSelectedBooking(null);
    setCurrentTab(0);
  };

  const handleBookingUpdate = async (form) => {
    try {
      const payload = {
        guestName: form.guestName,
        startDate: form.startDate,
        endDate: form.endDate,
        status: form.status,
        price: form.price
      };
      
      const updated = await updateBooking(form.bookingId, payload);

      setBookings(prev =>
          prev.map(b => b.bookingId === updated.bookingId ? updated : b)
      );
      
      setCurrentTab(0);
      setSelectedBooking(null);
    } catch (e) {
      alert(e.response?.data || e.message);
    }
  };


  const handleBookingCreate = async (form) => {
    try {
      const payload = {
        userId: form.userId,
        cabinId: form.cabinId,
        startDate: form.startDate,
        endDate: form.endDate,
        numberOfGuests: form.numberOfGuests,
        businessTrip: form.businessTrip,
      };
      const newBooking = await createBookingForUser(payload);
      setBookings(prev => [...prev, newBooking]);
      setCurrentTab(0);
    } catch (e) {
      alert(e.response?.data || e.message);
    }
  };

  const handleBookingDelete = async (bookingId) => {
    if (!window.confirm('Er du sikker?')) return;
    await deleteBooking(bookingId);
    setBookings(bookings.filter(b => b.bookingId !== bookingId));
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

       {/* Logout Button BELOW search bar */}
       <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
         <LogoutButton onLogout={onLogout} />
      </Box>

      {/* Status filter dropdown */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <FormControl variant="outlined" sx={{ mr: 2, width: "200px" }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Confirmed">Bekreftet</MenuItem>
            <MenuItem value="Pending">Påvente</MenuItem>
            <MenuItem value="Cancelled">Kansellert</MenuItem>
            <MenuItem value="Blocked">Blokket</MenuItem>
            <MenuItem value="Waitlist">Venteliste</MenuItem>
            <MenuItem value="Jobb">Jobb</MenuItem>
            <MenuItem value="Private">Private</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={() => setStatusFilter("")}>
          Clear Filter
        </Button>
      </Box>
      


      {/* Tabs */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Booking Liste" />
          <Tab label="Redigere Booking" />
          <Tab label="LoddSystem" />
          <Tab label="Opprett Booking"/>
        </Tabs>
      </Box>

      {/* Booking List */}
      {currentTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>

              <BookingList
                  bookings={bookings}
                  search={search}
                  statusFilter={statusFilter}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleBookingDelete}
              />
            </Paper>
          </Grid>
        </Grid>
      )}

      
      {/* Edit Booking Form */}
      {currentTab === 1 && (
          selectedBooking ? (
          <EditBookingForm
              booking={selectedBooking}
              onCancel={handleCancelEdit}
              onSave={handleBookingUpdate}
          />
          ) : (

          <Box sx={{ p: 3 }}>
              <Typography variant="body1">Velg en booking fra "BOOKING LISTE"</Typography>
              </Box>
            )
      )}

      {/* Lodd - System */}

      {currentTab === 2 && (
          <LotteryPage
              bookings={bookings} onBookingsChange={setBookings}
              />
      )}


      {/* Opprett Booking */}
      
      {currentTab === 3 && (
          <BookingForm
              selectedBooking={null}
              handleBookingUpdate={handleBookingCreate}
              onCancel={() => setCurrentTab(0)}
          />
      )}

    </Box>
  );
};

export default AdminPage;
