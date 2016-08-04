import {expect} from 'chai';
import request from 'supertest-as-promised';
import db from '../../../server/db';

console.log(  "************************************\n"
            + "************************************\n"
            + "**                                **\n"
            + "**      BEFORE RUNNING TESTS      **\n"
            + "** MAKE SURE TO DO THE FOLLOWING  **\n"
            + "**    1) knex migrate:rollback    **\n"
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

    it('adds a room', function() {
      return client
        .post('/rooms/new')
        .send(
        {
          "roomName": "Lecture hall",
          "projector": true,
          "whiteBoard": true,
          "airPlay": true,
          "hammock": false,
          "capacity": 38,
          "tv": false,
          "isAvailable": true,
          "roomColor": "#66CCCC"
        }
        ).expect(201)
    });

    it('gets meta information about a project by username', function(){
      return client
        .put('/api/projects/mikemfleming')
        .expect(200)
        .expect(function(res){
          expect(res.body[0].resources).to.not.be.undefined;
          expect(Array.isArray(res.body[0].resources)).to.be.true;
        })
    })

    it('updates a project status', function(){
      return client
        .patch('/api/projects/status/1')
        .send({
          status: 'complete'
        })
        .expect(200)
    })

    it('updates a project start date', function(){
      return client
        .patch('/api/projects/start/1')
        .send({
          start: "2016-10-31"
        })
        .expect(200)
    })

    it('updates a project due date', function(){
      return client
        .patch('/api/projects/due/1')
        .send({
          due: "2016-11-17"
        })
        .expect(200)
    })

    it('deletes a project', function(){
      return client
        .delete('/api/projects/2')
        .expect(200)
    })


  })

});
