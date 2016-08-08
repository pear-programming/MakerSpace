import {expect} from 'chai';
import request from 'supertest-as-promised';
import db from '../../../server/db';

console.log(  "************************************\n"
            + "************************************\n"
            + "**                                **\n"
            + "**   Running Users's endpoint     **\n"
            + "**                                **\n"
            + "**                                **\n"
            + "**   Brought to you by broCoder   **\n"
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

  })

});
