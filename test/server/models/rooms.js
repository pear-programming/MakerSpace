import {expect} from 'chai';
import request from 'supertest-as-promised';
import db from '../../../server/db';

console.log(  "************************************\n"
            + "************************************\n"
            + "**                                **\n"
            + "**  Running Room's endpoint test  **\n"
            + "**   HAVING ISSUES WITH LOGIN     **\n"
            + "**       MakerPass Issus          **\n"
            + "**   Brought to you by broCoder   **\n"
            + "**                                **\n"
            + "************************************\n"
            + "************************************\n" )

console.log('########## ~ Testing rooms.js models ~~~~~~~~~~~~~...')

var app = require('../../../server/server.js')

describe('', function() {

  describe('Rooms:', function(){
    this.timeout(15000);
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



    it('Test 2 updates a room', function(){//this works
      return client
        .put('/room/edit/579ba6a08b6fcb4204613360')
        .send({
          status: 'complete'
        })
        .expect(200)
    })


    it('Test 3 deletes a room', function(){//this works
      return client
        .delete('/Lecture')
        .expect(200)

    })


  })

});
