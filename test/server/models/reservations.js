import {expect} from 'chai';
import request from 'supertest-as-promised';
import db from '../../../server/db';

console.log(  "************************************\n"
            + "************************************\n"
            + "**                                **\n"
            + "** Running Reservation's endpoint **\n"
            + "**   HAVING ISSUES WITH LOGIN     **\n"
            + "**    1) MakerPass Issus          **\n"
            + "**  Brought to you by broCoder    **\n"
            + "**                                **\n"
            + "************************************\n"
            + "************************************\n" )

console.log('########## ~ Testing reservation.js models ~~~~~~~~~~~~~...')

var app = require('../../../server/server.js')

describe('', function() {

  describe('Reservations:', function(){
    this.timeout(15000);
    var client = null

    beforeEach(function(){
      client = request.agent(app)
    });


    it('Test 1 make a reservation', function(){
       this.timeout(15000);
      return client
        .post('/reservations/new')
        .send({
        "_id": "57a4c24decafef3608011c52",
        "new": "reservation"
        })
        .expect("57a4c24decafef3608011c52")
        .expect(201)
        setTimeout(done, 15000);
    })

    it('Test 2  find by id', function(){
      return client
        .put('/reservations/57a4c24decafef3608011c52')
        .expect(200)
    })

    it('Test 3  find by id', function(){
      return client
        .put('/reservations/57a4c24decafef3608011c')
        .expect(500)
    })

    it('Test 4 get all reservations this is the problem', function(){
      return client
        .get('/reservations')
        .expect(200)
        setTimeout(done, 15000);
    })

    it('Test 5 get reservations by name', function(){
      return client
        .get('/reservations/Dijkstra')
        .expect(200)
    })
    it('Test 6 get reservations by name', function(){
      return client
        .get('/reservations/carlo')
        .expect(400)
    })

    it('Test 7 delete a reservation', function(){//this works
      return client
        .delete('/reservations/delete')
        .send({"new": "reservation"})
        .expect(201)
    })
    it('Test 8 delete a reservation with {}', function(){//this works
      return client
        .delete('/reservations/delete')
        .send({})
        .expect(500)
    })
    it('Test 9 delete a reservation with nothing', function(){//this works
      return client
        .delete('/reservations/delete')
        .send()
        .expect(500)
    })
    it('Test 10 delete a reservation with nothing', function(){//this works
      return client
        .delete('/reservations/delete')
        .send('')
        .expect(500)
    })

  })

});
