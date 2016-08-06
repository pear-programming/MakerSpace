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

    var client = null

    beforeEach(function(){
      client = request.agent(app)
    });


    it('Test 1 make a reservation', function(){
      return client
        .post('/reservations/new')
        .send({
        "_id": "57a4c24decafef3608011c52",
        "new": "reservation"
        })
        .expect("57a4c24decafef3608011c52")
        .expect(201)
        .done()
    })
    //
    // it('Test 2 ', function(){
    //   return client
    //     .patch('/api/projects/start/1')
    //     .send({
    //       start: "2016-10-31"
    //     })
    //     .expect(404)
    // })
    //
    // it('updates a project due date', function(){
    //   return client
    //     .patch('/api/projects/due/1')
    //     .send({
    //       due: "2016-11-17"
    //     })
    //     .expect(404)
    // })
    //
    it('Test delete a reservation', function(){//this works
      return client
        .delete('/reservations/delete')
        .send({"new": "reservation"})
        .expect(400)
    })


  })

});
