import axios from 'axios';

export function fetchRooms(){
  const request = axios.get('/all-rooms')

  return request
}

export function changeStatus(roomName){
	const request = axios.post(`/${roomName}/changeAvailability`)

	return request
}