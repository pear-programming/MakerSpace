import axios from 'axios';

export function deleteReservation(resId){
  const request = axios.delete('/reservations/delete', resId)

  return request
}

// export function addReservation(reservation){
//   const request = axios.post('/reservations/new', reservation)

//   return request
// }