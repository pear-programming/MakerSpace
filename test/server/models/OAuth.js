import {expect} from 'chai';
import request from 'supertest-as-promised';
import db from '../../../server/db';

console.log(  "************************************\n"
            + "************************************\n"
            + "**                                **\n"
            + "** Running Reservation's endpoint **\n"
            + "**   HAVING ISSUES WITH LOGIN     **\n"
            + "**    1) MakerPass Issus          **\n"
            + "**    2) knex migrate:latest      **\n"
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


    // it('Test 1 make a reservation', function(){
    //    this.timeout(15000);
    //   return client
    //     .post('/reservations/new')
    //     .send({
    //     "_id": "57a4c24decafef3608011c52",
    //     "new": "reservation"
    //     })
    //     .expect("57a4c24decafef3608011c52")
    //     .expect(201)
    //     setTimeout(done, 15000);
    // })
    //
    it('Test 1 direct browser to this route to start the OAuth dance', function(){
      return client
        .get('/auth/makerpass')
        .expect(302)//found!! Yay!
    })

    it('Test 2 Successful authentication', function(){
      return client
        .get('/auth/makerpass/callback')
        .expect(302)//found!! Yay!
    })
    //
    it('Test 3 Serve JS Assets', function(){
      return client
        .get('/app-bundle.js')
        .expect(200)
    })
    // //
    // it('Test 4 get reservations by name', function(){
    //   return client
    //     .get('/reservations/Dijkstra')
    //     .expect(200)
    // })
    //
    // it('Test 5 delete a reservation', function(){//this works
    //   return client
    //     .delete('/reservations/delete')
    //     .send({"new": "reservation"})
    //     .expect(201)
    // })


  })

});
