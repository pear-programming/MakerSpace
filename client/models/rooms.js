import axios from 'axios';

export function fetchRooms(){
  const request = axios.get('/all-rooms')

  return request
}

export function changeStatus(roomName){
	const request = axios.post(`/${roomName}/changeAvailability`)

	return request
}

export function getRoomReservations(roomName) {
  const request = axios.get(`/reservations/${roomName}`)
  return request
}

export function fetchReservations(){
  const request = axios.get('/reservations')

  return request
}

export function fetchTimeSlots(){
  const request = axios.get('/timeSlots')

  return request
}