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

    // it('Test 1 get all reservation', function() {
    //   return client
    //     .get('/reservations')
    //     .expect(201)
    // });

    // it('gets all the rooms in the db', function(){
    //   return client
    //     .get('/all-rooms')
    //     .expect(500)
    //     // .expect(function(res){
    //     //   expect(res.body[0].resources).to.not.be.undefined;
    //     //   expect(Array.isArray(res.body[0].resources)).to.be.true;
    //     // })
    // })
    //
    it('Test 1 make a reservation', function(){
      return client
        .post('/reservations/new')
        .send({
        "_id": {
        "oid": "57a4c24decafef3608011c52"
        },
        "roomId": {
            "oid": "579e56213dd4c18f03f52a0e"
        },
        "roomName": "Ellis",
        "userId": {
            "oid": "579e1e8e81e91777028c2df5"
        },
        "userName": "Mary Crandel",
        "startTime": {
            "date": "2016-08-06T20:00:30.000Z"
        },
        "endTime": {
            "date": "2016-08-06T21:00:45.000Z"
        }
        })
        .expect(201)
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
        .send({"_id": "57a4c24decafef3608011c52"})
        .expect(201)
    })


  })

});
