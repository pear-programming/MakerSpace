export function formatTime(time) {
    var hours = new Date(Date.parse(time) + 18000000).getHours() 
    var amPm;
    if(hours > 12) {
      hours = hours - 12
      amPm = 'pm'
    }
    else if(hours === 12) {  
      amPm = 'pm'
    }
    else {
      amPm = 'am'
    }
    return hours.toString() + ":" + (new Date(time).getMinutes().toString() + "0").slice(0,2) + amPm;
}


export function getTimeSlotInfo(time, room) {

    var slots = room.openSlots
    var thirtyMin = 1800000;
    var nextSlots = [];
    var index = slots.indexOf(slots.filter(slot => Date.parse(slot.endTime) === Date.parse(time) + thirtyMin)[0]);
    
    nextSlots.push(new Date(Date.parse(time) + thirtyMin).toUTCString());

    for(var i = 1; index + i < slots.length && i < 4; i++) {

      if(Date.parse(slots[index + i].endTime) === Date.parse(slots[index].endTime) + thirtyMin * i) {
        nextSlots.push(new Date(Date.parse(time) + thirtyMin * (i + 1)).toUTCString())
      }
      else {
        return nextSlots;
      }
    }
    return nextSlots;  
  }


export function mapTimeSlots(reservations, rooms) {

    return reservations.data.map(reservation => {
      var room = rooms.filter(room => room.roomName === reservation.roomName)
      var color;
      if(room[0]) {
        color = room[0].roomColor;
      } else {
        color = "#0073b7"
      }

      return {
        title: reservation.roomName, 
        start: Date.parse(reservation.startTime), 
        end: Date.parse(reservation.endTime), 
        allDay: false, 
        color: color
      };
    })
  }


  export function mapTimeSlotsByDay(time, rooms, timeSlots) {

    var timeSlotsForDay = timeSlots.filter((timeSlot) => {
  
      var startTime = Date.parse(timeSlot.startTime); 
      return startTime >= time.getTime() && startTime < (time.getTime() + 43200000)
    }) 

    return rooms.map(room => { 
      var openSlots = timeSlotsForDay.filter(slot => !slot.reservations.filter(res => res.roomId === room._id).length )
      return Object.assign(room, {openSlots: openSlots})
    })
  }

  