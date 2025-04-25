import { useState } from "react";
import { bookings } from "../utils/dummyData"; // Correct import of bookings

const useAdminPageState = () => {
  // Initializing state with the imported 'bookings' data
  const [bookingsState, setBookings] = useState(bookings); 
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [search, setSearch] = useState("");  
  const [selectedDate, setSelectedDate] = useState(new Date());  
  const [currentTab, setCurrentTab] = useState(0); 
  const [statusFilter, setStatusFilter] = useState(""); 

  return {
    bookings: bookingsState, // Renamed state variable
    setBookings,
    selectedBooking,
    setSelectedBooking,
    search,
    setSearch,
    selectedDate,
    setSelectedDate,
    currentTab,
    setCurrentTab,
    statusFilter,
    setStatusFilter
  };
};

export default useAdminPageState;
