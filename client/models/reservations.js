import axios from 'axios';

export function deleteReservation(resId) {
  const request = axios.delete(`/reservations/delete/${resId}`);

  return request;
}

export function updateReservation(resId, reservation) {

  const request = axios.put(`/reservations/${resId}`, reservation)

  return request
}
