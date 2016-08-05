import {expect} from 'chai';
import request from 'supertest-as-promised';
import db from '../../../server/db';

console.log(  "************************************\n"
            + "************************************\n"
            + "**                                **\n"
            + "**  Running Room's endpoint test  **\n"
            + "**   HAVING ISSUES WITH LOGIN     **\n"
            + "**    1) MakerPass Issus          **\n"
            + "**    2) knex migrate:latest      **\n"
            + "**                                **\n"
            + "************************************\n"
            + "************************************\n" )

console.log('########## ~ Testing rooms.js models ~~~~~~~~~~~~~...')

var app = require('../../../server/server.js')

describe('', function() {

  describe('Rooms:', function(){

    var client = null

    beforeEach(function(){
      client = request.agent(app)
    });

    it('Test 1 adds a room', function() {//this works
      return client
        .post('/rooms/new')
        .send(
        [{
          "roomName": "Lecture",
          "projector": true,
          "whiteBoard": true,
          "airPlay": true,
          "hammock": false,
          "capacity": 38,
          "tv": false,
          "isAvailable": true,
          "roomColor": "#66CCCC"
        }]
      ).expect(201)
    });
    //
    // it('gets all the rooms in the db', function(){
    //   return client
    //     .get('/all-rooms')
    //     .expect(500)
    //     // .expect(function(res){
    //     //   expect(res.body[0].resources).to.not.be.undefined;
    //     //   expect(Array.isArray(res.body[0].resources)).to.be.true;
    //     // })
    // })

    it('Test 2 updates a room', function(){//this works
      return client
        .put('/room/edit/579ba6a08b6fcb4204613360')
        .send({
          status: 'complete'
        })
        .expect(200)
    })

    // it('Change Availability of room', function(){
    //   return client
    //     .post('/Lecture/changeAvailability')
    //     .expect(201)
    // })

    // it('updates a project due date', function(){
    //   return client
    //     .patch('/api/projects/due/1')
    //     .send({
    //       due: "2016-11-17"
    //     })
    //     .expect(404)
    // })

    it('Test 3 deletes a room', function(){//this works
      return client
        .delete('/Lecture')
        .expect(200)

    })


  })

});
