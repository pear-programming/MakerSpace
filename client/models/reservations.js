import axios from 'axios';

export function deleteReservation(resId){
  const request = axios.delete(`/reservations/delete/${resId}`)

  return request
}
