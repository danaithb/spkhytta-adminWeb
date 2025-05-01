import { useState, useEffect } from 'react';
import { fetchBookings } from '../api/admin';

const useAdminPageState = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [search, setSearch] = useState("");  
  const [currentTab, setCurrentTab] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchBookings().then(setBookings).catch(console.error);
  }, []);

  return {
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
  };
};

export default useAdminPageState;
