export function formatTime(time) {
  let hours = new Date(Date.parse(time) + 18000000).getHours();
  let amPm;
  if (hours > 12) {
    hours = hours - 12;
    amPm = 'pm';
  }
  else if (hours === 12) {
    amPm = 'pm';
  }
    else {
    amPm = 'am';
  }
  return hours.toString() + ':' + (new Date(time).getMinutes().toString() + '0').slice(0, 2) + amPm;
}


export function getTimeSlotInfo(time, room) {
  let slots = room.openSlots;
  let thirtyMin = 1800000;
  let nextSlots = [];
  let index = slots.indexOf(slots.filter(slot => Date.parse(slot.endTime) === Date.parse(time) + thirtyMin)[0]);

  nextSlots.push(new Date(Date.parse(time) + thirtyMin).toUTCString());

  for (let i = 1; index + i < slots.length && i < 4; i++) {
    if (Date.parse(slots[index + i].endTime) === Date.parse(slots[index].endTime) + thirtyMin * i) {
      nextSlots.push(new Date(Date.parse(time) + thirtyMin * (i + 1)).toUTCString());
    }
    else {
      return nextSlots;
    }
  }
  return nextSlots;
}


export function mapTimeSlots(reservations, rooms) {
  return reservations.data.map(reservation => {
    let room = rooms.filter(room => room.roomName === reservation.roomName);
    let color;
    if (room[0]) {
      color = room[0].roomColor;
    } else {
      color = '#0073b7';
    }

    return {
      title: reservation.roomName,
      start: Date.parse(reservation.startTime),
      end: Date.parse(reservation.endTime),
      allDay: false,
      color
    };
  });
}


export function mapTimeSlotsByDay(time, rooms, timeSlots) {
  let timeSlotsForDay = timeSlots.filter((timeSlot) => {
    let startTime = Date.parse(timeSlot.startTime);
    return startTime >= time.getTime() && startTime < (time.getTime() + 43200000);
  });

  return rooms.map(room => {
    const openSlots = timeSlotsForDay.filter(slot => !slot.reservations.filter(res => res.roomId === room._id).length);
    return Object.assign(room, { openSlots });
  });
}

