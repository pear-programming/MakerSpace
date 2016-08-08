import {expect} from 'chai';
import request from 'supertest-as-promised';
import db from '../../../server/db';

console.log(  "************************************\n"
            + "************************************\n"
            + "**                                **\n"
            + "**   Running Users's endpoint     **\n"
            + "**                                **\n"
            + "**                                **\n"
            + "**                                **\n"
            + "**                                **\n"
            + "************************************\n"
            + "************************************\n" )

console.log('########## ~ Testing reservation.js models ~~~~~~~~~~~~~...')

var app = require('../../../server/server.js')

describe('', function() {

  describe('Users:', function(){
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
    //check if user already exists
    //if exists throw error, if not hash password
    it('Test 1 signup endpoint', function(){
      return client
        .post('/signup')
        .send({
        "_id": {
            "oid": "579a3818b3f58b513cea8c6e"
        },
        "name": "Bob",
        "email": "bob@gmail.com",
        "password": "bob"
        })
        .expect(400)
    })

    it('Test 2 login endpoint', function(){
      return client
        .get('/login')
        .send({
        "_id": {
            "oid": "579a3818b3f58b513cea8c6e"
        },
        "name": "Bob",
        "email": "bob@gmail.com",
        "password": "bob"
        })
        .expect(200)//found!! Yay!
    })
    // //
    // it('Test 3 Serve JS Assets', function(){
    //   return client
    //     .get('/app-bundle.js')
    //     .expect(200)
    // })
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
