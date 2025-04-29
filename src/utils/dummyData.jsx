export const bookings = [
  { id: 1, guestName: 'Jens Olsen', startDate: '2025-04-01', endDate: '2025-04-05', price: 2000, status: 'Bekreftet' },
  { id: 2, guestName: 'Maria Sørensen', startDate: '2025-04-01', endDate: '2025-04-05', price: 1800, status: 'Påvente' },
  { id: 3, guestName: 'Anders Johansen', startDate: '2025-04-01', endDate: '2025-04-05', price: 1600, status: 'Kansellert' },
  { id: 4, guestName: 'Emma Larsen', startDate: '2025-04-04', endDate: '2025-04-10', price: 1500, status: 'Blokkert' },
  { id: 5, guestName: 'Kari Nilsen', startDate: '2025-04-04', endDate: '2025-04-10', price: 1500, status: 'Bekreftet' },
  { id: 6, guestName: 'Erik Hansen', startDate: '2025-04-26', endDate: '2025-04-30', price: 2200, status: 'Påvente' },
  { id: 7, guestName: 'Ola Berg', startDate: '2025-05-01', endDate: '2025-05-05', price: 2400, status: 'Bekreftet' },
  { id: 8, guestName: 'Ingrid Pedersen', startDate: '2025-05-03', endDate: '2025-05-08', price: 2000, status: 'Kansellert' }, // overlapped May
  { id: 9, guestName: 'Lars Eriksen', startDate: '2025-05-05', endDate: '2025-05-10', price: 2500, status: 'Blokkert' },      // continued overlap
  { id: 10, guestName: 'Sofie Hansen', startDate: '2025-05-16', endDate: '2025-05-20', price: 1900, status: 'Påvente' },

  // ➡️ New generated dummy bookings (overlapping across May, June)
  { id: 11, guestName: 'Henrik Madsen', startDate: '2025-05-20', endDate: '2025-05-25', price: 2100, status: 'Bekreftet' },
  { id: 12, guestName: 'Sara Kristoffersen', startDate: '2025-05-24', endDate: '2025-05-30', price: 2300, status: 'Påvente' }, // overlap with Henrik
  { id: 13, guestName: 'Morten Lie', startDate: '2025-06-01', endDate: '2025-06-06', price: 2600, status: 'Kansellert' },
  { id: 14, guestName: 'Camilla Solberg', startDate: '2025-06-05', endDate: '2025-06-10', price: 2200, status: 'Blokkert' },  // overlap with Morten
  { id: 15, guestName: 'Kristin Haugen', startDate: '2025-06-08', endDate: '2025-06-15', price: 2500, status: 'Bekreftet' } ,
  // ➡️ New generated dummy bookings (overlapping and spanning May/June)
{ id: 16, guestName: 'Emil Andresen', startDate: '2025-05-28', endDate: '2025-06-02', price: 2400, status: 'Bekreftet' },
{ id: 17, guestName: 'Nora Evensen', startDate: '2025-06-01', endDate: '2025-06-05', price: 2000, status: 'Påvente' }, // overlap with Emil
{ id: 18, guestName: 'Lars Mathisen', startDate: '2025-06-04', endDate: '2025-06-09', price: 2700, status: 'Kansellert' },
{ id: 19, guestName: 'Sofie Halvorsen', startDate: '2025-06-08', endDate: '2025-06-12', price: 2500, status: 'Blokkert' }, // overlap with Lars
{ id: 20, guestName: 'Andreas Moe', startDate: '2025-06-10', endDate: '2025-06-15', price: 2900, status: 'Bekreftet' }  // overlap with Sofie
  // overlap with Camilla
];
